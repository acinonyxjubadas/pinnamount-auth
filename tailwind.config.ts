import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Navy colors - properly defined for Tailwind
        navy: {
          50: '#eef2f5',
          100: '#d5dfe7',
          200: '#aabfcf',
          300: '#7f9fb7',
          400: '#547f9f',
          500: '#0A1628',   // Primary Navy - this is navy-500
          600: '#081220',
          700: '#060d18',
          800: '#040910',
          900: '#020408',   // navy-900 exists now!
          DEFAULT: '#0A1628',
          light: '#1A2A45',
          lighter: '#2A3A55',
          dark: '#050D18',
        },
        // Gold colors
        gold: {
          50: '#fbf8ef',
          100: '#f5edcf',
          200: '#ebdb9f',
          300: '#dec76b',
          400: '#d4b543',
          500: '#C9A84C',   // Primary Gold
          600: '#b8943a',
          700: '#9a7a2e',
          800: '#7c6022',
          900: '#5e4618',
          DEFAULT: '#C9A84C',
          light: '#E8C96A',
          dark: '#A8893A',
        },
        // Teal colors
        teal: {
          50: '#eaf7f7',
          100: '#d0ecec',
          200: '#a1d9d9',
          300: '#72c6c6',
          400: '#43b3b3',
          500: '#2D9B9B',   // Primary Teal
          600: '#247c7c',
          700: '#1b5d5d',
          800: '#123e3e',
          900: '#091f1f',
          DEFAULT: '#2D9B9B',
          light: '#43b3b3',
          dark: '#247c7c',
        },
        // Pinnamount brand colors (alias)
        pinnamount: {
          50: '#fbf8ef',
          100: '#f5edcf',
          200: '#ebdb9f',
          300: '#dec76b',
          400: '#d4b543',
          500: '#C9A84C',
          600: '#b8943a',
          700: '#9a7a2e',
          800: '#7c6022',
          900: '#5e4618',
        },
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        inter: ["Inter", "sans-serif"],
        display: ["Playfair Display", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #A8893A 100%)',
        'gradient-navy': 'linear-gradient(135deg, #0A1628 0%, #1A2A45 50%, #0A1628 100%)',
        'gradient-hero': 'linear-gradient(135deg, #0A1628 0%, #1A2A45 40%, #2D9B9B 100%)',
        'gradient-teal': 'linear-gradient(135deg, #2D9B9B 0%, #43b3b3 100%)',
        'gradient-warm': 'linear-gradient(135deg, #C9A84C 0%, #E8C96A 30%, #2D9B9B 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'gradient-shift': 'gradientShift 8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      boxShadow: {
        'gold': '0 4px 14px rgba(201, 168, 76, 0.4)',
        'gold-lg': '0 8px 30px rgba(201, 168, 76, 0.5)',
        'navy': '0 4px 14px rgba(10, 22, 40, 0.4)',
        'navy-lg': '0 8px 30px rgba(10, 22, 40, 0.5)',
        'teal': '0 4px 14px rgba(45, 155, 155, 0.4)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;