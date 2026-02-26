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

    // Auth
    signIn: 'Sign In',
    createAccount: 'Create Account',
    continueWithGoogle: 'Continue with Google',
    or: 'or',
    fullName: 'Full Name',
    password: 'Password',
    noAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
    checkEmail: 'Check your email',
    confirmEmail: 'We sent you a confirmation link. Please verify your email.',
    authError: 'Authentication Error',
    signOut: 'Sign Out',

    // Public profile
    profileNotFound: 'Profile Not Found',
    profileNotFoundDesc: 'This card doesn\'t exist or is private.',
    saveContact: 'Save Contact',
    saved: 'Saved',
    contactSaved: 'Contact Saved',
    contactSavedDesc: 'This contact has been added to your network.',
    alreadySaved: 'Already Saved',
    alreadySavedDesc: 'This contact is already in your network.',

    // Dashboard
    yourCard: 'Your Card',
    shareYourCard: 'Share your digital card',
    myConnections: 'My Connections',
    noConnections: 'No connections yet. Scan someone\'s QR code to connect!',
    loading: 'Loading...',
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

    // Auth
    signIn: 'Iniciar Sesión',
    createAccount: 'Crear Cuenta',
    continueWithGoogle: 'Continuar con Google',
    or: 'o',
    fullName: 'Nombre Completo',
    password: 'Contraseña',
    noAccount: '¿No tienes cuenta?',
    haveAccount: '¿Ya tienes cuenta?',
    checkEmail: 'Revisa tu correo',
    confirmEmail: 'Te enviamos un enlace de confirmación. Verifica tu correo.',
    authError: 'Error de Autenticación',
    signOut: 'Cerrar Sesión',

    // Public profile
    profileNotFound: 'Perfil No Encontrado',
    profileNotFoundDesc: 'Esta tarjeta no existe o es privada.',
    saveContact: 'Guardar Contacto',
    saved: 'Guardado',
    contactSaved: 'Contacto Guardado',
    contactSavedDesc: 'Este contacto se ha añadido a tu red.',
    alreadySaved: 'Ya Guardado',
    alreadySavedDesc: 'Este contacto ya está en tu red.',

    // Dashboard
    yourCard: 'Tu Tarjeta',
    shareYourCard: 'Comparte tu tarjeta digital',
    myConnections: 'Mis Conexiones',
    noConnections: '¡Aún no tienes conexiones. Escanea el QR de alguien para conectar!',
    loading: 'Cargando...',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
