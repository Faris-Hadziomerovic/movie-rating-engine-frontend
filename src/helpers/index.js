import moment from 'moment';
import DATE from '../constants/date';

export const previewDateFormat = (dateValue) => {
  if (typeof dateValue === 'string') {
    if (dateValue?.includes('-')) {
      const [year, month, day] = dateValue.split('-');
      return moment(new Date(year, month - 1, day)).format(DATE.TABLE_VIEW_FORMAT);
    }
    const [day, month, year] = dateValue.split('/');
    return moment(new Date(year, month - 1, day)).format(DATE.TABLE_VIEW_FORMAT);
  }
  return moment(dateValue).format(DATE.TABLE_VIEW_FORMAT);
};

