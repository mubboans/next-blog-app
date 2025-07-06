'use client';

import { UserProfile } from "@clerk/nextjs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Bell, Shield, Globe, Keyboard } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="hover:bg-transparent"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-semibold">Settings</h1>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="p-6 w-full overflow-hidden">
            <UserProfile
              appearance={{
                elements: {
                  rootBox: "w-full overflow-hidden",
                  card: "w-full shadow-none p-0",
                  navbar: "hidden",
                  pageScrollBox: "px-0"
                }
              }}
            />
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="p-6">
            <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5" /> Notification Preferences
            </h2>
            <div className="space-y-4">
              {['Email notifications', 'Push notifications', 'Weekly digest', 'Mention alerts'].map((setting) => (
                <div key={setting} className="flex items-center justify-between py-2 border-b">
                  <span>{setting}</span>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="p-6">
            <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5" /> Security Settings
            </h2>
            <div className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="current-password">Current Password</Label>
                <Input type="password" id="current-password" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="new-password">New Password</Label>
                <Input type="password" id="new-password" />
              </div>
              <Button>Update Password</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <Card className="p-6">
              <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Globe className="h-5 w-5" /> Language & Region
              </h2>
              <div className="space-y-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="language">Language</Label>
                  <Input id="language" defaultValue="English" />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input id="timezone" defaultValue="UTC" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Keyboard className="h-5 w-5" /> Editor Settings
              </h2>
              <div className="space-y-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="theme">Editor Theme</Label>
                  <Input id="theme" defaultValue="Light" />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="font-size">Font Size</Label>
                  <Input id="font-size" defaultValue="14px" />
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}