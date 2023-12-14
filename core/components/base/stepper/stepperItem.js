import Component from "../../../component.js";
import { definePropsFromElement, isset } from "../../../component_f.js";
import lucideIcon from "../utilities/lucideIcon.js";
import { title } from "../utilities/title.js";

export class stepperItem extends Component {
    constructor(step) {
        super();
        this.properties = definePropsFromElement(step);
        this.name = "fieldset";
        this.attributes = {
            pos: this.properties.pos ?? "",
            class: "border-t-2 w-full flex " + this.defineType().fieldset + (isset(this.properties.dashed) ? " border-dashed" : "")
        }
        isset(this.properties.dashed) ? this.attributes.dashed = "" : "";
        this.html = {
            legend: new Component(
                {
                    name: "legend",
                    attributes: {
                        class: "w-[50px] h-[50px] flex rounded-full " + this.defineType().legend + " " + this.definePosition()
                    }
                })
        }
        if (isset(this.properties.icon)) {
            this.get_child("legend").add_child(new lucideIcon({ icon: this.properties.icon, class: "m-auto" }))
        } else {
            this.get_child("legend").add_child(new title({ class: "m-auto", text: step.innerText ?? this.properties.text }))
        }
    }
    defineType() {
        switch (this.properties.type) {
            case "active":
                return { legend: "bg-primary-600 text-white", fieldset: "border-primary-600" };
            case "complete":
                return { legend: "bg-success-600 text-white", fieldset: "border-success-600" };

            case "danger":
                return { legend: "bg-danger-600 text-white", fieldset: "border-danger-600" };

            default:
                return { legend: "bg-secondary-100 text-secondary-600", fieldset: "border-secondary-600" };

        }
        return "";
    }
    definePosition() {
        switch (this.properties.pos) {
            case "left":
                return "mr-auto";
            case "right":
                return "ml-auto";
            case "center":
                return "mx-auto";
        }
    }
}