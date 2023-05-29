type resolvePromiseType = (value: string | PromiseLike<string>) => void;
type rejectPromiseType = (reason?: any) => void;
/**
 * Checks the validity of an image URL by attempting to load it.
 *
 * @param {string} url - The URL of the image to check.
 * @returns {Promise<string>} A promise that resolves if the image loads successfully, or rejects if it fails to load.
 */
export function checkImageValidity(url: string): Promise<string> {
  return new Promise(
    (resolve: resolvePromiseType, reject: rejectPromiseType) => {
      const img: HTMLImageElement = new Image();
      img.addEventListener("load", () => {
        // Image loaded successfully
        resolve("Image was found!");
      });
      img.addEventListener("error", () => {
        // Image failed to load
        reject(`Image with URL: "${url}" has NOT been found!`);
      });

      img.src = url;
    }
  );
}
