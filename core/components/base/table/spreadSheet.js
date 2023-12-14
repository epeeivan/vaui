import Component from "../../../component.js";
import { definePropsFromElement, getParent, isset } from "../../../component_f.js";
import { Dom } from "../../../ui.js";
import button from "../buttons/button.js";
import basicInput from "../inputs/basicinput.js";
import lucideIcon from "../utilities/lucideIcon.js";
import { title } from "../utilities/title.js";
import table from "./table.js";
import tableLine from "./tableLine.js";
import tableCell from "./tablecell.js";

export class spreadSheet extends Component {
    constructor(spreadsheet) {
        super();
        this.name = "div";
        this.properties = definePropsFromElement(spreadsheet);
        this.properties.headers = JSON.parse(this.properties.headers);
        this.attributes = {
            class: "w-full relative"
        }
        if (isset(this.properties.datas)) {
            this.properties.datas = JSON.parse(this.properties.datas);
            console.log(this.properties.datas);
        }

        isset(this.properties.title) ? this.add_child(this.header(), "title") : null;
        this.add_child(this.body(), "body");
        this.get_child("body").add_child(new Component({ name: "table", attributes: { class: "w-full border-collapse " } }), "table");
        // 
        this.fillHeaders();
        (!isset(this.properties.datas)) ? this.addLine() : this.fillTableWithDatas();
        this.add_child(this.footer());
        if (!isset(this.properties.nototal)) {
            this.add_child(this.totalAndTva());
        }


    }
    fillTableWithDatas() {
        this.properties.datas.forEach(line => {
            this.addLine(false, line);
        });
    }

    get headers() {
        return Object.keys(this.properties.headers);
    }

    fillHeaders() {
        this.addLine(true);
    }
    footer() {
        let foot = new Component(
            {
                name: "div",
                attributes: {
                    class: "flex "
                },
                html: {
                    content: new Component(
                        {
                            name: "div",
                            attributes: {
                                class: "ml-auto border-secondary-300 border-x border-b"
                            },
                            html: {
                                button: new button(
                                    {
                                        icon: "plus",
                                        text: "new line",
                                        class: "rounded-0",
                                        type: "button"
                                    }
                                )
                            }
                        }
                    )
                }
            })
        foot.get_child("content").get_child("button").add_event("click", [addLine, this.properties.headers]);
        return foot;
    }
    totalAndTva() {
        let tva = new Component({
            name: "div",
            attributes: {
                class: "flex",
            },
            html: {
                content: new Component({
                    name: "div",
                    attributes: {
                        class: "ml-auto"
                    },
                })
            }
        });

        tva.get_child("content").add_child(this.totalLine({ label: "total hors taxes", class: "tht_amount", disabled: "", value: 0 }))
        tva.get_child("content").add_child(this.totalLine({ label: "tva", class: "tva_percent", disabled: null, value: this.properties.tva ?? 19.25, name: "tva", type: "text" }), "tva_line");
        tva.get_child("content").get_child("tva_line").get_child("input").add_event("keyup", reCalculateAllTable);
        tva.get_child("content").add_child(this.totalLine({ label: "montant tva", class: "tva_amount", disabled: "", value: 0 }))
        tva.get_child("content").add_child(this.totalLine({ label: "total toutes taxes comprises", class: "ttc_amount", disabled: "", value: 0 }))

        return tva;

    }
    totalLine(params) {
        return new Component({
            name: "div",
            attributes: {
                class: "grid grid-cols-2",
            },
            html: {
                label: new Component({ name: "label", text: params.label ?? "", attributes: { class: "font-black " } }),
                input: new Component({
                    name: "input",
                    attributes: {
                        type: params.type ?? "number",
                        value: params.value ?? null,
                        disabled: params.disabled,
                        name: params.name ?? null,
                        class: "border border-secondary-300 outline-none " + (params.class ?? "")
                    }
                })
            }
        })
    }
    addLine(isheader = false, lineDatas = null) {
        this.get_child("body").get_child("table").add_child(line(this.properties.headers, isheader, lineDatas))
    }

    header() {
        return new Component({
            name: "div",
            html: {
                title: new title({ type: "xl", text: this.properties.title })
            }
        })
    }
    body() {
        return new Component({
            name: "div"
        })
    }
}
function addLine(obj, e, headers) {
    let table = getParent(obj, 3).querySelector("table");
    // console.log(table)
    table.append(Dom.createElementFromStructure(line(headers)))

}
function line(headers, isheader = false, lineDatas = null) {
    let line = new Component({ name: "tr", attributes: { class: " relative " + (isheader ? "" : "group") } });
    for (const key in headers) {
        if (Object.hasOwnProperty.call(headers, key)) {

            let cellContent = {};
            if (!isheader) {
                cellContent = {
                    field: new Component(
                        {
                            name: headers[key].field ?? "input",
                            attributes: {
                                class: "outline-none border-none w-full h-full  block " + ((isset(headers[key].total) ? "bg-secondary-100:" : "") + " " + (headers[key].class ?? "")),
                                type: headers[key].type ?? null,
                                name: headers[key].name ?? null,
                                style: "background-color:transparent;",
                                multiple: headers[key].multiple ?? null,
                                disabled: isset(headers[key].total) ? "" : null,
                                value: (isset(lineDatas) && headers[key].field != 'select' && headers[key].field != 'textarea') ? (lineDatas[key] ?? null) : null,
                            },
                            text: (isset(lineDatas) && headers[key].field == 'textarea') ? (lineDatas[key] ?? null) : null,

                        }
                    )
                }
                if (isset(headers[key].options) && headers[key].field == "select") {
                    for (const optionKey in headers[key].options) {
                        if (Object.hasOwnProperty.call(headers[key].options, optionKey)) {
                            cellContent.field.add_child(new Component({
                                name: "option",
                                attributes: {
                                    selected: (isset(lineDatas) && lineDatas[key] && lineDatas[key] == headers[key].options[optionKey]) ? 'selected' : 'null',
                                    value: optionKey
                                },
                                text: headers[key].options[optionKey]
                            }))

                        }
                    }
                }
                isset(headers[key].calc_total) ? cellContent.field.add_event("keyup", [calLineTotal, { calc_tht: headers[key].calc_tht ?? false }]) : null;
                // isset(headers[key].calc_tht) ? cellContent.field.add_event("change", calcTht) : null;
            }
            line.add_child(lineDismisser());
            line.add_child(new Component(
                {
                    name: isheader ? "th" : "td",
                    text: isheader ? (headers[key].label ?? key) : "",
                    html: isheader ? null : cellContent,
                    attributes: {
                        class: " border-b  border-secondary-300 h-[30px] w-[max-content] " + (!isheader ? "border-x" : "text-left uppercase")
                    }
                }
            ))
        }
    }
    console.log(line)
    return line;
}
function calLineTotal(obj, e, params, box = null, gline = null) {
    // e.preventDefault();
    let line = gline ?? getParent(obj, 2);
    // document.getElementByName()
    let total = line.querySelector(".total");
    let quantity = line.querySelector(".quantity");
    let unit_ptice = line.querySelector(".unit_price");
    let real_quantity = line.querySelector(".real_quantity");

    if (isset(total) && isset(quantity) && isset(unit_ptice)) {
        total.value = (isset(real_quantity) ? parseInt(real_quantity.value) : parseInt(quantity.value)) * parseInt(unit_ptice.value)
    }
    let tableBox = box ?? getParent(obj, 5);

    params.calc_tht ? calcTht(obj, e, tableBox) : null;
    params.calc_tht ? calcTva(obj, e, tableBox) : null;
}
function reCalculateAllTable(obj, e) {
    let box = getParent(obj, 4);
    let table = box.querySelector("table");
    let tht_amount = box.querySelector(".tht_amount");
    if (tht_amount.value == 0) {
        let lines = table.querySelectorAll("table tr");
        lines.forEach(line => {
            calLineTotal(obj, e, { calc_tht: true }, box, line);
        });
    } else {
        calcTht(obj, e, box);
        calcTva(obj, e, box);
    }

}
function calcTht(obj, e, tableBox) {
    // console.log(tableBox)
    let tht_total = tableBox.querySelector(".tht_amount");
    let LinesTotals = tableBox.querySelectorAll(".total");
    tht_total.value = 0;
    LinesTotals.forEach(LineTotal => {
        console.log(tht_total);

        tht_total.value = parseInt(LineTotal.value) + parseInt(tht_total.value)
    });

}
function calcTva(obj, e, tableBox) {

    let tva_amount = tableBox.querySelector(".tva_amount");
    let tht_amount = tableBox.querySelector(".tht_amount");

    let tva_percent = tableBox.querySelector(".tva_percent");
    let ttc_amount = tableBox.querySelector(".ttc_amount");
    ttc_amount.value = 0;
    tva_amount.value = 0;

    console.log(tva_amount)
    tva_amount.value = ((parseFloat(tva_percent.value) * parseFloat(tht_amount.value)) / 100);
    ttc_amount.value = parseFloat(tva_amount.value) + parseFloat(tht_amount.value);

}
function lineDismisser() {
    return new Component({
        name: "button",
        attributes: {
            type: "button",
            class: "flex w-[30px] h-[30px] absolute bg-secondary-100 right-0 opacity-0 group-hover:opacity-100 group-hover:text-primary-600 transition-all ease-linear duratin-100",
        },
        html: {
            icon: new Component({
                name: "span",
                text: "X",
                attributes: {
                    class: "block text-xl font-black m-auto"
                }
            })
        },
        events: {
            click: [removeLine]
        }
    })
}
function removeLine(obj, e) {
    getParent(obj, 1).remove();
}