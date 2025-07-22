export const basePlugin = ({ addUtilities }) => {
    addUtilities({
      '.flex-center': {
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
      },
      '.flex-items-center': {
        display: 'flex',
        'align-items': 'center',
      },
      '.flex-justify-center': {
        display: 'flex',
        'justify-content': 'center',
      },
      '.scrollbar-hide': {
        'scrollbar-width': 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      },
      '.absolute-center': {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',
      },
      '.absolute-x-center': {
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
      },
      '.absolute-y-center': {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
      },
    });
  };
  