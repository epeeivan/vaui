import Component from "../../../component.js";
import { childNodes, definePropsFromElement, getParent, isEmpty, isset } from "../../../component_f.js";
import { htmlToComponent } from "../../../htmlToComponent.js";
import squareIcon from "../buttons/squareIcon.js";
import squareLink from "../buttons/squareLink.js";
import dropdown, { openDropdown } from "../dropdowns/dropdown.js";
import dropdownItem from "../dropdowns/dropdownItem.js";
import notificationDropdownItem from "../dropdowns/notificationDropdownItem.js";
import basicInputLabel from "../inputs/basicInputLabel.js";
import basicInput from "../inputs/basicinput.js";
import { title } from "../utilities/title.js";


export default class card extends Component {

    constructor(card) {
        super();
        this.properties = definePropsFromElement(card);
        this.attributes.action = this.properties.action ?? null;
        this.attributes.id = this.properties.id ?? null;
        this.attributes["bg-color"] = this.properties["bg-color"] ?? null;
        this.attributes["bg-image"] = this.properties["bg-image"] ?? null;
        // 
        this.attributes["bg-color-target"] = this.properties["bg-color-target"] ?? null;
        this.attributes["bg-image-target"] = this.properties["bg-image-target"] ?? null;

        this.init(card)
    }
    init(card) {

        this.name = "div";

        // this.add_class(this.properties.class??"");

        this.add_class((this.properties.rounded ?? "rounded") + " " + (this.properties.border ?? "border-[1px]") + "border-secondary-100 dark:border-dark-200 p-3 " + (this.properties.bg ?? "bg-white") + " border-slate-200 space-y-2 dark:bg-dark-300");
        this.add_class(this.properties.class ?? '')

        this.add_child(this.header(card), "header");
        //alert()

        this.add_child(this.body(), "body");
        // alert()
        if (isset(card.nodeName)) {
            let content = card.querySelector(".content");
            if (isset(content)) {
                this.get_child("body").html = htmlToComponent(content).html;
            }
        }

    }
    getHeader(headerChild = null) {
        return headerChild != null ?
            this.get_child("header") :
            this.get_child("header").get_child(headerChild);
    }
    get body() {
        return this.get_child("body");
    }

    header(card) {
        let header = new Component({
            name: "div",
            attributes: {
                class: "flex w-full"
            },
            html: {
                left: new Component({
                    name: "div",
                    attributes: {
                        class: " mr-auto"
                    },
                    html: {
                        title: new title({
                            type: "lg",
                            text: this.properties.title ?? ""
                        }),
                        subTitle: new Component({
                            name: "span",
                            attributes: {
                                class: "text-xs block capitalize text-slate-500"
                            },
                            text: this.properties.subtitle ?? ""
                        })
                    }
                }),
                right: new Component({
                    name: "div",
                    attributes: {
                        class: "flex space-x-2"
                    }
                })

                // dropdown: new dropdown({}),

            }
        })

        if (isset(this.properties["search-input"])) {
            header.get_child("right").add_child(
                new Component({
                    name: "div",
                    html: {
                        search: new basicInput({ icon: "search", name: "search", type: "search", placeholder: "search", round: this.properties.round ?? null }),

                    }
                }), "searchContainer")

            let input = header.get_child("right").get_child("searchContainer").html.search.html.inputField.html.input;
            // console.log(input)
            input.events.keyup = [filterArray]

        }
        let filters = isset(card.nodeName) ? card.querySelector(".filters") : null;
        if (isset(filters)) {
            let filtersItems = childNodes(filters);
            header.get_child("right").add_child(new dropdown({ class: "filters" }), "filters");
            header.get_child("right").get_child("filters").get_child("controls").add_child(new squareIcon({ icon: "filter", type: "secondary" }), "button")
            header.get_child("right").get_child("filters").get_child("controls").get_child("button").events.click = [openDropdown];
            header.get_child("right").get_child("filters").get_child("menu").html = htmlToComponent(filters).html;
            // filtersItems.forEach(filtersItem => {
            //     if (filtersItem.nodeName == "SELECT") {
            //         header.get_child("right").get_child("filters").get_child("menu").add_child(new basicSelectLabel(filtersItem));
            //     } else {
            //         header.get_child("right").get_child("filters").get_child("menu").add_child(new basicInputLabel(filtersItem));

            //     }
            // });

        }
        isset(this.properties.add) ? header.get_child("right").add_child(new squareLink({ icon: "plus", type: "secondary", href: this.properties.add })) : "";
        let options = isset(card.nodeName) ? card.querySelector(".options") : null;
        if (isset(options)) {
            header.get_child("right").add_child(new dropdown({ class: "options" }), "options");
            header.get_child("right").get_child("options").get_child("controls").add_child(new squareIcon({ icon: "more-vertical", type: "secondary" }), "button")
            header.get_child("right").get_child("options").get_child("controls").get_child("button").events.click = [openDropdown];
            header.get_child("right").get_child("options").get_child("menu").html = htmlToComponent(options).html;
        }

        // header.add_child(new dropdown({}), "dropdown");

        return header;
    }
    body() {
        return new Component({
            name: "div",
            attributes: {
                class: "flex w-full overflow-x-auto lg:flex-nowrap flex-wrap ",
                style: "overflow-x:auto"
            }
        })
    }

}

function filterArray(obj, e) {
    var input, filter, table, tr, td, i;
    input = obj;
    // alert()
    filter = input.value.toUpperCase();
    table = childNodes(getParent(obj, 5).nextSibling)[0];
    // alert(table)
    tr = table.querySelectorAll("tr");
    for (i = 1; i < tr.length; i++) {
        if (!isEmpty(filter)) {
            if (!findValue(tr[i], filter)) {
                tr[i].classList.add("hidden");
            }
        } else {
            tr[i].classList.remove("hidden");
        }


    }
}

function findValue(tr, filter) {
    let tds = tr.querySelectorAll("td");
    let found = false;
    for (let j = 0; j < tds.length; j++) {
        let txtValue = tds[j].innerText;
        // console.log(txtValue.toUpperCase().indexOf(filter) > -1)
        // console.log(txtValue.toUpperCase().split(filter).length)
        if (txtValue.toUpperCase().split(filter).length > 1) {
            return true;
        }

    }
    return found;
}