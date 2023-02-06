import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LinkButton } from '../LinkButton';
import { today } from '../../libs/dayjs';

function Header(props: { account: string }) {
  // 1. destructure props
  const { account } = props;

  // 2. lib hooks
  const navigation = useNavigate();

  // 3. state hooks
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  const open = Boolean(anchorEl);

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
            <Typography variant="h4">We Share Us</Typography>
            <Stack direction="row" spacing={4}>
              <LinkButton to="./post">게시글</LinkButton>
              <LinkButton to={`./todo?publishedDate=${today()}`}>
                나의 할일
              </LinkButton>
            </Stack>
          </Stack>
          <Stack direction="row" sx={{ alignItems: 'center' }}>
            <Typography>{account}</Typography>
            <IconButton
              id="profile-button"
              onClick={(event) => setAnchorEl(event.currentTarget)}
              aria-haspopup="true"
              sx={{ color: '#FFF', marginLeft: '8px' }}
            >
              <AccountCircleIcon sx={{ width: '32px', height: '32px' }} />
            </IconButton>
            <Menu
              aria-labelledby="profile-button"
              open={open}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem
                onClick={() => {
                  localStorage.clear();
                  navigation('/login');
                }}
                sx={{ fontSize: '14px', padding: '0 12px' }}
              >
                로그아웃
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export { Header };
