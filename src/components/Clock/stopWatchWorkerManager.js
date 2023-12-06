// workerManager.js
let stopWatchWorker

export const startWorker = () => {
    if (!stopWatchWorker) {
        stopWatchWorker = new Worker(new URL('./stopwatch-worker.js', import.meta.url));
    }
};

export const stopWorker = () => {
    console.log("manager stop")
    if (stopWatchWorker) {
        stopWatchWorker.terminate();
        stopWatchWorker = null;
    }
};

export const postMessageToWorker = (message) => {
    console.log("manager post")
    if (stopWatchWorker) {
        stopWatchWorker.postMessage(message);
    }
};

export const getWorker = () => {
    console.log("manager get")
    return stopWatchWorker;
};
