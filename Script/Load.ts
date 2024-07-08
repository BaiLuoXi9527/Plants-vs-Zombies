import { _decorator, Component, director, Node } from 'cc';
import { Analysis_josn } from './Json/Analysis_josn';
const { ccclass, property } = _decorator;

@ccclass('Load')
export class Load extends Component {
    protected onLoad(): void {
        Analysis_josn.getInstance().onLoad(()=>{
            director.loadScene("game"); 
        })
    }
}


