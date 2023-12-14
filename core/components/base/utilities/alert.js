import Component from "../../../component.js";
import { definePropsFromElement, isset } from "../../../component_f.js";
import { slider } from "../slider/slider.js";
import lucideIcon from "./lucideIcon.js";
import { title } from "./title.js";

export class c_alert extends Component {
    constructor(c_alert) {
        super(c_alert);
        this.properties = definePropsFromElement(c_alert)
        this.name = "div";
        this.attributes = {
            class: "px-2 py-3 rounded "+this.defineType(),
        }
        if (isset(this.properties.icon)) {
            this.add_class("flex space-x-2");
            this.add_child(new Component({
                name: "div",
                html: {
                    icon: new lucideIcon({
                        icon: this.properties.icon,
                        width: this.properties["icon-size"] ?? null,
                        heigh: this.properties["icon-size"] ?? null,
                    })
                }
            }))
        }
        this.add_child(new Component({
            name: "div",
            attributes: {
                class: "w-full"
            },
        }), "container");

        if (isset(this.properties.title)) {
            this.get_child("container").add_class("space-y-2");
            this.get_child("container").add_child(new title({
                type: this.properties["title-type"] ?? "lg",
                text: this.properties.title
            }));
        }
        if (isset(c_alert.nodeName)) {
            let textContent = c_alert.querySelector(".text");
            this.get_child("container").add_child(new Component({
                name:isset(textContent)?textContent.nodeName:"p",
                text:isset(textContent)?textContent.innerText:""
            }))
        }else{
            this.get_child("container").add_child(new Component({
                name:"p",
                text:this.properties.text,
            }))
        }


    }
    defineType() {
        let classes = '';
        if ((isset(this.properties.type) && this.properties.type == "default") || !isset(this.properties.type)) {
            classes += ' bg-black  text-white'
        } else {
            classes += this.switchMode(this.properties.type);
        }

        return classes;
    }
    switchMode(type) {
        let c_classes = "";
        if (isset(this.properties.mode)) {
            if (this.properties.mode.includes("transp")) {
                c_classes += " bg-" + type + "-100/[0.2] text-" + type + "-100";
            }
            if (this.properties.mode.includes("stroke")) {
                c_classes += " border-[1px] border-primary-100";
                if (!this.properties.mode.includes("transp")) {
                    c_classes += " text-primary-100";
                }
            }
        } else {
            c_classes = " bg-" + type + "-100 text-white hover:bg-" + type + "-100";
        }
        return c_classes;
    }
    classes() {
        return [
            "bg-primary-100", "bg-primary-100/[0.2]", "bg-primary-200", "text-primary-100", "border-primary-100", "border-[1px]",
            "bg-success-100", "bg-success-100/[0.2]", "bg-success-200", "text-success-100", "border-success-100", "border-[1px]",
            "bg-danger-100", "bg-danger-100/[0.2]", "bg-danger-200", "text-danger-100", "border-danger-100", "border-[1px]",
            "bg-info-100", "bg-info-100/[0.2]", "bg-info-200", "text-info-100", "border-info-100", "border-[1px]",
            "bg-warning-100", "bg-warning-100/[0.2]", "bg-warning-200", "text-warning-100", "border-warning-100", "border-[1px]",
            "bg-secondary-100", "bg-secondary-100/[0.2]", "bg-secondary-200", "text-secondary-100", "border-secondary-100", "border-[1px]",
        ]
    }
}