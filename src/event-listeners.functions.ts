import { error, log } from "./utils/functions/console.functions";
import {
  addClass,
  appendChildToParent,
  disableElement,
  enableElement,
  getAncestor,
  getParent,
  modifyAttribute,
  removeClass,
  selectQuery,
  selectQueryAll,
} from "./utils/functions/dom.functions";
import {
  checkFileDataValidity,
  checkFileType,
  checkImageValidity,
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

/**
 * Handles the dragover event on the dropzone element.
 *
 * @param {DragEvent} event - The dragover event.
 * @returns {void}
 */
export function handleDropzoneDragOver(event: DragEvent): void {
  event.preventDefault();

  const labelDropzone: HTMLLabelElement =
    event.currentTarget as HTMLLabelElement;

  addClass(labelDropzone, "active");
}

/**
 * Handles the dragleave event on the dropzone element.
 *
 * @param {DragEvent} event - The dragleave event.
 * @returns {void}
 */
export function handleDropzoneDragLeave(event: DragEvent): void {
  event.preventDefault();

  const labelDropzone: HTMLLabelElement =
    event.currentTarget as HTMLLabelElement;

  removeClass(labelDropzone, "active");
}

/**
 * Handles the drop event on the dropzone element.
 *
 * @param {DragEvent} event - The drop event.
 * @returns {Promise<void>}
 */
export async function handleDropzoneDrop(event: DragEvent): Promise<void> {
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

  hideDropzone();
  showImage();
  disableUrlForImage();

  function disableUrlForImage() {
    const urlInput: HTMLInputElement = selectQuery(
      "input#add-image-url",
      parentSection
    ) as HTMLInputElement;
    disableElement(urlInput);
  }

  function hideDropzone() {
    addClass(labelDropzone, "hide");

    addClass(imagePreviewParagraph, "hide");
  }

  function showImage() {
    removeClass(imagePreview, "hide");

    removeClass(deleteButton, "hide");

    imagePreview.src = URL.createObjectURL(file);
  }
}

/**
 * Handles the drop event on the dropzone element.
 *
 * @param {DragEvent} event - The drop event.
 * @returns {void}
 */
export function handleFileInputUpload(event: Event): void {
  const fileInput: HTMLInputElement = event.currentTarget as HTMLInputElement;

  const labelDropzone: HTMLLabelElement = getParent(
    fileInput
  ) as HTMLLabelElement;

  const parentSection: HTMLElement = getAncestor(
    fileInput,
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

  let file: File = fileInput.files[0];

  const { isValid, message } = checkFileDataValidity(file, "image");

  imagePreviewParagraph.textContent = message;

  const isNotValid: boolean = !isValid;
  if (isNotValid) {
    error("File is invalid!");
    return;
  }

  hideDropzone();
  showImage();
  disableUrlForImage();

  function disableUrlForImage() {
    const urlInput: HTMLInputElement = selectQuery(
      "input#add-image-url",
      parentSection
    ) as HTMLInputElement;
    disableElement(urlInput);
  }

  function hideDropzone() {
    addClass(labelDropzone, "hide");

    addClass(imagePreviewParagraph, "hide");
  }

  function showImage() {
    removeClass(imagePreview, "hide");

    removeClass(deleteButton, "hide");

    imagePreview.src = URL.createObjectURL(file);
  }
}

/**
 * Handles the click event on the delete button for the image preview.
 *
 * @param {Event} event - The click event.
 * @returns {void}
 */
export function deleteImagePreview(event: Event): void {
  const deleteButton: HTMLButtonElement =
    event.currentTarget as HTMLButtonElement;

  const sectionContainer: HTMLElement = getAncestor(
    deleteButton,
    ".index__new-card--image"
  );

  const labelDropzone: HTMLLabelElement = selectQuery(
    ".index__label--image-drop",
    sectionContainer
  ) as HTMLLabelElement;

  resetPreview();
  showDropzone();
  enableUrlInput();

  addClass(deleteButton, "hide");

  function enableUrlInput() {
    const urlInput: HTMLInputElement = selectQuery(
      "input#add-image-url",
      sectionContainer
    ) as HTMLInputElement;
    enableElement(urlInput);
  }

  function showDropzone() {
    removeClass(labelDropzone, "hide");
  }

  function resetPreview() {
    const previewContainer: HTMLElement = getParent(deleteButton);

    const imagePreview: HTMLImageElement = selectQuery(
      "img",
      previewContainer
    ) as HTMLImageElement;

    const paragraph: HTMLParagraphElement = selectQuery(
      "p",
      previewContainer
    ) as HTMLParagraphElement;

    imagePreview.src = "";

    addClass(imagePreview, "hide");

    removeClass(paragraph, "hide");
    paragraph.textContent = "Preview image here";
  }
}

/**
 * Handles the input event on the URL input element for setting the image.
 *
 * @param {Event} event - The input event.
 * @returns {Promise<void>}
 */
export async function handleInputUrlToSetImage(event: Event): Promise<void> {
  const input: HTMLInputElement = event.currentTarget as HTMLInputElement;

  const parentSection: HTMLElement = getAncestor(
    input,
    ".index__new-card--image"
  );

  const labelDropzone: HTMLLabelElement = selectQuery(
    ".index__label--image-drop",
    parentSection
  ) as HTMLLabelElement;

  const previewContainer: HTMLDivElement = selectQuery(
    ".index__image-preview-container",
    parentSection
  ) as HTMLDivElement;

  const imagePreviewParagraph: HTMLParagraphElement = selectQuery(
    "p",
    previewContainer
  ) as HTMLParagraphElement;

  const imagePreview: HTMLImageElement = selectQuery(
    "img",
    previewContainer
  ) as HTMLImageElement;

  const deleteButton: HTMLButtonElement = selectQuery(
    "button",
    previewContainer
  ) as HTMLButtonElement;

  try {
    await checkImageValidity(input.value);

    imagePreview.src = input.value;
    imagePreviewParagraph.textContent = "Preview image here";

    hideDropzone();
    showImage();
  } catch (imageError) {
    imagePreview.src = "";
    imagePreviewParagraph.textContent = imageError;
  }

  function hideDropzone() {
    addClass(labelDropzone, "hide");

    addClass(imagePreviewParagraph, "hide");
  }

  function showImage() {
    removeClass(imagePreview, "hide");
    imagePreview.src = input.value;
    removeClass(deleteButton, "hide");
  }
}

export function createNewDraggableElement(event: Event) {
  event.preventDefault(); //We avoid refreshing the browser page

  const firstDragAndDropContainer: HTMLElement =
    selectQuery(".index__container");

  log("Submit!");

  const form: HTMLFormElement = event.currentTarget as HTMLFormElement;

  const nameInput: HTMLInputElement = selectQuery(
    ".index__input[type=text]",
    form
  ) as HTMLInputElement;

  const imagePreview: HTMLImageElement = selectQuery(
    ".index__image-preview",
    form
  ) as HTMLImageElement;

  const draggableElementComponent: HTMLElement =
    document.createElement("draggable-element");

  addClass(draggableElementComponent, "index__draggable");
  modifyAttribute("draggable", false, draggableElementComponent);
  modifyAttribute("name", nameInput.value, draggableElementComponent);
  modifyAttribute("image-url", imagePreview.src, draggableElementComponent);

  appendChildToParent(draggableElementComponent, firstDragAndDropContainer);
}
