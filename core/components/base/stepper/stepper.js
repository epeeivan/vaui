import Component from "../../../component.js";
import { definePropsFromElement, isset } from "../../../component_f.js";
import { stepperItem } from "./stepperItem.js";

export class stepper extends Component {
    constructor(stepper) {
        super();
        this.properties = definePropsFromElement(stepper);
        this.name = "div",
            this.attributes = {
                class: "flex "+(this.properties.class??"")
            }

        let steps = {};

        if (isset(stepper.nodeName)) {
            steps = stepper.querySelectorAll("a");
        } else {
            steps = stepper.steps ?? {};
        }

        for (const step in steps) {
            if (Object.hasOwnProperty.call(steps, step)) {
                this.add_child(new stepperItem(steps[step]));
            }
        }

    }
}