import Component from "../../../component.js";
import { definePropsFromElement, isset } from "../../../component_f.js";


export default class sidebarSubmenu extends Component {
    constructor(sidebarSubmenu) {
        super();
        this.name = "ul"
        this.properties = definePropsFromElement(sidebarSubmenu ?? {});

        this.attributes = {
            class: " transition-all overflow-hidden ease-linear space-y-2 mt-2 duration-200 "
        }

        if (isset(this.properties.type) && this.properties.type == "active") {
            this.add_class("relative mt-0 h-auto");
        } else {
            this.add_class("h-[0px] -mt-5 absolute");
        }
    }

}