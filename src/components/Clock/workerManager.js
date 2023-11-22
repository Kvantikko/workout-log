// workerManager.js
let worker;

export const startWorker = () => {
    console.log("manager start")
    if (!worker) {
        worker = new Worker(new URL('./stopwatch-worker.js', import.meta.url));
    }
};

export const stopWorker = () => {
    console.log("manager stop")
    if (worker) {
        worker.terminate();
        worker = null;
    }
};

export const postMessageToWorker = (message) => {
    console.log("manager post")
    if (worker) {
        worker.postMessage(message);
    }
};

export const getWorker = () => {
    console.log("manager get")
    return worker;
};
