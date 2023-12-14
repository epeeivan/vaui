import { isset } from "../../../component_f.js";
import ui from "../../../ui.js";
import customSelectMultiple from "./customSelectMultiple.js";

export default class customSelectMultipleProduct extends customSelectMultiple {
    constructor(customSelectMultipleLabelProduct) {
        super(customSelectMultipleLabelProduct);
    }
    option(opt) {
        let opp = super.option(opt);
        opp.events.click["createSelectProductButton"] = createSelectProductButton;
        if ((isset(opt.nodeName) && opt.hasAttribute("selected")) || Object.prototype.hasOwnProperty.call(opt, "selected")) {
            createSelectProductButton(opt,opt.value);
        }
        return opp
    }
}
function createSelectProductButton(option, e,value=null) {
    let Dom = new ui();
    let box = document.getElementById("selectedProductsBox");
    let existButtonProductAdded = document.querySelector("#selectedProductsBox #P_" + (value??option.getAttribute("value")));
    // alert("#selectedProductsBox #P_" + (value??option.getAttribute("value")));
    if (existButtonProductAdded == null) {
            box.append(Dom.createElementFromStructure(new buttonProductAdded(option)))
    }else{
        existButtonProductAdded.remove();
    }
}