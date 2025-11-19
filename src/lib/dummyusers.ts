export type User = {
  id: number;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
};

export const dummyUsers: User[] = [
  { id: 1, name: 'Alice', location: { lat: 25.345, lng: 55.375 } },
  { id: 2, name: 'Bob', location: { lat: 25.320, lng: 55.360 } },
  { id: 3, name: 'Charlie', location: { lat: 25.310, lng: 55.390 } },
  { id: 4, name: 'Diana', location: { lat: 25.355, lng: 55.340 } },
  { id: 5, name: 'Eve', location: { lat: 25.330, lng: 55.370 } },
];
