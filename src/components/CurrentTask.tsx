import { Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';

export const CurrentTask = observer(() => {
   const { taskStore } = useStore();

   return taskStore.currentTask ? (
      <Typography variant="h3" align="center" fontStyle="italic" sx={{ my: 2 }}>
         {taskStore.currentTask.title}
      </Typography>
   ) : (
      <Typography variant="h3" align="center" sx={{ my: 2 }}>
         Select a task to get started
      </Typography>
   );
});
