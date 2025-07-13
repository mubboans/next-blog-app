import { NextResponse } from 'next/server';
import { db } from '@/db';
import { blogTable } from '@/db/schema';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, body: content, userId, orgId } = body;

    if (!title || !content || !userId || !orgId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const blog = await db.insert(blogTable).values({
      title,
      body: content,
      userId,
      orgId,
    }).returning();

    return NextResponse.json(blog[0]);
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    );
  }
}