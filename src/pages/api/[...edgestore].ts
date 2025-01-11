import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/pages';
import { initEdgeStore } from '@edgestore/server';
import { z } from 'zod';

const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
  publicFiles: es.fileBucket({
    accept: ['image/*'],
    maxSize: 1024 * 1024 * 4, // 4MB
  }),
});

export default createEdgeStoreNextHandler({
  router: edgeStoreRouter,
}); 