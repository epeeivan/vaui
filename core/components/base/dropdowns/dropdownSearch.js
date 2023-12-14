import basicInput from "../inputs/basicinput.js";
import dropdownButtonIcon from "./dropdownButtonIcon.js";


export default class dropdownSearch extends dropdownButtonIcon {
    constructor(dropdownSearch) {
        super(dropdownSearch);
        this.get_child("menu").get_child("header").html = {
            search: new basicInput({
                type: "search",
                id: "main-search",
                icon:"search",
                placeholder: (this.properties.title ?? "")
            })
        }

        this.get_child("menu").get_child("menu").add_class("search-response min-w-[150px]")
    }

}