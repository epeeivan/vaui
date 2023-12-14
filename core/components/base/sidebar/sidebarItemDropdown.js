import Component from "../../../component.js";
import { definePropsFromElement } from "../../../component_f.js";
import lucideIcon from "../utilities/lucideIcon.js";
import sidebarSubmenu from "./sidebarSubmenu.js";

export default class sidebarItemDropdown extends Component {
    constructor(sidebarItem) {
        super();
        this.name = "li";
        this.properties = definePropsFromElement(sidebarItem);
        this.add_class("transition-all ease-in group block");
        this.init(sidebarItem)
        //
        this.build(sidebarItem)
    }
    build(sidebarItem, addTarget = this) {
        let childs = childNodes(sidebarItem);
        childs.forEach(child => {
            if (child.nodeName != "#text") {
                if (child.nodeName == "UL") {
                    addTarget.add_child(new sidebarSubmenu());
                    console.log(addTarget.last_child())
                    addTarget.build(child, addTarget.last_child())
                } else {

                    if (sidebarItem.nodeName == "UL") {
                        addTarget.add_child(new sidebarItem(child))
                        console.log(addTarget)
                    }
                }
            }

        });
    }
    init(sidebarItem) {
        this.html = {
            link: new Component({
                name: "a",
                attributes: {
                    class: "p-3 rounded-lg flex hover:bg-slate-400 capitalize block space-x-3 ",
                    href: this.properties.href ?? ""
                },
                html: {
                    texts: new Component({
                        name: "div",
                        attributes: {
                            class: "w-full space-x-3 flex"
                        },
                        html: {
                            icon: new lucideIcon({ icon: this.properties.icon }),
                            label: new Component({
                                name: "span",
                                text: this.properties.text ?? sidebarItem.innerText
                            })
                        }
                    }),
                    dropdownIcons: new Component({
                        name: "div",
                    })

                }
            })
        }
    }
}