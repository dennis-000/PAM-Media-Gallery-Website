import { NextResponse } from 'next/server';
import { persistentDb } from '@/lib/db/persistent-db';

export async function GET() {
  try {
    const data = persistentDb.getStoreData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch store data' }, { status: 500 });
  }
}
