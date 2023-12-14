import Component from "../../../component.js";
import { definePropsFromElement, isset } from "../../../component_f.js";
import { htmlToComponent } from "../../../htmlToComponent.js";


export default class tableCell extends Component {
    constructor(cell) {
        super();
        this.properties = definePropsFromElement(cell)
        this.name = (this.properties.type == "h") ? "th" : "td";
        this.attributes = {
            class: "p-2 px-3",
        };
        if (isset(cell.nodeName)) {
            let content = htmlToComponent(cell).html;
            this.html = content;
        } else {
            this.text = this.properties.text ?? "";
            this.html = this.properties.html ?? null;
        }
    }
}