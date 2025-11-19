export type User = {
  id: number;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
};

export const dummyUsers: User[] = [
  { id: 1, name: 'Alice (London)', location: { lat: 51.505, lng: -0.09 } },
  { id: 2, name: 'Bob (Paris)', location: { lat: 48.8566, lng: 2.3522 } },
  { id: 3, name: 'Charlie (New York)', location: { lat: 40.7128, lng: -74.0060 } },
  { id: 4, name: 'Diana (Tokyo)', location: { lat: 35.6895, lng: 139.6917 } },
  { id: 5, name: 'Eve (Sydney)', location: { lat: -33.8688, lng: 151.2093 } },
];
