import Component from "../../../component.js";
import { getParent, isset } from "../../../component_f.js";
import button from "../buttons/button.js";
import { closeModal } from "../componentFunctions/modalFunctions.js";
import { modalContent } from "./modalContent.js";

export class modalForm extends modalContent {
    constructor(modalContent) {

        super(modalContent);
        this.get_child("modal").html.footer= {
            name:"div"
            // container: new Component({
            //     name: "div",
            //     attributes: {
            //         class: "ml-auto flex space-x-2"
            //     },
            //     html: {
            //         cancel: new button({ 
            //             text:this.properties["cancel-text"]??"cancel",
            //             color:"secondary"

            //         }),
            //         save:new button({ 
            //             text:this.properties["save-text"]??"save",
            //             color:"primary"
            //         }),
            //     }
            // })
        }
        // this.get_child("modal").get_child("footer").get_child("container").get_child("cancel").events = {
        //     click:[[closeModal,4]]
        // }
        // this.get_child("modal").get_child("footer").get_child("container").get_child("save").events = {
        //     click:[[submitForm]]
        // }
    }
}
function submitForm(obj,e){
    let form = getParent(obj,3).querySelector("form");
    console.log(form)
    if (isset(form)) {
        // form.submit();        
    }
}