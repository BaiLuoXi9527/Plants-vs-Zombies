import { _decorator, color, Node, Sprite, UITransform, Vec3,  } from 'cc';
import { CardSlot_Small_Mag } from './CardSlot_Small_Mag';
import { Plant_CardSlot_Base } from '../../Base/UI/Plant_CardSlot_Base';
import { CardSlot_Big_Mag } from './CardSlot_Big_Mag';

const { ccclass, property } = _decorator;

@ccclass('Plant_CardSlot_Big_Mag')
export class Plant_CardSlot_Big_Mag extends Plant_CardSlot_Base {

    public onLoad(): void {
        super.onLoad();
    }

    public start(): void {
        /** 加载物体信息 */

        super.start();
        this.Set_Tween_to(
            CardSlot_Big_Mag.getInstance(). Get_Parent_UITransform(),
            CardSlot_Small_Mag.getInstance().Add_Node.worldPosition,
            new Vec3(0.6, 0.6, 1)
        );
        
    }

    public OnButton() {

        if (this.cardSlot_UI_Mask.active) {
            /** 动画下面遮罩变红 */
            {
                /** 防止多次点击触发 */
                this.node.off(Node.EventType.TOUCH_END, this.OnButton, this);

                this.scheduleOnce(() => {
                    this.cardSlot_UI_Mask.getComponent(Sprite).color = color(255, 0, 0, 150);
                }, 0.2);

                this.scheduleOnce(() => {
                    this.cardSlot_UI_Mask.getComponent(Sprite).color = color(0, 0, 0, 150);
                }, 0.4);

                this.scheduleOnce(() => {
                    this.cardSlot_UI_Mask.getComponent(Sprite).color = color(255, 0, 0, 150);
                }, 0.6);

                this.scheduleOnce(() => {
                    this.cardSlot_UI_Mask.getComponent(Sprite).color = color(0, 0, 0, 150);

                    this.node.on(Node.EventType.TOUCH_END, this.OnButton, this);
                }, 0.8);
            }
        }
        else
        {
            this.Set_Mask(this.cardSlot_UI_Mask.active);
            CardSlot_Big_Mag.getInstance().Get_CardSlot_Anim(this);
            
            console.log(this.node.name);
            console.log(this.node.worldPosition);
        }
    }
}


