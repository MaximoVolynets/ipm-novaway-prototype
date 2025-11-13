// components/MapDisplay.tsx
'use client';
/// <reference types="@types/google.maps" />
import React, { useMemo } from 'react';
import { GoogleMap, useJsApiLoader, DirectionsService, DirectionsRenderer, Marker } from '@react-google-maps/api';

const containerStyle = { width: '100%', height: '400px' };
const libraries: ('geometry')[] = ['geometry'];

type MapDisplayProps = {
  center: { lat: number; lng: number };
  navStarted: boolean;
};

// Mock user starting location (You would use navigator.geolocation for the real start)
const MOCK_START_LOCATION = { lat: 38.661308, lng: -9.203269 }; 

export function MapDisplay({ center, navStarted }: MapDisplayProps) {
  const [directions, setDirections] = React.useState<google.maps.DirectionsResult | null>(null);
  const [directionsRequested, setDirectionsRequested] = React.useState(false);

  // 1. API Loader
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: libraries,
  });

  // Reset directions when navStarted changes
  React.useEffect(() => {
    if (navStarted) {
      setDirections(null);
      setDirectionsRequested(false);
    }
  }, [navStarted]);

  // 2. Directions Request Handler
  const directionsCallback = React.useCallback((response: google.maps.DirectionsResult | null) => {
    if (response !== null) {
      const responseWithStatus = response as any;
      if (responseWithStatus.status === 'OK') {
        setDirections(response);
        setDirectionsRequested(true);
      } else {
        console.error('Directions request failed due to ' + responseWithStatus.status);
        setDirectionsRequested(true);
      }
    }
  }, []);

  // 3. Render Logic
  if (!isLoaded) {
    return <div style={containerStyle} className="flex items-center justify-center bg-gray-100">Map Loading...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={16}
      options={{
        zoomControl: true,
        gestureHandling: "greedy",
        fullscreenControl: false,
        mapTypeControl: false
      }}
    >
      
      {/* 4. DIRECTIONS SERVICE: Calculates the route when navStarted is true */}
      {navStarted && !directionsRequested && (
        <DirectionsService
          options={{
            destination: center,
            origin: MOCK_START_LOCATION,
            travelMode: google.maps.TravelMode.WALKING,
          }}
          callback={directionsCallback}
        />
      )}

      {/* 5. DIRECTIONS RENDERER: Draws the calculated route on the map */}
      {directions && navStarted && (
        <DirectionsRenderer
          directions={directions}
          options={{
            polylineOptions: { strokeColor: '#1d4ed8', strokeWeight: 6 },
            suppressMarkers: false,
            suppressBicyclingLayer: true,
          }}
        />
      )}
      
      {/* Show destination marker only when not in navigation mode */}
      {!navStarted && <Marker position={center} title="Room Location" />}
      
    </GoogleMap>
  );
}