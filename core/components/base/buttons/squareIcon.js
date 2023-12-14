import Component from "../../../component.js";
import { defineIconWidth, definePropsFromElement, defineWidth, isset } from "../../../component_f.js";
import lucideIcon from "../utilities/lucideIcon.js";
import button from "./button.js";

export default class squareIcon extends button {
    constructor(icon) {

        super(icon);

    }
    init(icon) {
        this.properties.square="min-w-[35px] min-h-[35px]"
        super.init(icon);
        
    }

}