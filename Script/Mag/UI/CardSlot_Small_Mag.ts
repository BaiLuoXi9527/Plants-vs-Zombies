import { _decorator, Component, instantiate, log, Node, Prefab } from 'cc';
import { CardSlot_UI_Base } from '../../Base/UI/CardSlot_UI_Base';
import { Plant_CardSlot_Base } from '../../Base/UI/Plant_CardSlot_Base';
import { Plant_Enum } from '../../Enum/Plant_Enum';
import { Analysis_josn } from '../../Json/Analysis_josn';
import { CardSlot_Big_Mag } from './CardSlot_Big_Mag';
const { ccclass, property } = _decorator;

@ccclass('CardSlot_Small_Mag')
export class CardSlot_Small_Mag extends CardSlot_UI_Base {

    private static instance;
    //单例模式
    /** 使用类成员 */
    public static getInstance( ){
        if (!this.instance) {
            console.log("未找到对象");
            return null;
        }
        return this.instance ;
    }

    protected paths: string ="Prefab/Plant_CardSlot_UI/Plant_CardSlot_Small";

    @property(Node)
    public Add_Node:Node;

    protected onLoad(): void {

        super.onLoad();

        CardSlot_Small_Mag.instance=this;
        
    }

    /** 卡槽预制体 */
    // @property(Prefab)
    // public plant_Pre: Prefab;

    start() 
    {
        super.start();

        // this.scheduleOnce(() => {
        //     //创建对象
        //     for (let index = 0; index < Analysis_josn.getInstance().Plant_Map_key.length; index++) {
        //         this.Set_AddContent(Plant_Enum.Pea_Shooter);
        //     }
        // }, 0.5);
    }

    public Get_CardSlot_Anim(Plant: Plant_CardSlot_Base, Event_Anim_Fcn?: Function) 
    {
        super.Get_CardSlot_Anim(Plant,()=>{
            Event_Anim_Fcn&&Event_Anim_Fcn();
            CardSlot_Big_Mag.getInstance().Update_AddContent(Plant_Enum[Plant.name]);
            Plant.node.destroy();
        });
    }

    public Update_AddContent(Obj:string)
    {
        super.Update_AddContent(Obj);

        this.Set_AddContent(Obj);

        this.Add_Node.setSiblingIndex(10);
    }
}


