import customSelectMultipleLabel from "./customSelectMultipleLabel.js";
import customSelectMultipleProduct from "./customSelectMultipleProduct.js";


export default class customSelectMultipleLabelProduct extends customSelectMultipleLabel{
    constructor(customSelectMultipleLabelProduct){
        super(customSelectMultipleLabelProduct);
        this.html.input = new customSelectMultipleProduct(customSelectMultipleLabelProduct);
    }

}
