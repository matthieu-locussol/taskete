import { Skeleton } from '@mui/material';
import { observer } from 'mobx-react-lite';

export const TaskSkeleton = observer(() => {
   return (
      <Skeleton variant="rounded" width="100%" sx={{ p: 4 }}>
         <Skeleton variant="circular" width={32} height={32} />
      </Skeleton>
   );
});
