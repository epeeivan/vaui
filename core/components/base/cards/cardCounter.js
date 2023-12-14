import Component from "../../../component.js";
import { isset, url } from "../../../component_f.js";
import xhr from "../../../formsubmitter/xhr.js";
import squareIcon from "../buttons/squareIcon.js";
import lucideIcon from "../utilities/lucideIcon.js";
import card from "./card.js";




export default class cardCounter extends card {
    constructor(cardCounter) {
        super(cardCounter);

        this.attributes.class = " card-counter  w-full rounded border-[1px] dark:border-dark-200 p-2 bg-white border-slate-200 dark:bg-dark-100 " + (this.properties.class ?? "")
        this.attributes.id = this.properties.id ?? null;
        if (isset(this.properties.url)) {
            this.get_child("body").get_child("left").get_child("counter").text = countDatas({ url: this.properties.url });
            cronCount({ selector: this.properties.id + "-counter", url: this.properties.url })
        }
    }
    init(cardCounter) {
        super.init(cardCounter);

        this.get_child("body").attributes = {
            class: "flex"
        };
        this.get_child("body").html = {
            left: new Component({
                name: "div",
                attributes: {
                    class: "mr-auto",
                },
                html: {
                    counter: new Component({
                        name: "h1",
                        attributes: {
                            class: "text-2xl font-bold w-full",
                            id: this.properties.id + "-counter" ?? ""
                        },
                        text: this.properties.counter ?? ""
                    }),
                    label: new Component({
                        name: "span",
                        attributes: {
                            class: "block font-bold capitalize"
                        },
                        text: this.properties.label ?? ""
                    }),
                    badge: new Component({
                        name: "span",
                        attributes: {
                            class: "text-secondary-100"
                        },
                        text: this.properties.badge ?? ""
                    })
                }
            }),
            rigth: new Component({
                name: "div",
                attributes: {
                    class: "flex",
                },
                html: {
                    icon: new squareIcon({ type: (this.properties.type ?? ""), icon: (this.properties.icon ?? "") })
                }
            })


        }
    }

    percent() {
        return new Component({
            name: "div",
            attributes: {
                class: "text-success-100 space-x-2 flex",
            },
            html: {
                percent: new Component({
                    name: "span",
                    id: this.properties.id ?? "-percent",
                    text: this.properties.percent ?? "",
                }),
                icon: new lucideIcon({ icon: this.properties.iconpercent ?? "", id: this.properties.id + "-percent-icon" ?? "" })
            }
        });
    }
}

function cronCount(params) {
    if (isset(params.selector) && isset(params.url)) {
        let box = document.getElementById(params.selector);
        if (isset(box)) {
            let boxCount = parseInt(box.innerText);
            setInterval(() => {
                let newCount = countDatas(params);
                if (newCount > boxCount) {
                    box.innerText = newCount;
                }
            }, 2000);

        }
    }
}
function countDatas(params) {
    let count = 0;
    if (isset(params.url)) {
        xhr({
            url: url(params.url),
            callback: (response) => {
                let parsedResponse = JSON.parse(response);
                if (isset(parsedResponse.data) && parsedResponse.status == true) {
                    count = parsedResponse.data;
                }
            }
        })
    }


    return parseInt(count);
}