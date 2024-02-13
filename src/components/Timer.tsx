import {
   Box,
   CircularProgress,
   CircularProgressProps,
   Typography,
   circularProgressClasses,
   styled,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';
import { SecondsType } from '../store/PomodoroStore';

interface TimerProps extends CircularProgressProps {
   value: number;
   label: string;
}

export const Timer = observer(({ value, label, ...rest }: TimerProps) => {
   const { pomodoroStore, tagStore } = useStore();

   return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
         <CircularProgress
            size={256}
            thickness={1.5}
            variant="determinate"
            value={100}
            sx={{
               position: 'absolute',
               color: '#FFFFFF1A',
               transition: 'all 0.3s',
            }}
            {...rest}
         />
         <CircularProgress
            color="primary"
            size={256}
            thickness={1.5}
            variant={tagStore.initialized ? 'determinate' : 'indeterminate'}
            value={value}
            sx={{
               transition: 'all 0.3s',
               [`& .${circularProgressClasses.circle}`]: {
                  strokeLinecap: 'round',
                  transition: 'all 0.3s',
               },
            }}
            {...rest}
         />
         {tagStore.initialized && (
            <Box
               sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
               }}
            >
               <StyledTypography secondsType={pomodoroStore.secondsType}>{label}</StyledTypography>
            </Box>
         )}
      </Box>
   );
});

interface StyleProps {
   secondsType: SecondsType;
}

const StyledTypography = styled(Typography, {
   shouldForwardProp: (prop) => prop !== 'secondsType',
})<StyleProps>(({ secondsType }) => ({
   transition: 'all 0.5s',
   fontSize: {
      seconds: '6rem',
      minutes: '4rem',
      hours: '2.75rem',
   }[secondsType],
   fontWeight: 'bold',
}));
