// components/RoomResultCard.tsx
import Link from 'next/link';
import type { CampusRoom } from '@/lib/types';

export default function RoomResultCard({ room }: { room: CampusRoom }) {
  return (
    <Link
      href={`/search/${room.id}`}
      className="block rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50"
    >
      <div className="flex items-center justify-between">
        <span className="font-medium text-gray-900">{room.name}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
      <p className="text-sm text-gray-500">{room.building}</p>
    </Link>
  );
}