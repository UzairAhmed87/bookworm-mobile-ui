import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
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
          DEFAULT: '#123463',
          foreground: '#fff'
        },
        secondary: {
          DEFAULT: '#36638e',
          foreground: '#f1f5fa'
        },
        accent: {
          DEFAULT: '#c7dbef',
          foreground: '#1a3557'
        },
        muted: {
          DEFAULT: '#e1e7f1',
          foreground: '#b3bbcb'
        },
        card: {
          DEFAULT: '#213556',
          foreground: '#fff'
        },
        library: {
          primary: '#123463',
          secondary: '#548fc6',
          accent: '#dbeafe',
          text: '#f7fafc',
          heading: '#fff',
          muted: '#87a0c7',
          glass: 'rgba(255,255,255,0.22)',
        }
      },
      borderRadius: {
        lg: '1rem',
        md: '0.75rem',
        sm: '0.5rem'
      },
      backdropBlur: {
        xs: '2px'
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'glass-morph': "linear-gradient(120deg, rgba(255,255,255,0.12) 60%,rgba(255,255,255,0.10) 100%)",
        'hero-blue': "linear-gradient(120deg, #14366a 60%, #356bb1 100%)",
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
