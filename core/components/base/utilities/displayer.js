import Component from "../../../component.js";
import { definePropsFromElement, displayTarget } from "../../../component_f.js";
import lucideIcon from "./lucideIcon.js";


export class displayer extends Component {
    constructor(displayer) {
        super();
        this.name = "a";
        this.properties = definePropsFromElement(displayer);
        this.attributes = {
            class: "flex text-primary-100",
        }
        this.events.click = [[displayTarget, this.properties.target ?? ""]]
        this.init(displayer);
    }
    init(displayer) {
        this.html = {
            icon: new lucideIcon({ icon: this.properties.icon ?? "",class:"my-auto inactive-icon mr-2", with: this.properties.with ?? 15, height: this.properties.height ?? 15 }),
            activeIcon: new lucideIcon({ icon: this.properties["active-icon"] ?? "",class:"my-auto hidden active-icon mr-2", with: this.properties.with ?? 15, height: this.properties.height ?? 15 }),
            text: new Component({
                name: "span",
                attributes: {
                    class: "inactive-text block my-auto"
                },
                text: displayer.innerText ?? displayer.text,
            }),
            activeText: new Component({
                name: "span",
                attributes: {
                    class: "active-text block my-auto hidden"
                },
                text: this.properties["active-text"] ?? "",
            })
        }
    }
}
