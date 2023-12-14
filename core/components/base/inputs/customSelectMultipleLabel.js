import { isset } from "../../../component_f.js";
import basicSelectLabel from "./basicSelectLabel.js";
import customSelectMultiple from "./customSelectMultiple.js";


export default class customSelectMultipleLabel extends basicSelectLabel {
    constructor(customSelectMultipleLabel) {
        super(customSelectMultipleLabel);
        this.html.input = new customSelectMultiple(customSelectMultipleLabel);
        this.html.input.attributes.class = "w-full relative h-[37px] " + (isset(this.properties.class) ? this.properties.class.replace("custom-select-multiple-label","") : "")
    }

}