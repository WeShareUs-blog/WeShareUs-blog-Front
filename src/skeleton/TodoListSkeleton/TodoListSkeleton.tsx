import { Skeleton, Stack, Typography } from '@mui/material';

function TodoListSkeleton() {
  return (
    <Stack width="80%">
      <Stack sx={{ width: '20%', margin: '8px auto 0' }}>
        <Typography variant="caption">
          <Skeleton animation="wave" sx={{ borderRadius: '20px' }} />
        </Typography>
      </Stack>
      <Stack sx={{ width: '100%', margin: '0 auto' }}>
        <Typography variant="h3">
          <Skeleton animation="wave" sx={{ borderRadius: '20px' }} />
        </Typography>
        <Typography variant="h3">
          <Skeleton animation="wave" sx={{ borderRadius: '20px' }} />
        </Typography>
      </Stack>
    </Stack>
  );
}

export { TodoListSkeleton };
