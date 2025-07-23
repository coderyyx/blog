export const gtThemeAdapter = (unit = '--tpx') => {
  const convert = (value) => `calc(${16 * value} * var(${unit}))`;

  return {
    spacing: () => ({
      ...Array.from({ length: 96 }, (_, index) => index * 0.5)
        .filter((i) => i)
        .reduce((acc, i) => ({ ...acc, [i]: `${convert(i / 4)}` }), {}),
    }),
    fontSize: {
      'xs-pc': [
        `${convert(0.75)}` /* 12px */,
        {
          lineHeight: `${convert(1)}` /* 16px */,
        },
      ],
      'sm-pc': [
        `${convert(0.875)}` /* 14px */,
        {
          lineHeight: `${convert(1.25)}` /* 20px */,
        },
      ],
      'base-pc': [
        `${convert(1)}` /* 16px */,
        {
          lineHeight: `${convert(1.5)}` /* 24px */,
        },
      ],
      'lg-pc': [
        `${convert(1.125)}` /* 18px */,
        {
          lineHeight: `${convert(1.625)}` /* 26px */,
        },
      ],
      'xl-pc': [
        `${convert(1.375)}` /* 22px */,
        {
          lineHeight: `${convert(1.75)}` /* 28px */,
        },
      ],
      '2xl-pc': [
        `${convert(1.5)}` /* 24px */,
        {
          lineHeight: `${convert(2)}` /* 32px */,
        },
      ],
      '3xl-pc': [
        `${convert(2)}` /* 32px */,
        {
          lineHeight: `${convert(2.625)}` /* 42px */,
        },
      ],
      'xxs-m': [
        `${convert(0.625)}` /* 10px */,
        {
          lineHeight: `${convert(0.75)}` /* 12px */,
        },
      ],
      'xs-m': [
        `${convert(0.75)}` /* 12px */,
        {
          lineHeight: `${convert(1)}` /* 16px */,
        },
      ],
      'sm-m': [
        `${convert(0.875)}` /* 14px */,
        {
          lineHeight: `${convert(1.125)}` /* 18px */,
        },
      ],
      'base-m': [
        `${convert(1)}` /* 16px */,
        {
          lineHeight: `${convert(1.25)}` /* 20px */,
        },
      ],
      'lg-m': [
        `${convert(1.125)}` /* 18px */,
        {
          lineHeight: `${convert(1.5)}` /* 24px */,
        },
      ],
      'xl-m': [
        `${convert(1.25)}` /* 20px */,
        {
          lineHeight: `${convert(1.625)}` /* 26px */,
        },
      ],
      '2xl-m': [
        `${convert(1.375)}` /* 22px */,
        {
          lineHeight: `${convert(1.75)}` /* 28px */,
        },
      ],
      '3xl-m': [
        `${convert(1.75)}` /* 26px */,
        {
          lineHeight: `${convert(2)}` /* 32px */,
        },
      ],
      '4xl-m': [
        `${convert(2.125)}` /* 34px */,
        {
          lineHeight: `${convert(2.625)}` /* 42px */,
        },
      ],
      xs: [
        `${convert(0.75)}` /* 12px */,
        {
          lineHeight: `${convert(1)}` /* 16px */,
        },
      ],
      sm: [
        `${convert(0.875)}` /* 14px */,
        {
          lineHeight: `${convert(1.25)}` /* 20px */,
        },
      ],
      base: [
        `${convert(1)}` /* 16px */,
        {
          lineHeight: `${convert(1.5)}` /* 24px */,
        },
      ],
      lg: [
        `${convert(1.125)}` /* 18px */,
        {
          lineHeight: `${convert(1.75)}` /* 28px */,
        },
      ],
      xl: [
        `${convert(1.25)}` /* 20px */,
        {
          lineHeight: `${convert(1.75)}` /* 28px */,
        },
      ],
      '2xl': [
        `${convert(1.5)}` /* 24px */,
        {
          lineHeight: `${convert(2)}` /* 32px */,
        },
      ],
      '3xl': [
        `${convert(1.875)}` /* 30px */,
        {
          lineHeight: `${convert(2.25)}` /* 36px */,
        },
      ],
      '4xl': [
        `${convert(2.25)}` /* 36px */,
        {
          lineHeight: `${convert(2.5)}` /* 40px */,
        },
      ],
      '5xl': [
        `${convert(3)}` /* 48px */,
        {
          lineHeight: 1,
        },
      ],
      '6xl': [
        `${convert(3.75)}` /* 60px */,
        {
          lineHeight: 1,
        },
      ],
      '7xl': [
        `${convert(4.5)}` /* 72px */,
        {
          lineHeight: 1,
        },
      ],
      '8xl': [
        `${convert(6)}` /* 96px */,
        {
          lineHeight: 1,
        },
      ],
      '9xl': [
        `${convert(8)}` /* 128px */,
        {
          lineHeight: 1,
        },
      ],
    },
    lineHeight: {
      3: `${convert(0.75)}` /* 12px */,
      3.25: `${convert(0.8125)}` /* 13px */,
      4: `${convert(1)}` /* 16px */,
      4.5: `${convert(1.125)}` /* 18px */,
      5: `${convert(1.25)}` /* 20px */,
      6: `${convert(1.5)}` /* 24px */,
      6.5: `${convert(1.625)}` /* 26px */,
      7: `${convert(1.75)}` /* 28px */,
      8: `${convert(2)}` /* 32px */,
      9: `${convert(2.25)}` /* 36px */,
      10: `${convert(2.5)}` /* 40px */,
      10.5: `${convert(2.625)}` /* 42px */,
    },
    borderRadius: {
      sm: `${convert(0.125)}` /* 2px */,
      DEFAULT: `${convert(0.25)}` /* 4px */,
      md: `${convert(0.375)}` /* 6px */,
      lg: `${convert(0.5)}` /* 8px */,
      xl: `${convert(0.75)}` /* 12px */,
      '2xl': `${convert(1)}` /* 16px */,
      '3xl': `${convert(1.5)}` /* 24px */,
    },
    minWidth: (theme) => ({
      ...theme('spacing'),
    }),
    maxWidth: (theme) => ({
      ...theme('spacing'),
      0: '0rem',
      xs: `${convert(20)}` /* 320px */,
      sm: `${convert(24)}` /* 384px */,
      md: `${convert(28)}` /* 448px */,
      lg: `${convert(32)}` /* 512px */,
      xl: `${convert(36)}` /* 576px */,
      '2xl': `${convert(42)}` /* 672px */,
      '3xl': `${convert(48)}` /* 768px */,
      '4xl': `${convert(56)}` /* 896px */,
      '5xl': `${convert(64)}` /* 1024px */,
      '6xl': `${convert(72)}` /* 1152px */,
      '7xl': `${convert(80)}` /* 1280px */,
    }),
  };
};
