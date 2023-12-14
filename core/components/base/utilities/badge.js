import Component from "../../../component.js";
import { definePropsFromElement, isset } from "../../../component_f.js";


export default class badge extends Component {

    constructor(badge) {
        super();
        this.name = "span";
        this.properties = definePropsFromElement(badge);
        this.text = this.properties.label ?? badge.innerText;
        this.attributes.style = "padding:2px 10px";
        this.add_class(this.defineType());
    }
    init() {

    }
    defineType() {
        let classes = 'inline-block px-3 rounded capitalize text-xs';

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
                c_classes += " bg-" + type + "-100/[0.2] text-" + type + "-600";
            }
            if (this.properties.mode.includes("stroke")) {
                c_classes += " border-[1px] border-primary-600";
                if (!this.properties.mode.includes("transp")) {
                    c_classes += " text-primary-600";
                }
            }
        } else {
            c_classes = " bg-" + type + "-600 text-white hover:bg-" + type + "-600";
        }
        return c_classes;
    }
    classes() {
        return [
            "bg-primary-100", "bg-primary-100/[0.2]", "bg-primary-600", "text-primary-600", "border-primary-600", "border-[1px]",
            "bg-success-600", "bg-success-100/[0.2]", "bg-success-600", "text-success-600", "border-success-600", "border-[1px]",
            "bg-danger-600", "bg-danger-100/[0.2]", "bg-danger-600", "text-danger-600", "border-danger-600", "border-[1px]",
            "bg-info-600", "bg-info-100/[0.2]", "bg-info-600", "text-info-600", "border-info-600", "border-[1px]",
            "bg-warning-600", "bg-warning-100/[0.2]", "bg-warning-600", "text-warning-600", "border-warning-600", "border-[1px]",
            "bg-secondary-600", "bg-secondary-100/[0.2]", "bg-secondary-600", "text-secondary-600", "border-secondary-600", "border-[1px]",
        ]
    }
}