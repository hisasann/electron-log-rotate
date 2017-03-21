import _ from 'lodash';
import moment from 'moment';

export default function () {
  return `${moment().get('year')}-${_.padStart(moment().get('month') + 1, 2, '0')}-${_.padStart(moment().get('date'), 2, '0')}`;
}
