import { error, log } from "../utils/functions/console.functions";
import {
  addClass,
  getAttribute,
  modifyAttribute,
  removeClass,
  selectQuery,
} from "../utils/functions/dom.functions";
import {
  cssReset,
  darkThemeVariables,
  jsClasses,
  lightThemeVariables,
} from "../utils/variables/web-component.variables";

const draggableTemplateElement: HTMLTemplateElement =
  document.createElement("template");

const draggableTemplateCssStyle: string = /* css */ `

.draggable-element {
    align-items: center;
    background-color: var(--bg-primary);
    border-radius: calc(var(--container-border-radius) - var(--padding-container));
    display: flex;
    height: 50px;
    justify-content: space-between;
    overflow: hidden;
    width: 100%;
    padding: 5px;
}

.draggable-element.dragging{
  filter: invert(100%) hue-rotate(180deg);
}

.draggable-element__image {
    aspect-ratio: 1/1;
    border-radius: 50%;
    height: 35px;
    -o-object-fit: cover;
    object-fit: cover;
    -o-object-position: center;
    object-position: center;
}

.draggable-element__icon-container {
  background-color: var(--bg-primary);
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  filter: invert(100%) hue-rotate(180deg);
  gap: 0;
  height: 100%;
  width: 15%;
}

.draggable-element__icon-container:hover {
    cursor: grab;
}

.draggable-element__icon-container:active {
    cursor: grabbing;
}

.draggable-element__icon {
    scale: 250%;
}

.draggable-element__text-image-container {
    align-items: center;
    display: flex;
    gap: 20px;
    width: 75%;
}

.draggable-element__paragraph{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

@media(prefers-color-scheme:dark){
  .draggable-element__image{
    filter: invert(100%) hue-rotate(180deg);
  }
}
`;
const draggableTemplateHtmlContent: string = /*html */ `
  <div class="draggable-element">
      <div class="draggable-element__icon-container">
          <svg class="draggable-element__icon no-pointer-events" xmlns="http://www.w3.org/2000/svg" width="16"
              height="16" fill="var(--color-primary)">
              <path
                  d="M10 13a1 1 0 100-2 1 1 0 000 2zm-4 0a1 1 0 100-2 1 1 0 000 2zm1-5a1 1 0 11-2 0 1 1 0 012 0zm3 1a1 1 0 100-2 1 1 0 000 2zm1-5a1 1 0 11-2 0 1 1 0 012 0zM6 5a1 1 0 100-2 1 1 0 000 2z">
              </path>
          </svg>
      </div>
      <div class="draggable-element__text-image-container">
          <img class="draggable-element__image" src=""  alt=""/>
          <p class="draggable-element__paragraph">Name 1234</p>
      </div>
  </div>
`;

draggableTemplateElement.innerHTML = /*html */ `
  <style>
    ${jsClasses}
    ${cssReset}
    ${lightThemeVariables}
    ${darkThemeVariables}

    /* Actual CSS style for the web component*/
    ${draggableTemplateCssStyle}
  </style>
  
  ${draggableTemplateHtmlContent}
`;

class DraggableElement extends HTMLElement {
  constructor() {
    super();
    //We create the cotnainer that holds the web component
    const shadowRoot = this.attachShadow({ mode: "open" });

    //We clone the draggableTemplate
    const clonedTemplate = draggableTemplateElement.content.cloneNode(true);
    //We add it as a child of our web component
    shadowRoot.appendChild(clonedTemplate);

    //We bind the this keyword to have access to the shadow root
    this.enableDragging = this.enableDragging.bind(this);
    this.disableDragging = this.disableDragging.bind(this);

    this.addDraggingClass = this.addDraggingClass.bind(this);
    this.removeDraggingClass = this.removeDraggingClass.bind(this);
  }

  get name() {
    return getAttribute("name", this);
  }

  set name(newValue: string) {
    modifyAttribute("name", newValue, this);
  }

  get imageUrl() {
    return getAttribute("image-url", this);
  }

  set imageUrl(newValue: string) {
    modifyAttribute("image-url", newValue, this);
  }

  static get observedAttributes() {
    //We indicate the list of attributes that the custom element wants to observe for changes.
    return ["name", "image-url"];
  }

  private enableDragging(event: PointerEvent) {
    modifyAttribute("draggable", true, this);
  }
  private disableDragging(event: PointerEvent) {
    modifyAttribute("draggable", false, this);
  }

  private addDraggingClass(event: DragEvent | TouchEvent) {
    addClass(this, "dragging");
  }

  private removeDraggingClass(event: DragEvent | TouchEvent) {
    modifyAttribute("draggable", false, this);

    removeClass(this, "dragging");
  }

  connectedCallback() {
    const iconContainer: HTMLElement = selectQuery(
      ".draggable-element__icon-container",
      this.shadowRoot
    );

    iconContainer.addEventListener("pointerdown", this.enableDragging);
    iconContainer.addEventListener("pointerup", this.disableDragging);

    this.addEventListener("dragstart", this.addDraggingClass);
    this.addEventListener("touchstart", this.addDraggingClass);

    this.addEventListener("dragend", this.removeDraggingClass);
    this.addEventListener("touchend", this.removeDraggingClass);

    const image: HTMLImageElement = selectQuery(
      ".draggable-element__image",
      this.shadowRoot
    ) as HTMLImageElement;

    image.addEventListener("load", (e) => {
      log("Loaded image!", e, image);
    });
    image.addEventListener("error", (e) => {
      error("Image has an error!", e, image);
    });
  }

  disconnectedCallback() {
    const iconContainer: HTMLElement = selectQuery(
      ".draggable-element__icon-container",
      this.shadowRoot
    );

    iconContainer.removeEventListener("pointerdown", this.enableDragging);
    iconContainer.removeEventListener("pointerup", this.disableDragging);

    this.addEventListener("dragstart", this.addDraggingClass);
    this.addEventListener("touchstart", this.addDraggingClass);

    this.addEventListener("dragend", this.removeDraggingClass);
    this.addEventListener("touchend", this.removeDraggingClass);

    const image: HTMLImageElement = selectQuery(
      ".draggable-element__image",
      this.shadowRoot
    ) as HTMLImageElement;
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string
  ) {
    log(this);
    switch (name) {
      case "name": {
        const paragraph: HTMLParagraphElement = selectQuery(
          ".draggable-element__paragraph",
          this.shadowRoot
        ) as HTMLParagraphElement;

        paragraph.textContent = newValue;
        //…
        break;
      }

      case "image-url": {
        const image: HTMLImageElement = selectQuery(
          ".draggable-element__image",
          this.shadowRoot
        ) as HTMLImageElement;

        const hasNoUrl: boolean = newValue === "";
        if (hasNoUrl) {
          log("has no URL!");
          image.src = "./public/jpg/random-photo.jpg";
        } else {
          image.src = newValue;
        }
        image.alt = this.name;
        break;
      }

      default:
        break;
    }
  }
}

customElements.define("draggable-element", DraggableElement);
