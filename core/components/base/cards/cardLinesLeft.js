import { isset } from "../../../component_f";
import cardOverview from "./cardOverview";


export default class cardLinesLeft extends cardOverview {
    constructor(cardLines) {
        super(cardLines);
    }
    init(cardLines) {
        super.init(cardLines);
        this.get_child("body").set_attribute("id",this.properties.id?this.properties.id+"-box":null);
        this.get_child("body").set_attribute("class","flex w-full flex-wrap divide-y divide-secondary-100 dark:divide-dark-300")
        this.get_child("body").html = {
            // canvas: new cardLine({ title: "guinness cameroun", description: "lorenfvav"})
        }
        this.add_class("card-line-left")
        if (isset(this.properties.action) && isset(this.properties.method) && isset(this.properties.fields)) {
            this.attributes.action = this.properties.action??null;
            this.attributes.method = this.properties.method??null;
            this.attributes.fields = this.properties.fields??null;
        }
        this.html.body.add_class("max-h-[400px] overflow-y-auto")



    }

}