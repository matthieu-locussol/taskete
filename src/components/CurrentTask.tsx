import { Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';

export const CurrentTask = observer(() => {
   const { tagStore, taskStore } = useStore();

   if (!tagStore.initialized || !taskStore.initialized) {
      return null;
   }

   return taskStore.currentTask ? (
      <Typography variant="h3" align="center" fontWeight="bold" fontStyle="italic" sx={{ my: 2 }}>
         {taskStore.currentTask.title}
      </Typography>
   ) : (
      <Typography variant="h3" align="center" sx={{ my: 2 }}>
         No task is selected
      </Typography>
   );
});
