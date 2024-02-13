import CheckIcon from '@mui/icons-material/CheckCircleRounded';
import { Box, Chip, Typography, styled } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { useStore } from '../store';
import { Color } from '../store/SettingsStore';
import { Task as ITask } from '../store/TaskStore';

interface TaskProps {
   task: ITask;
}

export const Task = observer(({ task }: TaskProps) => {
   const checkAudio = useMemo(() => {
      const audioObject = new Audio('/audio/check.mp3');
      audioObject.volume = 0.5;
      return audioObject;
   }, []);

   const selectAudio = useMemo(() => {
      const audioObject = new Audio('/audio/notification.mp3');
      audioObject.volume = 0.5;
      return audioObject;
   }, []);

   const { settingsStore, taskStore } = useStore();

   return (
      <Root
         completed={task.completed}
         selected={taskStore.currentTask !== undefined && taskStore.currentTask.id === task.id}
         flatColor={settingsStore.currentColor}
         onClick={() => {
            selectAudio.pause();
            selectAudio.currentTime = 0;
            selectAudio.play();

            taskStore.setCurrentTask(task);
         }}
      >
         <TaskTitle>
            <CheckIcon
               fontSize="large"
               onClick={(e) => {
                  e.stopPropagation();

                  checkAudio.pause();
                  checkAudio.currentTime = 0;
                  checkAudio.play();

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
         </TaskTitle>
         <Tags>
            {task.tags.map((tag) => (
               <Chip
                  key={`${task.id}-${tag.id}`}
                  size="small"
                  label={tag.name}
                  sx={({ palette }) => ({
                     backgroundColor: task.completed
                        ? palette.flat[settingsStore.currentColor]
                        : '#808080',
                  })}
               />
            ))}
         </Tags>
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

const TaskTitle = styled(Box)(({ theme }) => ({
   width: '100%',
   display: 'flex',
   alignItems: 'center',
   gap: theme.spacing(2),
}));

const Tags = styled(Box)(({ theme }) => ({
   display: 'flex',
   gap: 0.5,
   marginTop: theme.spacing(1),
   justifyContent: 'end',
}));
