import { childNodes } from "../../../component_f.js";
import dropdownButtonIcon from "./dropdownButtonIcon.js";
import dropdownItem from "./dropdownItem.js";

;

export default class dropdownUser extends dropdownButtonIcon{
    constructor(dropdownUser){
        super(dropdownUser);
        let menu = childNodes(dropdownUser)[0];

        let items = childNodes(menu)
        console.log(items)
        items.forEach(item => {
            this.get_child("menu").get_child("menu").add_child(new dropdownItem(item))
        });
        this.get_child("menu").add_class(this.properties.class.replace("dropdown_user"));
    }
}