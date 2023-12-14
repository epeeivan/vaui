import Component from "../../../component.js";
import { definePropsFromElement } from "../../../component_f.js";


export default class lucideIcon extends Component{
    constructor(lucideIcon){
        super();
        this.name = "i";
        this.properties= definePropsFromElement(lucideIcon)
        this.attributes = {
            class:this.properties.class??"",
            height:this.properties.height??18,
            width:this.properties.width??18,
            "icon-name":this.properties.icon,
            "stroke-width":this.properties.stroke??2,
        }
    }
}