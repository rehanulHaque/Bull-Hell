import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const product = await prisma.product.findMany();
        return NextResponse.json(product || [], {status: 200})
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}