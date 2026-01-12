/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Fondo principal (el más oscuro, detrás del tablero)
        "main-bg": '#0D0D12', 
        // Fondo de la columna y sidebar (ligeramente más claro)
        "column-bg": '#16161E', 
        // Fondo de las tarjetas (destaca sobre la columna)
        "card-bg": '#1C1C26',
        // El color principal (Botón "New Issue", Drag Overlay)
        "primary": '#6366F1', // Un índigo/violeta vibrante
        "primary-hover": '#4F46E5',
        // Textos
        "text-main": '#FFFFFF',
        "text-secondary": '#A1A1AA', // Gris suave para metadatos
        // Bordes sutiles
        "border-color": '#2D2D39',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

