/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'Noto Sans SC',
          'Microsoft YaHei',
          'sans-serif',
        ],
      },
      boxShadow: {
        ink: '0 20px 80px rgba(30, 24, 20, 0.14)',
      },
    },
  },
  plugins: [],
};
