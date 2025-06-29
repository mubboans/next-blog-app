'use server'

import { blogTable, createBlog } from '@/db/schema';
import { db } from '@/db';


export async function createBlogAction(createBlog: createBlog) {
    try {
      const result =  await db.insert(blogTable).values(createBlog);
      return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
  
}

export async function getAllBlogAction() {
    try {
        const result = await db.select().from(blogTable);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
