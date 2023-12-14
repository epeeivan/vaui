import Component from "../../../component.js";
import { childNodes, definePropsFromElement, isset } from "../../../component_f.js";
import { contextMenuItem } from "./contextMenuItem.js";


export class contextMenu extends Component{
    constructor(contextMenu){
        super();
        this.name = "div";
        this.properties = definePropsFromElement(contextMenu);
        this.attributes = {
            id:this.properties.id??null,
            class:"bg-white context-menu shadow-lg rounded absolute z-50 hidden py-2 dark:bg-dark-300",
        }
        
        let items = isset(contextMenu.nodeName)?contextMenu.querySelectorAll("a"):contextMenu.items;
        items.forEach(item => {
            this.add_child(new contextMenuItem(item));
        });
    }
}   