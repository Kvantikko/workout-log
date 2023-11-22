// stopwatch-worker.js
let startTime;
let timerId;
let pausedTime = 0; // New variable to store the paused time

onmessage = function (e) {
    console.log("Received message in worker:", e.data);

    if (e.data === 'start') {
        if (!startTime) {
            console.log("Starting timer...");
            startTime = Date.now();
            timerId = setInterval(() => {
                const elapsedTime = Date.now() - startTime + pausedTime; // Adjust for paused time
                postMessage(elapsedTime);
            }, 1000);
        }
    } else if (e.data === 'pause') {
        console.log("Pausing timer...");
        clearInterval(timerId);
        pausedTime += Date.now() - startTime; // Store the elapsed time when pausing
        startTime = null;
    } else if (e.data === 'reset') {
        console.log("Resetting timer...");
        clearInterval(timerId);
        startTime = null;
        pausedTime = 0; // Reset paused time
        postMessage(0);
    }
};

/* onmessage = function (e) {
    console.log("Received message in worker:", e.data);

    if (e.data === 'start') {
        startTime = Date.now();
        timerId = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            postMessage(elapsedTime);
        }, 1000);
    } else if (e.data === 'pause') {
        clearInterval(timerId);
    } else if (e.data === 'reset') {
        clearInterval(timerId);
        startTime = null;
        postMessage(0);
    }
};
 */