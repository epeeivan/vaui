import Component from "../../../component.js";
import { childNodes, definePropsFromElement, defineWidth, isset } from "../../../component_f.js";

export default class basicSelect extends Component {
    constructor(select) {
        super();
        this.properties = definePropsFromElement(select);
        this.init(select);
    }
    init(select) {
        this.name = "select";
        this.attributes = {
            name:this.properties.name??null,
            id:this.properties.id??null,
        }
        this.set_attribute("class", "bg-white dark:bg-dark-100 dark:text-white dark:border-dark-300 min-h-[30px] "+(isset(this.properties.round)?"rounded-full":"")+" "+ defineWidth(this.properties.width??null)+"  border-[1px] border-slate-200 w-full rounded focus:border-purple-500 outline-none "+
        (isset(this.properties.class)?this.properties.class.replace("basicselect",""):""));

        let options = (select.nodeName==undefined)?select.options:select.querySelectorAll("option");
        this.events = this.properties.events;
        options.forEach(option => {
            
            this.add_child(new Component({ name: "option", attributes: { value: option.value },text:option.text??option.innerText }))
            if(isset(option.nodeName)){
                if(option.hasAttribute("selected")){
                    this.last_child().attributes["selected"] = ""
                }
            }else{
                if(isset(option.selected)){
                    this.last_child().attributes["selected"] = ""
                }
            }
        });
    }

}