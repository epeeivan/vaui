import Component from "../../../component.js";
import { definePropsFromElement, getParent, isset } from "../../../component_f.js";
import ui from "../../../ui.js";
import { contextMenu } from "../contextMenu/contextMenu.js";
import basicSelect from "../inputs/basicselect.js";
import { checkbox } from "../inputs/checkbox.js";
import table from "../table/table.js";
import tableLine from "../table/tableLine.js";
import tableCell from "../table/tablecell.js";
import lucideIcon from "../utilities/lucideIcon.js";
import cardOverview from "./cardOverview.js";



export default class cardTable extends cardOverview {


    constructor(cardTable) {
        super(cardTable);
        this.properties = definePropsFromElement(cardTable);

    }
    get lines_per_page() {
        return this.properties["lines_per_page"];
    }

    set lines_per_page(lines) {
        this.properties["lines_per_page"] = lines;
    }
    get pages() {
        return Math.ceil(parseInt(this.lines) / parseInt(this.lines_per_page));
    }

    get current_page() {
        return this.properties["current_page"];
    }
    set current_page(current_page) {
        this.properties["current_page"] = current_page;
    }

    get lines() {
        return isset(this.properties.datas) ? this.datas.length : 1;
    }
    get datas() {
        return this.properties["datas"];
    }
    init(cardTable) {
        super.init(cardTable);
        this.property = { key: "current_page", value: 1 };
        this.property = { key: "lines_per_page", value: 10 };



        this.attributes.class = "relative w-full rounded  border-secondary-100 dark:border-dark-200 z-0 bg-white border-slate-100 dark:bg-dark-300 dark:text-white"
        !isset(this.properties.borderless) ? this.add_class("border-2") : null;

        this.get_child("header").attributes.class = "p-3 w-full lg:flex lg:space-y-0 space-y-2 " + (isset(this.properties.simple) ? 'px-0' : '')
        this.get_child("body").attributes.class = "w-full";
        this.get_child("body").html = {}
        this.get_child("body").add_child(new table(cardTable), "table");
        this.get_child("body").get_child("table").add_class(" card-table");
        this.get_child("body").get_child("table").attributes.id = this.properties.id ?? "";
        // 
        let tab = cardTable.querySelector("table");
        let contextMem = cardTable.querySelector(".context-menu");
        if (isset(contextMem)) {
            this.add_child(new contextMenu(contextMem));
        }
        if (isset(tab)) {
            this.property = { key: "datas", value: cardTable.querySelectorAll("table tr") };
            let lines = cardTable.querySelectorAll("table tr");


            let counter = 0;
            // let lines = childNodes(body[0])
            for (let i = 0; i < (this.lines_per_page + 1); i++) {
                this.getTable().add_child(new tableLine({ type: (counter == 0) ? "h" : "",  borderless: this.properties.borderless ?? null, round: this.properties.round ?? null }));
                this.getTable().last_child().add_child(new tableCell({ html: { check: new checkbox({ class: "checkerAll", target: (counter == 0) ? "tableLine" : null, class: (counter == 0) ? "" : "tableLine" }) }, type: "h" }));

                let cells = this.datas[i].querySelectorAll((counter == 0) ? "th" : "td");
                cells.forEach(cell => {
                    this.getTable().last_child().add_child(new tableCell(cell));
                });
                counter++;

            }

        }

        this.add_child(this.footer(), 'footer')

    }
    footer() {
        return new Component({
            name: "div",
            attributes: {
                class: "flex w-full"
            },
            html: {
                leftContainer: new Component({
                    name: "div",
                    attributes: {
                        class: "flex p-3 space-x-2"
                    },
                    html: {
                        icon: new lucideIcon({ icon: "database" }),
                        count: new Component({
                            name: "span",
                            attributes: {
                                class: "lines-counter block",
                            },
                            text: this.lines - 1
                        })
                    }
                }),
                rightContainer: new Component({
                    name: "div",
                    attributes: {
                        class: "ml-auto p-3 flex space-x-3"
                    },
                    html: {
                        container: new Component({
                            name: "div",
                            attributs: {
                                class: "space-x-2"
                            },
                            html: {
                                label: new Component({
                                    name: "span",
                                    text: this.properties.selectlabel ?? ""
                                }),
                                lines_per_page: new basicSelect({
                                    name: this.properties.name ?? "",
                                    class: "lines_per_page",

                                    options: [
                                        {
                                            value: "10",
                                            text: "10"
                                        },
                                        {
                                            value: "25",
                                            text: "25"
                                        },
                                        {
                                            value: "50",
                                            text: "50"
                                        },
                                        {
                                            value: "100",
                                            text: "100"
                                        },
                                        {
                                            value: "all",
                                            text: "all"
                                        }
                                    ],
                                    events: {
                                        change: [[changeLinesPerPage, this.datas]]
                                    }
                                })
                            },

                        }),
                        pageCounter: new Component({
                            name: "div",
                            attributes: {
                                class: "flex space-x-5"
                            },
                            html: {
                                previous: new Component({
                                    name: "a",
                                    attributes: {
                                        class: "my-auto previous"
                                    },
                                    html: {
                                        icon: new lucideIcon({ icon: "chevron-left" })
                                    },
                                    events: {
                                        click: [[previousPage, this.datas]]
                                    }
                                }),
                                pagesText: new Component({
                                    name: "div",
                                    attributes: {
                                        class: "my-auto flex pages-counter",
                                    },
                                    html: {
                                        current_page: new Component({
                                            name: "div",
                                            attributes: {
                                                class: "current_page"
                                            },
                                            text: this.current_page
                                        }),
                                        divider: new Component({
                                            name: "div",
                                            attributes: {
                                                class: "divider"
                                            },
                                            text: " / "
                                        }),
                                        pages: new Component({
                                            name: "div",
                                            attributes: {
                                                class: "pages"
                                            },
                                            text: this.pages
                                        })

                                    },
                                }),
                                next: new Component({
                                    name: "a",
                                    attributes: {
                                        class: "my-auto next"
                                    },
                                    html: {
                                        icon: new lucideIcon({ icon: "chevron-right" })
                                    },
                                    events: {
                                        click: [[nextPage, this.datas]]
                                    }
                                })

                            }
                        })
                    }
                })
            }
        })
    }

    getTable() {
        return this.get_child("body").get_child("table");
    }

}

function nextPage(obj, e, datas) {
    let box = getParent(obj, 4);
    let table = box.querySelector("table");
    if (current_page(box) < pages(box, datas)) {
        let start = (lines_per_page(box) * (current_page(box) + 1)) - lines_per_page(box);
        let end = (start + lines_per_page(box));
        clearAndRefillTable(box, table, current_page(box) + 1, start, end, datas);
    }

}

function previousPage(obj, e, datas) {
    let box = getParent(obj, 4);
    let table = box.querySelector("table");
    if (current_page(box) > 1) {
        let start = (lines_per_page(box) * (current_page(box) - 1)) - lines_per_page(box);
        let end = (start + lines_per_page(box));
        clearAndRefillTable(box, table, current_page(box) - 1, start, end, datas);
    }
}

function changeLinesPerPage(obj, e, datas) {
    let box = getParent(obj, 4);
    let table = box.querySelector("table");
    box.querySelector(".pages").innerText = pages(box, datas);

    clearAndRefillTable(box, table, 1, 0, parseInt(obj.value), datas)


}
function clearAndRefillTable(box, table, current_page, start, end, datas) {
    let firstLine = table.querySelector("tr:first-child");

    box.querySelector(".current_page").innerText = current_page;
    table.innerHTML = "";
    let counter = 0;
    let Dom = new ui();
    // table.append(firstLine);
    // start = start == 0 ? start + 1 : start;
    for (let i = start; i <= end && i < datas.length; i++) {
        let line = new tableLine({ type: (counter == 0) ? "h" : "" });
        line.add_child(new tableCell({ html: { check: new checkbox({ class: "checkerAll", target: (counter == 0) ? "tableLine" : null, class: (counter == 0) ? "" : "tableLine" }) }, type: "h" }));

        let cells = datas[i].querySelectorAll((counter == 0) ? "th" : "td");
        cells.forEach(cell => {
            line.add_child(new tableCell(cell));
        });
        table.append(Dom.createElementFromStructure(line));
        counter++;


    }

    table.querySelectorAll("tr")[0].remove();
    table.prepend(firstLine);


}
function pages(box, datas) {
    return Math.ceil((datas.length - 1) / box.querySelector(".lines_per_page").value)
}
function lines_per_page(box) {
    return parseInt(box.querySelector(".lines_per_page").value);
}
function current_page(box) {
    return parseInt(box.querySelector(".current_page").innerText);
}
function search() {

}