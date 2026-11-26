import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

function apiDevPlugin() {
  return {
    name: 'api-dev-middleware',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || '';
        if (url.startsWith('/api/contact')) {
          try {
            try { process.loadEnvFile?.(); } catch {}
            const { default: handler } = await import('./api/contact.js');
            return handler(req, res);
          } catch (err) {
            console.error('[ViteDevAPI] Error handling contact request:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ success: false, error: 'Internal server error', details: err.message }));
          }
        }

        if (url.startsWith('/api/download-ebook') || url.startsWith('/api/ebook-lead')) {
          try {
            try { process.loadEnvFile?.(); } catch {}
            const { default: handler } = await import('./api/download-ebook.js');
            return handler(req, res);
          } catch (err) {
            console.error('[ViteDevAPI] Error handling request:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ success: false, error: 'Internal server error', details: err.message }));
          }
        }
        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);

  return {
    plugins: [react(), apiDevPlugin()],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('framer-motion')) {
                return 'motion';
              }
              if (id.includes('lucide-react') || id.includes('react-icons')) {
                return 'icons';
              }
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
                return 'vendor';
              }
            }
          }
        }
      }
    }
  };
});
