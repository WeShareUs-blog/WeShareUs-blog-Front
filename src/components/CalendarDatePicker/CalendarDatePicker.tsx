import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import { TextField } from '@mui/material';
import { dateToCalendarDate } from '../../libs/dayjs';

function CalendarDatePicker(props: {
  publishedDate: string;

  onChange: (date: string) => void;
}) {
  // 1. destructure props
  const { publishedDate, onChange } = props;

  // 2. lib hooks
  // 3. state hooks
  const [calendarDate, setCalendarDate] = useState(publishedDate);

  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        onChange={(dateValue) => {
          if (dateValue) {
            setCalendarDate(dateValue);
            onChange(dateToCalendarDate(dateValue));
          }
        }}
        componentsProps={{
          actionBar: {
            actions: ['today', 'cancel'],
          },
        }}
        // NOTE: 왜 아이콘에 -12px이 있지...? 우선 이렇게해서 균형맞춤
        InputAdornmentProps={{ sx: { marginRight: '12px' } }}
        InputProps={{ sx: { backgroundColor: '#FFF' } }}
        value={calendarDate}
        renderInput={(params) => (
          <TextField {...params} sx={{ width: '50%' }} />
        )}
        inputFormat="YYYY-MM-DD"
      />
    </LocalizationProvider>
  );
}

export { CalendarDatePicker };
