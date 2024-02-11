'use client';

import { Button, ButtonProps, styled } from '@mui/material';
import { useMemo } from 'react';
import { useStore } from '../store';
import { Color } from '../store/SettingsStore';

interface StartButtonProps extends ButtonProps {}

export const StartButton = (props: StartButtonProps) => {
   const audio = useMemo(() => new Audio('/audio/start_button.wav'), []);
   const { settingsStore } = useStore();

   return (
      <StyledButton
         variant="contained"
         disableElevation
         flatColor={settingsStore.currentColor}
         {...props}
         onClick={(e) => {
            audio.pause();
            audio.currentTime = 0;
            audio.play();

            if (props.onClick) {
               props.onClick(e);
            }
         }}
      />
   );
};

interface StyleProps {
   flatColor: Color;
}

const StyledButton = styled(Button, {
   shouldForwardProp: (prop) => prop !== 'flatColor',
})<StyleProps>(({ flatColor, theme }) => ({
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
