import { isset } from "../../../component_f.js";
import basicSelectLabel from "./basicSelectLabel.js";
import customSelect from "./customSelect.js";

export default class customSelectLabel extends basicSelectLabel {
    constructor(customSelectLabel) {
        super(customSelectLabel);
        this.html.input = new customSelect(customSelectLabel);
        this.html.input.attributes.class = "w-full relative h-[37px] " + (isset(this.properties.class) ? this.properties.class.replace("custom-select-label","") : "")

    }

}