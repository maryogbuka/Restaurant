import { NextResponse } from 'next/server';

// Simple storage (replace with database later)
let allRatings = {};

export async function POST(request) {
  try {
    const { itemId, userId, rating, itemName } = await request.json();
    
    if (!allRatings[itemId]) {
      allRatings[itemId] = [];
    }

    // Remove existing rating from same user
    allRatings[itemId] = allRatings[itemId].filter(r => r.userId !== userId);
    
    // Add new rating
    allRatings[itemId].push({
      userId,
      rating,
      timestamp: new Date().toISOString(),
      itemName
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ success: true, ratings: allRatings });
}