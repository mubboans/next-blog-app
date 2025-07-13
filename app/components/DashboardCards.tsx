import { Users, Building2, PenTool } from "lucide-react";
import { getAllBlogAction } from "../(root)/org/[slug]/action";
import AddBlog from "./AddBlog";

export default async function DashboardCards() {
    let allBlog = [];
    try {
        allBlog = await getAllBlogAction();
    } catch (error) {
        console.error('Error fetching blogs:', error);
    }
    return (
      <div className="mt-8 mb-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-4">
              <h3 className="tracking-tight text-sm font-medium">
                Total Users
              </h3>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="pt-2">
              <div className="text-2xl font-bold">246</div>
              <p className="text-xs text-muted-foreground mt-2">
                +20.1% from last month
              </p>
            </div>
          </div>

          <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-4">
              <h3 className="tracking-tight text-sm font-medium">
                Organizations
              </h3>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="pt-2">
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground mt-2">
                +180.1% from last month
              </p>
            </div>
          </div>

          <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-4">
              <h3 className="tracking-tight text-sm font-medium">
                Total Blogs
              </h3>
              <PenTool className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="pt-2">
              <div className="text-2xl font-bold">{allBlog?.length || 0}</div>
              <div className="flex flex-row items-center justify-between space-y-0 pb-4">
                <p className="text-xs text-muted-foreground mt-2">
                  +19% from last month
                </p>
                <AddBlog/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}