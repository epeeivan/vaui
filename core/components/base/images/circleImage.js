import Component from "../../../component.js";
import { definePropsFromElement, getParent } from "../../../component_f.js";
import lucideIcon from "../utilities/lucideIcon.js";

export default class CircleImage extends Component {
    constructor(image) {
        super();
        this.properties = definePropsFromElement(image)
        this.name = "div";
        this.attributes = {
            class: this.getWidth() + " min-h-[100px] h-[100px] rounded-full relative overflow-hidden bg-cover group bg-center bg-secondary-100",
        };
        this.html = {
            img: {
                name: "img",
                attributes: {
                    src: this.properties.src ?? null,
                    class: "w-full h-full"
                }
            },
            closer: new Component({
                name: "div",
                attributes: {
                    class: "w-full h-full absolute bg-dark-600/[0.2]  group-hover:mt-[-100px] transition-all ease-linear duration-100 text-white"
                },
                text: "toto",
                html: {
                    icon: new lucideIcon({ icon: "x", width: 25, heigt: 25 })
                },
                events: {
                    click: [[dismiss]]
                }
            })
        }
    }
    getWidth() {
        switch (this.properties.width) {
            case "xs":
                return "min-w-[35px] max-w-[35px] min-h-[35px] max-h-[35px]";
            case "sm":
                return "min-w-[50px] max-w-[50px] min-h-[50px] max-h-[50px]";
            case "lg":
                return "min-w-[100px] max-w-[100px] min-h-[100px] max-h-[100px]";
            default:
                return "min-w-[100px] max-w-[100px] min-h-[100px] max-h-[100px]";
        }
    }
}
function dismiss(obj, e) {
    getParent(obj, 1).remove();
}