/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        comic: {
          yellow: '#FFDE59',
          orange: '#FF914D',
          red: '#FF5757',
          blue: '#38B6FF',
          green: '#7ED957',
          purple: '#8C52FF',
          dark: '#12131C',
          panel: '#1A1C29',
          border: '#2A2E43',
        },
        vscode: {
          bg: '#1e1e1e',
          sidebar: '#252526',
          activity: '#333333',
          header: '#323233',
          tabActive: '#1e1e1e',
          tabInactive: '#2d2d2d',
          border: '#3c3c3c',
          text: '#cccccc',
          keyword: '#c586c0',
          function: '#dcdcaa',
          string: '#ce9178',
          number: '#b5cea8',
          comment: '#6a9955',
          status: '#007acc'
        }
      },
      fontFamily: {
        comic: ['"Bangers"', '"Comic Sans MS"', 'cursive', 'sans-serif'],
        code: ['"Fira Code"', 'Consolas', 'Monaco', 'monospace'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      boxShadow: {
        'comic': '4px 4px 0px 0px #000000',
        'comic-sm': '2px 2px 0px 0px #000000',
        'comic-lg': '6px 6px 0px 0px #000000',
        'comic-glow': '0 0 15px rgba(255, 222, 89, 0.4)',
        'neon-blue': '0 0 15px rgba(56, 182, 255, 0.4)',
      }
    },
  },
  plugins: [],
}
