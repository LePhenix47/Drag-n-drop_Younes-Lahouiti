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
    container.addEventListener("touchmove", handleDraggingElementDragOver);
  }
}
addContainerEventListeners();

function handleDraggingElementDragOver(event: DragEvent | TouchEvent) {
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
  const closestElement: HTMLElement | null = getClosestElementFromMouse(
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

function getClosestElementFromMouse(
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
