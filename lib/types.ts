// Defines the category for an event
export type EventType = 'academic' | 'social' | 'sports' | 'career';

// Defines the structure for an Event
export interface AppEvent {
  id: string;
  title: string;
  type: EventType;
  date: string; // Using string for simplicity, e.g., "Today, 14:00"
  location: string;
  description: string;
  bookmarked?: boolean;
}

// Defines the structure for a campus Room (for Task 1)
export interface CampusRoom {
  id: string;
  name: string; // e.g., "Room 102"
  building: string; // e.g., "Building II"
  department: string; // e.g., "Computer Science"
  latitude: number;
  longitude: number;
}

// Defines the structure for a Study Space (for Task 3)
export interface StudySpace {
  id: string;
  name: string; // e.g., "Library Room 101"
  building: string;
  capacity: number;
  occupation: number;
  roomId: string; // Links to CampusRoom id
}
