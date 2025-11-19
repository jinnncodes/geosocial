'use client';

import { useState } from 'react';
import { dummyUsers } from '@/lib/dummyusers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin } from 'lucide-react';
import dynamic from 'next/dynamic';

const GeoSocialMap = dynamic(() => import('@/components/geo-social-map'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-muted animate-pulse rounded-lg" />,
});


export default function Home() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleUserChange = (userId: string) => {
    setSelectedUserId(Number(userId));
  };

  const selectedUser = dummyUsers.find(u => u.id === selectedUserId);

  return (
    <main className="flex h-screen flex-col items-center justify-center p-4 md:p-8 bg-background">
      <div className="w-full max-w-6xl h-[90vh] max-h-[800px] flex flex-col md:flex-row gap-4">
        <aside className="w-full md:w-80 lg:w-96 flex-shrink-0">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <MapPin className="text-primary" />
                </div>
                Geo Social
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6 flex-grow">
              <p className="text-muted-foreground">Select a user to view their location on the map.</p>
              <div>
                <label htmlFor="user-select" className="text-sm font-medium text-muted-foreground">Users</label>
                <Select onValueChange={handleUserChange} value={selectedUserId?.toString() ?? ""}>
                  <SelectTrigger id="user-select">
                    <SelectValue placeholder="Select a user" />
                  </SelectTrigger>
                  <SelectContent>
                    {dummyUsers.map((user) => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {selectedUser && (
                <Card className="bg-secondary/50">
                  <CardContent className="p-4 text-sm">
                    <p className="font-semibold">{selectedUser.name}'s Location</p>
                    <p className="text-muted-foreground">Latitude: {selectedUser.location.lat.toFixed(4)}</p>
                    <p className="text-muted-foreground">Longitude: {selectedUser.location.lng.toFixed(4)}</p>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </aside>
        <section className="flex-grow h-full min-h-[400px] md:min-h-0">
          <Card className="h-full overflow-hidden shadow-lg">
            <GeoSocialMap users={dummyUsers} selectedUserId={selectedUserId} />
          </Card>
        </section>
      </div>
    </main>
  );
}
