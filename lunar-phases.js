export const fullCycleDuration = 29.530588;
export const unixEpochJulian = 2440587.5;

// use the date of a known new moon as reference
export const newMoon = new Date('2000-01-06T12:24:01Z');
// convert it from gregorian to julian
export const newMoonJulian = toJulianDate(newMoon);

export function toJulianDate(date) {
   const millisecondsInADay = 24 * 60 * 60 * 1000;
   const minutesInADay = 24 * 60;
   // get number of days from the unix epoch to your date
    // adjust time to match the utc
     // add the unix epoch in julian   
   return (date.getTime() / millisecondsInADay) - (date.getTimezoneOffset() / minutesInADay) + unixEpochJulian;
}

export function getMoonAge(date) {
    const dateJulian = toJulianDate(date);
    // calculate moon age (how many days since the last new moon)  
    const moonAge = (dateJulian - newMoonJulian) % fullCycleDuration;
    // ensure moonAge is always positive and in the correct range (0 - 29.53)
    const adjustedMoonAge = (moonAge + fullCycleDuration) % fullCycleDuration;
    return adjustedMoonAge;
}

export function getPhase(date) {
    const adjustedMoonAge = getMoonAge(date);

    let phase;

    if (adjustedMoonAge < 1.84566173161) {
        phase = 'New Moon';
    } else if (adjustedMoonAge < 5.53698519483) {
        phase = 'Waxing Crescent';
    } else if (adjustedMoonAge < 9.22830865805) {
        phase = 'First Quarter';
    } else if (adjustedMoonAge < 12.91963212127) {
        phase = 'Waxing Gibbous';
    } else if (adjustedMoonAge < 16.61095558449) {
        phase = 'Full Moon';
    } else if (adjustedMoonAge < 20.30227904771) {
        phase = 'Waning Gibbous';
    } else if (adjustedMoonAge < 23.99360251093) {
        phase = 'Last Quarter';
    } else if (adjustedMoonAge < 27.68492597415) {
       phase = 'Waning Crescent';
    }

    return phase;
}    
