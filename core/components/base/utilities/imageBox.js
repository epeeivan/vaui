import Component from "../../../component.js";
import { definePropsFromElement, isset } from "../../../component_f.js";


export default class imageBox extends Component {
    constructor(imageBox) {
        super();
        this.properties = definePropsFromElement(imageBox);

        this.name = "div";
        this.attributes = {
            class: " h-[150px] my-3 lg:mr-2 group bg-cover group shadow-lg bg-center  rounded-lg",
            id: "",
            style: "background-image:url('" + this.properties.src ?? "" + "')",
        }
        this.html = {
            blur: new Component({
                name: "div",
                attributes: {
                    class: "w-full h-full flex bg-black/[0.1] group-hover:bg-black/[0.9] transition-all ease-linear duration-200 rounded-lg"
                },
                html: {
                    buttonsContainer: new Component({
                        name: "div",
                        attributes: {
                            class: "flex space-x-2 m-auto"
                        }
                    }),
                }
            })

        }
        isset(this.properties["delete-button"]) ?
            this.get_child("blur").get_child("buttonsContainer").add_child(
                new button({ icon: "trash", type: "danger", class: "hidden group-hover:block","basic-type":"button" })
                , "deleteButton") :
            "";
        this.get_child("blur").get_child("buttonsContainer").add_child(
            new button({ icon: "eye", type: "primary", class: "hidden group-hover:block","basic-type":"button" }), "viewButton"
        );

        isset(this.properties["delete-button"]) ?
            this.get_child("blur").get_child("buttonsContainer").get_child("deleteButton").events.click = [
                [
                    removeImage,
                    isset(this.properties["delete-action"]) ?
                        { url: this.properties["delete-action"]} :
                        null
                ]
            ] :
            "";
    }
}
function removeImage(obj,e,params = null) {
    e.preventDefault();
    
    getParent(obj, 3).remove();
    if(isset(params)){
        xhr({
            url:params.url,
            method:"GET",
            async:true,
            callback:()=>{

            }
        })
    }
}