import { NextRequest } from 'next/server';
import { Tag } from '../../store/TagStore';
import { Task } from '../../store/TaskStore';
import { prisma } from '../../utils/prisma';

export const config = {
   runtime: 'edge',
};

export interface TasksResults {
   tasks: (Task & {
      tags: Tag[];
   })[];
}

export default async function handler(req: NextRequest) {
   const { searchParams } = new URL(req.url);
   const sub = searchParams.get('sub');

   if (sub === null) {
      return new Response(JSON.stringify({ error: 'sub is required' }), {
         status: 400,
      });
   }

   const tasks = await prisma.task.findMany({
      where: {
         sub,
         date: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
            lte: new Date(new Date().setHours(23, 59, 59, 999)),
         },
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
         tasks: tasks.map((task) => ({
            ...task,
            date: task.date.toISOString(),
         })),
      }),
      {
         status: 200,
      },
   );
}
