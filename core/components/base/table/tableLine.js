import Component from "../../../component.js";
import { definePropsFromElement, getParent, isset } from "../../../component_f.js";
import ui from "../../../ui.js";
import { moveContextMenu } from "../contextMenu/contextMenu_f.js";

import badge from "../utilities/badge.js";
import tableCell from "./tablecell.js";


export default class tableLine extends Component {
    constructor(line) {
        super();
        this.name = "tr";
        this.properties = definePropsFromElement(line);
        if (line.type == "h") {
            this.add_class("text-slate-500 dark:bg-dark-200");
            !isset(this.properties.borderless) ? this.add_class("capitalize bg-slate-100 border-slate-300 dark:border-dark-300") : this.add_class("uppercase");

        } else {
            this.add_class("hover:bg-slate-100 dark:hover:bg-dark-200  ");
            !isset(this.properties.borderless) ? this.add_class("border-secondary-100 dark:border-dark-200 rounded-full") : null;
            isset(this.properties.round) ? this.add_class("rounded-full") : null;
        }
        this.add_class(this.properties.class ?? "")
        this.attributes.id = this.properties.id ?? null;
        this.attributes["tabindex"] = "0";
        this.events["contextmenu"] = [showContextMenuOnLine];
        this.events["click"] = [linkLine];
        this.fill(line);
    }

    fill(line) {
        for (const key in line.cells) {
            this.add_child(new tableCell({ text: line.cells[key] }));
        }

    }
    addcell(cell) {
        this.add_child(new tableCell(cell));
    }
    addCellBadge(cell) {
        this.add_child(new tableCell({ html: new badge(cell) }));
    }
}
function linkLine(obj, e) {
    let Dom = new ui();
    let checker = obj.querySelector("td:first-of-type");
    let actions = obj.querySelector("td:last-of-type");
    if (!Dom.isTarget(e.target, checker) && obj.querySelector("th:first-of-type") == null) {
        let id = obj.getAttribute("id").split("-")[obj.getAttribute("id").split("-").length - 1];
        window.location.href = window.location.href + "consult?id=" + id;
    }

}
export function showContextMenuOnLine(line, e) {
    e.preventDefault();
    let cardT = getParent(line, 3);
    activeLine(line, cardT);
    let checker = line.querySelector("input");
    let context_param = null;
    if (checker.hasAttribute("name") && checker.hasAttribute("value")) {
        context_param = checker.getAttribute("name") + "=" + checker.getAttribute("value");
    }
    moveContextMenu(cardT, e, context_param);
}
function activeLine(line, cardT = null) {
    if (isset(cardT)) {
        let selectedLines = cardT.querySelectorAll('.selected-line');
        console.log(selectedLines.length)
        if (selectedLines.length > 0) {
            selectedLines.forEach(selectedLine => {
                activeLine(selectedLine)

            });
        }
    }

    line.querySelector('.tableLine').click()
}
export function changeApparance(line) {
    line.classList.toggle("selected-line");
    line.classList.toggle("bg-primary-100/[0.2]");
    line.classList.toggle("hover:bg-slate-100")
    line.classList.toggle("dark:hover:bg-dark-200")

}
export function activateLine(line) {
    line.classList.add("selected-line");
    line.classList.add("bg-primary-100/[0.2]");
    line.classList.remove("hover:bg-slate-100")
    line.classList.add("hover:bg-primary-200/[0.5]")
    line.classList.add("dark:hover:bg-dark-200")
}
export function desactivateLine(line) {
    line.classList.remove("selected-line");
    line.classList.remove("bg-primary-100/[0.2]");
    line.classList.add("hover:bg-slate-100")
    line.classList.remove("hover:bg-primary-200/[0.5]")
    line.classList.remove("dark:hover:bg-dark-200")
}
