import { log } from "./utils/functions/console.functions";

//Web components
import "./components/draggable-element.component";
import {
  selectByClass,
  selectQuery,
  selectQueryAll,
} from "./utils/functions/dom.functions";

log("Hello world!");

function addContainerEventListeners() {
  const containersArray: HTMLElement[] = selectByClass("index__container");

  for (const container of containersArray) {
    container.addEventListener("dragover", handleDraggingElementDragOver);
  }
}
addContainerEventListeners();

function handleDraggingElementDragOver(event: DragEvent) {
  event.preventDefault();

  const mouseYPosition: number = event.clientY;

  const draggedDraggable: HTMLElement = selectQuery(".dragging");

  const closestElement: HTMLElement | null = getClosestElementFromMouse(
    this,
    mouseYPosition
  );
  //
  const hasNoAfterElement: boolean = closestElement === null;
  if (hasNoAfterElement) {
    this.appendChild(draggedDraggable);
  } else {
    this.insertBefore(draggedDraggable, closestElement);
  }
}

function getClosestElementFromMouse(
  container: HTMLElement,
  mouseYPosition: number
): HTMLElement | null {
  const staticDraggablesArray: HTMLElement[] = selectQueryAll(
    ".index__draggable:not(.dragging)",
    container
  );

  //We initialize 2 vairable to get the closet element
  //and the the closest offset nearing the most 0
  let closestElement: HTMLElement | null = null;
  let closestOffset: number = Number.NEGATIVE_INFINITY;

  for (const staticDraggable of staticDraggablesArray) {
    const draggableRect: DOMRect = staticDraggable.getBoundingClientRect();
    const { top, height } = draggableRect;

    const currentOffset: number = mouseYPosition - (top + height / 2);

    const isAboveAfterElement: boolean = currentOffset < 0;
    const hasGreaterOffset: boolean = currentOffset > closestOffset;

    if (isAboveAfterElement && hasGreaterOffset) {
      closestOffset = currentOffset;
      closestElement = staticDraggable;
    }
  }

  return closestElement;
}
