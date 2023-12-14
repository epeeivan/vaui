import Component from "../../../component.js";
import { definePropsFromElement, displayTarget, isset } from "../../../component_f.js";

export class switcher extends Component {
    constructor(switcher) {
        super();
        this.properties = definePropsFromElement(switcher);
        this.name = "div";
        this.attributes = {
            class: 'flex ' + (this.properties.class ?? ""),
        }

        this.add_child(
            new Component({
                name: 'div',
                attributes: {
                    class: "switcher flex h-min p-1 max-w-[40px] min-w-[30px] my-auto rounded-full " + (isset(this.properties.value) ? "bg-primary-600" : "bg-secondary-300"),
                },
                html: {
                    switch: new Component({
                        name: "div",
                        attributes: {
                            class: "switch transition-all ease-linear duration-200 min-w-[10px] min-h-[10px] rounded-full bg-white " + (isset(this.properties.value) ? "ml-[calc(100%-10px)]" : "")
                        }
                    }),
                    checker: new Component({
                        name: "input",
                        attributes: {
                            type: "checkbox",
                            class: "hidden",
                            name: this.properties.name ?? "",
                        }
                    })
                }
            }), 'switcher'
        )
        if (isset(this.properties.label)) {
            this.add_class('space-x-2');
            this.add_child(new Component({
                name: 'label',
                text: this.properties.label,
                attributes: {
                    class: "my-auto"
                }
            }));
        }

        this.events = {
            click: [switchIt]
        }

        if (isset(this.properties.value)) {
            this.get_child("switcher").get_child("checker").attributes.checked = ""
        }

        if (isset(this.properties.target)) {
            this.events.click.push([displayTarget, this.properties.target]);
        }
        if (isset(this.properties["hidden_target"])) {
            this.events.click.push([displayTarget, this.properties["hidden_target"]]);
        }
    }

}

function switchIt(obj, e) {
    let switcherItem = obj.querySelector(".switch");
    let switcher = obj.querySelector(".switcher");
    switcherItem.classList.toggle("ml-[calc(100%-10px)]");
    switcher.classList.toggle("bg-primary-600");
    switcher.classList.toggle("bg-secondary-300");
    let checker = obj.querySelector("input");
    checker.hasAttribute("checked") ?
        checker.removeAttribute("checked") : checker.setAttribute("checked", "");
}