// app/search/[id]/page.tsx
'use client';

import { useState, useMemo } from 'react'; // Import useState and useMemo
import { useParams } from 'next/navigation';
import { mockRooms } from '@/lib/data'; // Ensure this data includes lat/lng
import { MapDisplay } from '@/components/MapDisplay'; // NEW IMPORT

export default function RoomDetailPage() {
  const params = useParams();
  const roomId = params.id as string;

  // 1. STATE LOGIC: State for controlling navigation view
  const [navStarted, setNavStarted] = useState(false);

  const room = mockRooms.find((r) => r.id === roomId);

  if (!room || !room.latitude || !room.longitude) {
    return <div className="p-4">Room data incomplete or not found.</div>;
  }
  
  // 2. COORDINATE PREPARATION
  const roomCoordinates = useMemo(() => ({ 
    lat: room.latitude, 
    lng: room.longitude 
  }), [room.latitude, room.longitude]);

  // 3. HANDLER
  const handleStartNavigation = () => {
    setNavStarted(true);
    // In a real app, you might also trigger geolocation permission here
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

      {/* 4. MAP INTEGRATION */}
      <div className="mt-4 w-full rounded-lg shadow-md overflow-hidden" style={{ zIndex: 10 }}>
        <MapDisplay 
          center={roomCoordinates} 
          navStarted={navStarted} 
        />
      </div>

      {/* Details */}
      <div className="mt-4 rounded-lg border border-gray-200 p-4">
        {/* ... (Details remain the same) ... */}
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Distance</span>
          {/* Note: In a real app, distance would be calculated by the Directions API */}
          <span className="font-medium text-gray-900">300 meters</span>
        </div>
        <hr className="my-2" />
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Department</span>
          <span className="font-medium text-gray-900">{room.department}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col gap-3">
        <button 
          className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-base font-medium text-white shadow-md hover:bg-blue-700"
          onClick={buttonHandler} // Use the new handler
        >
          {buttonText} 
        </button>
        {/* Keep the alternative route button */}
        <button className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-50">
          See Alternative Route
        </button>
      </div>
    </div>
  );
}