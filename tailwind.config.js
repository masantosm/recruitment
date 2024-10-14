/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    colors: {
      'light-grey': '#f8fafc',
      border: '#E2E8F0',
      grey: '#64748b',
      'semi-grey': '#94A3B8',
      green: '#22c55e',
      'dark-green': '#14b8a6',
      blue: '#3b82f6',
      red: '#ed6f6f',
      violet: '#6C63FF',
      white: '#FFFFFF',
      'dark-blue': '#1F2D52'
    },
    extend: {
      width: {
        candidate: '264px',
        button: '24px',
        'add-button': '134px',
        card: '296px'
      },
      height: {
        candidate: '87px',
        button: '24px',
        'add-button': '32px'
      },
      minHeight: {
        card: '592px'
      },
      minWidth: {
        card: '296px'
      },
      fontSize: {
        normal: '16px',
        small: '12px'
      },
      fontFamily: {
        figtree: ['Figtree', 'sans-serif']
      }
    }
  },
  variants: {
    extend: {}
  },
  content: [
    'node_modules/preline/dist/*.js',
    './node_modules/flowbite/**/*.js',
    './src/**/*.{html,js,vue}'
  ],
  plugins: []
}
