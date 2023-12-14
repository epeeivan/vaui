import Component from "../../../component.js";
import { definePropsFromElement, isset } from "../../../component_f.js";
import { htmlToComponent } from "../../../htmlToComponent.js";

export default class InfiniteSlider extends Component {
    constructor(ins) {
        super();
        this.name = "div";
        this.properties = definePropsFromElement(ins);
        this.attributes = {
            class: "overflow-x-hidden  transiton-all ease-in  duration-200 " + (this.properties.class ?? ""),
            id: this.properties.id,
        }

        let childsCount = isset(ins.nodeName) ? ins.querySelector(".content").children.length : (ins.count ?? 1);

        this.html = {
            content: new Component({
                name: "div",
                attributes: {
                    class: " space-x-3 flex content transiton-all ease-in  duration-200",
                    style: "width:" + (100 * childsCount) + "%",
                },
            })
        }
        if (isset(ins.nodeName)) {
            this.get_child("content").html = htmlToComponent(ins.querySelector(".content")).html;
        }else{

        }

    }
}