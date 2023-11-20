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

    if (showTime) {
        const formatTime = (hours, minutes) => {
            if (hours < 10) { hours = "0" + hours }
            if (minutes < 10) { minutes = "0" + minutes }
            return new String(" at " + hours + ":" + minutes)
        }
    }

    if (showTime) {
        return(
            date.toLocaleDateString() +
            formatTime(date.getHours(), date.getMinutes())
        )
    }

    return(
        date.toLocaleDateString()
    )
    

    
}