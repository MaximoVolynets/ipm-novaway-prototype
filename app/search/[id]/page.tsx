// app/search/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { mockRooms } from '@/lib/data';

export default function RoomDetailPage() {
  const params = useParams();
  const roomId = params.id as string;

  const room = mockRooms.find((r) => r.id === roomId);

  if (!room) {
    return <div className="p-4">Room not found.</div>;
  }

  return (
    <div className="p-4 pb-8">
      {/* Room Title */}
      <h1 className="text-2xl font-bold">{room.name}</h1>
      <p className="text-lg text-gray-600">{room.building}</p>

      {/* Fake Map Placeholder */}
      <div className="mt-4 aspect-square w-full rounded-lg bg-gray-200">
        {/* This would be an interactive map in a real app */}
        <p className="flex h-full items-center justify-center text-gray-500">
          [Map showing route to {room.name}]
        </p>
      </div>

      {/* Details (from your prototype) */}
      <div className="mt-4 rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Distance</span>
          <span className="font-medium text-gray-900">300 meters</span>
        </div>
        <hr className="my-2" />
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Department</span>
          <span className="font-medium text-gray-900">{room.department}</span>
        </div>
      </div>

      {/* Action Buttons (from your prototype) */}
      <div className="mt-6 flex flex-col gap-3">
        <button className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-base font-medium text-white shadow-md hover:bg-blue-700">
          Start Navigation
        </button>
        <button className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-50">
          See Alternative Route
        </button>
      </div>
    </div>
  );
}