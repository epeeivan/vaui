import Component from "../../../component.js";
import { definePropsFromElement, isset } from "../../../component_f.js";
import ui from "../../../ui.js";
import dropdownItem from "./dropdownItem.js";
import dropdownMenu from "./dropdownMenu.js";


export default class dropdown extends Component {
    constructor(dropdown) {
        super();
        this.name = "div";
        this.properties = definePropsFromElement(dropdown);
        this.attributes = {
            tabindex: 0
        }
        this.add_class("group relative " + this.properties.class ?? "")
        this.init(dropdown);
        if (isset(dropdown.nodeName)) {
            this.fill(dropdown);
        }
        this.add_event("focusin", openDropdown)
        this.add_event("focusout", openDropdown)
    }
    init(dropdown) {
        this.html = {
            controls: new Component({ name: "div", attributes: { class: "w-full" } }),
            menu: new dropdownMenu(dropdown)
        }
    }
    fill(dropdown) {
        let items = dropdown.querySelectorAll("a");
        items.forEach(item => {
            this.get_child("menu").get_child("menu").add_child(new dropdownItem(item))
        });
    }
}
export function openDropdown(dropdown) {
    // alert();
    let menu = dropdown.querySelector(".menu");
    menu.classList.toggle("h-[auto]")
    menu.classList.toggle("block")
    menu.classList.toggle("h-0")
    menu.classList.toggle("py-2")
    menu.classList.toggle("-mt-10")
    menu.classList.toggle("mt-0")
}