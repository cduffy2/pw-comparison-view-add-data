/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
          50: '#f0f7ff',
          100: '#e3effb',
          200: '#d9f0ff',
          300: '#c2e6ff',
          400: '#97c3f0',
          500: '#026acc',
          600: '#0b6bcb',
          700: '#185ea5',
          800: '#12467b',
          900: '#0a2744',
        },
        // Neutral colors
        neutral: {
          50: '#fcfcfd',
          100: '#f0f4f8',
          200: '#cdd7e1',
          300: '#636b74',
          400: '#555e68',
          500: '#32383e',
          600: '#171a1c',
          700: '#1f1e1c',
          800: '#0a2744',
        },
        // Background colors
        background: {
          body: '#ffffff',
          page: '#fdf8f5',
        },
        // Text colors
        text: {
          primary: '#1f1e1c',
          secondary: '#171a1c',
          tertiary: '#666666',
          link: '#026acc',
          icon: '#666666',
        },
        // Semantic colors
        danger: {
          // Add danger colors as needed
        },
        success: {
          // Add success colors as needed
        },
        warning: {
          // Add warning colors as needed
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        // Components
        'button-sm': ['14px', { lineHeight: '14px', fontWeight: '600' }],
        'button-md': ['14px', { lineHeight: '14px', fontWeight: '600' }],
        'button-lg': ['16px', { lineHeight: '16px', fontWeight: '600' }],
        // Desktop typography
        'desktop-h2': ['30px', { lineHeight: '1.33', fontWeight: '700' }],
        'desktop-h3': ['24px', { lineHeight: '1.5', fontWeight: '600' }],
        'desktop-title-lg': ['18px', { lineHeight: '1.66', fontWeight: '600' }],
        'desktop-body-xl': ['20px', { lineHeight: '1.55', fontWeight: '400' }],
        'desktop-body-md': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'desktop-body-sm': ['14px', { lineHeight: '1.42', fontWeight: '400' }],
      },
      borderRadius: {
        'sm': '4px',
        'md': '6px',
        'lg': '8px',
        'pill': '24px',
        'full': '100px',
      },
      spacing: {
        // Add custom spacing values if needed
      },
      boxShadow: {
        'sm': '0px 1px 2px 0px rgba(21, 21, 21, 0.08)',
        'md': '0px 2px 4px 0px rgba(21, 21, 21, 0.08)',
      },
      borderColor: {
        'primary-outlined': '#c2e6ff',
        'neutral-outlined': '#cdd7e1',
      },
    },
  },
  plugins: [],
}
