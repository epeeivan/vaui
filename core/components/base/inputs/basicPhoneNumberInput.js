import Component from "../../../component.js";
import lucideIcon from "../utilities/lucideIcon.js";
import countries from "../../../bases/countriesList.js";
import { definePropsFromElement, defineWidth, getParent, isEmpty, isset } from "../../../component_f.js";
import { openDropdown } from "../dropdowns/dropdown.js";

export class basicPhoneNumberInput extends Component {
    constructor(basicPhoneNumberInput) {
        super();

        this.properties = definePropsFromElement(basicPhoneNumberInput)
        this.name = "div";
        this.set_attribute("class", "space-y-2");
        this.getOptions(basicPhoneNumberInput)

        if (isset(this.properties.label)) {
            this.add_child(
                new Component({
                    name: "label",
                    text: this.properties.label
                }), "label");
        }
        this.add_child(new Component({
            name: "div",
            attributes: {
                class: "flex space-x-2",
            },
            html: {
                left: this.left(),
                right: this.right(),
            }

        }))

    }
    getOptions(basicPhoneNumberInput) {
        this.properties.options = {};
        basicPhoneNumberInput.querySelectorAll("option").forEach(option => {
            this.properties.options[option.value] = {
                name: option.innerText,
                value: option.value,
                dial_code: option.getAttribute("code"),
                flag: option.getAttribute("flag"),
                patern: option.getAttribute("patern"),
            };
        });
    }
    left() {
        return new Component({
            name: "div",
            attributes: {

                class: "relative border rounded left " + defineWidth(this.properties.width ?? null),
                tabindex: 0
            },
            html: {
                content: this.leftContent(),
                menu: this.leftMenu()
            },
            events: {
                focusin: [openDropdown, changeDropdownIcons],
                focusout: [openDropdown, changeDropdownIcons],
            }
        })

    }


    leftContent() {
        return new Component({
            name: "div",
            attributes: {
                style: "width:max-content",
                class: "space-x-2 flex selected-displayer"
            },
            html: {
                flag: new Component({
                    name: "img",
                    attributes: {
                        style: "width:20px",

                        src: this.properties.options[this.properties.selected].flag
                    }
                }),
                text: new Component({
                    name: "span",
                    attributes: {
                        class: "code-displayer"
                    },
                    text: this.properties.options[this.properties.selected].dial_code
                }),
                icons: new Component({
                    name: "div",
                    html: {
                        up: new lucideIcon({ icon: "chevron-up", class: "up hidden" }),
                        down: new lucideIcon({ icon: "chevron-down", class: "down" })
                    }
                })
            }
        });
    }
    leftMenu() {
        let menu = new Component({
            name: "div",
            attributes: {
                style: "margin-top:10px",
                class: "h-0 dark:bg-dark-300 dark:drop-shadow-2xl overflow-hidden px-2 shadow-lg -mt-10  transition-all ease-linear px-2 duration-50 bg-white p-0 absolute menu z-40 rounded "
            },
            html: {
                content: new Component({
                    name: "ul",
                    attributes: {
                        style: "max-height:200px;overflow-y:auto;"
                    }
                })
            }
        });


        for (const key in this.properties.options) {
            if (Object.hasOwnProperty.call(this.properties.options, key)) {
                menu.get_child("content").add_child(this.leftMenuItem(this.properties.options[key]));
            }
        }

        // 
        return menu;
    }
    leftMenuItem(item) {
        return new Component({
            name: "li",
            attributes: {
                style: "width:max-content",
                class: "space-x-2 p-2 flex hover:cursor-pointer"
            },
            events: {
                click: [[setSelectedCountry, item]]
            },
            html: {
                flag: new Component({
                    name: "img",
                    attributes: {
                        // width:10,
                        style: "width:20px",
                        src: item.flag
                    }

                }),
                text: new Component({
                    name: "span",
                    attributes: {
                        style: "height:min-content",

                        class: "my-auto flex content-center"
                    },
                    text: item.name
                })
            }
        })
    }

    right() {
        return new Component({
            name: "div",
            attributes: {
                class: "p-2 border rounded  w-full " + defineWidth(this.properties.width ?? null),
            },
            html: {
                input: new Component({
                    name: "input",
                    attributes: {
                        class: "outline-none w-full",
                        type: "tel",
                        name: this.properties.name ?? null,
                        placeholder: this.properties.options[this.properties.selected].patern,
                        value: this.properties.value ?? null
                    }
                })
            }
        })
    }
}

function setSelectedCountry(obj, e, country) {
    let globalDialCodeBox = getParent(obj, 4);
    globalDialCodeBox.querySelector(".left .selected-displayer img").setAttribute("src", country.flag);
    globalDialCodeBox.querySelector(".code-displayer").innerText = country.dial_code;
    globalDialCodeBox.querySelector("input").setAttribute("placeholder", country.patern);
}

function changeDropdownIcons(obj, e) {
    let globalDialCodeBox = getParent(obj, 4);
    globalDialCodeBox.querySelector(".up").classList.toggle("hidden");
    globalDialCodeBox.querySelector(".down").classList.toggle("hidden");
}