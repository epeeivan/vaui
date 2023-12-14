import Component from "../../../component.js";
import { definePropsFromElement } from "../../../component_f.js";
import squareIcon from "../buttons/squareIcon.js";
import { title } from "../utilities/title.js";


export default class cardOverviewMetric extends Component {
    constructor(coMetric) {
        super();
        this.name = "div";
        this.properties = definePropsFromElement(coMetric);
        this.add_class("flex space-x-3 lg:mx-auto w-full  ");
        this.init()
    }
    init() {
        this.add_child(new squareIcon   ({ icon: this.properties.icon ?? "", color: this.properties.color ?? "", mode: this.properties.mode ?? "" }), "icon");
        this.add_child(this.texts(), "texts");
    }


    texts() {
        return new Component({
            name: "div",
            attributes: {
                class: "flex",
            },
            html: {
                container: new Component({
                    name: "div",
                    attributes: {
                        class: "my-auto"
                    },
                    html: {
                        counter: new title({
                            text: this.properties["counter"] ?? "",
                            type:"lg"
                        }),
                        label: new Component({
                            name: "span",
                            attributes: {
                                class: "text-xs block text-slate-500 capitalize text-sm"
                            },
                            text: this.properties["label"] ?? ""
                        })
                    }
                }),

            }
        })
    }
}
