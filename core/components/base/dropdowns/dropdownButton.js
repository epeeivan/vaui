import Component from "../../../component.js";
import { defineIconWidth } from "../../../component_f.js";
import button from "../buttons/button.js";
import basicInput from "../inputs/basicinput.js";
import lucideIcon from "../utilities/lucideIcon.js";
import { openDropdown } from "./dropdown.js";
import dropdownButtonIcon from "./dropdownButtonIcon.js";


export class dropdownButton extends dropdownButtonIcon {
    constructor(dropdownSearch) {
        super(dropdownSearch);
        this.get_child("controls").html = {
            button: new button({
                color: this.properties.color ?? "",
                icon: this.properties.icon ?? null,
                id: this.properties.id ?? null,
                class: this.properties.class ?? null,
                mode: this.properties.mode ?? null,
                text: this.properties.text ?? "",
                width: this.properties.width ?? ""
            })
        }
        // this.get_child("controls").get_child("button").events = {
        //     click: {
        //         openDropdown: openDropdown,
        //     }

        // }
        this.get_child("controls").get_child("button").add_class(" flex space-x-2")
        this.get_child("controls").get_child("button").add_child(new Component({
            name: "div",
            html: {
                open: new lucideIcon({ icon: "chevron-down", class:"m-auto open", width: defineIconWidth(), width: defineIconWidth(), }),
                close: new lucideIcon({ icon: "chevron-up", class:"hidden close", width: defineIconWidth(), width: defineIconWidth(), })
            }
        }))
    }

}