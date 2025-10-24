// styles/theme.ts

// 🎨 PALETA DE COLORES
export const AppColors = {
    // Colores Principales y de Fondo
    dark: '#0c0d0f',       // Negro/Oscuro principal
    light: '#f5f5f5',      // Blanco/Gris claro para fondos o texto claro
    
    // Colores de Marca
    primary: '#85aac3',    // Azul principal (similar a tu PrimaryBlue)
    secondary: '#87ceeb',  // Azul secundario/claro
    orange: '#ff7f50',     // Naranja (para detalles)
    
    // Colores de Estado
    success: '#6abe6c',    // Verde para éxito
    error: '#e36262',      // Rojo para errores
    subtext: '#a5a5a5',    // Gris para texto secundario
    
    // Puedes mapear los colores de tu proyecto a la nueva paleta
    background: '#f5f5f5', // Usando 'light' como background
    text: '#0c0d0f',       // Usando 'dark' como color de texto principal
    button: '#85aac3',     // Usando 'primary' como color de botón
};

// 🔡 TIPOGRAFÍA
export const AppFonts = {
    primary: 'Galindo', // Fuente principal que ya tienes cargada
    system: 'System',   // Fuente de respaldo para elementos que no usan 'Galindo'
};