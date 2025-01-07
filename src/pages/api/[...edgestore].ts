import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/pages';
import { initEdgeStore } from '@edgestore/server';
import { z } from 'zod';

const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
  publicFiles: es.fileBucket({
    accept: ['image/*'],
    maxSize: 1024 * 1024 * 4, // 4MB
    middleware: async (req) => {
      // Add CORS headers
      if (req.headers) {
        req.headers['Access-Control-Allow-Origin'] = '*';
        req.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
        req.headers['Access-Control-Allow-Headers'] = 'Content-Type';
      }
      return {};
    },
  }),
});

export default createEdgeStoreNextHandler({
  router: edgeStoreRouter,
}); 