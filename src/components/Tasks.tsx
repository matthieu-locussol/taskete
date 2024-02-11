import PlusIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { Box, Divider, IconButton, NoSsr, Stack, Typography, styled } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';
import { Task } from './Task';

export const Tasks = observer(() => {
   const { taskStore } = useStore();

   return (
      <Box>
         <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h2" fontWeight="bold">
               Tasks
            </Typography>
            <IconButton size="small" color="primary">
               <PlusIcon />
            </IconButton>
         </Stack>
         <StyledDivider />
         <NoSsr>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
               {taskStore.tasks.map((task) => (
                  <Task key={task.id} task={task} />
               ))}
            </Box>
         </NoSsr>
      </Box>
   );
});

const StyledDivider = styled(Divider)(({ theme }) =>
   theme.unstable_sx({
      marginTop: theme.spacing(1.5),
      marginBottom: theme.spacing(1.5),
      mx: { xs: -2, sm: 0 },
      border: '1px solid #FFFFFF66',
   }),
);
