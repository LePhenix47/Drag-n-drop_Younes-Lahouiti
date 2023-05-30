import { log } from "./utils/functions/console.functions";

//Web components
import "./components/draggable-element.component";
import {
  addClass,
  removeClass,
  selectByClass,
  selectQuery,
  selectQueryAll,
} from "./utils/functions/dom.functions";
import {
  deleteImagePreview,
  handleContainerDraggingElementDragOver,
  handleDropzoneDragLeave,
  handleDropzoneDragOver,
  handleDropzoneDrop,
  handleFileInputUpload,
} from "./event-listeners.functions";

log("Hello world!");

function addContainerEventListeners() {
  const containersArray: HTMLElement[] = selectByClass("index__container");

  for (const container of containersArray) {
    container.addEventListener(
      "dragover",
      handleContainerDraggingElementDragOver
    );
    container.addEventListener(
      "touchmove",
      handleContainerDraggingElementDragOver,
      {
        passive: true,
      }
    );
  }
}
addContainerEventListeners();

function addNewCardCreatorEventListeners() {
  const labelDropzone: HTMLLabelElement = selectQuery(
    ".index__label--image-drop"
  ) as HTMLLabelElement;

  labelDropzone.addEventListener("dragover", handleDropzoneDragOver);

  labelDropzone.addEventListener("dragleave", handleDropzoneDragLeave);

  labelDropzone.addEventListener("drop", handleDropzoneDrop);

  const fileInput: HTMLInputElement = selectQuery(
    ".index__input",
    labelDropzone
  ) as HTMLInputElement;
  fileInput.addEventListener("input", handleFileInputUpload);

  const deleteButton: HTMLButtonElement = selectQuery(
    ".index__delete-button"
  ) as HTMLButtonElement;

  deleteButton.addEventListener("click", deleteImagePreview);
}
addNewCardCreatorEventListeners();
