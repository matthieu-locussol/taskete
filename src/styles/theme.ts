import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
   palette: {
      primary: {
         main: '#236348',
         dark: '#173915',
      },
      secondary: {
         main: '#333333',
      },
      error: {
         main: '#EF4444',
      },
      text: {
         primary: '#464646',
         secondary: '#717171',
      },
      link: {
         normal: '#6f7589',
         hover: '#236348',
      },
      paper: {
         transparent: '#111827E6',
         background: '#111827',
         border: '#374151',
      },
      shadows: {
         xs: '0 5px 10px 0 rgba(31, 51, 86, 0.06)',
         sm: '0 5px 10px 0 rgba(31, 51, 86, 0.12)',
         md: '0 1px 2px 0 rgba(31, 51, 86, 0.24)',
      },
      background: {
         default: '#F8FCF4',
         paper: '#FFFFFF',
      },
      separator: '#DCE0E9',
      mode: 'light',
   },
   typography: (palette) => ({
      allVariants: {
         fontFamily:
            "NotoSansJP, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
      },
      h1: {
         fontSize: '2rem',
         color: palette.text.primary,
      },
      h2: {
         fontSize: '1.5rem',
         color: palette.text.primary,
      },
      h3: {
         fontSize: '1.25rem',
         color: palette.text.primary,
      },
      body1: {
         lineHeight: '1.75rem',
         letterSpacing: '0.025em',
      },
   }),
   components: {
      MuiCard: {
         styleOverrides: {
            root: ({ theme }) =>
               theme.unstable_sx({
                  backgroundColor: theme.palette.background.paper,
                  backgroundImage: 'none',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: theme.palette.shadows.xs,
                  borderRadius: 1.5,
                  p: theme.spacing(4),
                  border: `1px solid ${theme.palette.separator}`,
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                  transition:
                     'background-color 0.3s, border-color 0.3s, box-shadow 0.3s, margin 0.15s',
               }),
         },
         variants: [
            {
               props: { variant: 'clickable' },
               style: ({ theme }) =>
                  theme.unstable_sx({
                     transition:
                        'background-color 0.3s, border-color 0.15s, box-shadow 0.3s, margin: 0.15s',
                     ':hover': {
                        cursor: 'pointer',
                        boxShadow: theme.palette.shadows.sm,
                        borderColor: theme.palette.primary.light,
                     },
                     ':active': {
                        boxShadow: theme.palette.shadows.md,
                        mt: 0.25,
                        mb: -0.25,
                     },
                  }),
            },
         ],
      },
      MuiCssBaseline: {
         styleOverrides: {
            '*': {
               userSelect: 'none',
               msUserSelect: 'none',
               MozUserSelect: 'none',
               msTouchSelect: 'none',
            },
         },
      },
      MuiLink: {
         defaultProps: {
            underline: 'none',
         },
         styleOverrides: {
            root: ({ theme }) => ({
               color: theme.palette.link.normal,
               fontWeight: 500,
               transition:
                  'color 0.15s, textDecoration 0.15s, background-color 0.3s, border-color 0.3s, box-shadow 0.3s',
               '&:hover': {
                  color: theme.palette.link.hover,
                  cursor: 'pointer',
               },
            }),
         },
      },
      MuiPaper: {
         styleOverrides: {
            outlined: ({ theme }) => ({
               border: `1px solid ${theme.palette.paper.border}`,
               background: theme.palette.paper.transparent,
            }),
         },
      },
   },
});
