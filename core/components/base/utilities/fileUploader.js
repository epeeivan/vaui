import Component from "../../../component.js";
import { definePropsFromElement } from "../../../component_f.js";
import { Dom } from "../../../ui.js";
import button from "../buttons/button.js";
import CircleImage from "../images/circleImage.js";

export default class fileUploader extends Component {
    constructor(input) {

        super();
        this.properties = definePropsFromElement(input)
        this.name = "div";
        this.attributes = {
            class: "space-y-2"
        }

        this.html = {
            actionner: new button({ color: "secondary", text: this.properties.text ?? "", mode: "transp", round: true, icon: this.properties.icon ?? null, type: "button" }),
            input: new Component({
                name: "input",
                attributes: {
                    type: "file",
                    accept: this.properties.accept ?? null,
                    name: this.properties.name ?? null,
                    class: "hidden",
                    id: this.properties.id ?? null,
                    multiple: this.properties.multiple ?? null
                },
                events: {
                    change: [[showImage, this.properties.target]]
                }
            })
        }
        this.get_child("actionner").add_event("click", actionFileSelecter);
    }
}

function showImage(obj, e, target) {
    let targetBox = document.getElementById(target);
    targetBox.innerHTML = "";
    console.log(e.target.files.length)
    for (let i = 0; i < e.target.files.length; i++) {
        targetBox.append(Dom.createElementFromStructure(new CircleImage({ src: URL.createObjectURL(e.target.files[i]) })))
        console.log(targetBox.innerHTML)
        console.log(e.target.files[i])

    }
    // e.target.files.forEach(file => {
    //     targetBox.append(Dom.createElementFromStructure(new CircleImage({ src: file })))
    // });

}
function actionFileSelecter(obj, e) {
    obj.nextSibling.click()
}