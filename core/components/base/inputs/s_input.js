import Component from "../../../component.js";
import { definePropsFromElement } from "../../../component_f.js";

export default class s_input extends Component {
    constructor(input) {
        super();
        this.name = "div";
        this.properties = definePropsFromElement(input);
        this.init(input);
    }
    init(input){
        this
    }
}