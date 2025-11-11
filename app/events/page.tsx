// app/events/page.tsx
'use client'; // <-- 1. Convert to a Client Component

import { useState } from 'react'; // <-- 2. Import useState
import EventCard from '@/components/EventCard';
import { mockEvents } from '@/lib/data';
import type { EventType } from '@/lib/types';

// 3. Define our filter options, including an 'All' category
// These 'value' fields match the 'type' in your data
const filterOptions: { label: string; value: EventType | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Academic', value: 'academic' },
  { label: 'Social', value: 'social' },
  { label: 'Sports', value: 'sports' },
  { label: 'Career', value: 'career' },
];

export default function EventsPage() {
  // 4. Create state to track the active filter
  const [activeFilter, setActiveFilter] = useState<EventType | 'all'>('all');

  // 5. Create the filtered list based on the active filter
  const filteredEvents =
    activeFilter === 'all'
      ? mockEvents
      : mockEvents.filter((event) => event.type === activeFilter);

  return (
    <div className="flex flex-col">
      {/* Page Header (no change) */}
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-900">All Events</h1>
      </div>

      {/* 6. Filter Buttons (now interactive) */}
      <div className="flex gap-2 overflow-x-auto px-4 pb-4">
        {filterOptions.map((filter) => {
          const isActive = filter.value === activeFilter;
          return (
            <button
              key={filter.value}
              // 7. Add the onClick handler
              onClick={() => setActiveFilter(filter.value)}
              // 8. Add styles for the active button
              className={`flex-shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'border border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* 9. Event List (now uses the filtered list) */}
      <div className="flex flex-col gap-3 px-4 pb-8">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <p className="text-gray-600">
            No events found for this category.
          </p>
        )}
      </div>
    </div>
  );
}