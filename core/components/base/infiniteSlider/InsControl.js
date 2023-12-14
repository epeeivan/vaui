import Component from "../../../component.js";
import { definePropsFromElement, isset } from "../../../component_f.js";
import lucideIcon from "../utilities/lucideIcon.js";

export class InsControl extends Component {
    constructor(ins) {
        super();
        this.properties = definePropsFromElement(ins);
        this.name = "button";
        this.attributes = {
            class: "border-2 border-yellow-600 rounded-2xl my-auto p-5 "+(this.properties.color??"text-yellow-600")+" "+(this.properties.class??""),
            id: this.properties.is ?? null
        };

        this.html = {
            icon: new lucideIcon(
                {
                    icon: this.properties.type == "next" ? "chevron-right" : "chevron-left",
                    width: 24,
                    height: 24
                }
            )
        }

        this.properties.target ? this.add_event("click", [InsSlide, { target: this.properties.target, type: this.properties.type }]) : null;

    }
}
// function 
function InsSlide(obj, e, params) {
    let insSlider = document.getElementById(params.target);
    console.log(params)

    if (isset(insSlider)) {
        let insSliderContent = insSlider.querySelector(".content");

        let childrenCount = insSliderContent.children.length;
        let currenPosition = parseInt(insSliderContent.getAttribute("ins-index") ?? 0);
        let outPosition = currenPosition, prefix = "";
        // 
        switch (params.type) {
            case "next":
                // 
                if ((currenPosition + 1) < childrenCount) {
                    outPosition++;
                    prefix = "-"
                } else {
                    outPosition = 0;
                }
                break;
            case "previous":
                if (currenPosition > 0) {
                    outPosition--;
                    prefix = ""
                } else {
                    prefix = "-"
                    outPosition = childrenCount - 1
                    console.log("you can't go back ")
                }
                break;
        }
        // 
        if (currenPosition != outPosition) {
            console.log(insSliderContent.children[outPosition])
            let currentItem = insSliderContent.children[outPosition];
            if (currentItem.hasAttribute("bg-color") && currentItem.hasAttribute("bg-color-target")) {
                // let bgImageTarget = document.getElementById(currentItem.getAttribute("bg-image-target"));

                let bgColorTarget = document.getElementById(currentItem.getAttribute("bg-color-target"));
                if (currentItem.hasAttribute("bg-image")) {
                    bgColorTarget.style.background = "#000"
                }
                if (currentItem.hasAttribute("bg-image")) {
                    setTimeout(() => {
                        bgColorTarget.style.backgroundColor = currentItem.getAttribute("bg-color");

                    }, 600);
                } else {
                    bgColorTarget.style.backgroundColor = currentItem.getAttribute("bg-color");

                }


            }

            if (currentItem.hasAttribute("bg-image") && currentItem.hasAttribute("bg-image-target")) {
                let bgImageTarget = document.getElementById(currentItem.getAttribute("bg-image-target"));
                setTimeout(() => {
                    bgImageTarget.style.backgroundImage = "url(" + currentItem.getAttribute("bg-image") + ")";

                }, 500);
            }
            insSliderContent.setAttribute("style", "margin-left:" + prefix + (outPosition * 100) + "%;width:" + (100 * childrenCount) + "%");
            insSliderContent.setAttribute("ins-index", outPosition);
        }
    } else {
        console.log("the " + params.target + " slider is undefined");
    }
}