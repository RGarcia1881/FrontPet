// services/scheduleService.ts

import { getHorariosByUser } from '@/api/schedule';

// Almacenar los horarios ya ejecutados HOY
const executedToday = new Set<string>();

export const checkPendingSchedules = async (userId: number): Promise<boolean> => {
  try {
    console.log('🔍 Verificando horarios pendientes...');
    
    const horarios = await getHorariosByUser(userId);
    const now = new Date();
    const currentTime = now.toTimeString().substring(0, 5); // "HH:MM"
    
    let shouldDispatch = false;
    
    for (const horario of horarios) {
      for (const horaProgramada of horario.horarios) {
        const scheduleKey = `${horario.id}-${horaProgramada}-${now.toDateString()}`;
        
        // Si ya ejecutamos este horario hoy, saltar
        if (executedToday.has(scheduleKey)) {
          continue;
        }
        
        // Verificar si es la hora de ejecutar (±2 minutos)
        if (isTimeToExecute(currentTime, horaProgramada)) {
          console.log(`⏰ Hora de dispensar comida: ${horaProgramada}`);
          
          // Marcar como ejecutado HOY
          executedToday.add(scheduleKey);
          shouldDispatch = true;
          break; // Solo necesitamos saber si hay que dispensar
        }
      }
      
      if (shouldDispatch) break;
    }
    
    return shouldDispatch;
    
  } catch (error) {
    console.error('❌ Error verificando horarios:', error);
    return false;
  }
};

const isTimeToExecute = (currentTime: string, scheduledTime: string): boolean => {
  const [currentHours, currentMinutes] = currentTime.split(':').map(Number);
  const [scheduledHours, scheduledMinutes] = scheduledTime.split(':').map(Number);
  
  const currentTotalMinutes = currentHours * 60 + currentMinutes;
  const scheduledTotalMinutes = scheduledHours * 60 + scheduledMinutes;
  
  return Math.abs(currentTotalMinutes - scheduledTotalMinutes) <= 2;
};