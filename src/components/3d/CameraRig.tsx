import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import type { SystemMode, IncidentStep } from '../../types/manufactureFlow';

interface CameraRigProps {
  mode: SystemMode;
  currentStep: IncidentStep;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
}

export const CameraRig = ({ mode, currentStep, controlsRef }: CameraRigProps) => {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(...currentStep.cameraPosition));
  const targetLook = useRef(new THREE.Vector3(...currentStep.cameraTarget));

  useEffect(() => {
    targetPos.current.set(...currentStep.cameraPosition);
    targetLook.current.set(...currentStep.cameraTarget);
  }, [currentStep]);

  useFrame((_, delta) => {
    if (mode === 'CINEMATIC') {
      // Smoothly interpolate camera position
      camera.position.lerp(targetPos.current, delta * 2.5);
      
      if (controlsRef.current) {
        controlsRef.current.target.lerp(targetLook.current, delta * 2.5);
        controlsRef.current.update();
      }
    }
  });

  return null;
};
