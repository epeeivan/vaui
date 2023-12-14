import Component from "../../../component.js";
import { definePropsFromElement } from "../../../component_f.js";

export class title extends Component {
    constructor(title) {
        super();
        this.properties = definePropsFromElement(title);
        this.attributes = {
            class: "dark:text-white " + (this.properties.class ?? ""),
            id:this.properties.id??null
        };
        switch (this.properties.type) {
            case "xs":
                this.name = "h6";
                this.add_class("text-xs");
                break;
            case "sm":
                this.name = "h5";
                this.add_class("text-sm");
                break;
            case "lg":
                this.name = "h4";
                this.add_class("text-lg");
                break;
            case "xl":
                this.name = "h3";
                this.add_class("text-xl");
                break;
            case "2xl":
                this.name = "h2";
                this.add_class("text-2xl");
                break;
            case "3xl":
                this.name = "h1";
                this.add_class("text-3xl");
                break;
            case "4xl":
                this.name = "h1";
                this.add_class("text-4xl");
                break;
            case "5xl":
                this.name = "h1";
                this.add_class("text-5xl");
                break;
            case "6xl":
                this.name = "h1";
                this.add_class("lg:text-6xl text-4xl");
                break;
            case undefined:
                this.name = "h1";
                this.add_class("text-3xl");
                break;
            default:
                this.name = "h1";
                break;
        }
        this.text = title.innerText ?? title.text;
        this.add_class(this.properties.class ?? "");
    }
}