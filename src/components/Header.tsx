import StatsIcon from '@mui/icons-material/BarChartRounded';
import TaskIcon from '@mui/icons-material/CheckCircleRounded';
import SettingsIcon from '@mui/icons-material/SettingsRounded';
import {
   Box,
   Button,
   IconButton,
   Stack,
   Typography,
   styled,
   useMediaQuery,
   useTheme,
} from '@mui/material';
import { useStore } from '../store';
import { UserButton } from './UserButton';

export const Header = () => {
   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
   const { settingsStore } = useStore();

   return (
      <Root>
         <Stack direction="row" alignItems="center">
            <TaskIcon fontSize="large" sx={{ mr: 0.5 }} />
            <Typography variant="h1" fontWeight="bold">
               Taskete
            </Typography>
         </Stack>
         <Stack direction="row" alignItems="center" gap={2}>
            {settingsStore.userId !== null && (
               <Box display="flex" gap={2}>
                  {isMobile ? (
                     <IconButton color="primary">
                        <StatsIcon />
                     </IconButton>
                  ) : (
                     <Button size="small" startIcon={<StatsIcon />}>
                        Statistics
                     </Button>
                  )}
                  {isMobile ? (
                     <IconButton
                        color="primary"
                        onClick={() => settingsStore.setOpenSettingsDialog(true)}
                     >
                        <SettingsIcon />
                     </IconButton>
                  ) : (
                     <Button
                        size="small"
                        startIcon={<SettingsIcon />}
                        onClick={() => settingsStore.setOpenSettingsDialog(true)}
                     >
                        Settings
                     </Button>
                  )}
               </Box>
            )}
            <UserButton />
         </Stack>
      </Root>
   );
};

const Root = styled(Box)(() => ({
   display: 'flex',
   justifyContent: 'space-between',
}));
