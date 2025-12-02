export const theme = {
  colors: {
    dark: {
      900: '#070B13',
      800: '#0B0F19',
      700: '#111827',
      600: '#1F2937',
    },
    neon: {
      purple: '#8A2BE2',
      cyan: '#00E7FF',
      pink: '#FF006E',
      green: '#39FF14',
    }
  },

  shadows: {
    glow: {
      purple: '0 0 20px rgba(138, 43, 226, 0.5)',
      cyan: '0 0 20px rgba(0, 231, 255, 0.5)',
      pink: '0 0 20px rgba(255, 0, 110, 0.5)',
    }
  },

  gradients: {
    primary: 'linear-gradient(135deg, #8A2BE2 0%, #00E7FF 100%)',
    secondary: 'linear-gradient(135deg, #FF006E 0%, #8A2BE2 100%)',
    radial: 'radial-gradient(circle at 50% 50%, rgba(138, 43, 226, 0.2) 0%, transparent 70%)',
  },

  animations: {
    duration: {
      fast: 200,
      normal: 300,
      slow: 500,
    }
  }
};

export default theme;
