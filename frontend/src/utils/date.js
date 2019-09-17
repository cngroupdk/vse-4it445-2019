import { format, parseISO } from 'date-fns';

export function formatDate(date) {
  if (typeof date === 'string') {
    date = parseISO(date);
  }
  return format(date, 'dd-MM-yyyy H:mm');
}
