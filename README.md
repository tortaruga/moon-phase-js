# Moon phase calculator

This is a simple algorithm to calculate the moon phase for a given date. The goal was to make it as accurate as possible but without including complex calculations, so that it would be understandable even to those with no particular knowledge of astronomy. The results are accurate enough for most dates, but less precise for the dates when the moon is in between two different phases.

#### How it works

Pass a [javascript date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) as parameter into getPhase(date), and get the corresponding moon phase. 

If you're interested in how the algorithm works, here's an explanation:

## The moon phases
A moon cycle lasts approximately 29.53 days. Over this period of time the visible portion of the moon changes gradually, going from completely obscure to completely illuminated and back again. The different shapes of the moon that result from this behavior are called moon phases; conventionally we distinguish four main moon phases (new moon, first quarter, full moon, last quarter), and four minor phases (waxing crescent, waxing gibbous, waning gibbous, waning crescent).

## Julian date
To easily calculate the number of days elapsed between two events, astronomers use the [Julian day](https://en.wikipedia.org/wiki/Julian_day), which is the count of days from the beginning of the Julian period. The Julian period starts at noon Universal Time on Monday, January 1, 4713 BC (based on the [Julian calendar](https://en.wikipedia.org/wiki/Proleptic_Julian_calendar)). 

This means that a given date in Julian is the number of days that have passed from January 1 4713 BC to said date; for example, the [Unix Epoch](https://developer.mozilla.org/en-US/docs/Glossary/Unix_time) (January 1, 1970 at midnight UTC) in Julian is 2440587.5 days.

Before starting the calculations to determine the moon phase, this algorith converts the date into its corresponding Julian. The conversion works like this:

```
function toJulianDate(date) {
   return (date.getTime() / millisecondsInADay) - (date.getTimezoneOffset() / minutesInADay) + unixEpochJulian;
}

```

1. We take the number of milliseconds that have passed from the Unix Epoch to our date (date.getTime()) and divide it by the number of milliseconds in a day: this gives us the number of days from the Unix Epoch to the date we want to convert.

2. We need to take into consideration timezones: to express the date accurately as UTC time we therefore subtract the timezone offset. The method date.getTimezoneOffset() returns the difference in *minutes* between our local time and the UTC; but we are working with *days* as our unit, so we divide it by the number of minutes in a day.

3. We now have the number of days passed from the Unix Epoch to our date, correctly expressed in UTC. We just need to add the number of days between the Julian period start and the Unix Epoch (2440587.5), and we will have our date expressed in Julian. 

## Moon age
This conversion was useful because now we can compare the Julian date of our interest with the *Julian date of a known new moon*: for example, we know that January 6, 2000 at 12:24:01 UTC it was a new moon.

1. We use our toJulian() function to convert into Julian the date of this known new moon and the date we want to find the moon phase for;

2. `(dateJulian - newMoonJulian) / fullCycleDuration` gives us the *number of full cycles* that have happened between the two dates; the *remainder* of this division (`dateJulian - newMoonJulian) % fullCycleDuration`) gives us the number of days since the last new moon, which is basically the moon's age for the current moon cycle. 

3. To make sure the result is always positive, and always in the correct range from 0 to 29.53, we adjust that value like so: 
```
const adjustedMoonAge = (moonAge + fullCycleDuration) % fullCycleDuration;
    
``` 

## Moon phase

Now we just have to check which phase corresponds to the moon age we have calculated, based on this table:

| Moon Phase      | Moon age        |
| --------------- | --------------- |
| New Moon        | < 1.84566173161 |
| Waxing Crescent | < 5.53698519483 |
| First Quarter   | < 9.22830865805 |
| Waxing Gibbous  | < 12.91963212127|
| Full Moon       | < 16.61095558449|
| Waning Gibbous  | < 20.30227904771|
| Last Quarter    | < 23.99360251093|
| Waning Crescent | < 27.68492597415|
