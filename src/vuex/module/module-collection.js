import { forEach } from "../util";
import Module from "./module";
export default class ModuleCollection {
    constructor(options) {
        this.register([], options);
    }
    register(path, rootModule) {
        let newModule = new Module(rootModule);
        if (path.length == 0) {//根
            this.root = newModule
        } else {
            let parent = path.slice(0, -1).reduce((prev, cur) => {
                return prev.getChild(cur);
            }, this.root);
            parent.addChild(path[path.length - 1], newModule);
        }
        if (rootModule.modules) {//如果有modules，说明有子模块
            forEach(rootModule.modules, (module, moduleName) => {
                //moduleName(a(moduleA,mutations)/b)
                this.register([...path, moduleName], module);
            });
        }
    }
}