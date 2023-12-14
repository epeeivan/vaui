import Component from "../../../../component.js";
import { definePropsFromElement, isset } from "../../../../component_f.js";

export default class ListDetailItem extends Component {
    constructor(listDetailsItem) {
        super();
        this.properties = definePropsFromElement(listDetailsItem);
        this.name = "li";
        this.attributes = {
            class: "flex bg-dark-300 hover:bg-dark-600 text-white p-3 transition-all duration-200 group ease-in border-l-4 border-dark-300 rounded-xl hover:border-yellow-600"
        }
        this.html = {
            left: new Component({
                name: "div",
                attributes: {
                    class: "flex space-x-3 mr-auto"
                }
            }),
        }


        isset(this.properties.icon) ? this.get_child("left").add_child(this.icon(this.properties.icon)) : null;
        this.get_child("left").add_child(this.texts()) ;
        isset(this.properties.counter) ? this.add_child(this.counter(this.properties.counter)) : null;

    }

    icon(icon) {
        return new Component({
            name: "div",
            attributes: {
                class: "w-[30px] h-[30px] rounded-full flex bg-dark-600 font-black uppercase text-xl group-hover:bg-yellow-600 group-hover:text-black transition-all ease-in duration-100"
            },
            html: {
                span: new Component({
                    name: "span",
                    attributes: {
                        class: "block m-auto -mb-0.5",
                    },
                    text: icon,
                })
            }
        })
    }
    texts() {
        let textBox = new Component({
            name: "div",
            attributes: {
                class: "space-y-2 my-auto"
            }
        });

        isset(this.properties.title) ? textBox.add_child(this.textItem(this.properties.title), "title") : null;
        isset(this.properties.description) ? textBox.add_child(this.textItem(this.properties.description), "description") : null;

        if (isset(this.properties.description)) {
            textBox.get_child("description").attributes.class = "text-sm"
        }
        return textBox;
    }

    textItem(text) {
        return new Component({
            name: "span",
            attributes: {
                class: "capitalize font-black text-lg block"
            },
            text: text
        })
    }

    counter(counter) {
        let counterStruct = this.icon(counter);
        counterStruct.attributes.class = "p-1 px-2.5 h-[fit-content] rounded-full flex bg-yellow-600 text-black font-black my-auto"
  counterStruct.get_child("span").attributes.class = "block m-auto -mb-0.5" 
        return counterStruct;
    }
}