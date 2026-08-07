"use client";

import { useState } from "react";

export function useJourney(initialStep: number = 0) {
  const [activeStep, setActiveStepState] = useState<number>(initialStep);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([0]);

  const setActiveStep = (step: number) => {
    if (step === activeStep || isMoving) return;
    
    // Add to completed steps if not already present
    if (!completedSteps.includes(step)) {
      // Add all steps up to this one to completed steps
      const newCompleted = [...completedSteps];
      for (let i = 0; i <= step; i++) {
        if (!newCompleted.includes(i)) {
          newCompleted.push(i);
        }
      }
      setCompletedSteps(newCompleted);
    }
    
    setActiveStepState(step);
  };

  return {
    activeStep,
    setActiveStep,
    isMoving,
    setIsMoving,
    completedSteps,
    setCompletedSteps,
  };
}
