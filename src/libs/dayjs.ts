import dayjs from 'dayjs';

export function dateToCalendarDate(date: string | dayjs.Dayjs) {
  return dayjs(date).format('YYYY-MM-DD');
}

export function today() {
  return dayjs().format('YYYY-MM-DD');
}
