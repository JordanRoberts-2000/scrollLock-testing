export default function detectPowerSavingMode() {
    // for iOS/iPadOS Safari, and maybe MacBook macOS Safari (not tested)
    if (/iP(hone|ad|od)/.test(navigator.userAgent)) {
      // In Low Power Mode, cumulative delay effect happens on setInterval()
      return new Promise((resolve) => {
        let fps = 50;
        let numFrames = 30;
        let startTime = performance.now();
        let i = 0;
        let handle = setInterval(() => {
          if (i < numFrames) {
            i++;
            return;
          }
          clearInterval(handle);
          let interval = 1000 / fps;
          let actualInterval = (performance.now() - startTime) / numFrames;
          let ratio = actualInterval / interval; // 1.3x or more in Low Power Mode, 1.1x otherwise
          console.log(actualInterval, interval, ratio);
          resolve(ratio > 1.3);
        }, 1000 / fps);
      });
    }
  }