// app/events/[id]/page.tsx
'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { mockEvents } from '@/lib/data';
import SignUpModal from '@/components/SignUpModal';
import { useBookmarks } from '@/lib/hooks/useBookmarks';
import { useSignUps } from '@/lib/hooks/useSignUps'; // <-- 1. Import new hook

export default function EventDetailPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams();
  const eventId = params.id as string;

  // --- HOOKS ---
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { isSignedUp, toggleSignUp } = useSignUps(); // <-- 2. Use new hook
  
  const bookmarked = isBookmarked(eventId);
  const signedUp = isSignedUp(eventId); // <-- 3. Check sign-up status

  const event = mockEvents.find((e) => e.id === eventId);

  // --- UPDATED FUNCTION ---
  // This runs when the modal's "Confirm" button is clicked
  const handleSignUpAndSave = () => {
    // Only sign up if not already signed up
    if (!signedUp) {
      toggleSignUp(event!.id);
    }
    // Also save as a bookmark, if not already saved
    if (!bookmarked) {
      toggleBookmark(event!.id);
    }
  };
  // -------------------------

  if (!event) {
    return <div className="p-4">Event not found.</div>;
  }

  return (
    <div className="p-4 pb-8">
      {/* Event Details (no change) */}
      <span className="text-sm font-medium text-blue-600">
        {event.type.toUpperCase()}
      </span>
      <h1 className="mt-1 text-2xl font-bold">{event.title}</h1>
      <p className="mt-4 text-lg font-semibold text-gray-800">
        {event.date}
      </p>
      <p className="text-md text-gray-600">{event.location}</p>
      <p className="mt-6 text-gray-700">{event.description}</p>

      {/* Button container */}
      <div className="mt-8 flex flex-col gap-3">
        {/* --- 4. UPDATED SIGN-UP BUTTON --- */}
        <button
          onClick={() => {
            if (signedUp) {
              // --- THIS IS THE FIX ---
              // Now it cancels the sign-up AND removes the bookmark
              toggleSignUp(event.id);
              toggleBookmark(event.id); 
              // -----------------------
            } else {
              setIsModalOpen(true); // If not, open the form
            }
          }}
          className={`w-full rounded-lg px-4 py-2.5 text-base font-medium transition-colors ${
            signedUp
              ? 'border border-red-500 bg-red-50 text-red-700 hover:bg-red-100' // "Cancel" style
              : 'bg-blue-600 text-white shadow-md hover:bg-blue-700' // "Sign Up" style
          }`}
        >
          {signedUp ? 'Cancel Sign-Up' : 'Sign Up Here'}
        </button>

        {/* Save Event Button (no change) */}
        <button
          onClick={() => toggleBookmark(event.id)}
          className={`w-full rounded-lg px-4 py-2.5 text-base font-medium ${
            bookmarked
              ? 'border border-blue-600 bg-blue-50 text-blue-700'
              : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          {bookmarked ? 'Saved to Bookmarks' : 'Save Event'}
        </button>
      </div>

      {/* Modal (no change) */}
      <SignUpModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        eventName={event.title}
        onSignUpSuccess={handleSignUpAndSave}
      />
    </div>
  );
}