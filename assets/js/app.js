const monthYear = document.getElementById("monthYear");
const days = document.getElementsByClassName("day");
const boxes = document.getElementsByClassName("main__day");
let currentDate = new Date();
let calendarBody = [];

function getDays(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function title(date) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let month = months[date.getMonth()];
    let year = date.getFullYear();
    monthYear.innerText = month + ' ' + year;
}

function makeCalender(date) {
    calendarBody = [];
    for (let day of days) {
        day.innerText = '';
    }

    for (let box of boxes) {
        box.classList.remove('gray');
        box.classList.remove('today');
    }

    let today = new Date();
    let firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    let daysInMonth = getDays(date.getFullYear(), date.getMonth());

    let start = (firstDayOfMonth.getDay() + 6) % 7;

    let lastDayOfPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    for (let i = lastDayOfPrevMonth - start + 1; i <= lastDayOfPrevMonth; i++) {
        calendarBody.push(i);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        calendarBody.push(i);
    }

    let remainingDays = 42 - calendarBody.length;

    for (let i = 1; i <= remainingDays; i++) {
        calendarBody.push(i);
    }

    for (let i = 0; i < calendarBody.length; i++) {
        days[i].innerText = calendarBody[i] === '' ? '' : calendarBody[i];
        if (i < start || i >= start + daysInMonth) {
            boxes[i].classList.add('gray');
        }

        if (calendarBody[i] === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
            boxes[i].classList.add('today');
        }
    }
}

function previousMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    title(currentDate);
    makeCalender(currentDate);
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    title(currentDate);
    makeCalender(currentDate);
}

document.querySelector('.header__button:nth-of-type(1)').addEventListener('click', previousMonth);
document.querySelector('.header__button:nth-of-type(2)').addEventListener('click', nextMonth);

title(currentDate);
makeCalender(currentDate);
