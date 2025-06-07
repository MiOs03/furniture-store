import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const productsDir = path.join(process.cwd(), 'public', 'products');
    const files = await fs.readdir(productsDir);
    const jsonFiles = files.filter(f => f.endsWith('.json'));
    return NextResponse.json(jsonFiles, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to list product files', details: String(err) }, { status: 500 });
  }
} 