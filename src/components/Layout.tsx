import { Box, BoxProps, styled } from '@mui/material';

export const Layout = ({ children, ...rest }: BoxProps) => {
   return (
      <Root {...rest}>
         <h1>Header</h1>
         {children}
      </Root>
   );
};

const Root = styled(Box)(({ theme }) => ({
   background: theme.palette.background.default,
}));
