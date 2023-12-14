import Component from "../../../component.js";
import { childNodes, defineIconWidth, defineWidth, getParent, isEmpty, isset } from "../../../component_f.js";
import customSelect from "./customSelect.js";
import lucideIcon from "../utilities/lucideIcon.js";
import tiIcon from "../utilities/tiIcon.js";
import ui from "../../../ui.js";

export default class customSelectMultiple extends customSelect {
    selected_count = 0;
    constructor(customSelectMultiple) {
        super(customSelectMultiple);
        this.attributes.class = "w-full relative " + (isset(this.properties.class) ? this.properties.class.replace("custom-select-multiple", "") : "");


        this.html.input.add_child(new Component({
            name: "div",
            attributes: {
                class: "",
                placeholder: this.properties.placeholder ?? ""

            },
            html: {
                chevronDown: new lucideIcon({ icon: "chevron-down",width:defineIconWidth(this.properties.width??null),height:defineIconWidth(this.properties.width??null)  }),
                chevronUp: new lucideIcon({ icon: "chevron-up", class: "hidden",width:defineIconWidth(this.properties.width??null),height:defineIconWidth(this.properties.width??null) }),
            }

        }), "icons");
        //
        this.events = {
            click: {
                open: openSelectMultiple
            }
        }

    }

    icon() {
        return new Component({
            name: "div",
            attributes: {
                class: "max-w-[30px] text-slate-400 h-full"
            },
            html: {
                icon: new lucideIcon({ icon: this.properties.icon })
            }
        })
    }
    init() {
        super.init();
        this.html.input = new Component({
            name: "div",
            attributes: {
                class: "flex bg-white dark:bg-dark-100 dark:border-dark-300 flex space-x-2 border-[1px] border-slate-200 w-full rounded-[5px] "+ defineWidth(this.properties.width??null),
            },

        });
        this.add_child(new Component({
            name: "input",
            attributes: {
                name: this.properties.name ?? "",
                class: "selected-values",
                type: "hidden",
            }
        }), "selectValues");
        if (this.properties.icon != undefined && this.properties.icon != "") {
            this.html.input.add_child(this.icon(), "icon");
        }
        this.get_child("input").add_child(new Component({
            name: "div",
            attributes: {
                class: "selected-options-box w-full flex space-x-2",
                placeholder: this.properties.placeholder ?? ""

            },
            text: this.properties.placeholder ?? ""

        }), "inputField");
    }
    option(opt) {
        let opp = super.option(opt);
        console.log(this)
        let selectedValue = this.selectedValue()
        opp.events.click = {
            selectMultiple: [selectMultiple, selectedValue],
            // createSelectProductButton:[createSelectProductButton]
        }

        if ((isset(opt.nodeName) && opt.hasAttribute("selected")) || Object.prototype.hasOwnProperty.call(opt, "selected")) {
            // opp.add_class("dark:bg-primary-100 bg-secondary-100")

            let inputValue = this.get_child("selectValues");
            let value = opt.value ?? "";
            let fieldValue = inputValue.get_attribute("value");
            (isEmpty(fieldValue) || !isset(fieldValue)) ? (this.get_child("input").get_child("inputField").text = "") : null;

            inputValue.set_attribute("value", (isEmpty(fieldValue) || !isset(fieldValue)) ? value : fieldValue + "," + value);
            let fiedTextValue =  inputValue.get_attribute("value-text");
            let textValue = opt.innerText ?? opt.value;
            inputValue.set_attribute("value-text",(isEmpty(fiedTextValue) || !isset(fiedTextValue)) ? textValue : fiedTextValue + "," + textValue );

            let selectValue = this.selectedValue();
            selectValue.get_child("text").text = opt.innerText ?? opt.value;
            // alert(this.selected_count)

            selectValue.get_child("deselect").events.click = [[remove, "csms"+this.selected_count ]];
            opp.add_class("csms" + this.selected_count);
            this.selected_count++;

            isEmpty(fieldValue) ? (this.get_child("input").get_child("inputField").text = "") : null;
            this.get_child("input").get_child("inputField").add_child(selectValue)
            // console.log(this.get_child("input"))

        }
        return opp;
    }
    selectedValue() {
        return new Component({
            name: "div",
            attributes: {
                class: "rounded flex space-x-2 px-2 rounded-[5px] space-x-2 dark:bg-dark-200 text-xs bg-secondary-100 "
                , style: "font-size:10px;"
            },
            html: {
                text: new Component({
                    name: "span",
                }),
                deselect: new Component({
                    name: "button",
                    attributes: {
                        class: "text-xs"
                    },
                    html: {
                        icon: new tiIcon({ name: "close", style: "font-size:10px;"})
                    },

                })
            }
        })
    }
}
/**
 * 
 * @param {*} obj 
 * @param {*} e 
 * @param {*} sel 
 */
let dom = new ui();

function selectMultiple(option, e, sel/* selectedValue structure */) {
    let select = getParent(option, 2)
    let selectedOptionsDisplayedField = select.querySelector(".selected-options-box")
    let selectedOptionsValuesHiddenField = select.querySelector(".selected-values")
    let value = { text: "", val: "" };
    let indexToRemove = "", valueArray = "", valueTextArray = "";


    value.val = option.getAttribute("value") ?? ""
    value.text = option.innerText ?? "";

    if (selectedOptionsValuesHiddenField.value.split(",").indexOf(value.val) == -1) {
        //
        sel.html.deselect.events.click = [[remove, option]];

        selectedOptionsValuesHiddenField.value += value.val + ",";
        let valueText = selectedOptionsValuesHiddenField.getAttribute("value-text") ?? ""
        selectedOptionsValuesHiddenField.setAttribute("value-text", valueText + value.text + ",");
    } else {
        indexToRemove = selectedOptionsValuesHiddenField.value.split(",").indexOf(value.val);
        valueArray = selectedOptionsValuesHiddenField.value.split(",");
        valueTextArray = selectedOptionsValuesHiddenField.getAttribute("value-text").split(",");

        valueArray.splice(indexToRemove, 1);
        valueTextArray.splice(indexToRemove, 1);

        selectedOptionsValuesHiddenField.value = (valueArray.length > 0) ? valueArray.join(",") : "";
        selectedOptionsValuesHiddenField.setAttribute("value-text", (valueArray.length > 0) ? valueTextArray.join(",") : "");


    }

    createValuesFromInputValue(selectedOptionsDisplayedField, selectedOptionsValuesHiddenField, sel);
    activeOption(option);
}
/**
 * 
 * @param {*} inputDom 
 * @param {*} value 
 * @param {*} structure 
 */
function createValuesFromInputValue(inputTextsValues, inputValues, structure) {
    inputTextsValues.innerHTML = ""
    let values = inputValues.value.split(",");
    let texts = inputValues.getAttribute("value-text").split(",");
    for (let i = 0; i < values.length; i++) {
        if (values[i] != "") {
            structure.get_child("text").text = texts[i];
            inputTextsValues.append(dom.createElementFromStructure(structure))
        }
    }
    if (values.length == 1) {
        inputTextsValues.innerHTML = inputTextsValues.getAttribute("placeholder")
    }
}

/**
 * 
 * @param {*} option 
 */
function activeOption(option) {
    option.classList.toggle("dark:bg-primary-100");
    option.classList.toggle("bg-secondary-100");
}
/**
 * 
 * @param {*} obj 
 * @param {*} e 
 */
function openSelectMultiple(obj, e) {
    if (!e.target.getAttribute("class").includes('cso')) {
        obj.classList.toggle("customSelectOpen");
        childNodes(obj)[1].classList.toggle("hidden");
    }
    let inputChilds = childNodes(childNodes(obj)[0]);
    let chevrons = childNodes(inputChilds[inputChilds.length - 1]);

    chevrons[0].classList.toggle("hidden");
    chevrons[1].classList.toggle("hidden");
    childNodes(obj)[0].classList.toggle("border-primary-100");
    childNodes(obj)[0].classList.toggle("dark:border-dark-300");
}
/**
 * 
 * @param {*} obj 
 * @param {*} e 
 */
function remove(obj, e, option = null) {
    obj.parentNode.remove();
    if (typeof (option) == "string") {
        document.querySelector("." + option).click()
    } else {
        isset(option) ? option.click() : "";
    }
}
function createSelectProductButton(option, e) {

}