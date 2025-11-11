import type { AppEvent, CampusRoom, StudySpace } from './types';

// Mock data for Task 1: Find a Classroom
export const mockRooms: CampusRoom[] = [
  {
    id: 'r1',
    name: 'Room 101',
    building: 'Building I',
    department: 'Physics',
  },
  {
    id: 'r2',
    name: 'Room 102',
    building: 'Building I',
    department: 'Physics',
  },
  {
    id: 'r6',
    name: 'Room 103',
    building: 'Building I',
    department: 'Mathematics',
  },
  {
    id: 'r3',
    name: 'Room 201',
    building: 'Building II',
    department: 'Computer Science',
  },
  {
    id: 'r4',
    name: 'Room 210',
    building: 'Building II',
    department: 'Computer Science',
  },
  {
    id: 'r5',
    name: 'Room 301',
    building: 'Building III',
    department: 'Chemistry',
  },
  {
    id: 'r7',
    name: 'Room 127',
    building: 'Building I',
    department: 'Biology',
  }
];

// Mock data for Task 2: Discover Upcoming Events
export const mockEvents: AppEvent[] = [
  {
    id: 'e1',
    title: 'Mental Health FCT',
    type: 'social',
    date: 'Oct 30, 14:00',
    location: 'NOVA FCT Library',
    description:
      'Explore practical strategies for managing stress, maintaining balance during academic life, and promoting emotional resilience.',
    bookmarked: true,
  },
  {
    id: 'e2',
    title: 'Job Fest',
    type: 'career',
    date: 'Oct 31, 10:00 - 18:00',
    location: 'Main Hall',
    description: 'Connect with top companies and explore career opportunities.',
  },
  {
    id: 'e3',
    title: 'Data Visualization Workshop',
    type: 'academic',
    date: 'Today, 14:00',
    location: 'Library',
    description: 'Learn the fundamentals of data visualization with D3.js.',
  },
  {
    id: 'e4',
    title: 'Sunset Halloween',
    type: 'social',
    date: 'Oct 31, 18:00',
    location: 'Ed. VII',
    description: 'Join us for a spooky evening with music and prizes.',
  },
  {
    id: 'e5',
    title: 'Futsal Tournament',
    type: 'sports',
    date: 'Nov 2, 16:00',
    location: 'NOVA Sports Club',
    description: 'Sign up your team for the annual futsal tournament.',
    bookmarked: true,
  },
    {
    id: 'e6',
    title: 'AI in Healthcare Seminar',
    type: 'academic',
    date: 'Nov 3, 11:00',
    location: 'Science Building',
    description: 'Discuss the latest advancements in AI applications in healthcare.',
  },

];

// Mock data for Task 3: Check Study Room Availability
export const mockStudySpaces: StudySpace[] = [
  {
    id: 's1',
    name: 'Room 101',
    building: 'Building I',
    capacity: 30,
    occupation: 2, // Low occupation
    roomId: 'r1',
  },
  {
    id: 's2',
    name: 'Room 103',
    building: 'Building I',
    capacity: 50,
    occupation: 15, // Medium occupation
    roomId: 'r6',
  },
  {
    id: 's3',
    name: 'Room 201',
    building: 'Building II',
    capacity: 50,
    occupation: 48, // Crowded
    roomId: 'r3',
  },
  {
    id: 's4',
    name: 'Room 127',
    building: 'Building I',
    capacity: 60,
    occupation: 27, // Medium occupation
    roomId: 'r7',
  },
];