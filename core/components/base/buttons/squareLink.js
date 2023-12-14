import squareIcon from "./squareIcon.js";


export default class squareLink extends squareIcon {
    constructor(squareLink) {
        super(squareLink);
        this.name = "a";
        this.add_class( this.properties.class != undefined ? this.properties.class.replace("square-link", "") : "");
        this.set_attribute("href", this.properties.href ?? "");
    }
}