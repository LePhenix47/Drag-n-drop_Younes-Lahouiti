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
  //Prevent the default behavior of the browser to enable element dropping
  event.preventDefault();

  //@ts-ignore
  const container: HTMLElement = event.currentTarget;

  const mouseYPosition: number = event.clientY;

  const draggedDraggable: HTMLElement = selectQuery(".dragging");

  //Closest element from the mouse
  const closestElement: HTMLElement | null = getClosestElementFromMouse(
    container,
    mouseYPosition
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

function getClosestElementFromMouse(
  container: HTMLElement,
  mouseYPosition: number,
  findVertically: boolean = true
): HTMLElement | null {
  const staticDraggablesArray: HTMLElement[] = selectQueryAll(
    ".index__draggable:not(.dragging)",
    container
  );

  //We initialize 2 variables to get the closest element
  //and the the closest offset nearing the most 0
  let closestElement: HTMLElement | null = null;
  let closestOffset: number = Number.NEGATIVE_INFINITY;

  for (const staticDraggable of staticDraggablesArray) {
    const draggableRect: DOMRect = staticDraggable.getBoundingClientRect();
    const { top, height, left, width } = draggableRect;

    const currentOffset: number = findVertically
      ? mouseYPosition - (top + height / 2)
      : mouseYPosition - (left + width / 2);

    const isAboveAfterElement: boolean = currentOffset < 0;
    const hasGreaterOffset: boolean = currentOffset > closestOffset;

    if (isAboveAfterElement && hasGreaterOffset) {
      closestOffset = currentOffset;
      closestElement = staticDraggable;
    }
  }

  return closestElement;
}
