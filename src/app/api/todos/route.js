// Import necessary modules
import { NextResponse } from 'next/server';
import todos from '../../../lib/tododata.js'
// Define the GET function

export async function GET() {
  try {
    return NextResponse.json({ todos });
  } catch (error) {
    console.error('Error fetching characters:', error);
    return NextResponse.error('Failed to fetch characters', { status: 500 });
  }
}
  