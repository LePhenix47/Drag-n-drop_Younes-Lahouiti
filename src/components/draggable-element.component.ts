import {
  getAttribute,
  modifyAttribute,
} from "../utils/functions/dom.functions";
import {
  cssReset,
  darkThemeVariables,
  lightThemeVariables,
} from "../utils/vairables/web-component.variables";

const draggableTemplateElement = document.createElement("template");

const draggableTemplateCssStyle = /* css */ `
 .draggable-element{}

 .draggable-element__icon-container{}

 .draggable-element__icon{}

 .draggable-element__text-image-container{}

 .draggable-element__image{}

 .draggable-element__paragraph{}
`;
const draggableTemplateHtmlContent = /*html */ `
 <div class="draggable-element">
    <div class="draggable-element__icon-container">
        <svg class="draggable-element__icon no-pointer-events" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
            <path
                d="M10 13a1 1 0 100-2 1 1 0 000 2zm-4 0a1 1 0 100-2 1 1 0 000 2zm1-5a1 1 0 11-2 0 1 1 0 012 0zm3 1a1 1 0 100-2 1 1 0 000 2zm1-5a1 1 0 11-2 0 1 1 0 012 0zM6 5a1 1 0 100-2 1 1 0 000 2z">
            </path>
        </svg>
    </div>
    <div class="draggable-element__text-image-container">
        <img class="draggable-element__image" src="../../public/jpg/random-photo.jpg" />
        <p class="draggable-element__paragraph">Name 1234</p>
    </div>
 </div>
`;

draggableTemplateElement.innerHTML = /*html */ `
  <style>
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
  }

  get name() {
    return getAttribute("name", this);
  }

  set name(newValue: string) {
    modifyAttribute(this, "name", newValue);
  }

  static get observedAttributes() {
    //We indicate the list of attributes that the custom element wants to observe for changes.
    return ["name"];
  }

  connectedCallback() {}

  disconnectedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "name": {
        //…
        break;
      }
      default:
        break;
    }
  }
}

customElements.define("draggable-element", DraggableElement);
