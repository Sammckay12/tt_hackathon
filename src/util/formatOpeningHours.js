function twelveHourTime (time) {
  if (typeof time !== 'string') return '';

  const parts = time.split(':');
  let hours = parts[0];
  let mins = parts[1];
  let indicator = hours < 12 ? 'AM' : 'PM';

  hours = ((hours + 11) % 12 + 1);

  return `${hours}:${mins} ${indicator}`;

}

function fullDayOfWeek (shortName) {
  shortName = shortName.toLowerCase();
  return {mo: 'Monday', tu: 'Tuesday', we: 'Wednesday', th: 'Thursday', fr: 'Friday', sa: 'Saturday', su: 'Sunday'}[shortName];
}

function formatOpeningHours (val) {
  const openingPeriod = !Array.isArray(val.openingPeriod) ? [val.openingPeriod] : val.openingPeriod;
  const parts = [];

  openingPeriod.forEach(period => {
    const dayRange = `${fullDayOfWeek(period.day.from)} to ${fullDayOfWeek(period.day.to)}`;
    let timeRange;

    if (period.time.closes) {
      timeRange = `${twelveHourTime(period.time.opens)}&mdash;${twelveHourTime(period.time.closes)}`;
    } else {
      timeRange = `opens ${twelveHourTime(period.time.opens)}`;
    }

    parts.push(dayRange + ', ' + timeRange);
  });

  return parts.join('<br/>');
}

export default formatOpeningHours;
