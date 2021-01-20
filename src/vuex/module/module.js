import { forEach } from "../util";

export default class Module {
    constructor(rootModule) {
        console.log("rootModule", rootModule);
        this._rawModule = rootModule;
        this._children = {};
        this.state = rootModule.state;
    }
    getChild(key) {
        return this._children[key]
    }
    addChild(key, module) {
        this._children[key] = module
    }

    forEachMutations(fn){
        if(this._rawModule.mutations){
            forEach(this._rawModule.mutations,fn);
        }
    }

    forEachActions(fn){
        if(this._rawModule.actions){
            forEach(this._rawModule.actions,fn);
        }
    }

    forEachModules(fn){
        if(this._rawModule.modules){
            forEach(this._rawModule.modules,fn);
        }
    }
}