// stopwatch-worker.js
let startTime
let timerId

onmessage = function (e) {
    console.log("Received message in worker:", e.data)

    if (e.data === 'start') {
        if (!startTime) {
            startTime = Date.now()
            timerId = setInterval(() => {
                const elapsedTime = Date.now() - startTime
               // console.log("TIMER ", elapsedTime)
                postMessage(elapsedTime)
            }, 1000)
        }
    } else if (e.data === 'reset') {
        clearInterval(timerId)
        startTime = null
        postMessage(0)
    }
}