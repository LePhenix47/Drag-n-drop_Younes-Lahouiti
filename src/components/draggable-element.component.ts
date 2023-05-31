import { error, log, warn } from "../utils/functions/console.functions";
import {
  addClass,
  getAttribute,
  modifyAttribute,
  removeClass,
  selectQuery,
} from "../utils/functions/dom.functions";
import { checkImageValidity } from "../utils/functions/file.functions";
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
  background-color: var(--bg-primary);
  border-radius: calc(var(--container-border-radius) - var(--padding-container));
  display: flex;
  align-items: center;
  gap: 20px;
  overflow: hidden;
  height: 50px;
  width: 100%;
 /* padding: 5px;*/

  position: relative;
}

.draggable-element.dragging{
  filter: invert(100%) hue-rotate(180deg);
}

.draggable-element.dragging img{
   filter: invert(0%) hue-rotate(0deg);
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
  border-radius: 8px 0 0 8px;
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

.draggable-element__button-container{
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}

.draggable-element__button{
  position: absolute;
  right: 0;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  aspect-ratio: 1/1;
  height: 100%;

  width: 0;

  transform-origin: right;

  transition: 
    width 350ms ease-out,  
    background-color 350ms ease-out
  ;
}

.draggable-element:hover .draggable-element__button{
  width: 15%;
  background-color: var(--delete-button-bg);
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
      <div class="draggable-element__button-container">
          <button type="button" class="draggable-element__button">
            <svg class="no-pointer-events" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" height="20" width="20" fill="var(--delete-button-color)">
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
          </button>
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

/**
 * Custom element representing a draggable element.
 *
 * @class DraggableElement
 * @extends {HTMLElement}
 */
class DraggableElement extends HTMLElement {
  /**
   * Constructs a new DraggableElement.
   *
   * @constructor

   */
  constructor() {
    super();
    //We create the cotnainer that holds the web component
    const shadowRoot = this.attachShadow({ mode: "open" });

    //We clone the draggableTemplate
    const clonedTemplate = draggableTemplateElement.content.cloneNode(true);
    //We add it as a child of our web component
    shadowRoot.appendChild(clonedTemplate);

    // Bind methods to the instance
    this.enableDragging = this.enableDragging.bind(this);
    this.disableDragging = this.disableDragging.bind(this);

    this.addDraggingClass = this.addDraggingClass.bind(this);
    this.removeDraggingClass = this.removeDraggingClass.bind(this);

    this.deleteWebComponent = this.deleteWebComponent.bind(this);
  }

  /**
   * Gets the value of the `name` attribute.
   * @returns {string} The value of the `name` attribute.
   */
  get name(): string {
    return getAttribute("name", this);
  }

  /**
   * Sets the value of the `name` attribute.
   * @param {string} newValue - The new value for the `name` attribute.
   */
  set name(newValue: string) {
    modifyAttribute("name", newValue, this);
  }

  /**
   * Gets the value of the `image-url` attribute.
   * @returns {string} The value of the `image-url` attribute.
   */
  get imageUrl(): string {
    return getAttribute("image-url", this);
  }

  /**
   * Sets the value of the `image-url` attribute.
   * @param {string} newValue - The new value for the `image-url` attribute.
   */
  set imageUrl(newValue: string) {
    modifyAttribute("image-url", newValue, this);
  }

  /**
   * Specifies the attributes to observe for changes.
   * @returns {string[]} An array of attribute names to observe.
   */
  static get observedAttributes(): string[] {
    return ["name", "image-url"];
  }

  /**
   * Enables dragging of the draggable element.
   * @param {PointerEvent} event - The pointer event that triggered the enable dragging action.
   * @returns {void}
   * @private
   */
  private enableDragging(event: PointerEvent): void {
    modifyAttribute("draggable", true, this);
  }

  /**
   * Disables dragging of the draggable element.
   * @param {PointerEvent} event - The pointer event that triggered the disable dragging action.
   * @returns {void}
   * @private
   */
  private disableDragging(event: PointerEvent): void {
    modifyAttribute("draggable", false, this);
  }

  /**
   * Adds the "dragging" class to the draggable element.
   * @param {DragEvent | TouchEvent} event - The drag event or touch event that triggered the adding of the class.
   * @returns {void}
   * @private
   */
  private addDraggingClass(event: DragEvent | TouchEvent): void {
    addClass(this, "dragging");
  }

  /**
   * Removes the "dragging" class from the draggable element.
   * @param {DragEvent | TouchEvent} event - The drag event or touch event that triggered the removing of the class.
   * @returns {void}
   * @private
   */
  private removeDraggingClass(event: DragEvent | TouchEvent): void {
    modifyAttribute("draggable", false, this);
    removeClass(this, "dragging");
  }

  private deleteWebComponent(event: Event) {
    this.remove();
  }

  /**
   * Called when the element is connected to the DOM.
   * @returns {void}
   */
  connectedCallback(): void {
    const iconContainer: HTMLElement = selectQuery(
      ".draggable-element__icon-container",
      this.shadowRoot
    );

    iconContainer.addEventListener("pointerdown", this.enableDragging);
    iconContainer.addEventListener("pointerup", this.disableDragging);

    this.addEventListener("dragstart", this.addDraggingClass);
    this.addEventListener("touchstart", this.addDraggingClass, {
      passive: true,
    });

    this.addEventListener("dragend", this.removeDraggingClass);
    this.addEventListener("touchend", this.removeDraggingClass);

    const deleteButton: HTMLButtonElement = selectQuery(
      ".draggable-element__button",
      this.shadowRoot
    ) as HTMLButtonElement;

    deleteButton.addEventListener("click", this.deleteWebComponent);
  }

  /**
   * Called when the element is disconnected from the DOM.
   * @returns {void}
   */
  disconnectedCallback(): void {
    const iconContainer: HTMLElement = selectQuery(
      ".draggable-element__icon-container",
      this.shadowRoot
    );

    iconContainer.removeEventListener("pointerdown", this.enableDragging);
    iconContainer.removeEventListener("pointerup", this.disableDragging);

    this.addEventListener("dragstart", this.addDraggingClass);
    this.addEventListener("touchstart", this.addDraggingClass, {
      passive: true,
    });

    this.addEventListener("dragend", this.removeDraggingClass);
    this.addEventListener("touchend", this.removeDraggingClass);

    const deleteButton: HTMLButtonElement = selectQuery(
      ".draggable-element__button",
      this.shadowRoot
    ) as HTMLButtonElement;
    deleteButton.removeEventListener("click", this.deleteWebComponent);

    log(`Removed or moved to another container ${this.name}'s card`);
  }

  /**
   * Called when observed attributes are modified.
   * @param {string} name - The name of the attribute that changed.
   * @param {string|null} oldValue - The previous value of the attribute.
   * @param {string} newValue - The new value of the attribute.
   *
   * @returns {Promise<void>}
   *
   * @async - Asychronous when changing the image URL
   */
  async attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string
  ): Promise<void> {
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

        try {
          await checkImageValidity(newValue);

          //We set the source of the image to the URL provided if it's valid
          image.src = newValue;
          //
          log("%cSuccess!", "background:green; padding: 5px; font-size: 20px");
        } catch (imageUrlError) {
          warn(imageUrlError);
          image.src = "./public/jpg/random-photo.jpg";
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
