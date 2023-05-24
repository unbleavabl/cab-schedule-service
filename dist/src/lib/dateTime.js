"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformMinutesToTimeString = exports.transformTimeStringToMinutes = void 0;
const transformTimeStringToMinutes = (timeString) => {
    const [hrs, min] = timeString.split(":");
    return parseInt(hrs) * 60 + parseInt(min);
};
exports.transformTimeStringToMinutes = transformTimeStringToMinutes;
const transformMinutesToTimeString = (minutes) => {
    const hrs = Math.floor(minutes / 60).toString().padStart(2, '0');
    const remainingMins = (minutes % 60).toString().padStart(2, '0');
    return `${hrs}:${remainingMins}`;
};
exports.transformMinutesToTimeString = transformMinutesToTimeString;
