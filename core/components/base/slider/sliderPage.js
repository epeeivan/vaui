import Component from "../../../component.js";
import { definePropsFromElement, isset } from "../../../component_f.js";
import { htmlToComponent } from "../../../htmlToComponent.js";
import lucideIcon from "../utilities/lucideIcon.js";


export class sliderPage extends Component {
    constructor(sliderPage) {
        super();
        this.properties = definePropsFromElement(sliderPage);
        this.name = "div";
        this.attributes = {
            class: "flex dark:border-slate-700   rounded"
                + (isset(this.properties.class) ? this.properties.class.replace("slider-page") : ""),
            id: this.properties.id ?? ""
        }

        if (isset(this.properties.type)) {
            switch (this.properties.type) {
                case "grid":


                    this.grigElements();
                    break;
                case "card":
                    this.add_class("flex-wrap");
                    this.add_class("space-y-2");
                    this.cardElements();
                    break;
                default:
                    break;
            }
        }
        let content = sliderPage.querySelector(".content");
        if (isset(content)) {
            this.html = htmlToComponent(content).html;
        }

    }
    grigElements() {
        this.add_child(new Component({
            name: "div",
            attributes: {
                class: "lg:w-1/2 space-y-5 rounded  p-3 flex flex-wrap bg-center bg-cover ",
            },
            html: {
                title: new Component({
                    name: "h1",
                    attributes: {
                        class: "text-2xl capitalize font-bold title",
                    },
                    text: this.properties.title ?? ""
                }),
                box: new Component({
                    name: "div",
                    attributes: {
                        class: "w-full space-y-2 data-display-box"
                    },
                    text: this.properties["sub-title"] ?? ""
                })
            }
        }));
        //
        this.add_child(new Component({
            name: "div",
            attributes: {
                class: "w-1/2 lg:flex hidden",
            }
        }));
    }
    cardElements() {
        this.add_child(new Component({
            name: "div",
            attributes: {
                class: "capitalize w-full ",
                style:"padding:0px 5px"
            },
            html: {
                title: new Component({
                    name: "h1",
                    attributes: {
                        class: "text-lg font-bold title",
                    },
                    text: this.properties.title ?? ""
                }),
                subTitle: new Component({
                    name: "span",
                    attributes: {
                        class: "text-xs text-slate-500"
                    },
                    text: this.properties["sub-title"] ?? ""
                })
            }
        }));
        this.add_child(new Component({
            name: "div",
            attributes: {
                style:"max-height:150px;min-height:150px;",
                class: "divide-y divide-secondary-100 my-2 dark:divide-dark-300  data-display-box  w-full",
            }
        }));
        this.add_child(new Component({
            name: "div",
            attributes: {
                class: "capitalize w-full dark p-2",
            },
            html:{
                container:new Component({
                    name:"div",
                    attributes:{
                        class:"space-x-2"
                    },
                    html:{
                        icon:new lucideIcon({icon:"database"})
                    }
                })
            }
        }));
    }
}