'use server'

import { blogTable, createBlog } from '@/db/schema';
import { db } from '@/db';
import { eq } from 'drizzle-orm';


export async function createBlogAction(createBlog: createBlog) {
    try {
        console.log(createBlog,'createBlog 9');
      const result = await db.insert(blogTable).values(createBlog);
      // Return a serialized response instead of the raw database result
      return { success: true, message: 'Blog created successfully' };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getAllBlogAction() {
    try {
        const result = await db.select().from(blogTable);
        // Serialize the data to ensure it can be passed to Client Components
        return JSON.parse(JSON.stringify(result));
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteBlogAction(id: number) {
    try {
        await db.delete(blogTable).where(eq(blogTable.id, id));
        return { success: true, message: 'Blog deleted successfully' };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function updateBlogAction(id: number, updateData: createBlog) {
    try {
        await db.update(blogTable).set(updateData).where(eq(blogTable.id, id));
        return { success: true, message: 'Blog updated successfully' };
    } catch (error) {
        console.log(error);
        throw error;
    }
}
