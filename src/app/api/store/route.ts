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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (body) {
      persistentDb.updateStoreData(body);
      return NextResponse.json({ success: true, data: persistentDb.getStoreData() });
    }
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to persist store data' }, { status: 500 });
  }
}
