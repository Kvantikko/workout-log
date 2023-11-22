// stopwatch-worker.js
let startTime;
let timerId;

onmessage = function (e) {
  if (e.data === 'start') {
    startTime = Date.now();
    timerId = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      postMessage(elapsedTime);
    }, 10);
  } else if (e.data === 'pause') {
    clearInterval(timerId);
  } else if (e.data === 'reset') {
    clearInterval(timerId);
    startTime = null;
    postMessage(0);
  }
};
