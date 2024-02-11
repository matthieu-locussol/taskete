import { observer } from 'mobx-react-lite';
import Head from 'next/head';
import { Layout } from '../components/Layout';
import { Timers } from '../components/Timers';
import { useStore } from '../store';

const Index = observer(() => {
   const { pomodoroStore } = useStore();

   return (
      <Layout>
         <Head>
            <title>{pomodoroStore.title}</title>
         </Head>
         <Timers />
      </Layout>
   );
});

export default Index;
