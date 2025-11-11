// lib/hooks/useBookmarks.ts
'use client';

import { useState, useEffect } from 'react';

const BOOKMARKS_KEY = 'novaWayBookmarks';

const getInitialState = (): string[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  const item = localStorage.getItem(BOOKMARKS_KEY);
  return item ? JSON.parse(item) : [];
};

export function useBookmarks() {
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  // A flag to prevent saving until we've loaded
  const [isInitialized, setIsInitialized] = useState(false);

  // On first load, get the data from localStorage
  useEffect(() => {
    setBookmarkedIds(getInitialState());
    setIsInitialized(true); // Signal that we have loaded
  }, []);

  // Any time bookmarkedIds changes, save it back to localStorage
  useEffect(() => {
    // --- THIS IS THE FIX ---
    // Only save to localStorage if we are initialized.
    // This prevents the initial empty array from overwriting
    // our saved data.
    if (isInitialized) {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarkedIds));
    }
  }, [bookmarkedIds, isInitialized]); // Add isInitialized as a dependency

  const toggleBookmark = (eventId: string) => {
    setBookmarkedIds((prevIds) => {
      if (prevIds.includes(eventId)) {
        return prevIds.filter((id) => id !== eventId);
      } else {
        return [...prevIds, eventId];
      }
    });
  };

  const isBookmarked = (eventId: string) => {
    return bookmarkedIds.includes(eventId);
  };

  return { bookmarkedIds, toggleBookmark, isBookmarked };
}