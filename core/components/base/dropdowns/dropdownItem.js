import Component from "../../../component.js";
import { definePropsFromElement, isEmpty, isset } from "../../../component_f.js";
import link from "../utilities/link.js";


export default class dropdownItem extends link {
    constructor(item) {
        super(item);
        this.add_class("w-[max-content] ")
        // this.name = "li";
        // this.properties = definePropsFromElement(item);
        // this.init(item)
    }
    // init(item) {
    //     this.html = {
    //         link: new Component({
    //             name: "a",
    //             attributes: {
    //                 href: this.properties.href ?? null,
    //                 id: this.properties.id ?? null,
    //                 value: this.properties.value ?? null,
    //                 target: this.properties.target ?? "",
    //                 style: "list-type:none",
    //                 class: "p-1.5 list-type-none dark:hover:bg-primary-100 hover:bg-slate-100 rounded block w-[max-content] min-w-full " + (isset(this.properties.active) && !isEmpty(this.properties.active) ? " bg-slate-100 dark:bg-primary-100" : "") + (isset(this.properties.class) ? this.properties.class : "")
    //             },
    //             text: this.properties.text ?? item.innerText,
    //         })
    //     }
    // }
}