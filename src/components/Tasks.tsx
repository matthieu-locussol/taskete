import PlusIcon from '@mui/icons-material/AddCircleOutlineRounded';
import {
   Box,
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   Divider,
   FormControlLabel,
   IconButton,
   NoSsr,
   Stack,
   Switch,
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
               sx={{
                  opacity: 0.9,
                  background: `${theme.palette.flat[settingsStore.currentColor]}DD`,
               }}
            >
               <b>New task</b>
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
               <FormControlLabel
                  control={<Switch size="medium" />}
                  label="Completed"
                  labelPlacement="start"
                  slotProps={{
                     typography: {
                        fontWeight: 'bold',
                     },
                  }}
                  sx={{ m: 0, mt: 0.5, mb: 1, ml: 1 }}
               />
               <StyledFieldset flatColor={settingsStore.currentColor}>lol</StyledFieldset>
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

const StyledFieldset = styled('fieldset', {
   shouldForwardProp: (prop) => prop !== 'flatColor',
})<StyleProps>(({ flatColor, theme }) =>
   theme.unstable_sx({
      border: `1px solid ${theme.palette.flat[flatColor]}`,
      background: '#FFFFFF44',
      borderRadius: 1.5,
      padding: theme.spacing(1, 1.5),
      margin: 0,
   }),
);
