import _ from 'lodash';
import moment from 'moment';

export default function () {
  let now = moment();
  return `${_.padStart(now.hours(), 2, '0')}:${_.padStart(now.minute(), 2, '0')}:${_.padStart(now.second(), 2, '0')}`;
}

