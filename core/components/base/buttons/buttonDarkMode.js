import lucideIcon from "../utilities/lucideIcon.js";
import button from "./button.js";
import squareIcon from "./squareIcon.js";

export default class buttonDarkMode extends button {
    constructor(buttonDarkMode) {
        super(buttonDarkMode);
        let dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        this.html = {
            sun: new lucideIcon({
                icon: "sun",
                class: "m-auto text-xs sun-icon",
            }),
            moon: new lucideIcon({
                icon: "moon",
                class: " m-auto text-xs moon-icon",
            }),
        }
        if (dark) {
            this.get_child("sun").add_class("hidden")
            this.get_child("moon").add_class("block")
        } else {
            this.get_child("moon").add_class("hidden")
            this.get_child("sun").add_class("block")
        }
        this.events = {
            click: [toogleDarkMode]
        }
    }
}
function toogleDarkMode(but) {
    document.querySelector("html").classList.toggle("dark")
    but.querySelector(".sun-icon").classList.toggle("hidden")
    but.querySelector(".moon-icon").classList.toggle("hidden")
} 