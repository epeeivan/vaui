import Component from "./component.js";
import { childNodes, definePropsFromElement, isset } from "./component_f.js";
import { Reg } from "./reg.js";

export function htmlToComponent(html, parent = null, is_comp = false) {

    let childs = childNodes(html);
    let comp = null;
    let is_sail_Component = false;
    if (html.nodeName != "#text" && html.hasAttribute("to-sail-component") && isset(Reg[html.getAttribute("to-sail-component")])) {

        comp = Reg[html.getAttribute("to-sail-component")](html);
        is_sail_Component = true;

    } else {
        comp = new Component({
            name: html.nodeName,
            attributes: html.nodeName != "#text" ? definePropsFromElement(html) : null,
            text: html.nodeName == "#text" ? html.nodeValue : null,
        });
    }

    childs.forEach(child => {

        htmlToComponent(child, comp, is_sail_Component);
    });

    if (isset(parent)) {
        if (is_comp && html.nodeName != "#text" && html.hasAttribute("in")) {
            parent.get_child(html.getAttribute("in")).add_child(comp)
        } else {
            if (!is_comp) {
                parent.add_child(comp);
            }

        }
    }
    return comp;
}
