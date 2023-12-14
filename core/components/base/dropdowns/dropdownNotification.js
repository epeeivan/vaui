import dropdownButtonIcon from "./dropdownButtonIcon.js";


export default class dropdownNotification extends dropdownButtonIcon{
    constructor(dropdown){
        super(dropdown);

        this.get_child("menu").get_child("menu").attributes.id=this.properties.id??""
        this.get_child("menu").get_child("menu").attributes.style = "min-width:250px;max-height:400px;overflow-y:auto;scrollbar-width: 10px;"
    }

}