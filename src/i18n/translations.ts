export type Language = 'en' | 'es';

export const translations = {
  en: {
    // Header
    digitalIdentity: 'Digital Identity',
    
    // Profile Card
    title: 'Title',
    workPreference: 'Work Preference',
    remote: 'Remote Only',
    hybrid: 'Hybrid',
    office: 'On-Site',
    flexible: 'Flexible',
    
    // Contact
    contact: 'Contact',
    email: 'Email',
    phone: 'Phone',
    website: 'Website',
    linkedin: 'LinkedIn',
    
    // QR Code
    scanToConnect: 'Scan to Connect',
    shareVCard: 'Share vCard',
    
    // Editor
    editProfile: 'Edit Profile',
    firstName: 'First Name',
    lastName: 'Last Name',
    bioSummary: 'Bio / Summary',
    contactInformation: 'Contact Information',
    clickToUpload: 'Click to upload',
    cancel: 'Cancel',
    saveChanges: 'Save Changes',
    profileUpdated: 'Profile Updated',
    changesSaved: 'Your changes have been saved successfully.',
    
    // Footer
    footerHint: 'Click the ✎ button to customize your profile',
  },
  es: {
    // Header
    digitalIdentity: 'Identidad Digital',
    
    // Profile Card
    title: 'Título',
    workPreference: 'Preferencia de Trabajo',
    remote: 'Solo Remoto',
    hybrid: 'Híbrido',
    office: 'Presencial',
    flexible: 'Flexible',
    
    // Contact
    contact: 'Contacto',
    email: 'Correo',
    phone: 'Teléfono',
    website: 'Sitio Web',
    linkedin: 'LinkedIn',
    
    // QR Code
    scanToConnect: 'Escanea para Conectar',
    shareVCard: 'Compartir vCard',
    
    // Editor
    editProfile: 'Editar Perfil',
    firstName: 'Nombre',
    lastName: 'Apellido',
    bioSummary: 'Bio / Resumen',
    contactInformation: 'Información de Contacto',
    clickToUpload: 'Clic para subir',
    cancel: 'Cancelar',
    saveChanges: 'Guardar Cambios',
    profileUpdated: 'Perfil Actualizado',
    changesSaved: 'Tus cambios se han guardado correctamente.',
    
    // Footer
    footerHint: 'Haz clic en el botón ✎ para personalizar tu perfil',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
