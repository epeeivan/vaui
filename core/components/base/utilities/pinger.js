import Component from "../../../component.js";

export class pinger extends Component {
    constructor(pinger) {
        super();
        this.name = "div";
        this.attributes = {
            class: "pinger w-[10px] h-[10px] rounded-full bg-primary-100 animate-ping absolute",
        }
    }
}