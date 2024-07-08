import { _decorator, Component, log, Node } from 'cc';
import { Base } from './Base';
const { ccclass, property } = _decorator;

@ccclass('Anim_Base')
export class Anim_Base extends Base
{
    private static instance;
    //单例模式
    public static getInstance( ){
        if (!this.instance) {
            this.instance = new this();
        }
        return this.instance ;
    }

    public a=0;
    abc()
    {
        console.log("shuchu");
        this.a=1;
    }
}


