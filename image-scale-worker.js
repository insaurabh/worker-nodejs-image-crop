const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
  threadId,
} = require("worker_threads");
const jimp = require("jimp");

if (isMainThread) {
  module.exports = (img) =>
    new Promise((resolve, reject) => {
      const worker = new Worker(__filename, {
        workerData: img,
      });

      worker.on("message", resolve);
      worker.on("error", reject);
      worker.on("exit", (code) => {
        if (code !== 0) {
          reject(new Error(`worker error ${code}`));
        }
      });
    });
} else {
  console.log(`${threadId} Starting cropping: ${workerData}`);

  const outImage = workerData.replace(".png", "_small.png");

  (async () => {
    try {
      const imageObject = await jimp.read(workerData);
      imageObject.scale(0.1).quality(60).write(outImage);

      resolve(outImage);
      console.log(`${threadId} Successfully cropped: ${workerData}`);
      parentPort.postMessage(outImage);
    } catch (error) {
      console.log(`${threadId} ERROR : ${workerData}`);
    }
  })();
}
