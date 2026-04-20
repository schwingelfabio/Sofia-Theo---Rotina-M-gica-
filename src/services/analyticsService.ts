/**
 * Sistema de Telemetria do Conecta-Verse
 */
export const logMovement = (pos: {x: number, y: number, z: number}, userId: string) => {
    // Em produção, isso seria um envio via POST para uma API em Cloud Run ou Firebase
    // Simulando o heatmap:
    const roundedX = Math.round(pos.x / 5) * 5;
    const roundedZ = Math.round(pos.z / 5) * 5;
    
    // Log estruturado para capturar área densa
    console.log(`[HEATMAP_LOG] User: ${userId} | Area: (${roundedX}, ${roundedZ}) | Timestamp: ${Date.now()}`);
};
