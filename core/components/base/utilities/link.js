import { definePropsFromElement, isEmpty, isset, reloadIcons } from "../../../component_f.js";
import xhr from "../../../formsubmitter/xhr.js";
import { htmlToComponent } from "../../../htmlToComponent.js";
import { importRequired } from "../../../require.js";
import { Dom } from "../../../ui.js";
import button from "../buttons/button.js";
import lucideIcon from "./lucideIcon.js";


export default class link extends button {
    constructor(link) {
        super(link);
        this.properties = definePropsFromElement(link);
        this.init(link)
    }
    init(link) {
        super.init(link)
        this.name = "a";
        this.attributes.href = this.properties.href ?? "";
        this.add_class(this.properties.class ?? "");
        if (isset(this.properties["no-reload"])) {
            this.add_event("click", [loadContent, { url: this.properties.href, box: this.properties.box }])
        }
    }


}
export function loadContent(obj, e, params) {
    e.preventDefault()
    // alert()
    new xhr({
        url: obj.getAttribute("href"),
        method: "get",
        callback: (response) => {
            let box = document.getElementById(params.box);
            if (isset(box)) {
                // console.
                box.innerHTML = "";
                let vBox = document.createElement("div");
                vBox.setAttribute("class", "h-full");
                vBox.innerHTML = response;
                importRequired(vBox)
                box.append(Dom.createElementFromStructure(htmlToComponent(vBox)))
                let event = new CustomEvent("content_loaded");
                document.dispatchEvent(event);

            }
        }
    })
}
