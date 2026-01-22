import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { translations, Language, TranslationStrings, languageNames } from './translations';
import { supabase } from '@/integrations/supabase/client';

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
        const storedLang = localStorage.getItem('preferredLanguage') as Language | null;
        if (storedLang && translations[storedLang]) {
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

          if (!error && data?.language && translations[data.language as Language]) {
            setLanguageState(data.language as Language);
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
            .update({ language: lang, updated_at: new Date().toISOString() })
            .eq('user_id', user.id)
            .then(({ error }) => {
              if (error) {
                console.error('Error saving language to database:', error);
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
