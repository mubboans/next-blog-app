"use client";
import Navbar from "@/app/components/nav";
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
import { createBlogAction, getAllBlogAction } from "./action";

export default function OrganizationList() {
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  async function saveBlog() {
    console.log(title, '-->', body, 'Check Title N Body');
    await createBlogAction({
      title,
      body,
      orgId: '1',
      userId: '1',
    })
  }
  React.useEffect(() => {
    return ()=>{
      getAllBlogAction().then((res)=>{
        console.log(res, 'res');
       })
    }
  }, [])
  return (
    <main>
      <Navbar />
      <div className="flex justify-around items-center mt-10">
        <h3>Organization List</h3>
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button variant="outline">Create Blog</Button>
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
                    value={title}
                    placeholder="Please enter blog title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="body">Body</Label>
                  <Textarea
                    id="body"
                    name="body"
                    value={body}
                    placeholder="Please enter blog body"
                    onChange={(e) => setBody(e.target.value)}
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
                    saveBlog()
                  }}
                >
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </div>
    </main>
  );
}
