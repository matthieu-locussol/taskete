import PlusIcon from '@mui/icons-material/AddCircleOutlineRounded';
import TagsIcon from '@mui/icons-material/MoreRounded';
import {
   Alert,
   Box,
   Button,
   Chip,
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
   chipClasses,
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
   const { settingsStore, tagStore, taskStore } = useStore();

   return (
      <Box>
         <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1}>
            <Typography variant="h2" fontWeight="bold" sx={{ mr: 'auto' }}>
               Tasks
            </Typography>
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
               {taskStore.tasks.map((task) => (
                  <Task key={task.id} task={task} />
               ))}
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
                     Add
                  </Button>
               </Stack>
               {tagStore.isErrored && (
                  <Alert variant="filled" severity="error" sx={{ fontSize: 12, mt: 1 }}>
                     {tagStore.errorMessage}
                  </Alert>
               )}
               <Box display="flex" gap={1} mt={1} width="100%" flexWrap="wrap">
                  {tagStore.tags.map((tag) => (
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
                     tagStore.reset();
                  }}
                  sx={{ backgroundColor: 'transparent' }}
               >
                  Cancel
               </Button>
               <Button
                  disabled={!tagStore.hasChanges}
                  onClick={() => {
                     tagStore.setOpenTagsDialog(false);
                     tagStore.saveTags();
                  }}
               >
                  Save
               </Button>
            </DialogActions>
         </Dialog>
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
