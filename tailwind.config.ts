
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#2563eb', // Vibrant blue
          foreground: '#ffffff'
        },
        card: {
          DEFAULT: '#e6f2ff', // Very light blue
          foreground: '#1e3a8a'
        },
        library: {
          primary: '#2563eb',
          secondary: '#60a5fa',
          accent: '#bae6fd',
          text: '#1e3a8a',
          heading: '#1e40af',
          muted: '#93c5fd',
          glass: 'rgba(37,99,235,0.1)', // Soft blue with transparency
        }
      },
      borderRadius: {
        lg: '1rem',
        md: '0.75rem',
        sm: '0.5rem'
      },
      boxShadow: {
        'soft-blue': '0 4px 16px rgba(37,99,235,0.15)',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
