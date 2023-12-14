import Component from "../../../component.js";
import { definePropsFromElement } from "../../../component_f.js";
import lucideIcon from "./lucideIcon.js";


export class infoBoxLine extends Component {
    constructor(infoBoxLine) {
        super();
        this.properties = definePropsFromElement(infoBoxLine);
        this.name = "div";
        this.attributes = {
            class:"flex space-x-2 text-sm",
        }
        if (isset(this.properties.icon)) {
            this.add_child(new lucideIcon({icon:this.properties.icon,width:15}));
        }
        this.add_child(new Component({name:"span",text:infoBoxLine.innerText??this.properties.text}));

    }
}