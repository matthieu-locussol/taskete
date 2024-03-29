import { Box, NoSsr, Tab, Tabs, styled, tabsClasses } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Card } from '../components/Card';
import { StartButton } from '../components/StartButton';
import { Timer } from '../components/Timer';
import { useStore } from '../store';
import { PomodoroState } from '../store/PomodoroStore';

export const Timers = observer(() => {
   const { pomodoroStore, tagStore, taskStore } = useStore();

   return (
      <Box display="flex" flexDirection="column" alignItems="center">
         <Card maxWidth="sm" sx={{ my: 2 }}>
            <StyledTabs
               value={pomodoroStore.state}
               onChange={(_, newState: PomodoroState) => pomodoroStore.setState(newState)}
            >
               <Tab
                  disabled={!tagStore.initialized || !taskStore.initialized}
                  label="Working"
                  value="working"
               />
               <Tab
                  disabled={!tagStore.initialized || !taskStore.initialized}
                  label="Break"
                  value="break"
               />
               <Tab
                  disabled={!tagStore.initialized || !taskStore.initialized}
                  label="Freemode"
                  value="freemode"
               />
            </StyledTabs>
            <Box display="flex" justifyContent="center" mt={2} mb={4}>
               <Timer
                  value={pomodoroStore.remainingSecondsRatio * 100}
                  label={pomodoroStore.remainingSecondsStr}
               />
            </Box>
            <Box display="flex" justifyContent="center" mb={1}>
               <NoSsr>
                  <StartButton
                     disabled={!tagStore.initialized || !taskStore.initialized}
                     disableRipple
                     onClick={() =>
                        pomodoroStore.paused ? pomodoroStore.start() : pomodoroStore.pause()
                     }
                     sx={{ m: 'auto' }}
                  >
                     {pomodoroStore.paused ? 'Start' : 'Pause'}
                  </StartButton>
               </NoSsr>
            </Box>
         </Card>
      </Box>
   );
});

const StyledTabs = styled(Tabs)(() => ({
   [`& .${tabsClasses.flexContainer}`]: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
   },
}));
