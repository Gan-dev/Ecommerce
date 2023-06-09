

function getDayName(date) {
    let day = date.getDay()
    if (day === 1) {
        return 'Monday'
    }
    if (day === 2) {
        return 'Tuesday'
    }
    if (day === 3) {
        return 'Wensday'
    }
    if (day === 4) {
        return 'Thrusday'
    }
    if (day === 5) {
        return 'Friday'
    }
    if (day === 6) {
        return 'Saturday'
    }
    if (day === 7) {
        return 'Sunday'
    }

}
function getMonth(date) {
    let month = date.getMonth()
    if (month === 0) {
        return 'Junary'
    }
    if (month === 1) {
        return 'February'
    }
    if (month === 2) {
        return 'March'
    }
    if (month === 3) {
        return 'April'
    }
    if (month === 4) {
        return 'May'
    }
    if (month === 5) {
        return 'June'
    }
    if (month === 6) {
        return 'July'
    }
    if (month === 7) {
        return 'August'
    }
    if (month === 8) {
        return 'September'
    }
    if (month === 9) {
        return 'October'
    }
    if (month === 10) {
        return 'November'
    }
    if (month === 11) {
        return 'December'
    }
}

function getHour(date) {
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()

    if (hour < 10) {
        hour = "0" + hour
    }
    if (second < 10) {
        second = "0" + second
    }
    if (minute < 10) {
        minute = "0" + minute
    }
    return `${hour}:${minute}:${second}`
}

export { getDayName, getMonth, getHour }