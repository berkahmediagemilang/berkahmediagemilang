import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import path from 'path'

// Base path for the production build. Defaults to '/' for local dev/preview;
// the GitHub Pages workflow sets BASE_PATH=/bmg/.
const base = process.env.BASE_PATH || '/'

// Hosts allowed to reach the dev/preview server. Tunnel services such as
// ngrok send their public domain in the Host header, which Vite blocks by
// default ("Blocked request. This host is not allowed"). A leading dot
// matches the domain itself and all subdomains.
// Add your reserved/custom ngrok domain here if you have one.
const allowedHosts = [
  '.ngrok-free.app',
  '.ngrok-free.dev',
  '.ngrok.app',
  '.ngrok.dev',
  '.ngrok.io',
]

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, './src'),
    }
  },
  build: {
    // Rolldown (Vite 8) splits vendor code into stable, cacheable chunks and
    // leaves the per-page chunks produced by React.lazy() alone. Group names
    // are paths, so each vendor library lands in its own folder.
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'vendor/react',
              test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/,
              priority: 40,
            },
            {
              name: 'vendor/phone',
              test: /[\\/]node_modules[\\/](react-phone-number-input|libphonenumber-js|input-format|classnames)/,
              priority: 37,
            },
            {
              name: 'vendor/motion',
              test: /[\\/]node_modules[\\/](motion|motion-dom|motion-utils|framer-motion)[\\/]/,
              priority: 30,
            },
            {
              name: 'vendor/widgets',
              test: /[\\/]node_modules[\\/](react-fast-marquee|react-countup)[\\/]/,
              priority: 25,
            },
            {
              name: 'vendor/icons',
              test: /[\\/]node_modules[\\/](lucide-react|simple-icons)[\\/]/,
              priority: 20,
            },
            {
              name: 'vendor/shared',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
            },
          ],
        },
      },
    },
  },
  server: {
    allowedHosts,
  },
  preview: {
    allowedHosts,
  },
})
