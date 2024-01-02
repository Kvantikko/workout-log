export const getDate = () => {
    const today = new Date();

    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return dd + '/' + mm + '/' + yyyy;
}

export const formatDateTime = (dateToBeFormatted, showTime) => {
    const date = new Date(dateToBeFormatted)

    const formatTime = (hours, minutes) => {
        if (hours < 10) { hours = "0" + hours }
        if (minutes < 10) { minutes = "0" + minutes }
        return new String(" @ " + hours + ":" + minutes)
    }

    if (showTime) {
        return (
            date.toLocaleDateString() +
            formatTime(date.getHours(), date.getMinutes())
        )
    }

    return (
        date.toLocaleDateString()
    )



}

export const formatDate = (date) => { // formatDateString ???
    const dateString = date.toUTCString()
    const dateStringWithoutTime = dateString.slice(0, dateString.length - 13)
    const timeString = dateString.slice(dateString.length - 12, dateString.length - 7)
    return dateStringWithoutTime + ",  @ " + timeString
}

export const formatToMonthAndYear = (dateObj) => {
    const locale = "en-en"
    const month = dateObj.toLocaleString(locale, { month: "long" })
    //const month = dateObj.toLocaleString({ month: "long" })
    return month + " " + dateObj.getFullYear()
}

export const formatDayAndMonthFinnish = (objDate) => {
    const locale = "fi-fi"
    const month = objDate.toLocaleString(locale, { month: "long" }) + "ta"
    return objDate.getDate() + ". " + month
}