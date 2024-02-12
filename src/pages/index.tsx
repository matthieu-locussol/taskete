import { Container, styled } from '@mui/material';
import { observer } from 'mobx-react-lite';
import Head from 'next/head';
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';
import { CurrentTask } from '../components/CurrentTask';
import { Layout } from '../components/Layout';
import { Tasks } from '../components/Tasks';
import { Timers } from '../components/Timers';
import { useStore } from '../store';

const Index = observer(() => {
   const { pomodoroStore, taskStore } = useStore();

   return (
      <Layout>
         <Head>
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
