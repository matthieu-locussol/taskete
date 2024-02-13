import { Tag, Task } from '@prisma/client/edge';
import { NextRequest } from 'next/server';
import { prisma } from '../../utils/prisma';

export const config = {
   runtime: 'edge',
};

export interface UpdateTaskResults {
   task: Omit<Task, 'date'> & {
      date: string;
      tags: Tag[];
   };
}

export default async function handler(req: NextRequest) {
   const { searchParams } = new URL(req.url);
   const sub = searchParams.get('sub');
   const id = searchParams.get('id');
   const completed = searchParams.get('completed');

   if (id === null || sub === null || completed === null) {
      return new Response(JSON.stringify({ error: 'id, sub and completed are required' }), {
         status: 400,
      });
   }

   const task = await prisma.task.update({
      data: {
         completed: completed === 'true',
      },
      where: {
         id: parseInt(id, 10),
         sub,
      },
      select: {
         id: true,
         title: true,
         completed: true,
         date: true,
         tags: {
            select: {
               id: true,
               name: true,
            },
         },
      },
   });

   return new Response(
      JSON.stringify({
         task: {
            ...task,
            date: task.date.toISOString(),
         },
      }),
      {
         status: 200,
      },
   );
}
