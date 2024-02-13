import { Container, styled, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import Head from 'next/head';
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';
import { CurrentTask } from '../components/CurrentTask';
import { Layout } from '../components/Layout';
import { Tasks } from '../components/Tasks';
import { Timers } from '../components/Timers';
import { useStore } from '../store';

const Index = observer(() => {
   const theme = useTheme();
   const { pomodoroStore, settingsStore, taskStore } = useStore();

   return (
      <Layout>
         <Head>
            <link rel="shortcut icon" href="/favicon.ico?v=2" />
            <link
               rel="icon"
               type="image/svg+xml"
               href={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill='${encodeURIComponent(
                  theme.palette.flat[settingsStore.currentColor],
               )}' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2M9.29 16.29 5.7 12.7a.9959.9959 0 0 1 0-1.41c.39-.39 1.02-.39 1.41 0L10 14.17l6.88-6.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-7.59 7.59c-.38.39-1.02.39-1.41 0' /%3E%3C/svg%3E%0A`}
            />
            <title>{pomodoroStore.title}</title>
         </Head>
         <StyledContainer maxWidth="sm">
            <Timers />
            <CurrentTask />
            <Tasks />
         </StyledContainer>
         {taskStore.showFireworks && (
            <Fireworks
               autorun={{
                  speed: 1,
               }}
            />
         )}
      </Layout>
   );
});

const StyledContainer = styled(Container)(({ theme }) =>
   theme.unstable_sx({
      paddingLeft: 0,
      paddingRight: 0,
   }),
);

export default Index;
