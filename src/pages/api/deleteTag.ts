import { Tag } from '@prisma/client/edge';
import { NextRequest } from 'next/server';
import { prisma } from '../../utils/prisma';

export const config = {
   runtime: 'edge',
};

export interface DeleteTagResults {
   tag: Tag;
}

export default async function handler(req: NextRequest) {
   const { searchParams } = new URL(req.url);
   const id = searchParams.get('id');
   const sub = searchParams.get('sub');
   const name = searchParams.get('name');

   if (id === null || name === null || sub === null) {
      return new Response(JSON.stringify({ error: 'id, name and sub are required' }), {
         status: 400,
      });
   }

   const idInt = parseInt(id, 10);

   const tag = await prisma.tag.delete({
      where: {
         id: idInt,
         name,
         sub,
      },
   });

   return new Response(JSON.stringify({ tag }), {
      status: 200,
   });
}
