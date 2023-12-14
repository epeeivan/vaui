import Component from "../../../component.js";
import { definePropsFromElement } from "../../../component_f.js";


export default class tiIcon extends Component{
    constructor(icon){
        super();
        this.name="span"
        this.properties = definePropsFromElement(icon);
        this.setAttributesFromProperties();
        this.class = "ti-"+this.properties.name??"";
    }
}