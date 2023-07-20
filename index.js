const glob = require("glob");
// const imageScale = require("./image-scale-single-thread");
const imageScale = require("./image-scale-worker");

(async () => {
  await Promise.all(
    glob
      .sync("./images/*.png")
      .filter((img) => img.indexOf("_small") < 0)
      .map(imageScale)
  );
})();
