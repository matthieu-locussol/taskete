import { Box, Tab, Tabs, styled, tabsClasses } from '@mui/material';
import { observer } from 'mobx-react-lite';
import Head from 'next/head';
import { Card } from '../components/Card';
import { Layout } from '../components/Layout';
import { StartButton } from '../components/StartButton';
import { Timer } from '../components/Timer';
import { useStore } from '../store';
import { PomodoroState } from '../store/PomodoroStore';

const Index = observer(() => {
   const { pomodoroStore } = useStore();

   return (
      <Layout>
         <Head>
            <title>{pomodoroStore.title}</title>
         </Head>
         <Box display="flex" flexDirection="column" alignItems="center">
            <Card maxWidth="sm" sx={{ mt: 2 }}>
               <StyledTabs
                  value={pomodoroStore.state}
                  onChange={(_, newState: PomodoroState) => pomodoroStore.setState(newState)}
               >
                  <Tab label="Working" value="working" />
                  <Tab label="Short break" value="shortBreak" />
                  <Tab label="Long break" value="longBreak" />
               </StyledTabs>
               <Box display="flex" justifyContent="center" mt={2} mb={4}>
                  <Timer
                     value={pomodoroStore.remainingSecondsRatio * 100}
                     label={pomodoroStore.remainingSecondsStr}
                  />
               </Box>
               <StartButton
                  disableRipple
                  onClick={() =>
                     pomodoroStore.paused ? pomodoroStore.start() : pomodoroStore.pause()
                  }
                  paused={pomodoroStore.paused}
                  sx={{ m: 'auto' }}
               >
                  {pomodoroStore.paused ? 'Start' : 'Pause'}
               </StartButton>
            </Card>
         </Box>
      </Layout>
   );
});

const StyledTabs = styled(Tabs)(() => ({
   [`& .${tabsClasses.flexContainer}`]: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
   },
}));

export default Index;
