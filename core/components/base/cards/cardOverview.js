import Component from "../../../component.js";
import { childNodes, definePropsFromElement, isset } from "../../../component_f.js";
import card from "./card.js";
import cardOverviewMetric from "./cardOverviewMetrics.js";


export default class cardOverview extends card {
    constructor(cardOverview) {
        super(cardOverview);
        // alert()

    }
    init(cardOverview) {
        super.init(cardOverview);
        // this.get_child("header").get_child("dropdown").get_child("controls").add_child(this.controls(),"controls");

        let metrics = cardOverview.querySelector(".metrics");
        if (isset(metrics)) {
            let metricsButtons = childNodes(metrics);
            //
            this.get_child("body").add_child(new Component({ name: "div", attributes: { class: "w-full  "+(isset(this.properties.horizontal)?"flex space-x-2":"space-y-2") } }), "subBody")
            metricsButtons.forEach(metricsButton => {
                if (metricsButton.nodeName != "#text") {
                    let metricsButtonProps = definePropsFromElement(metricsButton);
                    this.get_child("body").get_child("subBody").add_child(new cardOverviewMetric(metricsButton));
                }

            })

            // let items = childNodes(childs [0]);
            //
            // items.forEach(item => {
            //     this.get_child("header").get_child("right").get_child("dropdown").get_child("menu").get_child("menu").add_child(new dropdownItem(item));
            // });
        }

    }

}


