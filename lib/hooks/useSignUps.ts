'use client';

import { useState, useEffect } from 'react';

// 1. Did you change this key?
const SIGNUPS_KEY = 'novaWaySignUps';

const getInitialState = (): string[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  // 2. Did you change this to use SIGNUPS_KEY?
  const item = localStorage.getItem(SIGNUPS_KEY);
  return item ? JSON.parse(item) : [];
};

export function useSignUps() {
  // 3. Did you change these state variables?
  const [signedUpIds, setSignedUpIds] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // 4. Did you change this function call?
    setSignedUpIds(getInitialState());
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      // 5. Did you change these variables?
      localStorage.setItem(SIGNUPS_KEY, JSON.stringify(signedUpIds));
    }
    // 6. Did you change this dependency?
  }, [signedUpIds, isInitialized]);

  // 7. Did you rename this function?
  const toggleSignUp = (eventId: string) => {
    // 8. Did you change this state setter?
    setSignedUpIds((prevIds) => {
      if (prevIds.includes(eventId)) {
        return prevIds.filter((id) => id !== eventId);
      } else {
        return [...prevIds, eventId];
      }
    });
  };

  // 9. Did you rename this function?
  const isSignedUp = (eventId: string) => {
    // 10. Did you change this variable?
    return signedUpIds.includes(eventId);
  };

  // 11. Did you change all the return values?
  return { signedUpIds, toggleSignUp, isSignedUp };
}