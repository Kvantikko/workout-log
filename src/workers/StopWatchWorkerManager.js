class StopWatchWorkerManager {

    worker = null

    constructor(urlToWorkerFile) {
        this.worker = new Worker(new URL(urlToWorkerFile, import.meta.url))
    }

    terminateWorker() {
        this.worker.terminate()
    }

    postMessageToWorker(message) {
        this.worker.postMessage(message);
    }

    getWorker() {
        return this.worker
    }

    /* startWorker() {
        if (!timerWorker) timerWorker = new Worker(new URL('./timer-worker.js', import.meta.url))
    } */
}

export default StopWatchWorkerManager


