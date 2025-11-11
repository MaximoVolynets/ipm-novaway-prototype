// app/study/page.tsx
import { mockStudySpaces } from '@/lib/data';
import StudySpaceCard from '@/components/StudySpaceCard';

export default function StudyPage() {
  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-900">Study Spaces</h1>
        <p className="mt-1 text-gray-600">
          Find an available study area with low occupancy.
        </p>
      </div>

      {/* List of Study Spaces */}
      <div className="flex flex-col gap-3 px-4 pb-8">
        {/* We map over the mockStudySpaces data */}
        {mockStudySpaces.map((space) => (
          <StudySpaceCard key={space.id} space={space} />
        ))}
      </div>
    </div>
  );
}