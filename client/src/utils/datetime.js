function dateToWeekDate(date) {
    const dateObj = new Date(date);
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return dateObj.toLocaleDateString('en-US', options);
}

function dateToShortDate(date) {
    const dateObj = new Date(date);
    const options = { month: 'numeric', day: 'numeric' };
    return dateObj.toLocaleDateString('en-US', options);
}

export { dateToWeekDate, dateToShortDate };