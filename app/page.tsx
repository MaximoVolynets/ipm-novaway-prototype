// Import our new component and the mock data
import EventCard from '@/components/EventCard';
import { mockEvents } from '@/lib/data';

export default function Home() {
  // Get just the first 3 events for the home page preview
  const upcomingEvents = mockEvents.slice(0, 5);

  return (
    <div className="flex flex-col gap-6 p-4 pb-8">
      {/* 1. Quick Access for Study Rooms */}
      <div className="rounded-lg border border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Find a Study Space
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          See which rooms are free and how crowded they are.
        </p>
        <button className="mt-3 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Check Availability
        </button>
      </div>

     {/* 2. Upcoming Events Feed (NOW DYNAMIC) */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Upcoming Events
        </h2>
        <div className="mt-3 flex flex-col gap-3">
          {/* We map over our "upcomingEvents" array.
            For each "event" object, we render an EventCard.
            The "key" is crucial for React to track the list.
          */}
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}