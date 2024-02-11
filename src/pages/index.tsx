import { Box, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Layout } from '../components/Layout';

const Index = observer(() => {
   return (
      <Layout>
         <Box>
            <Typography>This is my index page!</Typography>
         </Box>
      </Layout>
   );
});

export default Index;
