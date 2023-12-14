import { isset } from "../../../component_f.js";
import { htmlToComponent } from "../../../htmlToComponent.js";
import { modal } from "./modal.js";

export class modalContent extends modal{
    constructor(modalContent){

        super(modalContent);
        let content = modalContent.querySelector(".content");
        let footer = modalContent.querySelector(".footer");
        this.get_child("modal").get_child("body").html = htmlToComponent(content).html;
        if (isset(footer)) {
            this.get_child("modal").get_child("footer").html = htmlToComponent(footer).html;
        }
    }
}