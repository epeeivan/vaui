import Component from "../../../component.js";
import { definePropsFromElement, isset } from "../../../component_f.js";
import button from "../buttons/button.js";
import { closeModal } from "../componentFunctions/modalFunctions.js";
import lucideIcon from "../utilities/lucideIcon.js";
import { title } from "../utilities/title.js";


export class modal extends Component {
    constructor(modal) {
        super();
        this.name = "div";
        this.properties = definePropsFromElement(modal);

        this.add_child(new Component({
            name: "div",
            attributes: {
                class: " shadow-lg lg:m-auto w-full p-2 bg-white dark:bg-dark-400 ",
            }
        }), "modal");

        this.get_child("modal").add_class(this.defineWidth()+" "+(isset(this.properties.round)?"rounded-3xl":"rounded"));

        this.attributes = {
            class: "h-screen w-screen  left-0 top-0 absolute hidden z-50 bg-black/[0.2] backdrop-blur-sm dark:bg-black/[0.8] flex modal ",
            id: this.properties.id ?? "",
        }
        this.get_child("modal").add_child(this.header(), "header");
        this.get_child("modal").add_child(this.body(modal), "body");
        this.get_child("modal").add_child(this.footer(), "footer");

    }
    header() {
        return new Component({
            name: "div",
            attributes: {
                class: "flex min-h-[30px] max-h-[30px]",
            },
            html: {
                title: new title({ text: this.properties.title ?? "", type: "lg", class: "mr-auto my-auto title" }),
                closeButton: new Component({
                    name: "button",
                    attributes: {
                        class: "my-auto dark:text-dark-100"
                    },
                    events: {
                        click: [[closeModal, 3]]
                    },
                    html: {
                        icon: new lucideIcon({ icon: "x", width: 15, height: 15 })
                    }
                })
            }
        })
    }

    body(card) {
        return new Component({
            name: "div",
            attributes: {
                class: "lg:py-2 lg:h-auto lg:min-h-auto max-h-[calc(100vh-110px)] overflow-y-scroll h-[calc(100vh-110px)]"
            },
            html: {
                message: new Component({
                    name: "p",
                    text: card.innerText ?? card.text,
                })
            }
        })
    }
    footer() {
        let footer = new Component({
            name: "div",
            attributes: {
                class: " min-h-[30px] max-h-[30px] flex"
            },
            html: {
                buttonsContainer: new Component({
                    name: "div",
                    attributes: {
                        class: "flex m-auto"
                    },
                    html: {
                        closeButton: new button({ color: "primary", class: "", text: this.properties["button-text"] ?? "close" })
                    }
                })
            }
        })
        footer.get_child("buttonsContainer").get_child("closeButton").events.click = [[closeModal, 4]];
        return footer;
    }
    defineWidth() {
        let ret = "w-12/12 lg:w-4/12"
        // console.log(this.properties)
        switch (this.properties.type) {
            case "xs":
                ret = "w-12/12 lg:w-3/12";
                break;
            case "sm":
                ret = "w-12/12 lg:w-5/12";
                break;
            case "lg":
                ret = "w-12/12 lg:w-7/12";
                break;
            case "xl":
                ret = "w-12/12 lg:w-12/12";
                break;
            default:
                break;
        }


        return ret;
    }
}
