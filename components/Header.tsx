// components/Header.tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image'; // <-- 1. Import Image component

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

  // Define our main navigation pages
  const topLevelPaths = ['/', '/events', '/study', '/search', '/bookmarks'];
  const isTopLevelPage = topLevelPaths.includes(pathname);
  
  // Determine if we should show the Logo or a Text Title
  const showLogo = isTopLevelPage;
  const subPageTitle = getPageTitle(pathname);

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

      {/* --- CENTERED CONTENT (Logo or Title) --- */}
      <div className="flex items-center justify-center">
        {showLogo ? (
          // 2. Display Logo on main pages
          <Image 
            src="/novaway-logo.png" 
            alt="NovaWay" 
            width={120} // Adjust based on your logo's aspect ratio
            height={40} 
            className="h-8 w-auto object-contain" 
            priority
          />
        ) : (
          // 3. Display Text on sub-pages
          <span className="text-base font-semibold text-gray-900">
            {subPageTitle}
          </span>
        )}
      </div>

      {/* --- RIGHT SIDE --- */}
      {/* Empty div to keep center alignment perfect */}
      <div className="w-20" />
    </header>
  );
}