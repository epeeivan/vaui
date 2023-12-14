import Component from "../../../component.js";
import { definePropsFromElement, isset } from "../../../component_f.js";


export default class dropdownMenu extends Component {
    constructor(dropdownMenu) {
        super();
        this.name = "div";
        this.properties = definePropsFromElement(dropdownMenu);
        this.add_class("h-0 dark:bg-dark-300 dark:drop-shadow-2xl overflow-hidden px-2 shadow-lg -mt-10  transition-all ease-linear px-2 duration-50 bg-white p-0 absolute menu z-40 rounded " + isset(this.properties.right ? "right-0" : "left-0"))
        this.init(dropdownMenu);
    }
    init(dropdownMenu) {
        this.html = {
            header: new Component({ name: "div", attributes: { class: "" } }),
            menu: new Component({ name: "ul", attributes: { class: "list-none w-full divide-y divide-secondary-100 dark:divide-dark-300", style: "list-style-type:none" } })
        }
    }
}