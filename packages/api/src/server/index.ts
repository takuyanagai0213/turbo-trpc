import { publicProcedure, router } from './trpc';
import { z }from 'zod';
import { createHTTPServer} from "@trpc/server/adapters/standalone";
import { db } from './db';
const appRouter = router({
  userList: publicProcedure.query(async () => {
    const users = await db.user.findMany();

    return users;
  }),
  userById: publicProcedure
  .input(z.string())
  .query(async(opts) => {
    const {input} = opts;
    const user = await db.user.findById(input);

    return user;
  }),
  userCreate: publicProcedure
  .input(z.object({name: z.string()}))
  .mutation(async (opts) => {
    const { input} = opts;

    const user = await db.user.create(input);

    return user;
  })
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
})

server.listen(9000, () => {
  console.log('Server started on http://localhost:9000');
});
