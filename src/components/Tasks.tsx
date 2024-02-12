import PlusIcon from '@mui/icons-material/AddCircleOutlineRounded';
import {
   Box,
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   Divider,
   IconButton,
   NoSsr,
   Stack,
   TextField,
   Typography,
   inputBaseClasses,
   outlinedInputClasses,
   styled,
   useTheme,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';
import { Color } from '../store/SettingsStore';
import { Task } from './Task';

export const Tasks = observer(() => {
   const theme = useTheme();
   const { settingsStore, taskStore } = useStore();

   return (
      <Box>
         <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h2" fontWeight="bold">
               Tasks
            </Typography>
            <IconButton
               size="small"
               color="primary"
               onClick={() => taskStore.setOpenNewTaskDialog(true)}
            >
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
         <Dialog
            maxWidth="xs"
            fullWidth
            open={taskStore.openNewTaskDialog}
            onClose={() => taskStore.setOpenNewTaskDialog(false)}
         >
            <DialogTitle
               fontWeight="bold"
               sx={{
                  opacity: 0.9,
                  background: `${theme.palette.flat[settingsStore.currentColor]}DD`,
               }}
            >
               New task
            </DialogTitle>
            <DialogContent
               sx={{
                  opacity: 0.9,
                  background: `${theme.palette.flat[settingsStore.currentColor]}DD`,
               }}
            >
               <StyledTextField
                  autoFocus
                  required
                  margin="dense"
                  id="name"
                  name="name"
                  placeholder="Name"
                  type="text"
                  size="small"
                  fullWidth
                  variant="outlined"
                  flatColor={settingsStore.currentColor}
               />
            </DialogContent>
            <DialogActions
               sx={{
                  opacity: 0.9,
                  background: `${theme.palette.flat[settingsStore.currentColor]}DD`,
               }}
            >
               <Button
                  onClick={() => taskStore.setOpenNewTaskDialog(false)}
                  sx={{ backgroundColor: 'transparent' }}
               >
                  Cancel
               </Button>
               <Button type="submit">Create</Button>
            </DialogActions>
         </Dialog>
      </Box>
   );
});

const StyledDivider = styled(Divider)(({ theme }) =>
   theme.unstable_sx({
      marginTop: theme.spacing(1.5),
      marginBottom: theme.spacing(1.5),
      mx: { xs: -2, sm: 0 },
      border: '1px solid #FFFFFF55',
   }),
);

interface StyleProps {
   flatColor: Color;
}

const StyledTextField = styled(TextField, {
   shouldForwardProp: (prop) => prop !== 'flatColor',
})<StyleProps>(({ flatColor, theme }) =>
   theme.unstable_sx({
      [`& .${inputBaseClasses.input}`]: {
         fontWeight: 'bold',
      },
      [`& .${outlinedInputClasses.notchedOutline}`]: {
         borderColor: theme.palette.flat[flatColor],
      },
   }),
);
