import { activeSliderControl, isEmpty, isset, slide } from "../../../component_f.js";
import button from "../buttons/button.js";


export class sliderControl extends button {
    constructor(sliderControl) {
        super(sliderControl);
        this.attributes.type = "button";
        this.add_event("click",activeSliderControl);
        this.add_event("click",slide);
        // this.events.click = [slide, ];
        this.attributes.slider = this.properties.slider ?? "";
        this.attributes.target = this.properties.target ?? "";
        // this.html.text.add_class("lg:block hidden");
        this.add_class("dark:text-secondary-100")
        if (isset(sliderControl.innerText) || isset(this.properties.text)) {
            if (isset(this.properties.htm)) {
                if (isEmpty(this.properties.htm)) {
                    this.get_child("text").add_class("hidden lg:block");
                } else {
                    // if (parseInt(this.properties.htm) && parseInt(this.properties.htm) < 5) {
                    //     this.get_child("text").text = this.get_child("text").text.slice(0, parseInt(this.properties.htm));
                    // } else {
                    //     this.get_child("text").add_class("hidden lg:block");

                    // }
                }
            }
        }
    }

}
