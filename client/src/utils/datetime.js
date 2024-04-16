export default function dateToWeekDate(date) {
    const dateObj = new Date(date);
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return dateObj.toLocaleDateString('en-US', options);
}