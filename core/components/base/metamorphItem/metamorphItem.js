import Component from "../../../component.js";
import { definePropsFromElement, isset } from "../../../component_f.js";
import { htmlToComponent } from "../../../htmlToComponent.js";
import { closeModal, openModal } from "../componentFunctions/modalFunctions.js";
import { convertToRGB, getTextColorFromBackground, randomColor, randomRgbColor } from "../contextMenu/contextMenu_f.js";
import { loadContent } from "../utilities/link.js";

export class metamorphItem extends Component {
    constructor(metamorphItem) {
        super(metamorphItem);
        this.properties = definePropsFromElement(metamorphItem);
        this.name = "a";
        this.attributes = {
            class: "bg-white  dark:bg-dark-300 dark:border-dark-200 " + (this.properties.class ?? "") + this.buidBoxStyle(),
            href: this.properties.href
        }
        isset(this.properties.href) ? this.attributes.href = this.properties.href : "";
        this.init(metamorphItem);
        isset(this.properties.vertical) ? this.get_child("icon").add_class("mx-auto") : "";
        if (isset(this.properties["no-reload"])) {
            this.add_event("click", [loadContent, { url: this.properties.href, box: this.properties.box }])
        }
    }
    buidBoxStyle() {
        let finalBoxStyle = "";
        console.log(this.properties.vertical);
        finalBoxStyle += isset(this.properties.default) ? "p-5 space-x-2  rounded-lg border-[1px] flex text-sm " : "";
        finalBoxStyle += isset(this.properties.vertical) ? "flex flex-wrap p-5 space-y-2 rounded border-[1px] flex text-sm " : "";

        return finalBoxStyle
    }

    init(metamorphItem) {
        isset(this.properties.icon) ? this.add_child(this.icon(), "icon") : null;
        this.add_child(new Component({ name: "div", attributes: { class: "w-full" }, }), "content");
        if (isset(metamorphItem.nodeName)) {
            let h_content = metamorphItem.querySelector(".content");
            if (isset(h_content)) {
                let content = htmlToComponent(h_content);
                this.get_child("content").html = content;
            }
        }
        if (isset(this.properties.modal)) {
            console.log(this.properties.modal)
            this.add_event("click", [openModal, this.properties.modal])
        }
    }
    icon() {
        let iconBg = randomRgbColor();
        let iconTextColor = getTextColorFromBackground(iconBg);
        return new Component({
            name: "div",
            attributes: {
                style: "background-color:" + iconBg + ";color:" + iconTextColor,
                class: "icon min-w-[50px] max-w-[50px] min-h-[50px] max-h-[50px] rounded-full flex bg-secondary-100/[0.2]"
            },
            html: {
                "title": new Component({
                    name: "h1",
                    attributes: { class: " block h-min capitalize m-auto text-2xl leading-0" },
                    text: this.properties.icon ?? "I"
                })
            }
        })
    }

}