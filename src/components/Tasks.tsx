import PlusIcon from '@mui/icons-material/AddCircleOutlineRounded';
import TagsIcon from '@mui/icons-material/MoreRounded';
import VisibleOff from '@mui/icons-material/VisibilityOffRounded';
import VisibleOn from '@mui/icons-material/VisibilityRounded';
import {
   Alert,
   Box,
   Button,
   Chip,
   CircularProgress,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   Divider,
   IconButton,
   MenuItem,
   NoSsr,
   OutlinedInput,
   Select,
   Stack,
   TextField,
   Typography,
   chipClasses,
   inputBaseClasses,
   outlinedInputClasses,
   styled,
   useTheme,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';
import { Color } from '../store/SettingsStore';
import { Tag } from '../store/TagStore';
import { Task } from './Task';
import { TaskSkeleton } from './TaskSkeleton';

export const Tasks = observer(() => {
   const theme = useTheme();
   const { settingsStore, tagStore, taskStore } = useStore();

   return (
      <Box>
         <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1}>
            <Typography variant="h2" sx={{ mr: 'auto' }}>
               <b>Tasks</b> ({taskStore.completedTasksCount}/{taskStore.tasks.length})
            </Typography>
            <IconButton
               size="small"
               color="primary"
               onClick={() => settingsStore.toggleAreCompletedTasksVisible()}
            >
               {settingsStore.areCompletedTasksVisible ? <VisibleOn /> : <VisibleOff />}
            </IconButton>
            <IconButton
               size="small"
               color="primary"
               onClick={() => tagStore.setOpenTagsDialog(true)}
            >
               <TagsIcon />
            </IconButton>
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
               {tagStore.initialized && taskStore.initialized ? (
                  taskStore.orderedTasksByDate.map((task) => <Task key={task.id} task={task} />)
               ) : (
                  <>
                     <TaskSkeleton />
                     <TaskSkeleton />
                     <TaskSkeleton />
                  </>
               )}
               {tagStore.initialized && taskStore.initialized && taskStore.tasks.length === 0 && (
                  <Typography
                     variant="body1"
                     letterSpacing={-0.5}
                     fontWeight="bold"
                     fontStyle="italic"
                     textAlign="center"
                     sx={{
                        background: '#FFFFFF',
                        borderRadius: 2,
                        p: 4,
                        color: '#808080',
                        border: `2px dashed #808080`,
                     }}
                  >
                     Create your first task to get started
                  </Typography>
               )}
               {tagStore.initialized &&
                  taskStore.initialized &&
                  taskStore.tasks.length === taskStore.completedTasksCount &&
                  taskStore.completedTasksCount > 0 &&
                  !settingsStore.areCompletedTasksVisible && (
                     <Typography
                        variant="body1"
                        letterSpacing={-0.5}
                        fontWeight="bold"
                        fontStyle="italic"
                        textAlign="center"
                        sx={{
                           background: '#FFFFFF',
                           borderRadius: 2,
                           p: 4,
                           color: '#808080',
                           border: `2px dashed #808080`,
                        }}
                     >
                        Congratulations! All tasks are completed! 🎉
                     </Typography>
                  )}
            </Box>
         </NoSsr>
         <Dialog
            maxWidth="xs"
            fullWidth
            open={tagStore.openTagsDialog}
            onClose={() => tagStore.setOpenTagsDialog(false)}
         >
            <DialogTitle
               fontWeight="bold"
               sx={{
                  opacity: 0.9,
                  background: `${theme.palette.flat[settingsStore.currentColor]}DD`,
               }}
            >
               New tag
            </DialogTitle>
            <DialogContent
               sx={{
                  opacity: 0.9,
                  background: `${theme.palette.flat[settingsStore.currentColor]}DD`,
               }}
            >
               <Stack
                  direction="row"
                  display="flex"
                  gap={1}
                  component="form"
                  onSubmit={(e) => {
                     e.preventDefault();
                     tagStore.addTag();
                  }}
               >
                  <StyledTextField
                     error={tagStore.isErrored}
                     required
                     id="name"
                     name="name"
                     placeholder="i.e. French, Work, Personal, etc."
                     type="text"
                     size="small"
                     fullWidth
                     variant="outlined"
                     flatColor={settingsStore.currentColor}
                     value={tagStore.tagNameField}
                     onChange={(e) => tagStore.setTagNameField(e.target.value)}
                  />
                  <Button disabled={!tagStore.canAddTag} type="submit" sx={{ m: 'auto' }}>
                     {tagStore.loading ? <CircularProgress size={24} /> : 'Add'}
                  </Button>
               </Stack>
               {tagStore.isErrored && (
                  <Alert variant="filled" severity="error" sx={{ fontSize: 12, mt: 1 }}>
                     {tagStore.errorMessage}
                  </Alert>
               )}
               <Box display="flex" gap={1} mt={1} width="100%" flexWrap="wrap">
                  {tagStore.availableTags.map((tag) => (
                     <Chip
                        key={`${tag.id}-${tag.name}`}
                        label={tag.name}
                        onDelete={() => tagStore.removeTag(tag)}
                        color="primary"
                        variant="filled"
                        sx={{
                           color: theme.palette.flat[settingsStore.currentColor],
                           borderColor: theme.palette.flat[settingsStore.currentColor],
                           [`& .${chipClasses.deleteIcon}`]: {
                              color: theme.palette.flat[settingsStore.currentColor],
                           },
                        }}
                     />
                  ))}
               </Box>
            </DialogContent>
            <DialogActions
               sx={{
                  opacity: 0.9,
                  background: `${theme.palette.flat[settingsStore.currentColor]}DD`,
               }}
            >
               <Button
                  onClick={() => {
                     tagStore.setOpenTagsDialog(false);
                  }}
               >
                  Close
               </Button>
            </DialogActions>
         </Dialog>
         <Dialog
            maxWidth="xs"
            fullWidth
            open={taskStore.openNewTaskDialog}
            onClose={() => taskStore.setOpenNewTaskDialog(false)}
            component="form"
            onSubmit={(e) => {
               e.preventDefault();
               taskStore.addTask();
            }}
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
                  value={taskStore.taskNameField}
                  onChange={(e) => taskStore.setTaskNameField(e.target.value)}
               />
               <Select<Tag[]>
                  multiple
                  displayEmpty
                  value={taskStore.taskTagsField}
                  onChange={(e) => taskStore.setTaskTagsField(e.target.value as Tag[])}
                  input={
                     <OutlinedInput
                        fullWidth
                        size="small"
                        sx={{
                           mt: 1,
                        }}
                     />
                  }
                  renderValue={(selected) => {
                     if (selected.length === 0) {
                        return <Typography>Tags</Typography>;
                     }

                     return (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                           {selected.map((value) => (
                              <Chip
                                 color="primary"
                                 size="small"
                                 key={`input-${value}-${value.id}`}
                                 label={value.name}
                              />
                           ))}
                        </Box>
                     );
                  }}
                  MenuProps={{
                     slotProps: {
                        paper: {
                           sx: {
                              opacity: 0.7,
                              background: theme.palette.flat[settingsStore.currentColor],
                              maxHeight: 48 * 4.5 + 8,
                              width: 250,
                           },
                        },
                     },
                  }}
               >
                  <MenuItem
                     disabled
                     value=""
                     sx={{
                        fontWeight: 'bold',
                     }}
                  >
                     <em>Select at least one tag</em>
                  </MenuItem>
                  {tagStore.availableTags.map((tag) => (
                     // @ts-expect-error
                     <MenuItem key={`option-${tag.id}-${tag.name}`} value={tag}>
                        {tag.name}
                     </MenuItem>
                  ))}
               </Select>
               {taskStore.isErrored && (
                  <Alert variant="filled" severity="error" sx={{ fontSize: 12, mt: 1 }}>
                     {taskStore.errorMessage}
                  </Alert>
               )}
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
               <Button disabled={!taskStore.canAddTask} type="submit">
                  {taskStore.loading ? <CircularProgress size={24} /> : 'Create'}
               </Button>
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
