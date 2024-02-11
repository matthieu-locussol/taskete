import { Button, ButtonProps, styled } from '@mui/material';
import { useStore } from '../store';
import { Color } from '../store/SettingsStore';

interface StartButtonProps extends ButtonProps {
   paused: boolean;
}

export const StartButton = (props: StartButtonProps) => {
   const { settingsStore } = useStore();

   return (
      <StyledButton
         variant="contained"
         disableElevation
         flatColor={settingsStore.currentColor}
         {...props}
      />
   );
};

interface StyleProps {
   flatColor: Color;
   paused: boolean;
}

const StyledButton = styled(Button, {
   shouldForwardProp: (prop) => prop !== 'flatColor' && prop !== 'paused',
})<StyleProps>(({ flatColor, paused, theme }) => ({
   background: theme.palette.primary.main,
   padding: theme.spacing(1.25, 2),
   minWidth: 200,
   textTransform: 'uppercase',
   letterSpacing: 1,
   color: theme.palette.flat[flatColor],
   fontWeight: 'bold',
   fontSize: 24,
   transition: 'all 0.3s',
   ':hover': {
      background: `${theme.palette.primary.main}CC`,
   },
   ':active': {
      marginTop: theme.spacing(0.25),
      marginBottom: theme.spacing(-0.25),
   },
}));