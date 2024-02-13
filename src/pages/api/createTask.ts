import { Tag } from '@prisma/client/edge';
import { NextRequest } from 'next/server';
import { prisma } from '../../utils/prisma';

export const config = {
   runtime: 'edge',
};

export interface CreateTaskResults {
   task: {
      id: number;
      title: string;
      completed: boolean;
      tags: Tag[];
   };
}

export default async function handler(req: NextRequest) {
   const { searchParams } = new URL(req.url);
   const sub = searchParams.get('sub');
   const name = searchParams.get('name');
   const tags = searchParams.get('tags');

   if (name === null || sub === null || tags === null) {
      return new Response(JSON.stringify({ error: 'name, sub and tags are required' }), {
         status: 400,
      });
   }

   const tagsArray: Tag[] = tags.split('#;#').map((json) => JSON.parse(json));

   const task = await prisma.task.create({
      data: {
         title: name,
         sub,
         tags: {
            connect: tagsArray.map(({ id }) => ({ id })),
         },
      },
      select: {
         id: true,
         title: true,
         completed: true,
         tags: {
            select: {
               id: true,
               name: true,
            },
         },
      },
   });

   return new Response(JSON.stringify({ task }), {
      status: 200,
   });
}
