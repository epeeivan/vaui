import Component from "../../../component.js";
import { childNodes, definePropsFromElement, isset } from "../../../component_f.js";
import lucideIcon from "../utilities/lucideIcon.js";



export class checkbox extends Component {
    constructor(checkbox) {
        super();
        this.properties = definePropsFromElement(checkbox);
        this.name = "div";
        this.attributes = {
            class: "flex space-x-2 "+(this.properties.class??""),
        }


        this.init();
    }
    checkbox() {
        let checkbox = new Component({
            name: "div",
            attributes: {
                class: "v-checkbox w-[17px] h-[17px] rounded flex border-[1px] border-slate-300 dark:border-slate-500 text-primary-100 " ,
                id: this.properties.id ?? ""
            },
            html: {
                icon: new lucideIcon({ icon: "check", class: "m-auto hidden icon", width: 12, height: 12, stroke: 3 })
            }
        })

        return checkbox;
    }
    label() {
        return new Component({
            name: "label",
            attributes: {
                for: this.properties.name ?? null,
                class: "block my-auto "
            },
            text:this.properties.label
        })
    }
    init() {
        this.html = {
            checkbox: new Component({
                name: "input",
                attributes: {
                    class: "hidden checkbox",
                    name: this.properties.name ?? "",
                    value: this.properties.value ?? "",
                }
            }),
        }
        this.add_child(this.checkbox(), "v_checkbox")
        isset(this.properties.label) ? this.add_child(this.label(), "label") : null;
        if (isset(this.properties.target)) {
            this.events = {

                click: [[manageCheck, this.properties.target]]
            }
        } else {
            this.events = {
                click: [manageCheck]
            }
        }
    }
}

function manageCheck(obj, e, targetsSelector) {



    let targets = isset(targetsSelector) ? document.querySelectorAll("." + targetsSelector) : null;
    // 
    let content = getcontent(obj)


    if (content.v_checkbox.classList.contains("checked")) {
        unCheck(content);
        isset(targets) ? manageTargets(targets, unCheck) : "";
    } else {
        check(content);
        isset(targets) ? manageTargets(targets, check) : "";
    }

}
function getcontent(obj) {
    return {
        checkbox: obj.querySelector('.checkbox'),
        icon: obj.querySelector('.icon'),
        v_checkbox: obj.querySelector('.v-checkbox')
    }
}

function manageTargets(targets, callback) {
    targets.forEach(target => {
        let childs = childNodes(target);
        callback(getcontent(target));
    });
}
function check(params) {
    params.v_checkbox.classList.add("bg-primary-100/[0.1]");
    params.v_checkbox.classList.add("text-primary-600");
    params.v_checkbox.classList.add("checked");
    params.v_checkbox.classList.remove("border-slate-300");

    params.v_checkbox.classList.add("border-primary-100");
    params.checkbox.checked = true;
    params.icon.classList.remove("hidden");
}
function unCheck(params) {
    params.v_checkbox.classList.remove("bg-primary-100/[0.1]");
    params.v_checkbox.classList.remove("text-primary-600");
    params.v_checkbox.classList.remove("checked");
    params.v_checkbox.classList.add("border-slate-300");

    params.v_checkbox.classList.remove("border-primary-100");
    params.checkbox.checked = false;
    params.icon.classList.add("hidden");
}