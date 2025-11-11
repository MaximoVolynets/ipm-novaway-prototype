// app/search/page.tsx
'use client';

import { useState } from 'react';
import { mockRooms } from '@/lib/data';
import type { CampusRoom } from '@/lib/types';
import RoomResultCard from '@/components/RoomResultCard';

// Helper function to group rooms by department
function groupRoomsByDepartment(rooms: CampusRoom[]) {
  return rooms.reduce(
    (acc, room) => {
      const dept = room.department || 'Other';
      if (!acc[dept]) {
        acc[dept] = [];
      }
      acc[dept].push(room);
      return acc;
    },
    {} as Record<string, CampusRoom[]>
  );
}

export default function SearchPage() {
  const [query, setQuery] = useState('');

  // Filter logic: checks name, building, and department
  const filteredRooms = mockRooms.filter((room) => {
    const searchTerm = query.toLowerCase();
    return (
      room.name.toLowerCase().includes(searchTerm) ||
      room.building.toLowerCase().includes(searchTerm) ||
      room.department.toLowerCase().includes(searchTerm)
    );
  });

  // Group the filtered results
  const groupedRooms = groupRoomsByDepartment(filteredRooms);

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-900">Find a Classroom</h1>
      </div>

      {/* Search Bar */}
      <div className="sticky top-14 z-10 bg-white p-4 pt-0">
        <div className="relative">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by room, building, or dept..."
            className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Grouped List of Results */}
      <div className="flex flex-col gap-6 px-4 pb-8">
        {Object.entries(groupedRooms).map(([department, rooms]) => (
          <section key={department}>
            <h2 className="mb-2 text-sm font-semibold uppercase text-gray-500">
              {department}
            </h2>
            <div className="flex flex-col gap-2">
              {rooms.map((room) => (
                <RoomResultCard key={room.id} room={room} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}