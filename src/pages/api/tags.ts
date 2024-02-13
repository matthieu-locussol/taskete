import { NextRequest } from 'next/server';
import type { Tag } from '../../store/TagStore';
import { prisma } from '../../utils/prisma';

export const config = {
   runtime: 'edge',
};

export interface TagsResults {
   tags: Tag[];
}

export default async function handler(req: NextRequest) {
   const { searchParams } = new URL(req.url);
   const sub = searchParams.get('sub');

   if (sub === null) {
      return new Response(JSON.stringify({ error: 'sub is required' }), {
         status: 400,
      });
   }

   const tags = await prisma.tag.findMany({
      where: {
         sub,
      },
   });

   return new Response(JSON.stringify({ tags }), {
      status: 200,
   });
}
