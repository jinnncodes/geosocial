export type User = {
  id: number;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
};

export const dummyUsers: User[] = [
  { id: 1, name: 'Alice', location: { lat: 25.3461, lng: 55.3812 } },
  { id: 2, name: 'Bob', location: { lat: 25.3418, lng: 55.3725 } },   
  { id: 3, name: 'Charlie', location: { lat: 25.3380, lng: 55.3870 } }, 
  { id: 4, name: 'Diana', location: { lat: 25.3380, lng: 55.3645 } },  
  { id: 5, name: 'Eve', location: { lat: 25.3350, lng: 55.3760 } },    
  { id: 6, name: 'Frank', location: { lat: 25.3425, lng: 55.3800 } },  
  { id: 7, name: 'Grace', location: { lat: 25.3365, lng: 55.3690 } },  
  { id: 8, name: 'Hank', location: { lat: 25.3440, lng: 55.3735 } },   
  { id: 9, name: 'Ivy', location: { lat: 25.3475, lng: 55.3685 } },    
  { id: 10, name: 'Jack', location: { lat: 25.3395, lng: 55.3820 } } 
];
