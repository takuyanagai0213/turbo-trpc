import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';

const trpc = createTRPCClient<AppRouter>({
  links: [httpBatchLink({ url: 'http://localhost:9000' })],
});


const user = await trpc.userById.query('1');
console.log(user);

const createdUser = await trpc.userCreate.mutate({name: 'John Doe'})
console.log(createdUser);
