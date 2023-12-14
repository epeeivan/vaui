import Component from "../../../component.js";
import cardOverview from "./cardOverview.js";


export default class cardChart extends cardOverview{
    constructor(cardChart){
        super(cardChart);
    }
    init( cardChart){
        super.init(cardChart);
        this.get_child("body").html={
            canvas:new Component({
                name:"canvas",
                attributes:{
                    id:"chart",
                    height:"150px"
                }
            })
        }
    }
}