// components/EventCard.tsx
import Link from 'next/link'; // Import Link
import type { AppEvent, EventType } from '@/lib/types';

// Helper object (no change)
const eventTypeColors: Record<EventType, string> = {
  academic: 'text-blue-600',
  social: 'text-green-600',
  sports: 'text-purple-600',
  career: 'text-orange-600',
};

export default function EventCard({ event }: { event: AppEvent }) {
  const colorClass = eventTypeColors[event.type] || 'text-gray-600';

  return (
    // Wrap the entire card in a Link component
    <Link
      href={`/events/${event.id}`}
      className="block transition-opacity hover:opacity-75"
    >
      <div className="rounded-lg border border-gray-200 p-4">
        <span className={`text-xs font-medium ${colorClass}`}>
          {event.type.toUpperCase()}
        </span>
        <h3 className="mt-1 font-semibold text-gray-900">{event.title}</h3>
        <p className="mt-1 text-sm text-gray-600">
          {event.date} @ {event.location}
        </p>
      </div>
    </Link>
  );
}