// app/study/page.tsx
'use client'; // Required for interactivity (useState)

import { useState } from 'react';
import { mockStudySpaces } from '@/lib/data';
import StudySpaceCard from '@/components/StudySpaceCard';

// 1. Helper function to determine the level (Must match logic in StudySpaceCard)
function getOccupancyLevel(occupation: number, capacity: number) {
  const percentage = (occupation / capacity) * 100;
  if (percentage < 33) return 'Quiet';
  if (percentage < 66) return 'Moderate';
  return 'Crowded';
}

const filterOptions = ['All', 'Quiet', 'Moderate', 'Crowded'];

export default function StudyPage() {
  // 2. State to track the active filter
  const [activeFilter, setActiveFilter] = useState('All');

  // 3. Filter logic
  const filteredSpaces = mockStudySpaces.filter((space) => {
    if (activeFilter === 'All') return true;
    const level = getOccupancyLevel(space.occupation, space.capacity);
    return level === activeFilter;
  });

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-900">Study Spaces</h1>
        <p className="mt-1 text-gray-600">
          Find an available study area with low occupancy.
        </p>
      </div>

      {/* 4. Filter Buttons (New Feature) */}
      <div className="flex gap-2 overflow-x-auto px-4 pb-4 no-scrollbar">
        {filterOptions.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`flex-shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeFilter === filter
                ? 'bg-blue-600 text-white shadow-md' // Active State
                : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50' // Inactive State
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* List of Study Spaces */}
      <div className="flex flex-col gap-3 px-4 pb-8">
        {filteredSpaces.length > 0 ? (
          filteredSpaces.map((space) => (
            <StudySpaceCard key={space.id} space={space} />
          ))
        ) : (
          // Fallback if no rooms match the filter
          <div className="py-8 text-center text-gray-500">
            <p>No study spaces found matching "{activeFilter}".</p>
            <button 
              onClick={() => setActiveFilter('All')}
              className="mt-2 text-blue-600 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}