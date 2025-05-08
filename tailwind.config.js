/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f0ff',
          100: '#cce0ff',
          200: '#99c2ff',
          300: '#66a3ff',
          400: '#3385ff',
          500: '#0F52BA', // primary blue
          600: '#0d47a1',
          700: '#0a3d87',
          800: '#08336e',
          900: '#052a54',
        },
        secondary: {
          50: '#e8f7f0',
          100: '#d1f0e0',
          200: '#a3e1c1',
          300: '#75d2a3',
          400: '#47c384',
          500: '#36B37E', // secondary green
          600: '#2e9669',
          700: '#267954',
          800: '#1f5c40',
          900: '#173f2c',
        },
        accent: {
          50: '#fff6e6',
          100: '#ffedcc',
          200: '#ffdb99',
          300: '#ffc966',
          400: '#ffb733',
          500: '#FF8C00', // accent orange
          600: '#cc7000',
          700: '#a85c00',
          800: '#854800',
          900: '#623400',
        },
        success: '#10B981',
        warning: '#FBBF24',
        error: '#EF4444',
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '0.5': '4px',
        '1': '8px',
        '1.5': '12px',
        '2': '16px',
        '2.5': '20px',
        '3': '24px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
        '8': '64px',
        '10': '80px',
        '12': '96px',
      },
      borderRadius: {
        DEFAULT: '8px',
        'lg': '12px',
        'xl': '16px',
      },
    },
  },
  plugins: [],
};