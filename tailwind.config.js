/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './utils/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
        fontFamily: {
            'playfairDisplay' : 'var(--playfairDisplay-font)',
            'openSans' : 'var(--openSans-font)',
        },
        extend: {
            colors: {
              "footer-primary": "var(--footer-primary-color)",
              "footer-secondary": "var(--footer-secondary-color)"
            },
          },
    },
    plugins: [],
}
