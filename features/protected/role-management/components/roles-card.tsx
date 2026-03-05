'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, User, Shield, BarChart3, Settings } from 'lucide-react';

type Role = {
  name: string;
  description: string;
  icon: React.ReactNode;
};

const roles: Role[] = [
  {
    name: 'Admin',
    description: 'Can do everything.',
    icon: <User className="h-10 w-10 text-muted-foreground" />,
  },
  {
    name: 'Moderator',
    description: 'Can manage content & users.',
    icon: <Shield className="h-10 w-10 text-muted-foreground" />,
  },
  {
    name: 'Analyst',
    description: 'Can view reports and data.',
    icon: <BarChart3 className="h-10 w-10 text-muted-foreground" />,
  },
  {
    name: 'Community Manager',
    description: 'Engage users & moderate forums.',
    icon: <Settings className="h-10 w-10 text-muted-foreground" />,
  },
];

export default function RoleCards() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-3xl">
      {roles.map((role) => (
        <Card key={role.name} className="relative hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-col items-center text-center space-y-2">
            {role.icon}
            <CardTitle>{role.name}</CardTitle>
            <CardDescription>{role.description}</CardDescription>
          </CardHeader>

          <CardContent className="flex justify-center gap-3 pb-6">
            <Button size="icon" variant="secondary">
              <Pencil className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline">
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
