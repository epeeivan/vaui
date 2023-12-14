import Component from "../../../component.js";
import { definePropsFromElement } from "../../../component_f.js";
import ui from "../../../ui.js";
import squareIcon from "../buttons/squareIcon.js";
import tiIcon from "../utilities/tiIcon.js";

export default class inputFile extends Component {
    constructor(inputFile) {
        super();
        let that = this;
        this.properties = definePropsFromElement(inputFile);
        this.name = "div";
        this.html = {
            button: new squareIcon({
                icon: "camera",
                events: {
                    click: [actionFileButton],
                }
            }),
            input: new Component({
                name: "input",
                attributes: {
                    class: "hidden",
                    multiple:"multiple",
                    accept:"image/png image/gif image/jpeg",
                    type: "file",
                    name: this.properties.name+"[]" ?? ""
                },
                events: {
                    change: [[readFiles, that.imgBoxStructure()]]
                }
            })
        }
    }
    imgBoxStructure(){
        return new Component({
            name:"div",
            attributes:{
                class:" h-[150px] my-3 lg:mr-2 group bg-cover group shadow-lg bg-center  rounded-lg",
                id:""
            },
            html:{
                blur:new Component({
                    name:"div",
                    attributes:{
                        class:"w-full h-full flex bg-black/[0.1] group-hover:bg-black/[0.9] transition-all ease-linear duration-200 rounded-lg"
                    },
                    html:{
                        button:new Component({
                            name:"button",
                            attributes:{
                                type:"button",
                                class:" p-2 py-1 hidden group-hover:block z-40 m-auto rounded-[5px] px-2 bg-dark-100  hover:bg-primary-200"
                            },
                            html:{
                                icon:new tiIcon({name:"trash"})
                            }
                        }),
                    }
                })
                
                // img:this.imgStructure(),
            }
        })
    }

    imgStructure() {
        return new Component({
            name: "img",
            attributes: {
                class: "w-full rounded-lg",
                src: ""
            }
        })
    }
}
let Dom = new ui;
/**
 * 
 * @param {*} obj 
 */
function actionFileButton(obj) {
    let input = obj.nextSibling;
    input.click();
}
/**
 * 
 * @param {*} input 
 * @param {*} e 
 * @param {*} imgStructure 
 */
function readFiles(input, e, imgBoxStructure) {
    let imgShowerBlock = document.getElementById("imgShowerBlock");
    //
    imgShowerBlock.innerHTML = "";
    //
    if (input.files) {
        //
        for (let i = 0; i < input.files.length; i++) {
            //
            var reader = new FileReader();
            reader.onload = function (e) {
                imgBoxStructure.attributes.style = "background-image:url('"+e.target.result+"')";
                // imgBoxStructure.get_child("img").attributes.src = e.target.result;
                // imgBoxStructure.get_child("button").events.click = [[removePicture,{input:input,id:i}]];
                // imgBoxStructure.attributes.id = "img_"+i;
                let img = Dom.createElementFromStructure(imgBoxStructure);
                imgShowerBlock.append(img);
            };
            reader.readAsDataURL(input.files[i]);

        }


    }
}
function removePicture(obj,e,inputAndId){
    console.log(inputAndId.input.files)
    inputAndId.input.files.splice(inputAndId.id,1);
    document.getElementById("img_"+inputAndId.id).remove();
}