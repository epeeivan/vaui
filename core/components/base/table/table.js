import Component from "../../../component.js";
import { definePropsFromElement, isset } from "../../../component_f.js";


export default class table extends Component{
    constructor(table){
        super();
        this.name= "table";
        this.properties= definePropsFromElement(table);
        this.setAttributesFromProperties()
        this.add_class("w-full text-left ");
        !isset(this.properties.borderless) ? this.add_class("divide-y-2 divide-slate-100 dark:divide-dark-200") : null;

    }
}