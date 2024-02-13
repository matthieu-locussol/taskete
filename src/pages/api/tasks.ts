import { NextRequest } from 'next/server';
import { Task } from '../../store/TaskStore';
import { prisma } from '../../utils/prisma';

export const config = {
   runtime: 'edge',
};

export interface TasksResults {
   tasks: Task[];
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
      },
   });

   return new Response(JSON.stringify({ tasks }), {
      status: 200,
   });
}
