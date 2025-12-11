// utils/distanceToPercentage.ts - AGREGA LOGS
export const distanceToPercentage = (distance: number): number => {
  console.log("🧮 distanceToPercentage recibió:", distance, "cm");

  // Limitar entre 2 y 7 cm
  const clampedDistance = Math.max(2, Math.min(7, distance));
  console.log("📏 Distancia limitada:", clampedDistance, "cm");

  // Fórmula: ((7 - distancia) / 5) * 100
  const percentage = ((7 - clampedDistance) / 5) * 100;
  console.log("🔢 Porcentaje calculado:", percentage, "%");

  // Redondear a entero y asegurar 0-100
  const finalPercentage = Math.max(0, Math.min(100, Math.round(percentage)));
  console.log("🎯 Porcentaje final:", finalPercentage, "%");

  return finalPercentage;
};
