import { error, log } from "./utils/functions/console.functions";
import {
  addClass,
  getAncestor,
  removeClass,
  selectQuery,
  selectQueryAll,
} from "./utils/functions/dom.functions";
import {
  checkFileDataValidity,
  checkFileType,
} from "./utils/functions/file.functions";

/**
 * Handles the dragover event on the container element for dragging elements.
 *
 * @param {DragEvent | TouchEvent} event - The dragover or touchmove event.
 * @returns {void}
 */
export function handleContainerDraggingElementDragOver(
  event: DragEvent | TouchEvent
): void {
  //Prevent the default behavior of the browser to enable element dropping
  event.preventDefault();

  const container: HTMLElement = event.currentTarget as HTMLElement;

  const pointerYPosition: number =
    event.type === "dragover"
      ? (event as DragEvent).clientY
      : (event as TouchEvent).touches[0].clientY;

  const draggedDraggable: HTMLElement = selectQuery(".dragging") as HTMLElement;

  const hasNoDraggable: boolean = !draggedDraggable;
  if (hasNoDraggable) {
    throw new Error("No draggable was found!");
  }

  //Closest element from the mouse
  const closestElement: HTMLElement | null = getClosestElementFromPointer(
    container,
    pointerYPosition
  );
  //
  const hasNoAfterElement: boolean = closestElement === null;
  if (hasNoAfterElement) {
    //We add it in last place
    container.appendChild(draggedDraggable);
  } else {
    //We add it in frontof the closest element
    container.insertBefore(draggedDraggable, closestElement);
  }
}

/**
 * Finds the closest element to the pointer's position within a container.
 *
 * @param {HTMLElement} container - The container element.
 * @param {number} pointerYPosition - The Y position of the pointer.
 * @param {boolean} [findVertically=true] - Whether to find the closest element vertically or horizontally.
 *
 * @returns {HTMLElement | null} The closest element to the pointer's position, or null if no elements found.
 */
export function getClosestElementFromPointer(
  container: HTMLElement,
  pointerYPosition: number,
  findVertically: boolean = true
): HTMLElement | null {
  const staticDraggablesArray: HTMLElement[] = selectQueryAll(
    ".index__draggable:not(.dragging)",
    container
  ) as HTMLElement[];

  //We initialize 2 variables to get the closest element
  //and the the closest offset nearing the most 0
  let closestElement: HTMLElement | null = null;
  let closestOffset: number = Number.NEGATIVE_INFINITY;

  for (const staticDraggable of staticDraggablesArray) {
    //We get the cooridnates and dimensions of the draggable
    const draggableRect: DOMRect = staticDraggable.getBoundingClientRect();
    const { top, height, left, width } = draggableRect;

    //We compute the offset between the draggable and the mouse position
    const currentOffset: number = findVertically
      ? pointerYPosition - (top + height / 2)
      : pointerYPosition - (left + width / 2);

    const isAboveAfterElement: boolean = currentOffset < 0;
    const hasGreatestOffset: boolean = currentOffset > closestOffset;

    if (isAboveAfterElement && hasGreatestOffset) {
      closestOffset = currentOffset;
      closestElement = staticDraggable;
    }
  }

  return closestElement;
}

export function handleDropzoneDragOver(event: DragEvent) {
  event.preventDefault();

  const labelDropzone: HTMLLabelElement =
    event.currentTarget as HTMLLabelElement;

  addClass(labelDropzone, "active");
}

export function handleDropzoneDragLeave(event: DragEvent) {
  event.preventDefault();

  const labelDropzone: HTMLLabelElement =
    event.currentTarget as HTMLLabelElement;

  removeClass(labelDropzone, "active");
}

export async function handleDropzoneDrop(event: DragEvent) {
  event.preventDefault();

  const labelDropzone: HTMLLabelElement =
    event.currentTarget as HTMLLabelElement;

  const parentSection: HTMLElement = getAncestor(
    labelDropzone,
    ".index__new-card.index__new-card--image"
  );

  const imagePreviewContainer: HTMLDivElement = selectQuery(
    ".index__image-preview-container",
    parentSection
  ) as HTMLDivElement;

  const imagePreviewParagraph: HTMLParagraphElement = selectQuery(
    "p",
    imagePreviewContainer
  ) as HTMLParagraphElement;

  const imagePreview: HTMLImageElement = selectQuery(
    "img",
    imagePreviewContainer
  ) as HTMLImageElement;

  const deleteButton: HTMLButtonElement = selectQuery(
    "button",
    imagePreviewContainer
  ) as HTMLButtonElement;

  removeClass(labelDropzone, "active");

  let file: File = event.dataTransfer?.files[0];

  const { isValid, message } = checkFileDataValidity(file, "image");

  imagePreviewParagraph.textContent = message;

  const isNotValid: boolean = !isValid;
  if (isNotValid) {
    error("File is invalid!");
    return;
  }

  addClass(labelDropzone, "hide");

  addClass(imagePreviewParagraph, "hide");

  removeClass(imagePreview, "hide");

  removeClass(deleteButton, "hide");

  imagePreview.src = URL.createObjectURL(file);
}

export async function handleFileInputUpload(event: Event) {
  const fileInput: HTMLInputElement = event.currentTarget as HTMLInputElement;

  let file: File = fileInput.files[0];
  log("upload", file, URL.createObjectURL(file));

  try {
  } catch (dataUploadError) {
    error(dataUploadError);
  }
}
