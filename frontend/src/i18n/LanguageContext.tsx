import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { translations, Language, TranslationStrings, languageNames } from './translations';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Helper function to validate if a string is a valid Language
const isValidLanguage = (lang: string): lang is Language => {
  return lang in translations;
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationStrings;
  languageNames: Record<Language, string>;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [isLoading, setIsLoading] = useState(true);

  // Load language preference from localStorage or database
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        // First check localStorage for immediate loading
        const storedLang = localStorage.getItem('preferredLanguage');
        if (storedLang && isValidLanguage(storedLang)) {
          setLanguageState(storedLang);
        }

        // Then try to get from database if user is authenticated
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase
            .from('user_settings')
            .select('language')
            .eq('user_id', user.id)
            .single();

          if (!error && data?.language && isValidLanguage(data.language)) {
            setLanguageState(data.language);
            localStorage.setItem('preferredLanguage', data.language);
          }
        }
      } catch (error) {
        console.error('Error loading language preference:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLanguage();
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    if (translations[lang]) {
      setLanguageState(lang);
      localStorage.setItem('preferredLanguage', lang);
      
      // Update database if user is authenticated
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user) {
          supabase
            .from('user_settings')
            .update({ language: lang })
            .eq('user_id', user.id)
            .then(({ error }) => {
              if (error) {
                console.error('Error saving language to database:', error);
                toast.error('Failed to save language preference');
              }
            });
        }
      });
    }
  }, []);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languageNames, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export { type Language } from './translations';
