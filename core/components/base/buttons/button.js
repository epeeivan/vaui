import Component from "../../../component.js";
import { defineIconWidth, definePropsFromElement, defineWidth, displayTarget, isEmpty, isset } from "../../../component_f.js";
import { openModal } from "../componentFunctions/modalFunctions.js";
import { activeStep } from "../componentFunctions/stepper_functions.js";
import lucideIcon from "../utilities/lucideIcon.js";
import { pinger } from "../utilities/pinger.js";


export default class button extends Component {

    constructor(button) {
        super();
        this.properties = definePropsFromElement(button);
        this.init(button)
    }
    /**
     * 
     * @param {*} button 
     */
    init(button) {
        this.name = "button";
        this.attributes = {
            type: this.properties["type"] ?? "",
            class: this.defineType() + " h-min " + (this.properties.square ?? defineWidth(this.properties.width ?? "")) + " " + (this.properties.class ?? ""),
            id: this.properties.id ?? "",
            modal: this.properties.modal ?? "",
            target: this.properties.target ?? null,
        }

        this.events.click = [];

        if (isset(this.properties.pinger)) {
            this.add_child(new pinger({}), "pinger");
            this.get_child("pinger").add_class(" ");
            this.events.click.push(hidePinger);
            this.add_class("relative")
        }
        if (isset(this.properties.modal) && !isEmpty(this.properties.modal)) {
            this.events.click.push([openModal, this.properties.modal]);
        }
        if (isset(this.properties.stepper) && isset(this.properties.step)) {
            this.events.click.push([activeStep, { stepper: this.properties.stepper, step: this.properties.step }]);
        }

        if (isset(this.properties.icon) && !isEmpty(this.properties.icon)) {
            this.add_child(new Component({
                name: "div",
                attributes: { class: "my-auto" },
                html: {
                    icon: new lucideIcon({ icon: this.properties.icon, class: (isset(this.properties.square) ? "m-auto" : ""), width: defineIconWidth(this.properties.width ?? ""), height: defineIconWidth(this.properties.width ?? "") })
                }

            }), "icon");

        }

        this.add_class(this.properties.class ?? "");
        if (isset(button.innerText) || isset(this.properties.text)) {
            this.add_child(new Component({ name: "span", attributes: { class: "w-full my-auto h-[fit-content]  block" }, text: button.innerText ?? this.properties.text }), "text");
        }
        if (isset(this.html.icon) && isset(this.html.text) && !isEmpty(this.html.text.text)) {
            this.add_class("space-x-2 flex")
        }
        isset(this.properties["title-to-change"]) ? this.add_event('click', [changeTitle, { title: this.properties["title-to-change"], value: this.properties.text ?? button.innerText }]) : '';

    }


    /**
     * 
     * @returns 
     */
    defineType() {
        let classes = 'inline-block capitalize';
        if ((isset(this.properties.color) && this.properties.color == "default") || !isset(this.properties.color)) {
            if (isset(this.properties.color)) {
                classes += ' bg-black  text-white';
            }
        } else {
            classes += this.switchMode(this.properties.color);
        }

        classes += ' ' + (isset(this.properties.round) ? 'rounded-full' : 'rounded');

        return classes;
    }
    /**
     * 
     * @param {*} type 
     * @returns 
     */
    switchMode(type) {
        let c_classes = "";
        if (isset(this.properties.mode)) {
            if (this.properties.mode.includes("transp")) {
                c_classes += " bg-" + type + "-600/[0.2] text-" + type + "-600";
            }
            if (this.properties.mode.includes("stroke")) {
                c_classes += " border-[1px] border-" + type + "-600";
                if (!this.properties.mode.includes("transp")) {
                    c_classes += " text-" + type + "-600";
                }
            }
        } else {
            c_classes = " bg-" + type + "-600  hover:bg-" + type + "-600 " + (this.properties.color != "yellow" ? "text-white" : "");
        }
        return c_classes;
    }
    /**
     * 
     * @returns 
     */
    classes() {
        return [
            "bg-primary-600/[0.2]", "bg-primary-600", "bg-primary-200", "text-primary-600", "border-primary-600", "border-[1px]",
            "bg-success-600/[0.2]", "bg-success-600", "bg-success-200", "text-success-600", "border-success-600", "border-[1px]",
            "bg-danger-600/[0.2]", "bg-danger-600", "bg-danger-200", "text-danger-600", "border-danger-600", "border-[1px]",
            "bg-info-600/[0.2]", "bg-info-600", "bg-info-200", "text-info-600", "border-info-600", "border-[1px]",
            "bg-warning-600/[0.2]", "bg-warning-600", "bg-warning-200", "text-warning-600", "border-warning-600", "border-[1px]",
            "bg-secondary-600/[0.2]", "bg-secondary-600", "bg-yellow-600", "bg-secondary-200", "text-secondary-600", "border-secondary-600", "border-[1px]",
        ]
    }
}

function hidePinger(obj, e) {
    let pinger = obj.querySelector(".pinger");
    if (isset(pinger)) {
        pinger.classList.add("hidden");
    }
}
export function changeTitle(obj, e, datas) {
    let dTitle = document.getElementById(datas.title) ?? document.querySelector(datas.title);
    dTitle.innerText = datas.value;
}