import { Box, BoxProps, Container, Divider, styled } from '@mui/material';
import { useStore } from '../store';
import { Color } from '../store/SettingsStore';
import { Header } from './Header';

export const Layout = ({ children, ...rest }: BoxProps) => {
   const { settingsStore } = useStore();

   return (
      <Root {...rest} flatColor={settingsStore.color}>
         <StyledContainer maxWidth="md">
            <Header />
            <HeaderDivider />
            {children}
         </StyledContainer>
      </Root>
   );
};

interface StyleProps {
   flatColor: Color;
}

const Root = styled(Box)<StyleProps>(({ flatColor, theme }) => ({
   width: '100%',
   background: theme.palette.flat[flatColor],
   padding: theme.spacing(2),
}));

const StyledContainer = styled(Container)(({ theme }) =>
   theme.unstable_sx({
      paddingLeft: 0,
      paddingRight: 0,
   }),
);

const HeaderDivider = styled(Divider)(({ theme }) =>
   theme.unstable_sx({
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      mx: { xs: -2, sm: 0 },
   }),
);
