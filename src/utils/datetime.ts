/** @format */

import moment from 'moment';

import { API_DATE_FORMAT } from '../data/AppConst';

export const currentDate = (format: string = API_DATE_FORMAT[5]) =>
  new Date(moment(new Date()).utcOffset('+5:30').format(format));

export const getTimeStamp = (
  date: string | number,
  format: string = API_DATE_FORMAT[5]
) => moment(new Date(date), format).utcOffset('+5:30').valueOf();

export const dayStartOrEnd = (date: any, type = 'START', startOrEnd: any = 'day') => {
  return type === 'START'
    ? moment(new Date(date)).startOf(startOrEnd)
    : moment(new Date(date)).endOf(startOrEnd);
};

export const dateDiff = (
  start: string | number,
  end: string | number,
  diffBy: any = 'days'
) => {
  const from = moment(new Date(start));
  const to = moment(new Date(end));
  return to.diff(from, diffBy);
};

export const formatedDate = (
  value: string | number,
  format: string = API_DATE_FORMAT[5]
) => moment(new Date(value)).format(format);

export const getDateDiff = (endDate: any) => {
  let diff;
  let start = moment(new Date())
  let end =moment(new Date(endDate))
  diff = end.diff(start, 'days')
  if(diff > 30) {
    return {
      diff: end.diff(start, 'months'),
      unit: 'month(s)'
    }
  }
  return {
    diff,
    unit: 'day(s)'
  }
}
