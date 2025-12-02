// services/waterMonitorService.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleReadSensor, handleWaterRoutine } from '@/handlers/esp32/esp32Handlers';

// Constantes de configuración
const WATER_MONITOR_INTERVAL = 60000; // Verificar cada minuto (60 segundos)
const WATER_WEIGHT_THRESHOLD = 100; // Umbral mínimo en gramos

// Interfaces
interface WaterMonitorStatus {
  lastChecked: string;
  lastWeight: number | null;
  lastDispenseTime: string | null;
  enabled: boolean;
}

// Función simple de logging (reemplaza notificaciones temporalmente)
const logMessage = (title: string, body: string) => {
  console.log(`💧 [WATER-MONITOR] ${title}: ${body}`);
};

// Cargar estado del monitor
const loadMonitorStatus = async (): Promise<WaterMonitorStatus> => {
  try {
    const stored = await AsyncStorage.getItem('water_monitor_status');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('💧 [WATER-MONITOR] Error cargando estado:', error);
  }
  
  return {
    lastChecked: new Date().toISOString(),
    lastWeight: null,
    lastDispenseTime: null,
    enabled: true,
  };
};

// Guardar estado del monitor
const saveMonitorStatus = async (status: WaterMonitorStatus): Promise<void> => {
  try {
    await AsyncStorage.setItem('water_monitor_status', JSON.stringify(status));
  } catch (error) {
    console.error('💧 [WATER-MONITOR] Error guardando estado:', error);
  }
};

// Función principal de monitoreo
export const checkAndDispenseWaterIfNeeded = async (): Promise<boolean> => {
  try {
    console.log('💧 [WATER-MONITOR] Verificando nivel de agua...');
    
    const status = await loadMonitorStatus();
    
    if (!status.enabled) {
      console.log('💧 [WATER-MONITOR] Monitor deshabilitado');
      return false;
    }
    
    // Setters dummy
    const dummySetMessage: React.Dispatch<React.SetStateAction<string>> = (value) => {
      const message = typeof value === 'function' ? 'Función recibida' : value;
      console.log(`💧 [WATER-MONITOR] Mensaje: ${message}`);
    };
    
    const dummySetMessageType: React.Dispatch<React.SetStateAction<'success' | 'error'>> = (value) => {
      const type = typeof value === 'function' ? 'success' : value;
      console.log(`💧 [WATER-MONITOR] Tipo: ${type}`);
    };
    
    const dummySetLoading: React.Dispatch<React.SetStateAction<boolean>> = (value) => {
      const loading = typeof value === 'function' ? false : value;
      console.log(`💧 [WATER-MONITOR] Loading: ${loading}`);
    };
    
    // Leer sensor de peso B
    console.log('💧 [WATER-MONITOR] Leyendo sensor de peso B...');
    const weight = await handleReadSensor(
      'PESO_B',
      dummySetMessage,
      dummySetMessageType
    );
    
    // Actualizar estado
    status.lastChecked = new Date().toISOString();
    status.lastWeight = weight ? parseFloat(weight.toString()) : null;
    
    console.log(`💧 [WATER-MONITOR] Peso actual del agua: ${status.lastWeight}g`);
    
    // Verificar si necesita dispensar
    if (status.lastWeight !== null && status.lastWeight < WATER_WEIGHT_THRESHOLD) {
      console.log(`💧 [WATER-MONITOR] ¡Peso bajo detectado! (${status.lastWeight}g < ${WATER_WEIGHT_THRESHOLD}g)`);
      
      logMessage('💧 Nivel de Agua Bajo', `El plato de agua tiene solo ${status.lastWeight}g. Se dispensará agua automáticamente.`);
      
      // Ejecutar rutina de agua
      console.log('💧 [WATER-MONITOR] Iniciando dispensación automática de agua...');
      
      await handleWaterRoutine(
        dummySetMessage,
        dummySetMessageType,
        dummySetLoading
      );
      
      status.lastDispenseTime = new Date().toISOString();
      
      logMessage('✅ Agua Dispensada Automáticamente', 'Se ha dispensado agua fresca para tu mascota.');
      
      console.log('💧 [WATER-MONITOR] Agua dispensada exitosamente');
      
      await saveMonitorStatus(status);
      return true;
      
    } else {
      console.log('💧 [WATER-MONITOR] Nivel de agua adecuado');
      await saveMonitorStatus(status);
      return false;
    }
    
  } catch (error) {
    console.error('💧 [WATER-MONITOR] Error en verificación de agua:', error);
    logMessage('❌ Error en Monitor de Agua', 'Hubo un problema al verificar el nivel de agua.');
    return false;
  }
};

// 🔥 CORRECCIÓN: Usar number para el intervalo en React Native
let waterMonitorInterval: number | null = null;

export const startWaterMonitor = (): void => {
  if (waterMonitorInterval !== null) {
    console.log('💧 [WATER-MONITOR] Monitor ya está en ejecución');
    return;
  }
  
  console.log('💧 [WATER-MONITOR] Iniciando monitor de agua...');
  
  // Ejecutar inmediatamente
  checkAndDispenseWaterIfNeeded();
  
  // Configurar intervalo (en React Native, setInterval retorna number)
  waterMonitorInterval = setInterval(
    checkAndDispenseWaterIfNeeded,
    WATER_MONITOR_INTERVAL
  ) as unknown as number;
  
  console.log(`💧 [WATER-MONITOR] Intervalo configurado: ${WATER_MONITOR_INTERVAL/1000} segundos`);
};

export const stopWaterMonitor = (): void => {
  if (waterMonitorInterval !== null) {
    clearInterval(waterMonitorInterval);
    waterMonitorInterval = null;
    console.log('💧 [WATER-MONITOR] Monitor detenido');
  }
};

export const getWaterMonitorStatus = async (): Promise<WaterMonitorStatus> => {
  return await loadMonitorStatus();
};

export const setWaterMonitorEnabled = async (enabled: boolean): Promise<void> => {
  const status = await loadMonitorStatus();
  status.enabled = enabled;
  await saveMonitorStatus(status);
  
  console.log(`💧 [WATER-MONITOR] Monitor ${enabled ? 'habilitado' : 'deshabilitado'}`);
  
  if (enabled && waterMonitorInterval === null) {
    startWaterMonitor();
  }
  
  if (!enabled && waterMonitorInterval !== null) {
    stopWaterMonitor();
  }
};

export const setWaterWeightThreshold = async (threshold: number): Promise<void> => {
  await AsyncStorage.setItem('water_threshold', threshold.toString());
  console.log(`💧 [WATER-MONITOR] Umbral establecido en: ${threshold}g`);
};

// Función para obtener el umbral actual
export const getWaterWeightThreshold = async (): Promise<number> => {
  try {
    const stored = await AsyncStorage.getItem('water_threshold');
    return stored ? parseFloat(stored) : WATER_WEIGHT_THRESHOLD;
  } catch (error) {
    console.error('💧 [WATER-MONITOR] Error obteniendo umbral:', error);
    return WATER_WEIGHT_THRESHOLD;
  }
};