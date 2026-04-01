const moonPhases = [
    {name: 'New Moon', emoji: '🌑', age: 1.84566173161},
    {name: 'Waxing Crescent', emoji: '🌒', age: 5.53698519483},
    {name: 'First Quarter', emoji: '🌓', age: 9.22830865805},
    {name: 'Waxing Gibbous', emoji: '🌔', age: 12.91963212127},
    {name: 'Full Moon', emoji: '🌕', age: 16.61095558449},
    {name: 'Waning Gibbous', emoji: '🌖', age: 20.30227904771},
    {name: 'Last Quarter', emoji: '🌗', age: 23.99360251093},
    {name: 'Waning Crescent', emoji: '🌘', age: 29.530589},
];

const synodicMonth = 29.530589; // duration of a full cycle
const unixEpochJulian = 2440587.5;

// use the date of a known new moon as reference
const newMoon = new Date('2000-01-06T12:24:01Z');
// convert it from gregorian to julian
const newMoonJulian = toJulianDate(newMoon);

function toJulianDate(date) {
   const millisecondsInADay = 24 * 60 * 60 * 1000;
   const minutesInADay = 24 * 60;
   // get number of days from the unix epoch to your date
    // adjust time to match the utc
     // add the unix epoch in julian   
   return (date.getTime() / millisecondsInADay) - (date.getTimezoneOffset() / minutesInADay) + unixEpochJulian;
}

function getMoonAge(date) {
    const dateJulian = toJulianDate(date);
    // calculate moon age (how many days since the last new moon)  
    const moonAge = (dateJulian - newMoonJulian) % synodicMonth;
    // ensure moonAge is always positive and in the correct range (0 - 29.53)
    const adjustedMoonAge = (moonAge + synodicMonth) % synodicMonth;
    return adjustedMoonAge;
}

export function getPhase(date) {
    const moonAge = getMoonAge(date);
    return moonPhases.find(p => moonAge < p.age).name;
}    

export function getIllumination(date) {
    const moonAge = getMoonAge(date);
    const phaseAngle = (2 * Math.PI * moonAge) / synodicMonth;
    const illumination = (1 - Math.cos(phaseAngle)) / 2;
    return illumination;
}

export function getEmoji(date) {
    const moonAge = getMoonAge(date);
    return moonPhases.find(p => moonAge < p.age).emoji;
}
