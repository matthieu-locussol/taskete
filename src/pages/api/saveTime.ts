import { NextRequest } from 'next/server';
import { prisma } from '../../utils/prisma';

export const config = {
   runtime: 'edge',
};

export default async function handler(req: NextRequest) {
   const { searchParams } = new URL(req.url);
   const sub = searchParams.get('sub');
   const id = searchParams.get('id');
   const seconds = searchParams.get('seconds');

   if (id === null || sub === null || seconds === null) {
      return new Response(JSON.stringify({ error: 'id, sub and completed are required' }), {
         status: 400,
      });
   }

   await prisma.timeEntry.create({
      data: {
         sub,
         seconds: parseInt(seconds, 10),
         task: {
            connect: {
               id: parseInt(id, 10),
            },
         },
      },
   });

   return new Response(JSON.stringify({}), {
      status: 200,
   });
}
