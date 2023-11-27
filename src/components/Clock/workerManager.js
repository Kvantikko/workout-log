// workerManager.js
let worker;
let worker2 ;

export const startWorkerTwo = () => {
    console.log("manager start 2")
    if (!worker2) {
        worker2 = new Worker(new URL('./stopwatch-worker.js', import.meta.url));
    }
};

export const stopWorkerTwo = () => {
    console.log("manager stop")
    if (worker2) {
        worker2.terminate();
        worker2 = null;
    }
};

export const postMessageToWorkerTwo = (message) => {
    console.log("manager post")
    if (worker2) {
        worker2.postMessage(message);
    }
};

export const getWorkerTwo = () => {
    console.log("manager get")
    return worker2;
};







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
