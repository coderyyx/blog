export const scrollbarPlugin = ({ addComponents }) => {
    addComponents({
      '.scrollbar': {
        '&::-webkit-scrollbar': {
          width: '4px',
          height: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          'background-color': 'rgba(255, 255, 255, 0.12)',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          width: '6px',
          height: '6px',
          'background-color': 'rgba(255, 255, 255, 0.32)',
        },
      },
      '.scrollbar-dark': {
        '&::-webkit-scrollbar': {
          width: '4px',
          height: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          'background-color': 'rgba(0, 0, 0, 0.45)',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          width: '6px',
          height: '6px',
          'background-color': 'rgba(0, 0, 0, 0.45)',
        },
      },
    });
  };