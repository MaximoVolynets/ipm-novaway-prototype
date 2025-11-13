// components/Header.tsx
'use client';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

// Helper function to get a clean title for sub-pages
function getPageTitle(pathname: string): string {
  if (pathname.startsWith('/events/')) {
    return 'Event Details';
  }
  if (pathname.startsWith('/search/')) {
    return 'Room Details';
  }
  // Default for any other sub-page
  return 'Back';
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  // 1. Define our main navigation pages
  const topLevelPaths = ['/', '/events', '/study', '/search', '/bookmarks'];
  const isTopLevelPage = topLevelPaths.includes(pathname);
  const title = isTopLevelPage ? 'NovaWay' : getPageTitle(pathname);

  return (
    <header className="sticky top-0 z-10 flex h-14 w-full items-center justify-between border-b border-gray-200 bg-white px-4">
      {/* --- LEFT SIDE --- */}
      <div className="w-20">
        {!isTopLevelPage && (
          <button
            onClick={() => router.back()}
            className="-ml-2 flex items-center gap-1 rounded-md p-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back
          </button>
        )}
      </div>

      {/* --- CENTERED TITLE/LOGO --- */}
      {isTopLevelPage ? (
        <Image
          src="/novaway-logo.png"
          alt="NovaWay"
          width={300}
          height={80}
          priority
          className="h-13 w-auto"
        />
      ) : (
        <span className="text-base font-semibold text-gray-900">{title}</span>
      )}

      {/* --- RIGHT SIDE --- */}
      <div className="w-20 text-right">
        <span className="text-sm font-medium text-gray-700">10:55</span>
      </div>
    </header>
  );
}