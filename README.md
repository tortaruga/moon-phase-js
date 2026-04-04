# 🌙 moon-phase-js

A lightweight JavaScript utility to calculate the moon phase for any date, including phase name, emoji, and illumination percentage.

---

## 📦 Installation

```bash
npm install @tortaruga/moon-phase-js
```

🚀 Usage
```js
import { getPhase, getEmoji, getIllumination } from "@tortaruga/moon-phase-js";

const date = new Date("2026-04-01");

console.log(getPhase(date));       // "Full Moon"
console.log(getEmoji(date));       // "🌕"
console.log(getIllumination(date)); // 0.985077512880078
```
*Note: getIllumination returns a value from 0 to 1. Multiply by 100 for a percentage.*

## 🧠 API

`getPhase(date)`

Returns the moon phase name for a given date.

- **Parameters**: date (Date object)
- **Returns**: string — phase name
- **Example**:

```js
getPhase(new Date("2026-04-01")); // "Full Moon"
getPhase(new Date("17 April 2026")); // "New Moon"
```

`getEmoji(date)`

Returns an emoji representing the moon phase.

- **Parameters**: date (Date object)
- **Returns**: string — emoji
- **Example**:

```js
getEmoji(new Date('1 march 2026')); // "🌔"
```

`getIllumination(date)`

Returns the fraction of the moon illuminated.

- **Parameters**: date (Date object)
- **Returns**: number — 0–1
- **Example**:

```js
getIllumination(new Date("2026-04-01")); // 0.985077512880078
```

- **Tip**: Use `toFixed()` to round to a preferred number of decimal places:

```js
getIllumination(new Date("2026-04-01")).toFixed(2) // 0.99 
```

## 🌕 Moon Phases Reference

| Phase Name           | Emoji | Approx. Illumination |
|---------------------|-------|--------------------|
| New Moon            | 🌑    | 0%                 |
| Waxing Crescent     | 🌒    | 1–49%              |
| First Quarter       | 🌓    | 50%                |
| Waxing Gibbous      | 🌔    | 51–99%             |
| Full Moon           | 🌕    | 100%               |
| Waning Gibbous      | 🌖    | 51–99%             |
| Last Quarter        | 🌗    | 50%                |
| Waning Crescent     | 🌘    | 1–49%              |

## ⚠️ Notes
**The moon phase calculation is based only on the age of the moon, not precise astronomical positions.**
**This means that near phase transitions, the result may be slightly off compared to astronomical data.**

## 🎯 Features
- 🌙 Moon phase calculation from date
- 😀 Emoji support
- 📊 Illumination fraction
- ⚡ Lightweight and dependency-free

### 🧮 How it works

This library calculates moon phases based on the **age of the moon** (days since the last new moon).  

1. Convert the given date to a [Julian date](https://en.wikipedia.org/wiki/Julian_day).  
2. Calculate the moon’s age in days using a standard lunar cycle (synodic month ≈ 29.53 days).  
3. Determine the phase by comparing the age to thresholds for each phase: 

| Moon Phase      | Moon age        |
| --------------- | --------------- |
| New Moon        | < 1.84566173161 |
| Waxing Crescent | < 5.53698519483 |
| First Quarter   | < 9.22830865805 |
| Waxing Gibbous  | < 12.91963212127|
| Full Moon       | < 16.61095558449|
| Waning Gibbous  | < 20.30227904771|
| Last Quarter    | < 23.99360251093|
| Waning Crescent | < 29.530589     |


4. Compute illumination fraction with the formula:  
   
   `illumination = (1 - cos(phaseAngle)) / 2` 
   where 
   `phaseAngle = 2π * moonAge / 29.53`  


*(For more details on the calculation method see [docs/logic.md](docs/logic.md).)*

## 📄 License

MIT