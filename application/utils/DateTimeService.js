import moment from 'moment-timezone';

class DateTimeService {
  static fromNowInWords(dateTime) {
    var dateTimeWithTz = moment.tz(dateTime, 'UTC');
    return dateTimeWithTz.clone().tz(this.currentTimeZone()).fromNow();
  }

  static currentTimeZone() {
    return moment.tz.guess();
  }
}

export default DateTimeService;
