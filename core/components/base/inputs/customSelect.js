import Component from "../../../component.js";
import { childNodes, definePropsFromElement, defineWidth, getParent, isset } from "../../../component_f.js";
import ui from "../../../ui.js";
import basicInput from "./basicinput.js";

export default class customSelect extends Component {
    selected_count = 0;
    constructor(customSelect) {
        super();
        this.name = "div";
        this.properties = definePropsFromElement(customSelect);
        this.attributes = {
            class: "w-full relative  " + (isset(this.properties.class) ? this.properties.class.replace("custom-select", "") : ""),
        }
        this.events = {
            click: {
                open: openSelect
            }
        }
        this.init();
        this.fillOptions(isset(customSelect.nodeName) ? customSelect.querySelectorAll("option") : []);



    }
    fillOptions(options) {
        options.forEach(opt => {
            this.get_child("optionsContainer").add_child(this.option(opt));
        });
    }
    init() {
        this.html = {
            input: this.input(),
            optionsContainer: new Component({
                name: "div",
                attributes: {
                    style:"max-height:200px;",
                    class: "bg-white  hidden overflow-y-auto dark:bg-dark-100 w-full p-2 space-y-2 mt-3 border rounded-[5px] dark:border-dark-200 absolute z-50 options-box" ?? ""
                }
            })
        }
    }
    input() {
        return new Component({
            name: "div",
            html: {
                inputVal: new Component({
                    name: "input",
                    attributes: {
                        type: "hidden",
                        class: "selectValue",
                        name: this.properties.name ?? "",
                    },

                }),

                input: new basicInput({ 
                    placeholder: this.properties.placeholder ?? "", 
                    class: "selectText", 
                    id: this.properties.id ?? "", 
                    icon: this.properties.icon ?? "", 
                    mode:this.properties.mode??"",
                    width:this.properties.width??"",

                    type: "select",
                    events:{
                        keyup:[changeValue]
                    } 
                })
            }
        })
    }
    option(option) {
        let that = this;
        let opt = this.optionStruct();
        opt.attributes.value = option.value ?? "";
        opt.text = option.innerText ?? option.value;
        opt.events.click = [select];

        if ((isset(option.nodeName) && option.hasAttribute("selected")) || Object.prototype.hasOwnProperty.call(opt,"selected")) {
            opt.add_class("bg-secondary-100 dark:bg-primary-100 option-active");
            isset(this.get_child("input").html.inputVal) ?
                this.get_child("input").get_child("inputVal").set_attribute("value", option.value ?? "") :
                null;
            isset(this.get_child("input").html.input) ?
                this.get_child("input").get_child("input").get_child("inputField").get_child("input").set_attribute("value", option.innerText ?? option.value) :
                null;
        }
        return opt;
    }
    optionStruct() {
        return new Component({
            name: "div",
            attributes: {
                class: "cso hover:bg-secondary-100  dark:hover:bg-primary-100 flex space-x-2  w-full rounded-[5px] "+ defineWidth(this.properties.width??null),
                value: "",

            },
            text: "",
            events: {

            }
        })

    }


}

function emitEvent(obj, e) {

}
/**
 * 
 * @param {*} obj 
 * @param {*} e 
 */
function select(obj, e) {
    let Dom = new ui();

    let select = getParent(obj, 2);
    let inputvalue = select.querySelector(".selectValue");
    let inputDisplayedValue = select.querySelector(".selectText input");
    //
    inputvalue.value = obj.getAttribute("value");
    inputDisplayedValue.value = obj.innerText;
    //
    activeOption(obj, select.querySelector(".option-active"));
    //
    let event = new CustomEvent("selectChange", { detail: { target: inputvalue } });

    select.dispatchEvent(event);
    // input.setAttribute("value",obj.getAttribute("value"));

}
function changeValue(obj){
    // console.log(getParent(obj,3))
    getParent(obj,3).querySelector(".selectValue").value = obj.value;
}
function activeOption(obj, active) {
    if (isset(active)) {
        changeState(active);
    }
    changeState(obj);
}
function changeState(obj) {
    obj.classList.toggle("bg-secondary-100")
    obj.classList.toggle("dark:bg-primary-100")
    obj.classList.toggle("option-active")
}
/**
 * 
 */
document.addEventListener("click", (e) => {
    let dom = new ui();
    let customSelectOpen = document.querySelector(".customSelectOpen");

    if (isset(customSelectOpen) && !dom.isTarget(e.target, customSelectOpen)) {
        customSelectOpen.classList.toggle("customSelectOpen");
        //
        childNodes(customSelectOpen)[0].classList.toggle("border-primary-100");
        childNodes(customSelectOpen)[0].classList.toggle("dark:border-dark-300");
        //
        childNodes(customSelectOpen)[1].classList.toggle("hidden");
    }
})
/**
 * 
 * @param {*} obj 
 * @param {*} e 
 */
function openSelect(obj, e) {
    obj.classList.toggle("customSelectOpen");
    childNodes(obj)[1].classList.toggle("hidden");
}
