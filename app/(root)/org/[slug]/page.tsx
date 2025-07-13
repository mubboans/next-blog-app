"use client";
import { Button } from "@/components/ui/button";
import * as React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createBlogAction, deleteBlogAction, getBlogbyId, updateBlogAction } from "./action";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, User, Calendar, Edit, Trash } from "lucide-react";
import { selectBlog, createBlog } from "@/db/schema";
import { useParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";


const cleanText = (text: string, maxLength = 100) => {
  if (!text) return '';
  // Remove tabs, newlines, and extra spaces
  const cleaned = text.replace(/[\t\n\r]/g, ' ').replace(/\s+/g, ' ').trim();
  return cleaned.length > maxLength ? cleaned.substring(0, maxLength) + '...' : cleaned;
};

// Helper function to generate excerpt from body
const generateExcerpt = (body: string, maxLength = 150) => {
  return cleanText(body, maxLength);
};

export default function OrganizationList() {
    const params = useParams();
    const slug = params?.slug as string;
  const [blog, setBlog] = React.useState<selectBlog | null>(null);
  const [blogs, setBlogs] = React.useState<selectBlog[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const { userId, orgId, orgSlug } = useAuth();
  const fetchBlogs = async () => {
    try {
        const result = await getBlogbyId(orgId as string);
      setBlogs(result);
      console.log('fetch new blogs');
      
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };
  async function saveBlog() {
    console.log(blog, '-->', 'Check Title N Body');
    setLoading(true);
    try {
      // Use createBlog type for the insert operation (without id)
      if(blog?.id){
        const bdata = {
            title: blog?.title || "",
            body: blog?.body || "",
            orgId: orgId as string,
            userId: userId as string,
        }
        await updateBlogAction(blog.id, bdata);
      } else {
      const blogData: createBlog = {
        title: blog?.title || "",
        body: blog?.body || "",
        orgId: orgId as string,
        userId: "1",
      };
      await createBlogAction(blogData);
      // Refresh blogs after creating a new one
      const updatedBlogs = await getBlogbyId(orgId as string);
      setBlogs(updatedBlogs);
    }
    setBlog(null);
    setIsDialogOpen(false);
    fetchBlogs();
    } catch (error) {
      console.error('Error creating blog:', error);
    } finally {
      setLoading(false);
    }
  }

  const openEditDialog = async (blogItem: selectBlog) => {
    try {
        setBlog(blogItem);
        setIsDialogOpen(true);
    } catch (error) {
        console.error('Error updating blog:', error);
    }
   
  }

  const openCreateDialog = () => {
    setBlog({ id: 0, title: '', body: '', orgId: '1', userId: '1' });
    setIsDialogOpen(true);
  }

  const openDeleteDialog = async (blog: selectBlog) => {
    console.log(blog, '-->', 'Open Delete Dialog');
    await deleteBlogAction(blog.id);
  }

  React.useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <main>
      {/* <Navbar /> */}
      <div className="flex justify-around items-center mt-10">
        <h3>Organization List</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <form>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={openCreateDialog}>
                Create Blog
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Blog</DialogTitle>
                <DialogDescription>
                  Add your blog here. Click save when you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={blog?.title || ""}
                    placeholder="Please enter blog title"
                    onChange={(e) =>
                      setBlog((prev) =>
                        prev
                          ? { ...prev, title: e.target.value }
                          : {
                              id: 0,
                              title: e.target.value,
                              body: "",
                              orgId: "",
                              userId: "",
                            }
                      )
                    }
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="body">Body</Label>
                  <Textarea
                    id="body"
                    name="body"
                    value={blog?.body || ""}
                    placeholder="Please enter blog body"
                    onChange={(e) =>
                      setBlog((prev) =>
                        prev
                          ? { ...prev, body: e.target.value }
                          : {
                              id: 0,
                              title: "",
                              body: e.target.value,
                              orgId: "",
                              userId: "",
                            }
                      )
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    saveBlog();
                  }}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </div>

      {/* Display blogs */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Latest Blog Posts
          </h1>
          <p className="text-muted-foreground mt-2">
            Discover our latest articles and insights
          </p>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {blogs.map((blog: selectBlog) => (
            <Card
              key={blog.id}
              className="flex flex-col hover:shadow-lg transition-shadow duration-200 border-border/50"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    Blog #{blog.id}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Building className="h-3 w-3" />
                    <span>{orgSlug}</span>
                  </div>
                </div>

                <CardTitle className="text-lg leading-tight line-clamp-2 min-h-[3.5rem]">
                  {cleanText(blog.title, 60)}
                </CardTitle>

                <CardDescription className="flex items-center gap-2 text-xs">
                  <User className="h-3 w-3" />
                  <span>User {slug}</span>
                  <Calendar className="h-3 w-3 ml-2" />
                  <span>Recent</span>
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-grow pb-4">
                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                  {generateExcerpt(blog.body)}
                </p>
              </CardContent>

              <CardFooter className="pt-0">
                <div className="flex gap-2 w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    onClick={() => openEditDialog(blog)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => openDeleteDialog(blog)}
                  >
                    <Trash className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {blogs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No blog posts found</h3>
              <p className="text-sm">Check back later for new content.</p>
            </div>
          </div>
        )}

        {/* Load More Button (if needed) */}
        <div className="text-center mt-8">
          <Button variant="outline">Load More Posts</Button>
        </div>
      </div>
    </main>
  );
}
