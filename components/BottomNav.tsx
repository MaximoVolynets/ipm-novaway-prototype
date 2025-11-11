// components/BottomNav.tsx
'use client'; // This is required to use hooks like usePathname

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// ... (Icon component and NavItem component - NO CHANGE) ...
function Icon({ d, active }: { d: string; active?: boolean }) {
  const iconColor = active ? 'text-blue-600' : 'text-gray-500';
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`h-6 w-6 ${iconColor}`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

function NavItem({
  href,
  label,
  iconPath,
}: {
  href: string;
  label: string;
  iconPath: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const textColor = isActive ? 'text-blue-600' : 'text-gray-500';

  return (
    <Link
      href={href}
      className={`flex flex-col items-center gap-1 rounded-lg p-2 ${
        !isActive ? 'hover:bg-gray-100' : ''
      }`}
    >
      <Icon d={iconPath} active={isActive} />
      <span className={`text-xs font-medium ${textColor}`}>{label}</span>
    </Link>
  );
}

// The main BottomNav component
export default function BottomNav() {
  return (
    <nav className="sticky bottom-0 z-10 flex h-16 w-full items-center justify-around border-t border-gray-200 bg-white">
      <NavItem
        href="/"
        label="Home"
        iconPath="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
      <NavItem
        href="/search"
        label="Search"
        iconPath="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
      <NavItem
        href="/study"
        label="Study"
        iconPath="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25"
      />
      <NavItem
        href="/events"
        label="Events"
        iconPath="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5h18v11.25M5.25 12H18.75M5.25 15.75H18.75M3 7.5l-.75 5.023m0 0L3.75 12M5.25 12l-.75-5.023m0 0L3 7.5"
      />
      {/* --- ADDED THIS NEW ITEM --- */}
      <NavItem
        href="/bookmarks"
        label="Saved"
        iconPath="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H7.5A2.25 2.25 0 005.25 6v13.5l6.75-3.375L18.75 21V6A2.25 2.25 0 0016.5 3.75z"
      />
    </nav>
  );
}