import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const examplesWork = await prisma.examplesOurWork.findMany({
      orderBy: {
        created_at: 'desc'
      }
    })

    return NextResponse.json(examplesWork)
  } catch (error) {
    console.error('Error fetching examples work:', error)
    return NextResponse.json(
      { error: 'Failed to fetch examples work' },
      { status: 500 }
    )
  }
}
