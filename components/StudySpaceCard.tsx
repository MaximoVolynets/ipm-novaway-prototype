// components/StudySpaceCard.tsx
import Link from 'next/link'; // <-- Import Link
import type { StudySpace } from '@/lib/types';

// Helper to determine the "crowd level" and its color
function getOccupancyInfo(occupation: number, capacity: number) {
  const percentage = (occupation / capacity) * 100;

  if (percentage < 33) {
    return {
      level: 'Quiet',
      color: 'bg-green-500',
      textColor: 'text-green-700',
    };
  }
  if (percentage < 66) {
    return {
      level: 'Moderate',
      color: 'bg-yellow-500',
      textColor: 'text-yellow-700',
    };
  }
  return {
    level: 'Crowded',
    color: 'bg-red-500',
    textColor: 'text-red-700',
  };
}

export default function StudySpaceCard({ space }: { space: StudySpace }) {
  const { level, color, textColor } = getOccupancyInfo(
    space.occupation,
    space.capacity
  );
  const occupancyPercentage = (space.occupation / space.capacity) * 100;

  return (
    <div className="rounded-lg border border-gray-200 p-4">
      {/* Top section: Name and Building */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{space.name}</h3>
        <span className="text-sm text-gray-500">{space.building}</span>
      </div>

      {/* Occupancy Info (no change) */}
      <div className="mt-3">
        <div className="flex items-center justify-between text-sm">
          <span className={`font-medium ${textColor}`}>{level}</span>
          <span className="font-medium text-gray-700">
            {space.occupation} / {space.capacity}
          </span>
        </div>
        <div className="mt-1.5 h-2 w-full rounded-full bg-gray-200">
          <div
            className={`h-2 rounded-full ${color}`}
            style={{ width: `${occupancyPercentage}%` }}
          />
        </div>
      </div>

      {/* --- THIS IS THE CHANGE --- */}
      {/* It's now a Link pointing to the search detail page */}
      <Link
        href={`/search/${space.roomId}`}
        className="mt-4 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
      >
        Get Directions
      </Link>
    </div>
  );
}