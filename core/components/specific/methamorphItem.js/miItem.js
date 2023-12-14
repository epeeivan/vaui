import Component from "../../../component.js";
import { miCourse } from "./miCourse.js";

export class miItem extends miCourse {
    constructor(miItem) {
        super(miItem);
        this.attributes.class="p-2 flex space-x-2 rounded-lg hover:bg-info-100/[0.2] group ease duration-100";
        this.get_child("icon").attributes.class = "icon min-w-[35px] max-w-[35px]  group-hover:bg-primary-100  group-hover:text-white min-h-[35px] max-h-[35px] rounded-full flex bg-secondary-100/[0.2]";
        this.get_child("content").get_child("left").add_class("flex");
        this.text = "";
        this.get_child("content").get_child("left").html = {
            name: new Component({ name: "span", attributes: { class: "my-auto dark:text-white dark:hover:text-white group-hover:text-primary-100" }, text: miItem.innerText ?? this.properties.text })
        }
    }
}