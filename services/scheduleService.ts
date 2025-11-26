// services/scheduleService.ts

import { getHorariosByUser } from '@/api/schedule';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EXECUTED_STORAGE_KEY = 'executed_schedules_today';

// Cargar ejecuciones desde AsyncStorage
const loadExecutedSchedules = async (): Promise<Set<string>> => {
  try {
    const stored = await AsyncStorage.getItem(EXECUTED_STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      // Verificar si es del día actual
      const today = new Date().toDateString();
      if (data.date === today) {
        return new Set(data.executed);
      }
    }
  } catch (error) {
    console.error('❌ [SCHEDULE] Error cargando ejecuciones:', error);
  }
  return new Set();
};

// Guardar ejecuciones en AsyncStorage
const saveExecutedSchedules = async (executed: Set<string>) => {
  try {
    const data = {
      date: new Date().toDateString(),
      executed: Array.from(executed)
    };
    await AsyncStorage.setItem(EXECUTED_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('❌ [SCHEDULE] Error guardando ejecuciones:', error);
  }
};

export const checkPendingSchedules = async (userId: number): Promise<boolean> => {
  try {
    console.log('🔍 [SCHEDULE] Verificando horarios para usuario:', userId);
    
    // Cargar ejecuciones previas
    const executedToday = await loadExecutedSchedules();
    const today = new Date().toDateString();
    
    // Limpiar si es un nuevo día
    if (executedToday.size > 0) {
      const firstKey = Array.from(executedToday)[0];
      const storedDate = firstKey.split('-').pop();
      if (storedDate !== today) {
        console.log('🗑️ [SCHEDULE] Nuevo día, limpiando ejecuciones anteriores');
        executedToday.clear();
        await saveExecutedSchedules(executedToday);
      }
    }

    const horarios = await getHorariosByUser(userId);
    console.log('📅 [SCHEDULE] Horarios obtenidos:', JSON.stringify(horarios, null, 2));
    
    if (!Array.isArray(horarios)) {
      console.error('❌ [SCHEDULE] horarios no es un array:', horarios);
      return false;
    }
    
    const now = new Date();
    const currentTime = now.toTimeString().substring(0, 5); // "HH:MM"
    console.log('⏰ [SCHEDULE] Hora actual:', currentTime);
    
    let shouldDispatch = false;
    let newExecutions = false;
    
    for (const horario of horarios) {
      console.log('📋 [SCHEDULE] Revisando horario ID:', horario.id);
      
      if (!horario.horarios || !Array.isArray(horario.horarios)) {
        console.log('⚠️ [SCHEDULE] Horario sin array de horarios:', horario);
        continue;
      }
      
      for (const horaProgramada of horario.horarios) {
        const scheduleKey = `${horario.id}-${horaProgramada}-${today}`;
        console.log('🕒 [SCHEDULE] Hora programada:', horaProgramada, 'Key:', scheduleKey);
        
        // DEBUG: Mostrar si ya está ejecutado
        if (executedToday.has(scheduleKey)) {
          console.log('⏭️ [SCHEDULE] Horario YA EJECUTADO HOY, saltando');
          console.log('🔍 [DEBUG] Key en executedToday:', scheduleKey);
          continue;
        }
        
        // Verificar si es la hora de ejecutar
        const timeCheckResult = isTimeToExecute(currentTime, horaProgramada);
        console.log('⏱️ [SCHEDULE] Resultado verificación hora:', timeCheckResult);
        
        if (timeCheckResult) {
          console.log('🎯 [SCHEDULE] ¡HORA DE EJECUTAR!', horaProgramada);
          console.log('📝 [SCHEDULE] Marcando como ejecutado:', scheduleKey);
          
          // SOLO marcar como ejecutado cuando realmente se va a ejecutar
          executedToday.add(scheduleKey);
          shouldDispatch = true;
          newExecutions = true;
          break;
        } else {
          console.log('⏳ [SCHEDULE] No es hora aún. Actual:', currentTime, 'Programada:', horaProgramada);
        }
      }
      
      if (shouldDispatch) break;
    }
    
    // Guardar SOLO si hay nuevas ejecuciones
    if (newExecutions) {
      console.log('💾 [SCHEDULE] Guardando nuevas ejecuciones en storage');
      await saveExecutedSchedules(executedToday);
    }
    
    console.log('✅ [SCHEDULE] Resultado final - Debe dispensar:', shouldDispatch);
    console.log('📊 [SCHEDULE] Total ejecuciones hoy:', executedToday.size);
    
    return shouldDispatch;
    
  } catch (error) {
    console.error('❌ [SCHEDULE] Error verificando horarios:', error);
    return false;
  }
};

const isTimeToExecute = (currentTime: string, scheduledTime: string): boolean => {
  try {
    console.log('🔎 [TIME CHECK] Comparando:', { currentTime, scheduledTime });
    
    const [currentHours, currentMinutes] = currentTime.split(':').map(Number);
    const [scheduledHours, scheduledMinutes] = scheduledTime.split(':').map(Number);
    
    // Validar que sean números válidos
    if (isNaN(currentHours) || isNaN(currentMinutes) || 
        isNaN(scheduledHours) || isNaN(scheduledMinutes)) {
      console.error('❌ [TIME CHECK] Hora inválida:', { currentTime, scheduledTime });
      return false;
    }
    
    const currentTotalMinutes = currentHours * 60 + currentMinutes;
    const scheduledTotalMinutes = scheduledHours * 60 + scheduledMinutes;
    
    const difference = currentTotalMinutes - scheduledTotalMinutes;
    console.log(`⏱️ [TIME CHECK] Diferencia: ${difference} minutos`);
    
    // 🔥 CORRECCIÓN CRÍTICA: Solo ejecutar cuando la hora actual es IGUAL o 1-2 minutos DESPUÉS
    // Esto evita que se ejecute antes de tiempo
    return difference >= 0 && difference <= 2;
    
  } catch (error) {
    console.error('❌ [TIME CHECK] Error calculando diferencia:', error);
    return false;
  }
};

// Función para limpiar ejecuciones manualmente (útil para testing)
export const clearExecutedSchedules = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(EXECUTED_STORAGE_KEY);
    console.log('🧹 [SCHEDULE] Ejecuciones limpiadas manualmente');
  } catch (error) {
    console.error('❌ [SCHEDULE] Error limpiando ejecuciones:', error);
  }
};