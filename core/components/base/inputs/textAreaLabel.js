import basicSelectLabel from "./basicSelectLabel.js";


export default class textAreaLabel extends basicSelectLabel {
    constructor(textAreaLabel) {
        super(textAreaLabel);
        this.get_child('input').name = "textArea";
        this.get_child('input').text = this.properties.value ?? ""
        this.get_child('input').attributes.value = null;
        this.get_child('input').attributes.placeholder = this.properties.placeholder ?? "";
        this.add_class("flex flex-wrap w-full")
        this.get_child("input").events = {};
        // this.get_child("input").set_event("focus", focusInput);
        this.html.input.events["focus"] = [focusInput];
        this.html.input.events["focus"] = [focusInput];
    }
}
function focusInput(obj) {
    // alert()
    obj.classList.toggle("border-primary-100");
    obj.classList.toggle("dark:border-dark-300");

}