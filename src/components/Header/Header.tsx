import { AppBar, Stack, Toolbar, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { LinkButton } from '../LinkButton';
import { today } from '../../libs/dayjs';

function Header() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: '#000', padding: '0 24px' }}
    >
      <Toolbar>
        <Stack
          direction="row"
          sx={{
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Stack direction="row" spacing={8} sx={{ alignItems: 'center' }}>
            <Typography variant="h4">We Share US</Typography>
            <Stack direction="row" spacing={4}>
              <LinkButton to="./post">게시글</LinkButton>
              <LinkButton to={`./todo?publishedDate=${today()}`}>
                나의 할일
              </LinkButton>
            </Stack>
          </Stack>
          <AccountCircleIcon />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export { Header };
