    
import { useState } from 'react';

export function useSliderState() {
  const [isSliderVisible, setSliderVisible] = useState(false);

  const openSlider = () => setSliderVisible(true);
  const closeSlider = () => setSliderVisible(false);

  return {
    isSliderVisible,
    openSlider,
    closeSlider,
  };
}
