import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { FaUserPlus } from 'react-icons/fa6';
import { RiUserFollowFill } from 'react-icons/ri';
import RoleCards from './components/roles-card';

function RoleManagement() {
  return (
    <div>
      <div className="w-full h-17 bg-[#F5F7FA] text-2xl font-semibold items-center gap-1.5 flex px-2">
        <FaInfoCircle />
        <h1>Role Management</h1>
      </div>
      <div className="py-15 px-8 flex">
        <div className="w-1/2 mx-6">
          <div className="items-center flex gap-0.5">
            <FaUserPlus />
            <h2 className="text-xl font-semibold">Add/Edit Role</h2>
          </div>
          <Card className="w-full max-w-md my-2 bg-[#F5F7FA]">
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label>Role Name</Label>
                    <Input placeholder="e.g., Editor" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Description</Label>
                    <Textarea
                      placeholder="Describe the role's responsibilities"
                      className="min-h-30"
                    />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        <div className="w-1/2 mx-6">
          <div className="items-center flex gap-0.5">
            <RiUserFollowFill />
            <h2 className="text-xl font-semibold">Existing Role</h2>
            <div className="flex min-h-screen items-center justify-center p-8 bg-muted/40">
              <RoleCards />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoleManagement;
