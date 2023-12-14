import Component from "../../../component.js";
import { definePropsFromElement, isset } from "../../../component_f.js";

export default class ProgressBar extends Component {
    constructor(progress) {
        super();
        this.properties = definePropsFromElement(progress);
        this.name = "div";
        this.attributes = {
            class: "space-y-2 " + (this.properties.class ?? ""),
        }

        this.properties.label ?
            this.add_child(this.labels())
            : null;

        this.add_child(this.bar(), "bar");

    }

    labels() {
        let lbs = new Component({
            name: "div",
            attributes:{
                class:"flex"
            }
        });

        this.properties.label ?
            lbs.add_child(this.label(this.properties.label),) : null;

        this.properties.value ?
            lbs.add_child(this.value(this.properties.value)) : null;

        return lbs;

    }
    label(label) {
        return new Component({
            name: "label",
            text: label,
            attributes: {
                class: "mr-auto my-auto block"
            }
        });
    }
    value(label) {
        let val = this.label(label);

        val.attributes.class = "text-secondary-600 my-auto block";
        return val;
    }
    bar() {
        return new Component({
            name: "div",
            attributes: {
                class: "rounded-full bg-primary-100"
            },
            html: {
                progress: new Component({
                    name: "div",
                    attributes: {
                        class: "p-1 rounded-full bg-primary-600",
                        style: "width:" + (this.properties.value ?? 0) + "%"
                    }
                })
            }

        })
    }
}