import { childNodes, definePropsFromElement } from "../../../component_f";
import cardLine from "./cardLine";
import cardOverview from "./cardOverview";


export default class cardLines extends cardOverview {
    constructor(cardLines) {
        super(cardLines);
    }
    init(cardLines) {
        super.init(cardLines);
        this.get_child("body").set_attribute("id",this.properties.id??"");
        
        this.get_child("body").html = {
        }

        let childs = childNodes(cardLines);
        if(isset(childs[1])){
            let lines = childNodes(childs[1]);
            lines.forEach(line => {
                this.get_child("body").add_child(new cardLine(definePropsFromElement(line)));
            });
        }


        this.html.body.add_class("max-h-[400px] overflow-y-auto")
    }
}