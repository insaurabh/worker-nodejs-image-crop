const jimp = require("jimp");

module.exports = (img) =>
  new Promise(async (resolve, reject) => {
    console.log(`Starting croping: ${img}`);

    const outImage = img.replace(".png", "_small.png");
    try {
      const imageObject = await jimp.read(img);
      imageObject.scale(0.1).quality(60).write(outImage);

      resolve(outImage);
      console.log(`Successfully cropped: ${img}`);
    } catch (error) {
      reject(error);
    }
  });
