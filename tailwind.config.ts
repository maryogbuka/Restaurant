import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        'pink': '#ff0069',
        'purple': '#d300c5',
        'gold': '#AE8625',
        'slate-gray':'#708090',
        'dark-gold': '#DFBD69',
        'seafoam-green': '#2E8B57',      
        'scarlet-gum' : '#411765',
        'amethyst-smoke': '#A08FA5',
        'cedar-wood' : '#761E00',
        'summer-green' : '#8BB5A0',
        'persimmon' : '#FF6054',
        'woodsmoke' : '#060707',
        'copperfield' : '#DD835D',
        'heavy-metal' : '#222421',
        'white' : '#FFFFFF',
        'roof-terracotta' : '#AE2F1C',
        'Red-Ribbon' : '#F20E29',
        'black' : '#010101',
        'Wood' : '#050506',
        'vivid-orange' : '#FF5E0E',
        'orange-red' : '#FF4500',
        'international-orange' : '#FF4F00',
        'tangelo' : '#FC4C02',
        '' : '',
        '' : '',
        '' : '',
        '' : '',
        '' : '',
        '' : '',
        '' : '',
      },
      
      fontFamily: {
        caveat: ['Caveat', 'cursive'],
        poppins: ['Poppins', 'sans-serif'],
        playfair: ['Playfair-Display', 'serif'],
        doto: ['Doto, sans-serif'],
        bitter: ['Bitter, sans-serif'],
        greatVibes: ['Great_Vibes, sans-serif'],
        BodoniModaSC: []
      },

    },
    
  },
  
  plugins: [],



  
} satisfies Config;
