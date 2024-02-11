import { tabClasses, tabsClasses } from '@mui/material';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
   palette: {
      primary: {
         main: '#fafafa',
      },
      secondary: {
         main: '#333333',
      },
      error: {
         main: '#EF4444',
      },
      text: {
         primary: '#fafafa',
         secondary: '#fafafa',
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
         default: '#FFFFFF',
         paper: '#FFFFFF',
      },
      flat: {
         red: '#ba4949',
         cyan: '#38858a',
         blue: '#397097',
         yellow: '#9b8238',
         purple: '#7d53a2',
         green: '#518a58',
         gray: '#545764',
      },
      separator: '#DCE0E9',
      mode: 'light',
   },
   typography: (palette) => ({
      allVariants: {
         fontFamily:
            "MPlusRounded1C, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
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
      MuiButton: {
         styleOverrides: {
            root: ({ theme }) => ({
               textTransform: 'none',
               letterSpacing: 0,
               fontWeight: 'bold',
               backgroundColor: '#FFFFFF1A',
               paddingLeft: theme.spacing(2),
               paddingRight: theme.spacing(2),
            }),
         },
      },
      MuiCard: {
         styleOverrides: {
            root: ({ theme }) =>
               theme.unstable_sx({
                  backgroundColor: '#FFFFFF1A',
                  backgroundImage: 'none',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: theme.palette.shadows.xs,
                  borderRadius: 1.5,
                  p: theme.spacing(4),
                  border: 'none',
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
      MuiTab: {
         styleOverrides: {
            root: ({ theme }) => ({
               padding: theme.spacing(0.75, 1.25),
               textTransform: 'none',
               letterSpacing: -0.25,
               color: `${theme.palette.text.primary}AA`,
               transition: 'all 0.15s',
               borderRadius: 4,
               minHeight: 0,
               fontSize: '1rem',
               fontWeight: 'bold',
               ':hover': {
                  background: '#FFFFFF0A',
               },
               [`&.${tabClasses.selected}`]: {
                  color: theme.palette.primary.main,
                  backgroundColor: '#FFFFFF1A',
                  borderBottom: 'none',
               },
            }),
         },
      },
      MuiTabs: {
         styleOverrides: {
            root: () => ({
               [`& .${tabsClasses.flexContainer}`]: {
                  justifyContent: 'space-evenly !important',
               },
               [`& .${tabsClasses.indicator}`]: {
                  display: 'none',
               },
            }),
         },
      },
   },
});
