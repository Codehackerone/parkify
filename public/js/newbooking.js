function add_zeroes(num) {
    if (num < 10) return '0' + num;
    else return num;
}
var epoch1 = new Date().getTime();
var year1 = new Date(epoch1).getFullYear();
var month1 = new Date(epoch1).getMonth() + 1;
var day1 = new Date(epoch1).getDate();
var hour1 = new Date(epoch1).getHours();
var minutes1 = new Date(epoch1).getMinutes();
var mindate =
    year1 +
    '-' +
    add_zeroes(month1) +
    '-' +
    add_zeroes(day1) +
    'T' +
    add_zeroes(hour1) +
    ':' +
    add_zeroes(minutes1);
epoch2 = epoch1 + 86400000 * 30;
var year1 = new Date(epoch2).getFullYear();
var month1 = new Date(epoch2).getMonth() + 1;
var day1 = new Date(epoch2).getDate();
var hour1 = new Date(epoch2).getHours();
var minutes1 = new Date(epoch2).getMinutes();
var maxdate =
    year1 +
    '-' +
    add_zeroes(month1) +
    '-' +
    add_zeroes(day1) +
    'T' +
    add_zeroes(hour1) +
    ':' +
    add_zeroes(minutes1);
document.getElementById('start_time').max = maxdate;
document.getElementById('start_time').min = mindate;
document.getElementById('end_time').max = maxdate;
document.getElementById('end_time').min = mindate;
