import Component from "../../../../component.js";
import { definePropsFromElement, isset } from "../../../../component_f.js";
import ListDetailItem from "./listDetailItem.js";

export default class ListDetail extends Component {
    constructor(list) {
        super();
        this.properties = definePropsFromElement(list);
        this.name = "div";
        this.attributes = {
            class: " text-white rounded-2xl overflow-hidden"
        };
        isset(this.properties.title) || isset(this.properties["sub-title"]) ? this.add_child(this.header(), "header") : null;

        let items = isset(list.nodeName) ? list.querySelectorAll("li") : (list.items??[]);

        if (items.length > 0) {
            this.add_child(new Component({ name: "ul" ,attributes:{class:"p-5 bg-dark-400 space-y-2"}}), "list")
            items.forEach(item => {
                this.get_child("list").add_child(new ListDetailItem(item));
            });
        }

    }
    header() {
        let header = new Component({
            name: "div",
            attributes: {
                class: "space-y-2 bg-dark-600 p-2 px-5"
            }
        })
        isset(this.properties.title) ? header.add_child(this.textItem(this.properties.title), "title") : null;
        isset(this.properties["sub-title"]) ? header.add_child(this.textItem(this.properties["sub-title"]), "subtitle") : null;

        isset(this.properties["sub-title"])?header.get_child("subtitle").attributes.class = "text-sm":null;
        return header;
    }

    textItem(text) {
        return new Component({
            name: "span",
            attributes: {
                class: "capitalize font-black text-xl block"
            },
            text: text
        })
    }
}