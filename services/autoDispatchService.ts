// services/autoDispatchService.ts

import { handleFoodRoutine } from '@/handlers/esp32/esp32Handlers';
import { Dispatch, SetStateAction } from 'react';

// Wrapper que usa tu handleFoodRoutine existente con setters dummy CORREGIDOS
export const executeAutomaticFoodRoutine = async (): Promise<boolean> => {
  try {
    console.log('🤖 Iniciando rutina automática de comida...');
    
    // Creamos setters dummy CORREGIDOS que manejan SetStateAction
    const dummySetMessage: Dispatch<SetStateAction<string>> = (msg) => {
      if (typeof msg === 'function') {
        // Si es una función, la ejecutamos (aunque en automático no debería pasar)
        const result = msg(''); // Pasamos un estado vacío como base
        console.log(`📢 [AUTO]: ${result}`);
      } else {
        // Si es un string directo
        console.log(`📢 [AUTO]: ${msg}`);
      }
    };
    
    const dummySetMessageType: Dispatch<SetStateAction<'success' | 'error'>> = (type) => {
      if (typeof type === 'function') {
        const result = type('success'); // Estado base 'success'
        console.log(`📊 [AUTO] Tipo mensaje: ${result}`);
      } else {
        console.log(`📊 [AUTO] Tipo mensaje: ${type}`);
      }
    };
    
    const dummySetLoading: Dispatch<SetStateAction<boolean>> = (loading) => {
      if (typeof loading === 'function') {
        const result = loading(false); // Estado base false
        console.log(`🔄 [AUTO] Loading: ${result}`);
      } else {
        console.log(`🔄 [AUTO] Loading: ${loading}`);
      }
    };
    
    // Ejecutar tu función existente con los setters corregidos
    await handleFoodRoutine(dummySetMessage, dummySetMessageType, dummySetLoading);
    
    console.log('✅ Rutina automática de comida completada');
    return true;
    
  } catch (error) {
    console.error('❌ Error en rutina automática de comida:', error);
    return false;
  }
};