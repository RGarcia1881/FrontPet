// greetingLogic.ts

/**
 * Determina el saludo y la clave de imagen según la hora actual.
 * @param hour La hora actual (0-23). Si no se proporciona, usa la hora actual del sistema.
 * @returns Un objeto con 'greeting' (el saludo) y 'imageKey' (la clave para la imagen).
 */
export const getGreetingAndImage = (
  hour: number = new Date().getHours()
): { greeting: string; imageKey: 'dia' | 'tarde' | 'noche' } => {
  // Lógica:
  // Buenos días: 6 a.m. (06:00) a 11:59 a.m.
  if (hour >= 6 && hour < 12) {
    return {
      greeting: 'Buenos días.',
      imageKey: 'dia',
    };
  }
  // Buenas tardes: 12 p.m. (12:00) a 7:59 p.m. (20:00)
  // Usamos 20:00 (8 p.m.) como límite superior para 'Buenas tardes'
  else if (hour >= 12 && hour < 20) {
    return {
      greeting: 'Buenas tardes.',
      imageKey: 'tarde',
    };
  }
  // Buenas noches: 8 p.m. (20:00) hasta las 5:59 a.m. del día siguiente
  else {
    return {
      greeting: 'Buenas noches.',
      imageKey: 'noche',
    };
  }
};