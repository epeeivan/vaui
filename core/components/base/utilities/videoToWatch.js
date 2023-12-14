import Component from "../../../component.js";
import { definePropsFromElement } from "../../../component_f.js";

export class videosToWatch extends Component {
    constructor(videosToWatch) {
        super();
        this.name = "div";
        this.properties = definePropsFromElement(videosToWatch)
        this.attributes = {
            class: "lg:col-span-1 col-span-3 space-y-2",
        }
        this.events.click = [[watch,this.properties.src??""]]
        this.add_child(new Component({
            name: "div",
            attributes: {
                class: "relative",
            },
            html: {
                video: new Component({
                    name: "video",
                    attributes: {
                        src: this.properties.src ?? "",
                        class: "bg-black max-h-[300px] rounded video-to-watch",
                    }
                })
            }
        }))

        this.add_child(new Component({
            name: "a",
            attributes: { class: "block" },
            html: {
                title: new Component({ name: "h1", attributes: { class: "text-lg font-bold capitalize" }, text: this.properties.title ?? "" }),
                subTitle: new Component({ name: "span", attributes: { class: "text-xs text-slate-500" }, text: this.properties["sub-title"] ?? "" }),
            }
        }))
        
    }
}

function watch(videoToWatchBox, e, src) {
    let videoWatcherButton = document.querySelector("#video-watcher-button");
    let videoWatcher = document.querySelector(".video-watcher");
    if (isset(videoWatcherButton && videoWatcher)) {
        videoWatcher.src = src;
        videoWatcher.play()
        videoWatcherButton.click();
    }
}