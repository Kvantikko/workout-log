
let timerWorker

export const startWorker = () => {
    if (!timerWorker) timerWorker = new Worker(new URL('./timer-worker.js', import.meta.url))
}

export const stopWorker = () => {
    if (timerWorker) {
        timerWorker.terminate();
        timerWorker = null;
    }
};

export const postMessageToWorker = (message) => {
    console.log("TIMER");
    if (timerWorker) timerWorker.postMessage(message)
}

export const getWorker = () => timerWorker
