import Component from "../../../component.js";
import ui from "../../../ui.js";
import squareIcon from "../buttons/squareIcon.js";
import dropdown from "./dropdown.js";



export default class dropdownButtonIcon extends dropdown {
    constructor(dropdown) {
        super(dropdown);
        this.get_child("controls").add_child(this.controls(), "control");
        if (this.properties.title != undefined) {
            this.get_child("menu").get_child("header").html = {
                title: new Component({
                    name: "h1",
                    attributes: {
                        class: "p-2 capitalize font-bold text-lg"
                    },
                    text: this.properties.title ?? ""

                })
            }
        }

    }
    init(dropdown) {
        super.init(dropdown)
    }
    controls() {
        return new squareIcon({
            type: "secondary",
            icon: this.properties.icon ?? "",
        })
    }
}

