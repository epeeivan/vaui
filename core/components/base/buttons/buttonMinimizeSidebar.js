
import squareIcon from "./squareIcon.js";
import { minimizeSidebar } from "./componentFunctions/sidebarFunctions.js";
import lucideIcon from "../utilities/lucideIcon.js";

export default class buttonMinimizeSidebar extends squareIcon {
    constructor(buttonDarkMode) {
        super(buttonDarkMode);
        let dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        this.html = {
            sun: new lucideIcon({
                icon: "menu",
                class: "m-auto text-xs sun-icon",
            }),
        }

        this.events = {
            click: [minimizeSidebar]
        }
    }
}
