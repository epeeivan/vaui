import Component from "../../../component.js";
import { definePropsFromElement, isset, toggleClasses } from "../../../component_f.js";

export class genderBox extends Component {
    constructor(genderBox) {
        super();
        this.name = "div";
        this.properties = definePropsFromElement(genderBox)
        this.attributes = {
            class: "w-full py-5  rounded-lg bg-primary-200 text-primary-600 flex border-2 hover:text-white border-primary-600  hover:bg-primary-400"
        }
        this.events = {
            click: [activeBox],
        }
        this.html = {
            container: new Component({
                name: "div",
                attributes: {
                    class: "m-auto px-10",
                },
                html: {
                    radio: new Component({
                        name: "input",
                        attributes: {
                            class:"hidden",
                            type: "radio",
                            name: this.properties.name ?? ""
                        }
                    })
                }
            })
        }
        isset(this.properties.src) ? this.get_child("container").add_child(this.img(), "img") : null;
        isset(this.properties.label) ? this.get_child("container").add_child(this.boxText(), "src") : null;
    }
    img() {
        return new Component({
            name: "img",
            attributes: {
                src: this.properties.src,
                alt: "img"
            }
        })
    }

    boxText() {
        return new Component({
            name: "span",
            attributes: {
                class: "capitalize text-xl block font-black text-center",
            },
            text: this.properties.label ?? ""
        })
    }

}
function activeBox(obj, e) {
    let input = obj.querySelector("input");
    let activeBox = document.querySelector(".gender-box-active");
    input.checked = true;
    isset(activeBox) ? changeApparence(activeBox) : null;
    changeApparence(obj)

}
function changeApparence(obj) {
    toggleClasses(obj, ["gender-box-active", "bg-primary-200", "bg-primary-600", "border-primary-600", "text-white", "text-primary-600"])
}