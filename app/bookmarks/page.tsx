// app/bookmarks/page.tsx
'use client'; // Required to use our hook

import EventCard from '@/components/EventCard';
import { mockEvents } from '@/lib/data';
import { useBookmarks } from '@/lib/hooks/useBookmarks';

export default function BookmarksPage() {
  const { bookmarkedIds } = useBookmarks();

  // Filter the full event list to find the ones we've bookmarked
  const savedEvents = mockEvents.filter((event) =>
    bookmarkedIds.includes(event.id)
  );

  return (
    <div className="flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-900">My Saved Events</h1>
      </div>

      <div className="flex flex-col gap-3 px-4 pb-8">
        {savedEvents.length > 0 ? (
          savedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <p className="text-gray-600">
            You haven't saved any events yet. Click the "Save Event" button on
            an event's detail page to add it here.
          </p>
        )}
      </div>
    </div>
  );
}