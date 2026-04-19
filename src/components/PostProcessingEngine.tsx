/**
 * PostProcessingEngine: Gerencia a modulação visual em tempo real.
 * Usa Effects do @react-three/postprocessing para simplificar o ambiente.
 */
import React from 'react';
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';

interface PostProcessingEngineProps {
  isOverstimulated: boolean;
}

export const PostProcessingEngine: React.FC<PostProcessingEngineProps> = ({ isOverstimulated }) => {
  return (
    <EffectComposer>
      <Bloom luminanceThreshold={isOverstimulated ? 0.9 : 0.2} intensity={isOverstimulated ? 0.1 : 0.5} />
      <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={isOverstimulated ? 2 : 0} />
    </EffectComposer>
  );
};
