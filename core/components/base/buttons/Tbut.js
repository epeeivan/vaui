import Component from "../../../component.js";
import { definePropsFromElement } from "../../../component_f.js";

export default class Tbut extends Component{
    constructor(button){
        super();
        this.properties = definePropsFromElement(button);

        this.template = '<button onClick="'+sayHello+'">toto</button>'
    }
}
function sayHello(){
    alert(hello)
}