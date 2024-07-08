import { Node, _decorator, log} from 'cc';

import { CardSlot_UI_Base } from '../../Base/UI/CardSlot_UI_Base';
import { CardSlot_Small_Mag } from './CardSlot_Small_Mag';
import { Analysis_josn } from '../../Json/Analysis_josn';
import { Plant_CardSlot_Base } from '../../Base/UI/Plant_CardSlot_Base';
import { Plant_Enum } from '../../Enum/Plant_Enum';
const { ccclass, property } = _decorator;

@ccclass('CardSlot_Big_Mag')
export class CardSlot_Big_Mag extends CardSlot_UI_Base {

    protected static instance;
    //单例模式
    /** 使用类成员 */
    public static getInstance() {
        if (!this.instance) {
            console.log("未找到对象");
            return null;
        }
        return this.instance;
    }

    protected paths: string ="Prefab/Plant_CardSlot_UI/Plant_CardSlot_Big";

    protected onLoad(): void {
        CardSlot_Big_Mag.instance = this;

        super.onLoad();
    }

    start() {
        super.start();

        this.scheduleOnce(() => {
            //创建对象
            for (let index = 0; index < Analysis_josn.getInstance().Plant_Map_key.length; index++) {
                this.Set_AddContent(Analysis_josn.getInstance().Plant_Map_key[index]);
            }
        }, 0.2);
    }

    public Get_CardSlot_Anim(Plant: Plant_CardSlot_Base, Event_Anim_Fcn?: Function) 
    {
        super.Get_CardSlot_Anim(Plant,()=>{
            Event_Anim_Fcn&&Event_Anim_Fcn();
            CardSlot_Small_Mag.getInstance().Update_AddContent(Plant_Enum[Plant.name])
        });
    }

    public Update_AddContent(Obj:string)
    {
        super.Update_AddContent(Obj);

        const CardSlot:Plant_CardSlot_Base= this.plant_Map.get(Obj);

        CardSlot.Set_Mask(CardSlot.Get_Mask());

        console.log("查找");
        
        
    }
}


