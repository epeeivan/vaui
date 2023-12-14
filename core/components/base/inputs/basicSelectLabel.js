import Component from "../../../component.js";
import { definePropsFromElement, defineTextWidth } from "../../../component_f.js";

import basicSelect from "./basicselect.js";


export default class basicSelectLabel extends Component {
    constructor(basicSelectLabel) {
        super();
        this.name = "div",
            this.properties = definePropsFromElement(basicSelectLabel)
        this.attributes = {
            class:"space-y-2 w-full"
        };
        this.init(basicSelectLabel);
    }
    init(basicSelectLabel) {
        this.html = {
            label: new Component({
                name: "label",
                attributes: {
                    class: "dark:text-white capitalize "+defineTextWidth(this.properties.width??null)
                },
                text: this.properties.label ?? ""
            }),
            input: new basicSelect(basicSelectLabel)
        }
    }
}