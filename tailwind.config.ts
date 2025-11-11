import type { Config } from 'tailwindcss'

const config: Config = {
  // NO 'darkMode: "class"' line
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // We can add custom colors/fonts for NovaWay here later
    },
  },
  plugins: [],
}
export default config