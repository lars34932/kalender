class makeCalender{
    title;
    boxes;
    boxesText;
    date;
    dateToday;
    days;
    prevMonth;
    nextMonth;
    months;
    month;
    year;
    calenderBody;
    firstDay;
    lastDay;
    daysInMonth;
    start;
    remaining;
    firstUse;

    constructor() {
        this.date = new Date();
        this.dateToday = new Date();
        this.days = this.getDays(this.date.getFullYear(), this.date.getMonth());
        
        this.title = document.getElementById("monthYear");
        this.boxes = document.getElementsByClassName("main__day");
        this.boxesText = document.getElementsByClassName("day");
        this.prevMonth = document.querySelector('.header__button:nth-of-type(1)');
        this.nextMonth = document.querySelector('.header__button:nth-of-type(2)');
        
        this.prevMonth.onclick = () => this.prev();
        this.nextMonth.onclick = () => this.next();

        this.fillCalender();
    }

    titel(date) {
        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.month = this.months[date.getMonth()];
        this.year = this.date.getFullYear();
        this.title.innerText = this.month + " " + this.year;
    }

    getDays(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    prev() {
        this.date.setMonth(this.date.getMonth() - 1);
        this.titel(this.date);
        this.fillCalender();
    }

    next() {
        this.date.setMonth(this.date.getMonth() + 1);
        this.titel(this.date);
        this.fillCalender();
    }

    fillCalender = () => {
        this.calenderBody = [];

        for (let day of this.boxesText) {
            day.innerText = '';
        }

        for (let box of this.boxes) {
            box.classList.remove('gray');
            box.classList.remove('today');
        }

        this.firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
        this.daysInMonth = this.getDays(this.date.getFullYear(), this.date.getMonth());
        this.start = (this.firstDay.getDay() + 6) % 7;
        this.lastDay = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();

        for (let i = this.lastDay - this.start + 1; i <= this.lastDay; i++) {
            this.calenderBody.push(i);
        }

        for (let i = 1; i <= this.daysInMonth; i++) {
            this.calenderBody.push(i);
        }

        this.remaining = 42 - this.calenderBody.length;
        this.firstUse = 0;

        for (let i = 1; i <= this.remaining; i++) {
            this.calenderBody.push(i);
        }

        for (let i = 0; i < this.calenderBody.length; i++) {
            this.boxesText[i].innerText = this.calenderBody[i] === '' ? '' : this.calenderBody[i];
            if (i < this.start || i >= this.start + this.daysInMonth) {
                this.boxes[i].classList.add('gray');
            } else {
                if (this.calenderBody[i] === this.dateToday.getDate() && this.date.getMonth() === this.dateToday.getMonth() && this.date.getFullYear() === this.dateToday.getFullYear()) {
                    this.boxes[i].classList.add('today');
                }
            }
        }        

        console.log(this.calenderBody);
    }
}

new makeCalender("");