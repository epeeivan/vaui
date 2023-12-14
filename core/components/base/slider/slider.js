import Component from "../../../component.js";
import { childNodes, definePropsFromElement, isset } from "../../../component_f.js";
import { sliderPage } from "./sliderPage.js";


export class slider extends Component {
    constructor(slider) {
        super();
        this.properties = definePropsFromElement(slider);
        this.name = "div";
        this.attributes = {

            class: "overflow-x-hidden w-full",
            id: this.properties.id ?? null,
        }
        this.add_child(new Component({ name: "div" }), "container");

        this.get_child("container").attributes = {
            class: "transition-all ease-linear duration-200  flex " + (this.properties.class ?? ""),
        }
        let width = isset(this.properties.grid) ? (100 * parseInt(this.properties.grid)) + "%" : "";
        this.get_child("container").attributes.style = "min-width:" + width + ";max-width:" + width
        let pages = slider.querySelectorAll(":scope>.page");
        console.log(pages)
        let counter = 0;
        let calcWidth = (100 / pages.length) + "%" ;

        pages.forEach(page => {
                this.get_child("container").add_child(new sliderPage(page));
                this.get_child("container").last_child().attributes.style = "min-width:" + calcWidth + "; overflow:hidden;max-width:" + calcWidth;
        });
    }
}