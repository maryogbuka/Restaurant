'use client';
import { useEffect } from 'react';

export default function BrowserFix() {
  useEffect(() => {
    // Detect Opera Mini
    const isOperaMini = /Opera Mini|OPiOS/i.test(navigator.userAgent);
    
    if (isOperaMini) {
      console.log('Opera Mini detected - applying compatibility fixes');
      document.documentElement.classList.add('opera-mini');
    } else {
      // Remove any opera-mini class if not needed (just in case)
      document.documentElement.classList.remove('opera-mini');
    }
  }, []);

  return null;
}