import Component from "../../../component.js";
import { childNodes } from "../../../component_f.js";
import lucideIcon from "../utilities/lucideIcon.js";



export default class buttonToggleMode extends Component {
    /**
     * 
     * @param {*} buttonToggleMode 
     */
    constructor(buttonToggleMode) {
        super()
        let dark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        this.name = "div";
        // th
        this.attributes = {
            class: "flex space-x-1 bg-primary-100/[0.2] w-auto p-1 rounded-full mr-auto"
        }
        this.html = {
            sun: this.button({ iconName: "sun" }),
            moon: this.button({ iconName: "moon" }),
        }
        let activeClasses = "flex rounded-full w-[30px] h-[30px] bg-primary-100 text-white";
        if (dark) {
            this.html.moon.attributes.class = activeClasses;
        } else {
            this.html.sun.attributes.class = activeClasses;
        }
    }
    /**
     * 
     * @param {*} button 
     * @returns 
     */
    button(button) {
        return new Component({
            name: "button",
            attributes: {
                class: "flex rounded-full w-[30px] h-[30px]  text-primary-100",
                type: "button"
            },
            html: {
                icon: new lucideIcon({ icon: button.iconName, width: 20, class: "m-auto" })
            },
            events: {
                click: [[toggleMode, { default: "flex rounded-full w-[30px] h-[30px]  text-primary-100", active: "flex rounded-full w-[30px] h-[30px] bg-primary-100 text-white" }]],
            }
        })
    }

}
/**
 * 
 * @param {*} obj 
 * @param {*} e 
 * @param {*} classes 
 */
function toggleMode(obj, e, classes) {
    let buttons = childNodes(obj.parentNode);
    toggleClasses(obj)
    if (obj == buttons[0]) {
        toggleClasses(buttons[1])
    } else {
        toggleClasses(buttons[0])
    }
    document.querySelector("html").classList.toggle("dark")

}
/**
 * 
 * @param {*} obj 
 */
function toggleClasses(obj) {
    obj.classList.toggle("bg-primary-100");
    obj.classList.toggle("text-white");
    obj.classList.toggle("text-primary-100");
}