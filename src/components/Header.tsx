import LogInIcon from '@mui/icons-material/AccountCircleRounded';
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

export const Header = () => {
   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

   return (
      <Root>
         <Stack direction="row" alignItems="center">
            <TaskIcon fontSize="large" sx={{ mr: 0.5 }} />
            <Typography variant="h1" fontWeight="bold">
               Taskete
            </Typography>
         </Stack>
         <Stack direction="row" gap={1}>
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
               <IconButton color="primary">
                  <SettingsIcon />
               </IconButton>
            ) : (
               <Button size="small" startIcon={<SettingsIcon />}>
                  Settings
               </Button>
            )}
            <IconButton>
               <LogInIcon color="primary" />
            </IconButton>
         </Stack>
      </Root>
   );
};

const Root = styled(Box)(() => ({
   display: 'flex',
   justifyContent: 'space-between',
}));
