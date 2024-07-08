import { _decorator, Component, Node, UITransform, Vec3 } from 'cc';
import { Plant_CardSlot_Base } from '../../Base/UI/Plant_CardSlot_Base';
import { CardSlot_Big_Mag } from './CardSlot_Big_Mag';
import { CardSlot_Small_Mag } from './CardSlot_Small_Mag';
const { ccclass, property } = _decorator;

@ccclass('Plant_CardSlot_Small_Mag')
export class Plant_CardSlot_Small_Mag extends Plant_CardSlot_Base {

    public onLoad(): void {
        super.onLoad();
    }

    public start(): void {
        /** 加载物体信息 */
        super.start();
        this.Set_Tween_to(
            CardSlot_Small_Mag.getInstance(). Get_Parent_UITransform(),
            //这里目标不准确
            CardSlot_Big_Mag.getInstance().plant_Map.get(this.name).node.worldPosition,

            new Vec3(1.5, 1.6, 1)
        );

        console.log(CardSlot_Big_Mag.getInstance().plant_Map.get(this.name).node.worldPosition);
    }

    public OnButton(): void {
        console.log("按钮按下");
        
        if (this.cardSlot_UI_Mask.active) {
            this.Set_Mask(this.cardSlot_UI_Mask.active);
            // this.node.off(Node.EventType.TOUCH_END, this.OnButton, this);
        }
        else
        {
            CardSlot_Small_Mag.getInstance().Get_CardSlot_Anim(this);
            this.Set_Mask(this.cardSlot_UI_Mask.active);
        }

    }
}


