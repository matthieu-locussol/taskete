import { Tag } from '@prisma/client/edge';
import { NextRequest } from 'next/server';
import { prisma } from '../../utils/prisma';

export const config = {
   runtime: 'edge',
};

export interface CreateTagResults {
   tag: Tag;
}

export default async function handler(req: NextRequest) {
   const { searchParams } = new URL(req.url);
   const sub = searchParams.get('sub');
   const name = searchParams.get('name');

   if (name === null || sub === null) {
      return new Response(JSON.stringify({ error: 'name and sub are required' }), {
         status: 400,
      });
   }

   const tag = await prisma.tag.create({
      data: {
         name,
         sub,
      },
   });

   return new Response(JSON.stringify({ tag }), {
      status: 200,
   });
}
