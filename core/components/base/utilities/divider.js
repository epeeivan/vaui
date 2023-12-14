import Component from "../../../component.js";
import { definePropsFromElement } from "../../../component_f.js";


export default class divider extends Component {
    constructor(divider) {
        super()
        this.properties = definePropsFromElement(divider);
        this.name = "fieldset";
        this.attributes = {
            class: "border-t-[1px] flex border-secondary-300 dark:border-dark-100 w-full my-"
        };
        this.html = {
            legend: new Component({
                name: "legend",
                attributes: {
                    class: "capitalize " + this.definePosition() + " " + (this.properties.class ?? ""),
                },
                html: {
                    title: new Component({
                        name: "h1",
                        attributes: {
                            class: "capitalize  text-xs text-secondary-500 dark:text-slate-300",
                        },
                        text: this.properties.title ?? ""
                    }),
                    subTitle: new Component({
                        name: "span",
                        attributes: {
                            class: " text-secondary-500 ",
                            style: "font-size:11px",
                        },
                        text: this.properties.subtitle ?? ""
                    })
                }
            })
        }
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