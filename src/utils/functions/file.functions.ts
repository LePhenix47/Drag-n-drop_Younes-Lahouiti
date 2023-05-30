import { splitString } from "./string.functions";

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

/**
 * Checks if a given file has the expected type.
 *
 * @param {File} fileUploaded - The file to check its type.
 * @param {string} typeExpected - The expected type of the file.
 *
 * @returns {boolean} - A Promise that resolves to a boolean indicating whether the file has the expected type or not.
 */
export function checkFileType(
  fileUploaded: File,
  typeExpected: string
): boolean {
  const { lastModified, name, type, size }: File = fileUploaded;

  const fileType: string = splitString(type, "/")[0];

  return fileType === typeExpected;
}

type dataValidity = {
  isValid: boolean;
  message: string;
};
/**
 * Checks the validity of the dropped file data.
 *
 * @param {File | null} file - The dropped file data.
 * @param {string} expectedFileType - The expected file type.
 *
 * @returns {{validity: boolean; message: string}} An object containing the validity and message.
 * @property {boolean} isValid - Indicates the validity of the file data.
 * @property {string} message - A message describing the validity status.
 */
export function checkFileDataValidity(
  file: File | null,
  expectedFileType: string
): dataValidity {
  const hasNoData: boolean = !file;
  if (hasNoData) {
    return { isValid: false, message: "Data is not a file!" };
  }

  const fileIsNotAnImage: boolean = !checkFileType(
    file as File,
    expectedFileType
  );
  if (fileIsNotAnImage) {
    return { isValid: false, message: "File type is invalid!" };
  }

  return { isValid: true, message: "Success!" };
}
