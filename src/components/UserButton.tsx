import { useUser } from '@auth0/nextjs-auth0/client';
import LogInIcon from '@mui/icons-material/AccountCircleRounded';
import {
   Avatar,
   Box,
   Button,
   CircularProgress,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   IconButton,
   styled,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';
import { theme } from '../styles/theme';

export const UserButton = observer(() => {
   const { isLoading, user } = useUser();
   const { settingsStore } = useStore();

   if (isLoading) {
      return (
         <Root>
            <CircularProgress size={22} />
         </Root>
      );
   }

   if (user === undefined) {
      return (
         <Root>
            <IconButton color="primary" href="/api/auth/login" size="small">
               <LogInIcon />
            </IconButton>
         </Root>
      );
   }

   return (
      <Root>
         <IconButton
            color="primary"
            size="small"
            onClick={() => settingsStore.setOpenLogoutDialog(true)}
         >
            <Avatar src={user.picture || ''} sx={{ width: 24, height: 24 }} />
         </IconButton>
         <Dialog
            maxWidth="xs"
            fullWidth
            open={settingsStore.openLogoutDialog}
            onClose={() => settingsStore.setOpenLogoutDialog(false)}
         >
            <DialogTitle
               fontWeight="bold"
               sx={{
                  opacity: 0.9,
                  background: `${theme.palette.flat['red']}DD`,
               }}
            >
               Log Out
            </DialogTitle>
            <DialogContent
               sx={{
                  opacity: 0.9,
                  background: `${theme.palette.flat['red']}DD`,
               }}
            >
               Are you sure you want to log out?
            </DialogContent>
            <DialogActions
               sx={{
                  opacity: 0.9,
                  background: `${theme.palette.flat['red']}DD`,
               }}
            >
               <Button
                  onClick={() => settingsStore.setOpenLogoutDialog(false)}
                  sx={{ backgroundColor: 'transparent' }}
               >
                  Cancel
               </Button>
               <Button href="/api/auth/logout">Log Out</Button>
            </DialogActions>
         </Dialog>
      </Root>
   );
});

const Root = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   minWidth: 36,
   justifyContent: 'flex-end',
}));
