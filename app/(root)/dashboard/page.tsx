import DashboardCards from "@/app/components/DashboardCards";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Wallet, Users } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <DashboardCards />
      
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
              <div className="space-y-4">
                <Button className="w-full flex items-center gap-2">
                  <Users className="h-4 w-4" /> Invite Team Members
                </Button>
                <Button className="w-full flex items-center gap-2" variant="outline">
                  <Wallet className="h-4 w-4" /> View Billing
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {['Blog post published', 'New comment received', 'User settings updated'].map((activity) => (
                  <div key={activity} className="flex items-center justify-between py-2 border-b">
                    <span>{activity}</span>
                    <span className="text-sm text-muted-foreground">2h ago</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Traffic Overview</h3>
            <div className="h-[300px] flex items-center justify-center border rounded-lg">
              <LineChart className="h-8 w-8 text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Analytics Chart Placeholder</span>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Generate Report</h3>
            <div className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="report-type">Report Type</Label>
                <Input id="report-type" placeholder="Select report type" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="date-range">Date Range</Label>
                <Input id="date-range" placeholder="Select date range" />
              </div>
              <Button className="w-full">
                Generate Report
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}