import Component from "../../../component.js";
import { definePropsFromElement, defineTextWidth, defineWidth } from "../../../component_f.js";
import basicInput from "./basicinput.js";

export default class basicInputLabel extends Component {
    constructor(basicInputLabel) {
        super();
        this.name = "div",
        this.properties = definePropsFromElement(basicInputLabel)
        this.attributes = {
            class:"space-y-2 w-full "
        };
        this.init();
    }
    init() {
        this.html = {
            label: new Component({
                name: "label",
                attributes: {
                    class: "capitalize dark:text-white "+defineTextWidth(this.properties.width??null)
                },
                text: this.properties.label ?? ""
            }),
            input: new basicInput(this.properties)
        }
    }
}