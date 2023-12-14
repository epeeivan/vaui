import Component from "../../../component.js";
import { activeSliderControl, childNodes, definePropsFromElement, isset, slide, toggleClasses } from "../../../component_f.js";
import xhr from "../../../formsubmitter/xhr.js";
import { htmlToComponent } from "../../../htmlToComponent.js";
import { importRequired } from "../../../require.js";
import { Dom } from "../../../ui.js";
import { changeTitle } from "../buttons/button.js";
import squareIcon from "../buttons/squareIcon.js";
import { openModal } from "../componentFunctions/modalFunctions.js";
import { minimizeSidebar } from "../componentFunctions/sidebarFunctions.js";
import { loadContent } from "../utilities/link.js";
import lucideIcon from "../utilities/lucideIcon.js";
import { title } from "../utilities/title.js";
import sidebarSubmenu from "./sidebarSubmenu.js";


export default class sidebarItem extends Component {
    constructor(sidebarItem) {
        super();
        this.name = "li";
        this.properties = definePropsFromElement(sidebarItem);
        this.add_class((this.properties.type == "active") ?'sidebar-item-active':'')
        if (!isset(this.properties.first)) {
            this.add_class("transition-all ease-in group block w-full ");
            this.init(sidebarItem)
            //
            if (isset(sidebarItem.nodeName)) {
                this.build(sidebarItem)
            }
        } else {
            this.add_class("first-of-type:mb-7");
            this.first();
            this.get_child("first").get_child("right").add_class("lg:hidden")
            this.get_child("first").get_child("right").events = {
                click: [minimizeSidebar]
            }
        }
        this.events = {
            click: [openSideItem]
        }
        isset(this.properties["title-to-change"]) ? this.add_event('click', [changeTitle, { title: this.properties["title-to-change"], value: this.properties.text ?? sidebarItem.innerText }]) : '';
    }
    build(SI, addTarget = this) {
        let childs = childNodes(SI);
        childs.forEach(child => {
            if (child.nodeName != "#text") {

                if (child.nodeName == "UL") {
                    //
                    if (this.properties.type == "active") {
                        this.add_class("sidebar-item-active");
                        addTarget.add_child(new sidebarSubmenu({ type: "active" }));
                    } else {
                        addTarget.add_child(new sidebarSubmenu());
                    }
                    //

                    // console.log(addTarget.last_child())
                    addTarget.get_child("link").get_child("dropdownIcons").html = this.dropdownIcons()
                    addTarget.build(child, addTarget.last_child())

                } else {
                    if (SI.nodeName == "UL") {
                        addTarget.add_child(new sidebarItem(child))
                        // 
                    }
                }
            }

        });
    }
    init(sidebarItem) {
        this.html = {
            link: new Component({
                name: "a",
                attributes: {
                    class: "p-1 dark:text-white rounded flex dark:hover:bg-dark-100 capitalize block space-x-3 " + ((this.properties.type == "active") ? "bg-dark-400 text-warning-600 dark:bg-dark-100" : "hover:bg-dark-300 hover:text-warning-600 "),
                    href: this.properties.href ?? ""
                },
                events:
                {
                    click: [checkLink]
                },
                html: {
                    texts: new Component({
                        name: "div",
                        attributes: {
                            class: "w-full space-x-3 flex"
                        },
                        html: {
                            icon: new lucideIcon({ icon: this.properties.icon, class: "" }),
                            label: new Component({
                                attributes: {
                                    class: "block my-auto "
                                },
                                name: "span",
                                text: this.properties.text ?? sidebarItem.innerText
                            })
                        }
                    }),
                    dropdownIcons: new Component({
                        name: "div",
                    })

                }
            })
        }
        if (isset(this.properties.slider) && isset(this.properties.target)) {
            this.get_child("link").attributes.slider = this.properties.slider;
            this.get_child("link").attributes.target = this.properties.target;
            this.get_child("link").events.click.push(slide, activeSliderControl);
        }
        if (isset(this.properties.modal)) {
            this.get_child("link").events.click.push([openModal, this.properties.modal]);
        }
        if (isset(this.properties["no-reload"])) {
            this.get_child("link").add_event("click", [loadContent, { url: this.properties.href, box: this.properties.box }])
        }
    }
    first() {
        this.html = {
            first: new Component({
                name: "a",
                attributes: {
                    class: "font-bold  flex ",
                    href: this.properties.href ?? ""
                },
                html: {
                    texts: new Component({
                        name: "div",
                        attributes: {
                            class: 'flex my-auto text-lg content-center uppercase w-full'
                        },

                        html: {
                            logo: new Component({
                                name: "img",
                                attributes: {
                                    class: " mr-3",
                                    width: "50",
                                    width: "50",
                                    src: this.properties.src ?? ""
                                }
                            }),
                            appName: new title({

                                class: " my-auto h-full",
                                text: this.properties.text ?? sidebarItem.innerText,
                            }),
                        }
                    }),
                    right: new squareIcon({ icon: 'chevron-left' })
                }
            })
        }
    }
    dropdownIcons() {
        return {
            chevronUp: new lucideIcon({
                name: "i",
                icon: "chevron-up",
                class: "lucide-icon  open-icon" + ((this.properties.type == "active") ? "lucide-icon block" : "")
            }),
            chevronDown: new lucideIcon({
                name: "i",
                icon: "chevron-down",
                class: "lucide-icon hidden close-icon"
            }),
        }
    }
}
function reduceSidebar(obj, e) {
    e.preventDefault();

}
function activeButton(obj, e) {

    let activeItem = document.querySelector(".sidebar-item-active");
    console.log(Dom.isTarget(activeItem, obj))

    if (isset(activeItem) && activeItem != obj.parentNode && activeItem != obj.parentNode && !Dom.isTarget(activeItem, obj)) {
        activeItem.click()
    }
    toggleClasses(obj, ["bg-primary-100", "dark:bg-dark-100", "text-primary-600"]);
    obj.classList.toggle("sidebar-item-active");

}

function openSideItem(obj, e) {
    let childs = childNodes(obj);

    let activeItem = document.querySelector(".sidebar-item-active");
    let subActiveItem = document.querySelector(".sub-sidebar-item-active");
    isset(subActiveItem) ? activeSub(subActiveItem) : null;
    console.log(Dom.isTarget(obj, activeItem))
    if (isset(activeItem) && activeItem != obj.parentNode && activeItem != obj && !Dom.isTarget(obj, activeItem)) {
        openCloseItem(activeItem)
    }
    if (!Dom.isTarget(obj, activeItem)) {
        openCloseItem(obj)
    }

}

function activeSub(sub) {
    toggleClasses(sub.childNodes[0], ["text-warning-600", "sub-sidebar-item-active"]);

}

function openCloseItem(item) {
    let childs = childNodes(item);

    toggleClasses(item.childNodes[0], ["bg-dark-400", "dark:bg-dark-100", "text-warning-600"]);
    item.classList.toggle("sidebar-item-active");
    if (childs.length == 2) {
        let openIcon = item.querySelector(".open-icon");
        let closeIcon = item.querySelector(".close-icon");
        toggleClasses(openIcon, ["block", "hidden"]);
        toggleClasses(closeIcon, ["block", "hidden"]);
        toggleClasses(childs[1], ["h-[0px]", "block", "h-auto", "-mt-5", "mt-0", "relative"]);
        item.classList.toggle("bg-dark-300");
    }
}
function checkLink(obj, e) {
    if (!isset(obj.attributes.href) || obj.getAttribute("href") == "") {
        e.preventDefault()
    }
}
