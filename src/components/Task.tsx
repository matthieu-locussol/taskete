import CheckIcon from '@mui/icons-material/CheckCircleRounded';
import { Box, Typography, styled } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { useStore } from '../store';
import { Color } from '../store/SettingsStore';
import { Task as ITask } from '../store/TaskStore';

interface TaskProps {
   task: ITask;
}

export const Task = observer(({ task }: TaskProps) => {
   const audio = useMemo(() => new Audio('/audio/check.mp3'), []);
   const { settingsStore, taskStore } = useStore();

   return (
      <Root
         completed={task.completed}
         selected={taskStore.currentTask !== undefined && taskStore.currentTask.id === task.id}
         flatColor={settingsStore.currentColor}
         onClick={() => taskStore.setCurrentTask(task)}
      >
         <CheckIcon
            fontSize="large"
            onClick={(e) => {
               e.stopPropagation();

               audio.pause();
               audio.currentTime = 0;
               audio.play();

               taskStore.toggleCompletion(task.id);
            }}
            sx={({ palette }) => ({
               color: task.completed ? palette.flat[settingsStore.currentColor] : '#808080CC',
               ':hover': {
                  opacity: 0.85,
               },
            })}
         />
         <Typography
            variant="h3"
            fontWeight="bold"
            sx={({ palette }) => ({
               color: task.completed ? palette.flat[settingsStore.currentColor] : '#808080',
            })}
         >
            {task.title}
         </Typography>
      </Root>
   );
});

interface StyleProps {
   completed: boolean;
   selected: boolean;
   flatColor: Color;
}

const Root = styled(Box, {
   shouldForwardProp: (prop) => prop !== 'completed' && prop !== 'flatColor' && prop !== 'selected',
})<StyleProps>(({ completed, selected, flatColor, theme }) =>
   theme.unstable_sx({
      borderLeft: completed
         ? `8px solid ${theme.palette.flat[flatColor]}A1`
         : selected
         ? '8px solid #808080CC'
         : '8px solid transparent',
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      padding: theme.spacing(2),
      borderRadius: 2,
      backgroundColor: completed
         ? `${theme.palette.background.paper}BB`
         : theme.palette.background.paper,
      fontStyle: completed ? 'italic' : 'normal',
      color: theme.palette.text.primary,
      transition: 'background-color 0.3s, box-shadow 0.3s, margin 0.15s',
      textDecorationLine: completed ? 'line-through' : 'none',
      textDecorationColor: theme.palette.flat[flatColor],
      ':hover': {
         cursor: 'pointer',
         backgroundColor: `${theme.palette.background.paper}DD`,
      },
      ':active': {
         boxShadow: theme.palette.shadows.md,
         mt: 0.25,
         mb: -0.25,
      },
   }),
);
