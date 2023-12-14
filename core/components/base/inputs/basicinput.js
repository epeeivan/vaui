import Component from "../../../component.js";
import { childNodes, defineIconWidth, definePropsFromElement, defineWidth, isset } from "../../../component_f.js";
import lucideIcon from "../utilities/lucideIcon.js";


export default class basicInput extends Component {
    /**
     * 
     * @param {*} input 
     */
    constructor(input) {
        super();
        this.name = "div";
        this.properties = definePropsFromElement(input);

        this.init(input)
    }
    /**
     * 
     * @param {*} input 
     */
    init(input) {
        this.add_class((isset(this.properties.disabled) ? "bg-secondary-100 dark:bg-dark-200" : "bg-white dark:bg-dark-100") + " dark:border-dark-300 flex space-x-2 border-[1px] font-light  border-slate-200 w-full h-min "+(isset(this.properties.round)?'rounded-full':'rounded') +" "+ defineWidth(this.properties.width ?? null) + " " + (isset(this.properties.class) ? this.properties.class.replace("basicinput") : ""))
        if (this.properties.icon != undefined && this.properties.icon != "") {
            this.add_child(this.icon(), "iconContainer")
        }
        this.add_child(this.input(), "inputField");

        if (isset(this.properties.type)) {
            switch (this.properties.type) {
                case "password":
                    this.add_child(this.actionIcon());
                    break;
                case "select":
                    this.add_child(this.selectIcons());
                    this.events.click = [openSelect]
                    break;

                default:
                    break;
            }
        }
    }
    selectIcons() {
        return new Component({
            name: "div",
            attributes: {
                class: "text-slate-300",
                placeholder: this.properties.placeholder ?? ""

            },
            html: {
                chevronDown: new lucideIcon({ icon: "chevron-down", width: "15" }),
                chevronUp: new lucideIcon({ icon: "chevron-up", class: "hidden", width: "15" }),
            }

        });
    }
    icon() {
        return new Component({
            name: "div",
            attributes: {
                class: "max-w-[30px] text-slate-400 flex h-full m-auto"
            },
            html: {
                icon: new lucideIcon({ icon: this.properties.icon, stroke: 2, width: defineIconWidth(this.properties.width ?? null), height: defineIconWidth(this.properties.width ?? null), class: "m-auto" })
            }
        })
    }
    actionIcon() {
        return new Component({
            name: "div",
            attributes: {
                class: "max-w-[30px] text-slate-400 flex h-full my-auto"
            },
            html: {
                buttonicon: new Component({
                    name: "button",
                    attributes: {
                        class: "bg-transparent ",
                        type: "button"
                    },
                    html: {
                        eye: new Component({
                            name: "span",
                            attributes: {
                                class: "hidden"
                            },
                            html: {
                                icon: new lucideIcon({ icon: "eye", width: defineIconWidth(this.properties.width ?? null), height: defineIconWidth(this.properties.width ?? null), })
                            }
                        }),
                        eyeSlash: new Component({
                            name: "span",
                            attributes: {
                                class: ""
                            },
                            html: {
                                icon: new lucideIcon({ icon: "eye-off", width: defineIconWidth(this.properties.width ?? null), height: defineIconWidth(this.properties.width ?? null) })
                            }
                        }),
                    },
                    events: {
                        click: [showContent]
                    }
                }),
            }
        })
    }
    input() {
        let input = new Component({
            name: "div",
            attributes: {
                class: "w-full"
            },
            html: {
                input: new Component({
                    name: "input",
                    attributes: {
                        class: "h-full h-min dark:text-white bg-transparent w-full  outline-none",
                        placeholder: this.properties.placeholder ?? "",
                        id: this.properties.id ?? "",
                        name: this.properties.name ?? "",
                        value: this.properties.value ?? "",
                        type: this.properties.type ?? "",
                        disabled: this.properties.disabled ?? null
                    },
                    events: {
                        focus: [focusInput],
                        focusout: [focusInput],
                    }
                })
            }
        })

        if (isset(this.properties.events)) {
            for (const event in this.properties.events) {
                // alert(this.properties.events)
                input.get_child("input").events[event] = this.properties.events[event];
            }
        }
        return input;

    }

}
function showContent(obj) {
    let icons = childNodes(obj);
    let input = childNodes(obj.parentNode.previousSibling)[0];

    icons[0].classList.toggle("hidden");
    icons[1].classList.toggle("hidden");

    switch (input.getAttribute("type")) {
        case "password":
            input.setAttribute("type", "text");
            break;
        case "text":
            input.setAttribute("type", "password");
            break;
        default:
            break;
    }
}
function openSelect(obj) {
    let inputChilds = childNodes(obj);
    let chevrons = childNodes(inputChilds[inputChilds.length - 1]);
    chevrons[0].classList.toggle("hidden");
    chevrons[1].classList.toggle("hidden");

    if (inputChilds.length == 3) {
        childNodes(inputChilds[1])[0].focus();
    } else {
        childNodes(inputChilds[0])[0].focus();

    }
}
function focusInput(obj) {
    obj.parentNode.parentNode.classList.toggle("border-primary-100");
    obj.parentNode.parentNode.classList.toggle("border-slate-200");
    obj.parentNode.parentNode.classList.toggle("dark:border-dark-300");

}