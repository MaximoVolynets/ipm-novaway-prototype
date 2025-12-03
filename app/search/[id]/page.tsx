// app/search/[id]/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { mockRooms } from '@/lib/data';
import { MapDisplay } from '@/components/MapDisplay';

export default function RoomDetailPage() {
  const params = useParams();
  const roomId = params.id as string;

  const [navStarted, setNavStarted] = useState(false);

  const room = mockRooms.find((r) => r.id === roomId);

  if (!room || !room.latitude || !room.longitude) {
    return <div className="p-4">Room data incomplete or not found.</div>;
  }
  
  const roomCoordinates = useMemo(() => ({ 
    lat: room.latitude, 
    lng: room.longitude 
  }), [room.latitude, room.longitude]);

  const handleStartNavigation = () => {
    setNavStarted(true);
  };

  const handleStopNavigation = () => {
    setNavStarted(false);
  };
  
  const buttonText = navStarted ? 'Stop Navigation' : 'Start Navigation';
  const buttonHandler = navStarted ? handleStopNavigation : handleStartNavigation;

  return (
    <div className="p-4 pb-8">
      {/* Room Title */}
      <h1 className="text-2xl font-bold">{room.name}</h1>
      <p className="text-lg text-gray-600">{room.building}</p>

      {/* Map Integration */}
      <div className="mt-4 w-full rounded-lg shadow-md overflow-hidden" style={{ zIndex: 10 }}>
        <MapDisplay 
          center={roomCoordinates} 
          navStarted={navStarted} 
        />
      </div>

      {/* Details */}
      <div className="mt-4 rounded-lg border border-gray-200 p-4 bg-white">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Distance</span>
          <span className="font-medium text-gray-900">300 meters</span>
        </div>
        <hr className="my-3 border-gray-100" />
        
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Department</span>
          <span className="font-medium text-gray-900">{room.department}</span>
        </div>

        {/* --- NEW SECTION: INDOOR DIRECTIONS --- */}
        {room.indoorDirections && (
          <>
            <hr className="my-3 border-gray-100" />
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                Indoor Directions
              </span>
              <p className="text-sm text-gray-800 leading-relaxed">
                {room.indoorDirections}
              </p>
            </div>
          </>
        )}
        {/* -------------------------------------- */}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col gap-3">
        <button 
          className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-base font-medium text-white shadow-md hover:bg-blue-700 transition-colors"
          onClick={buttonHandler}
        >
          {buttonText} 
        </button>
        <button className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          See Alternative Route
        </button>
      </div>
    </div>
  );
}