import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    {
      name: 'portfolio-ai-sse-dev',
      configureServer(server) {
        server.middlewares.use('/api/ai/chat', async (req, res) => {
          if (req.method !== 'POST') {
            res.statusCode = 405;
            res.end('Method Not Allowed');
            return;
          }
          let raw = '';
          req.on('data', (chunk) => { raw += chunk; });
          req.on('end', () => {
            let message = '';
            try {
              const parsed = JSON.parse(raw) as { message?: string };
              message = parsed.message ?? '';
            } catch {
              message = '';
            }

            const response = `Assistant (dev stream): ${message || 'Ask about projects, skills, or experience.'}`;
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            res.statusCode = 200;
            res.end(response);
          });
        });
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Improve mobile load time via code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Keep React runtime together
          react: ['react', 'react-dom'],
          // Split heavy animation libs
          framer: ['framer-motion'],
          anime: ['animejs'],
          // UI vendor libs
          ui: ['@radix-ui/react-tabs', 'lucide-react'],
        },
      },
    },
    // Raise warning threshold since split chunks are expected
    chunkSizeWarningLimit: 600,
  },
});
