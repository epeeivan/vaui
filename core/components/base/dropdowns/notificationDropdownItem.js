import Component from "../../../component.js";
import { definePropsFromElement, isEmpty, isset } from "../../../component_f.js";
import lucideIcon from "../utilities/lucideIcon.js";


export default class notificationDropdownItem extends Component {
    constructor(item) {
        super();
        this.name = "li";
        this.properties = definePropsFromElement(item);
        this.init(item)
    }
    init(item) {
        this.add_child(new Component({
            name: "a",
            attributes: {
                href: this.properties.href ?? null,
                id: this.properties.id ?? null,
                target: this.properties.target ?? "",
                class: "p-1 flex text-xs relative  dark:hover:bg-primary-100 hover:bg-slate-100 rounded block " + (isset(this.properties.class) ? this.properties.class : "")
            }

        }),"link");

        if(isset(this.properties.icon)){
            this.get_child("link").add_child(this.icon(),"iconContainer")
        }

        this.get_child("link").add_child(new Component({
                name: "div",
                attributes: {
                    class: "space-y-2",
                },
                html: {
                    text: new Component({
                        name: "p",
                        attributes: {
                            class: "text",
                        },
                    }),
                    timeago: new Component({
                        name: "span",
                        attributes:{
                            style:"font-size:10px",
                            class:"text-slate-500 dark:text-secondary-100 text-xs",
                        },
                        text:this.properties.time_ago??""
                    }),
                }
                // text: this.properties.text ?? item.innerText,
            }),"textAndDateContainer");

            this.get_child("link").add_child(
                new Component({
                    name: "div",
                    attributes: {
                        style: "min-width:8px;max-height:8px;max-width:8px; min-height:8px",
                        class: "rounded-full " + (isset(this.properties.active) && !isEmpty(this.properties.active) ? "bg-primary-100" : "")
                    }
                }),"pinger"
            );

    }
    icon() {
        // alert(mode.classes)
        if(isset(this.properties.icon)){
            return new Component({
                name: "div",
                attributes: {
                    style: "min-width:30px;min-height:30px;max-width:30px;max-height:30px",
                    class: "flex rounded-full mr-2 " + mode.classes,
                },
                html: {
                    icon: new lucideIcon({ icon: mode.icon ?? "", width: 15, height: 15, class: "m-auto" })
                }
            })
        }
        return null;
    }
    defineIconMode() {
        switch (this.properties.type) {
            case "add":
                return { icon: "plus", classes: "bg-blue-400 text-white" }
                break;
            case "update":
                return { icon: "edit", classes: "bg-orange-500 text-white" }
                break;
            default:
                break;
        }
        return {}
    }
}