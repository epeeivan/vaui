import Component from "../../../component.js";
import { definePropsFromElement } from "../../../component_f.js";
import squareLink from "../buttons/squareLink.js";
import lucideIcon from "./lucideIcon.js";


export default class breadcrumb extends Component {
    constructor(breadcrumb) {
        super();
        this.name = "div";
        this.properties = definePropsFromElement(breadcrumb);
        this.add_class("w-full flex capitalize");
        this.init();
    }
    init() {
        this.html = {
            pageName: new Component({
                name: "div",
                attributes: {
                    class: "mr-auto"
                },
                html: {
                    title: new Component({
                        name: "h1",
                        attributes: {
                            class: "font-bold text-lg block"
                        },
                        text: this.properties.title ?? ""
                    }),
                    subTitle: new Component({
                        name: "span",
                        attributes: {
                            class: "text-slate-500 text-xs lg:hidden flex"
                        },
                        html: {
                            home: new Component({
                                name: "span",
                                text: this.properties.home ?? ""
                            }),
                            icon: new lucideIcon({ icon: "minus" }),
                            title: new Component({
                                name: "span",
                                text: this.properties.title ?? ""
                            }),
                        }
                    })
                }
            }),
            help: new Component({
                name: "div",
                html: {
                    button: new squareLink({ type: "primary", text: this.properties["button-label"], icon: this.properties.icon ?? "", href: this.properties.href ?? "" })
                }
            })
        }
    }
}