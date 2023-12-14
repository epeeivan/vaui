import Component from "../../../component.js";
import { definePropsFromElement, isset } from "../../../component_f.js";
import { htmlToComponent } from "../../../htmlToComponent.js";

export default class cardImage extends Component {
    constructor(card) {
        super();
        this.name = "div";
        this.properties = definePropsFromElement(card);
        this.setAttributesFromProperties();
        this.add_class("rounded p-2 border-[1px] space-y-5 h-min");
        this.init(card)
    }
    init(card) {


        let basicClasses = "rounded border-[1px] h-min";
        this.add_child(this.image(), "image");
        this.add_child(this.textBox(card), "textBox");

        if (isset(this.properties.mode)) {
            switch (true) {
                case this.properties.mode == "stunded":
                    this.attributes.class = "space-y-5 " + basicClasses;
                    this.get_child("textBox").add_class("px-2")
                    this.get_child("image").attributes.class = "rounded-t"
                    break;
                default:
                case this.properties.mode == "land":
                    this.attributes.class = "space-x-5 flex " + basicClasses;
                    this.get_child("image").attributes.class = "rounded-l max-h-[150px]";
                    this.get_child("textBox").add_class("my-auto")

                    break;
                case this.properties.mode == "land_round":
                    this.attributes.class = "space-x-5 flex p-2 " + basicClasses;
                    this.get_child("image").name = "div";
                    this.get_child("image").attributes.class = "rounded-full bg-cover bg-center";

                    this.get_child("image").attributes.style = "background-image:url(" + this.properties.src + ");min-width:" + (this.properties.isize ?? "100") + "px;height:" + (this.properties.isize ?? "100") + "px";
                    this.get_child("textBox").add_class("my-auto")

                    break;
            }
        }

    }
    image() {
        return new Component({
            name: "img",
            attributes: {
                class: "rounded block",
                src: this.properties.src ?? null,
                alt: this.properties.alt ?? null,
            }
        })
    }
    textBox(card) {
        let tb = new Component({
            name: "div",
            attributes: {
                class: "space-y-2"
            }
        });

        isset(this.properties.title) ? tb.add_child(this.title(), "title") : null;
        tb.add_child(this.ptext(card), "text");
        return tb;
    }

    title() {
        return new Component({
            name: "span",
            attributes: { class: "text-lg font-black" },
            text: this.properties.title ?? "",
        })
    }
    ptext(card) {
        return new Component({
            name: "p",
            attributes: { class: "" },
            text: card.innerText ?? card.text,
        })
    }
}