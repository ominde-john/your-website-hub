// Translation strings for all supported languages
export type Language = 'en' | 'sw' | 'fr' | 'es';

export interface TranslationStrings {
  // Common
  common: {
    loading: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    close: string;
    confirm: string;
    back: string;
    next: string;
    previous: string;
    search: string;
    submit: string;
    yes: string;
    no: string;
  };
  // Settings
  settings: {
    title: string;
    subtitle: string;
    appearance: string;
    notifications: string;
    privacy: string;
    security: string;
    theme: string;
    light: string;
    dark: string;
    system: string;
    language: string;
    settingUpdated: string;
    failedToLoad: string;
    failedToUpdate: string;
  };
  // Notifications
  notificationSettings: {
    title: string;
    channels: string;
    emailNotifications: string;
    emailNotificationsDesc: string;
    pushNotifications: string;
    pushNotificationsDesc: string;
    smsNotifications: string;
    smsNotificationsDesc: string;
    activityNotifications: string;
    messages: string;
    messagesDesc: string;
    taskReminders: string;
    taskRemindersDesc: string;
    calendarReminders: string;
    calendarRemindersDesc: string;
    weeklyDigest: string;
    weeklyDigestDesc: string;
    marketingEmails: string;
    marketingEmailsDesc: string;
  };
  // Privacy
  privacySettings: {
    title: string;
    profileVisibility: string;
    public: string;
    publicDesc: string;
    membersOnly: string;
    membersOnlyDesc: string;
    private: string;
    privateDesc: string;
    activityStatus: string;
    showOnlineStatus: string;
    showOnlineStatusDesc: string;
    readReceipts: string;
    readReceiptsDesc: string;
    typingIndicator: string;
    typingIndicatorDesc: string;
  };
  // Security
  securitySettings: {
    title: string;
    twoFactorAuth: string;
    twoFactorAuthDesc: string;
    sessionTimeout: string;
    sessionTimeoutDesc: string;
    dangerZone: string;
    signOutAllDevices: string;
    signOutAllDevicesDesc: string;
    deleteAccount: string;
    deleteAccountDesc: string;
    minutes: string;
    hour: string;
    hours: string;
    never: string;
  };
}

export const translations: Record<Language, TranslationStrings> = {
  en: {
    common: {
      loading: 'Loading...',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      close: 'Close',
      confirm: 'Confirm',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      search: 'Search',
      submit: 'Submit',
      yes: 'Yes',
      no: 'No',
    },
    settings: {
      title: 'Settings',
      subtitle: 'Manage your account preferences and privacy',
      appearance: 'Appearance',
      notifications: 'Notifications',
      privacy: 'Privacy',
      security: 'Security',
      theme: 'Theme',
      light: 'Light',
      dark: 'Dark',
      system: 'System',
      language: 'Language',
      settingUpdated: 'Setting updated',
      failedToLoad: 'Failed to load settings',
      failedToUpdate: 'Failed to update setting',
    },
    notificationSettings: {
      title: 'Notification Preferences',
      channels: 'Notification Channels',
      emailNotifications: 'Email Notifications',
      emailNotificationsDesc: 'Receive notifications via email',
      pushNotifications: 'Push Notifications',
      pushNotificationsDesc: 'Browser and mobile push notifications',
      smsNotifications: 'SMS Notifications',
      smsNotificationsDesc: 'Receive text message alerts',
      activityNotifications: 'Activity Notifications',
      messages: 'Messages',
      messagesDesc: 'New messages and chat activity',
      taskReminders: 'Task Reminders',
      taskRemindersDesc: 'Upcoming and overdue tasks',
      calendarReminders: 'Calendar Reminders',
      calendarRemindersDesc: 'Event reminders and updates',
      weeklyDigest: 'Weekly Digest',
      weeklyDigestDesc: 'Summary of your weekly activity',
      marketingEmails: 'Marketing Emails',
      marketingEmailsDesc: 'Product updates and announcements',
    },
    privacySettings: {
      title: 'Privacy Settings',
      profileVisibility: 'Profile Visibility',
      public: 'Public',
      publicDesc: 'Anyone can see',
      membersOnly: 'Members Only',
      membersOnlyDesc: 'Only members',
      private: 'Private',
      privateDesc: 'Only you',
      activityStatus: 'Activity Status',
      showOnlineStatus: 'Show Online Status',
      showOnlineStatusDesc: "Let others see when you're online",
      readReceipts: 'Read Receipts',
      readReceiptsDesc: "Show when you've read messages",
      typingIndicator: 'Typing Indicator',
      typingIndicatorDesc: "Show when you're typing a message",
    },
    securitySettings: {
      title: 'Security Settings',
      twoFactorAuth: 'Two-Factor Authentication',
      twoFactorAuthDesc: 'Add an extra layer of security',
      sessionTimeout: 'Session Timeout',
      sessionTimeoutDesc: 'Auto-logout after inactivity',
      dangerZone: 'Danger Zone',
      signOutAllDevices: 'Sign out all devices',
      signOutAllDevicesDesc: 'End all active sessions',
      deleteAccount: 'Delete Account',
      deleteAccountDesc: 'Permanently delete your account',
      minutes: 'minutes',
      hour: 'hour',
      hours: 'hours',
      never: 'Never',
    },
  },
  sw: {
    common: {
      loading: 'Inapakia...',
      save: 'Hifadhi',
      cancel: 'Ghairi',
      delete: 'Futa',
      edit: 'Hariri',
      close: 'Funga',
      confirm: 'Thibitisha',
      back: 'Rudi',
      next: 'Ifuatayo',
      previous: 'Iliyopita',
      search: 'Tafuta',
      submit: 'Wasilisha',
      yes: 'Ndiyo',
      no: 'Hapana',
    },
    settings: {
      title: 'Mipangilio',
      subtitle: 'Simamia mapendeleo na faragha yako ya akaunti',
      appearance: 'Muonekano',
      notifications: 'Arifa',
      privacy: 'Faragha',
      security: 'Usalama',
      theme: 'Mandhari',
      light: 'Mwanga',
      dark: 'Giza',
      system: 'Mfumo',
      language: 'Lugha',
      settingUpdated: 'Mpangilio umesasishwa',
      failedToLoad: 'Imeshindwa kupakia mipangilio',
      failedToUpdate: 'Imeshindwa kusasisha mpangilio',
    },
    notificationSettings: {
      title: 'Mapendeleo ya Arifa',
      channels: 'Njia za Arifa',
      emailNotifications: 'Arifa za Barua pepe',
      emailNotificationsDesc: 'Pokea arifa kupitia barua pepe',
      pushNotifications: 'Arifa za Kusukuma',
      pushNotificationsDesc: 'Arifa za kivinjari na simu',
      smsNotifications: 'Arifa za SMS',
      smsNotificationsDesc: 'Pokea tahadhari za ujumbe mfupi',
      activityNotifications: 'Arifa za Shughuli',
      messages: 'Ujumbe',
      messagesDesc: 'Ujumbe mpya na shughuli za mazungumzo',
      taskReminders: 'Vikumbusho vya Kazi',
      taskRemindersDesc: 'Kazi zinazokuja na zilizochelewa',
      calendarReminders: 'Vikumbusho vya Kalenda',
      calendarRemindersDesc: 'Vikumbusho na masasisho ya matukio',
      weeklyDigest: 'Muhtasari wa Kila Wiki',
      weeklyDigestDesc: 'Muhtasari wa shughuli zako za wiki',
      marketingEmails: 'Barua pepe za Masoko',
      marketingEmailsDesc: 'Masasisho ya bidhaa na matangazo',
    },
    privacySettings: {
      title: 'Mipangilio ya Faragha',
      profileVisibility: 'Uonekano wa Wasifu',
      public: 'Hadharani',
      publicDesc: 'Mtu yeyote anaweza kuona',
      membersOnly: 'Wanachama Pekee',
      membersOnlyDesc: 'Wanachama tu',
      private: 'Faragha',
      privateDesc: 'Wewe pekee',
      activityStatus: 'Hali ya Shughuli',
      showOnlineStatus: 'Onyesha Hali ya Mtandaoni',
      showOnlineStatusDesc: 'Waache wengine waone unapokuwa mtandaoni',
      readReceipts: 'Risiti za Kusoma',
      readReceiptsDesc: 'Onyesha umeposoma ujumbe',
      typingIndicator: 'Kiashiria cha Kuandika',
      typingIndicatorDesc: 'Onyesha unapoandika ujumbe',
    },
    securitySettings: {
      title: 'Mipangilio ya Usalama',
      twoFactorAuth: 'Uthibitishaji wa Hatua Mbili',
      twoFactorAuthDesc: 'Ongeza safu ya ziada ya usalama',
      sessionTimeout: 'Muda wa Kikao',
      sessionTimeoutDesc: 'Ondoka kiotomatiki baada ya kutofanya kazi',
      dangerZone: 'Eneo la Hatari',
      signOutAllDevices: 'Ondoka kwenye vifaa vyote',
      signOutAllDevicesDesc: 'Maliza vikao vyote hai',
      deleteAccount: 'Futa Akaunti',
      deleteAccountDesc: 'Futa akaunti yako kabisa',
      minutes: 'dakika',
      hour: 'saa',
      hours: 'masaa',
      never: 'Kamwe',
    },
  },
  fr: {
    common: {
      loading: 'Chargement...',
      save: 'Enregistrer',
      cancel: 'Annuler',
      delete: 'Supprimer',
      edit: 'Modifier',
      close: 'Fermer',
      confirm: 'Confirmer',
      back: 'Retour',
      next: 'Suivant',
      previous: 'Précédent',
      search: 'Rechercher',
      submit: 'Soumettre',
      yes: 'Oui',
      no: 'Non',
    },
    settings: {
      title: 'Paramètres',
      subtitle: 'Gérer les préférences et la confidentialité de votre compte',
      appearance: 'Apparence',
      notifications: 'Notifications',
      privacy: 'Confidentialité',
      security: 'Sécurité',
      theme: 'Thème',
      light: 'Clair',
      dark: 'Sombre',
      system: 'Système',
      language: 'Langue',
      settingUpdated: 'Paramètre mis à jour',
      failedToLoad: 'Échec du chargement des paramètres',
      failedToUpdate: 'Échec de la mise à jour du paramètre',
    },
    notificationSettings: {
      title: 'Préférences de notification',
      channels: 'Canaux de notification',
      emailNotifications: 'Notifications par e-mail',
      emailNotificationsDesc: 'Recevoir des notifications par e-mail',
      pushNotifications: 'Notifications push',
      pushNotificationsDesc: 'Notifications push du navigateur et mobile',
      smsNotifications: 'Notifications SMS',
      smsNotificationsDesc: 'Recevoir des alertes par SMS',
      activityNotifications: "Notifications d'activité",
      messages: 'Messages',
      messagesDesc: 'Nouveaux messages et activité de chat',
      taskReminders: 'Rappels de tâches',
      taskRemindersDesc: 'Tâches à venir et en retard',
      calendarReminders: 'Rappels de calendrier',
      calendarRemindersDesc: "Rappels d'événements et mises à jour",
      weeklyDigest: 'Résumé hebdomadaire',
      weeklyDigestDesc: 'Résumé de votre activité hebdomadaire',
      marketingEmails: 'E-mails marketing',
      marketingEmailsDesc: 'Mises à jour de produits et annonces',
    },
    privacySettings: {
      title: 'Paramètres de confidentialité',
      profileVisibility: 'Visibilité du profil',
      public: 'Public',
      publicDesc: 'Tout le monde peut voir',
      membersOnly: 'Membres uniquement',
      membersOnlyDesc: 'Seulement les membres',
      private: 'Privé',
      privateDesc: 'Vous seul',
      activityStatus: "Statut d'activité",
      showOnlineStatus: 'Afficher le statut en ligne',
      showOnlineStatusDesc: 'Permettre aux autres de voir quand vous êtes en ligne',
      readReceipts: 'Accusés de lecture',
      readReceiptsDesc: 'Afficher quand vous avez lu les messages',
      typingIndicator: 'Indicateur de frappe',
      typingIndicatorDesc: 'Afficher quand vous tapez un message',
    },
    securitySettings: {
      title: 'Paramètres de sécurité',
      twoFactorAuth: 'Authentification à deux facteurs',
      twoFactorAuthDesc: 'Ajouter une couche de sécurité supplémentaire',
      sessionTimeout: 'Expiration de session',
      sessionTimeoutDesc: "Déconnexion automatique après inactivité",
      dangerZone: 'Zone de danger',
      signOutAllDevices: 'Déconnecter tous les appareils',
      signOutAllDevicesDesc: 'Mettre fin à toutes les sessions actives',
      deleteAccount: 'Supprimer le compte',
      deleteAccountDesc: 'Supprimer définitivement votre compte',
      minutes: 'minutes',
      hour: 'heure',
      hours: 'heures',
      never: 'Jamais',
    },
  },
  es: {
    common: {
      loading: 'Cargando...',
      save: 'Guardar',
      cancel: 'Cancelar',
      delete: 'Eliminar',
      edit: 'Editar',
      close: 'Cerrar',
      confirm: 'Confirmar',
      back: 'Atrás',
      next: 'Siguiente',
      previous: 'Anterior',
      search: 'Buscar',
      submit: 'Enviar',
      yes: 'Sí',
      no: 'No',
    },
    settings: {
      title: 'Configuración',
      subtitle: 'Administra las preferencias y privacidad de tu cuenta',
      appearance: 'Apariencia',
      notifications: 'Notificaciones',
      privacy: 'Privacidad',
      security: 'Seguridad',
      theme: 'Tema',
      light: 'Claro',
      dark: 'Oscuro',
      system: 'Sistema',
      language: 'Idioma',
      settingUpdated: 'Configuración actualizada',
      failedToLoad: 'Error al cargar la configuración',
      failedToUpdate: 'Error al actualizar la configuración',
    },
    notificationSettings: {
      title: 'Preferencias de notificación',
      channels: 'Canales de notificación',
      emailNotifications: 'Notificaciones por correo',
      emailNotificationsDesc: 'Recibir notificaciones por correo electrónico',
      pushNotifications: 'Notificaciones push',
      pushNotificationsDesc: 'Notificaciones push del navegador y móvil',
      smsNotifications: 'Notificaciones SMS',
      smsNotificationsDesc: 'Recibir alertas por mensaje de texto',
      activityNotifications: 'Notificaciones de actividad',
      messages: 'Mensajes',
      messagesDesc: 'Nuevos mensajes y actividad de chat',
      taskReminders: 'Recordatorios de tareas',
      taskRemindersDesc: 'Tareas próximas y atrasadas',
      calendarReminders: 'Recordatorios de calendario',
      calendarRemindersDesc: 'Recordatorios de eventos y actualizaciones',
      weeklyDigest: 'Resumen semanal',
      weeklyDigestDesc: 'Resumen de tu actividad semanal',
      marketingEmails: 'Correos de marketing',
      marketingEmailsDesc: 'Actualizaciones de productos y anuncios',
    },
    privacySettings: {
      title: 'Configuración de privacidad',
      profileVisibility: 'Visibilidad del perfil',
      public: 'Público',
      publicDesc: 'Cualquiera puede ver',
      membersOnly: 'Solo miembros',
      membersOnlyDesc: 'Solo miembros',
      private: 'Privado',
      privateDesc: 'Solo tú',
      activityStatus: 'Estado de actividad',
      showOnlineStatus: 'Mostrar estado en línea',
      showOnlineStatusDesc: 'Permitir que otros vean cuando estás en línea',
      readReceipts: 'Confirmaciones de lectura',
      readReceiptsDesc: 'Mostrar cuando has leído los mensajes',
      typingIndicator: 'Indicador de escritura',
      typingIndicatorDesc: 'Mostrar cuando estás escribiendo un mensaje',
    },
    securitySettings: {
      title: 'Configuración de seguridad',
      twoFactorAuth: 'Autenticación de dos factores',
      twoFactorAuthDesc: 'Agregar una capa adicional de seguridad',
      sessionTimeout: 'Tiempo de sesión',
      sessionTimeoutDesc: 'Cierre de sesión automático por inactividad',
      dangerZone: 'Zona de peligro',
      signOutAllDevices: 'Cerrar sesión en todos los dispositivos',
      signOutAllDevicesDesc: 'Finalizar todas las sesiones activas',
      deleteAccount: 'Eliminar cuenta',
      deleteAccountDesc: 'Eliminar tu cuenta permanentemente',
      minutes: 'minutos',
      hour: 'hora',
      hours: 'horas',
      never: 'Nunca',
    },
  },
};

export const languageNames: Record<Language, string> = {
  en: 'English',
  sw: 'Swahili',
  fr: 'Français',
  es: 'Español',
};
