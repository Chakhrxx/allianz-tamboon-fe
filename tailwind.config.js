import tailwind3dTransforms from '@xpd/tailwind-3dtransforms'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#003781'
      },
      fontFamily: {
        'allianz-neo': ['Allianz-Neo', 'sans-serif']
      }
    }
  },
  plugins: [tailwind3dTransforms]
}
