import Component from "../../../component.js";
import { definePropsFromElement } from "../../../component_f.js";
import squareIcon from "../buttons/squareIcon.js";
import badge from "../utilities/badge.js";


export default class cardLine extends Component {
    constructor(cardLine) {
        super();
        this.name = "a";
        this.properties = definePropsFromElement(cardLine);
        this.attributes = {
            class: "flex lg:flex-nowrap space-y-2 w-full dark:hover:bg-primary-100 hover:bg-primary-100/[0.2] rounded group transition-all ease-linear duration-100 lg:space-y-0 flex-wrap p-1 ",
            href: this.properties.href ?? ""
        }
        this.init();

    }

    init(cardLine) {
        this.add_child(this.left(), "left");
        if (this.properties.badge != undefined && this.properties.time != undefined) {
            this.add_child(this.right(), "right");
        }
    }

    left() {
        return new Component({
            name: "div",
            attributes: {
                class: "flex space-x-3 mr-auto w-full"
            },
            html: {
                icon: new squareIcon({ type: this.properties["icon-type"]??"secondary", icon: this.properties.icon??"" }),
                titleAndDescription: new Component({
                    name: "div",
                    attributes: {
                        class: "flex flex-wrap"
                    },
                    html: {
                        title: new Component({
                            name: "h1",
                            attributes: {
                                class: "w-full font-bold capitalize my-auto"
                            },
                            text: this.properties.title ?? ""
                        }),
                        description: new Component({
                            name: "span",
                            attributes: {
                                class: "group-hover:text-white text-slate-500"
                            },
                            text: this.properties.description ?? ""
                        })
                    }
                })
            }
        });
    }
    right() {
        return new Component({
            name: "div",
            attributes: {
                class: "flex flex-wrap lg:justify-end space-y-2 "
            },
            html: {
                badge: new badge({ type: this.properties.badgeType??"secondary", label: this.properties.badge ?? "" }),
                time: new Component({
                    name: "div",
                    attributes: {
                        class: "text-xs w-full  lg:text-right"
                    },
                    html: {
                        timeText: new Component({
                            name: "span",
                            attributes: {
                                class: "block text-right my-auto"
                            },
                            text: this.properties.time ?? ""
                        })
                    }
                })
            }
        });
    }
}