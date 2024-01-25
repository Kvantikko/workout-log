let startTime
let timerId
let pausedTime = 0

onmessage = function (e) {
    //console.log("Received message in worker: ", e.data, " timerID ", timerId)

    if (e.data === 'start') {
        console.log("Starting timer...")
        if (!startTime) {
            startTime = Date.now()
            timerId = setInterval(() => {
                const elapsedTime = Date.now() - startTime + pausedTime // Adjust for paused time
                //console.log("worker file posting message ", elapsedTime, " ", timerId)
                postMessage(elapsedTime)
            }, 1000)
        }
    } else if (e.data === 'pause') {
       // console.log("Pausing timer... ", timerId)
        clearInterval(timerId)
        pausedTime += Date.now() - startTime // Store the elapsed time when pausing
        startTime = null
    } else if (e.data === 'reset') {
        //console.log("Resetting timer...")
        clearInterval(timerId)
        startTime = null
        pausedTime = 0 // Reset paused time
        postMessage(0)
    }
}