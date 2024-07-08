import { _decorator, color, Component, Label, log, Node, resources, Sprite, SpriteFrame, tween, UITransform, Vec3 } from 'cc';
import { Plant_Enum } from '../../Enum/Plant_Enum';
import { Analysis_josn } from '../../Json/Analysis_josn';
const { ccclass, property } = _decorator;

@ccclass('Plant_CardSlot_Base')
export class Plant_CardSlot_Base extends Component {
    //植物名
    protected plant_name: Plant_Enum = Plant_Enum.Pea_Shooter;

    /**植物缩略图 */
    protected cardSlot_UI: Sprite;
    /**阳光数字 */
    protected cardSlot_Money: Label;
    /**被选中 遮罩 */
    protected cardSlot_UI_Mask: any;

    public Set_Mask(active:boolean)
    {
        this.cardSlot_UI_Mask.active=!active;
    }
    public Get_Mask()
    {
        return this.cardSlot_UI_Mask.active;
    }
    public Set_Plant_Name(Name: Plant_Enum) {

        this.plant_name = Name;

        this.name = this.plant_name;

        /**这样才加载出来，在资源里面往下把里面的名字加上，右上角的名字不是资源名字 */
        resources.load("Plant/" + this.name + "/(1)/spriteFrame", SpriteFrame, (err, spriteFrame) => {

            if (err) {
                console.log(err);
                return;
            }

            // console.log("更换完成前："+"Plant/"+this.name+"/(1)/spriteFrame");

            this.cardSlot_UI.spriteFrame = spriteFrame;
            // console.log(spriteFrame);
        });

        // 赋值阳光
        this.cardSlot_Money.string = "" + Analysis_josn.getInstance().Get_Plant(this.name);
        
    }

    protected onLoad(): void {
        //当前物体下第一个图片组件 UI

        /**被选中 遮罩 */
        this.cardSlot_UI_Mask = this.node.children[2];

        /**植物缩略图 */
        this.cardSlot_UI = this.node.children[0].getComponent(Sprite);

        /**阳光数字 */
        this.cardSlot_Money = this.node.children[1].getComponent(Label);

        // console.log("加载完成");
        // 赋值阳光
        this.cardSlot_Money.string = "" + Analysis_josn.getInstance().Get_Plant(this.name);
    }

    public start() {

    }

    /** 相对的父节点的组件 */
    public parent_UITransform: UITransform;

    /** 目标位置 */
    public aim_Position: Vec3;
    /** 缩放大小 */
    public to_Scale:Vec3;

    /** 设置移动动画*/
    public Set_Tween_to(parent_UITransform:UITransform,aim_Position:Vec3,to_Scale:Vec3)
    {
        this.parent_UITransform=parent_UITransform;
        this.aim_Position=aim_Position;
        this.to_Scale=to_Scale;
    }

    protected OnButton()
    {

    }

    public On_OnButton()
    {
        this.node.on(Node.EventType.TOUCH_END, this.OnButton, this);
    }

    public Off_OnButton()
    {
        
        this.node.off(Node.EventType.TOUCH_END, this.OnButton, this);
    }

    /** 移动动画 */
    public Get_CardSlot_Anim(event_Fun:Function) {
        //如果没激活则激活节点，如果激活了则不响应
        tween(this.node)
            .to(0.2,
                {
                    //获得目标UI的世界坐标对应的，这身的世界坐标转换成局部坐标
                    position: this.parent_UITransform.convertToNodeSpaceAR(this.aim_Position),
                    //缩放
                    scale: this.to_Scale
                }
            )
            .call(() => {
                /**结束回调 */
                console.log("结束");
                event_Fun&&event_Fun();
                
                // event();
            })
            .start();
        return;
    }

}


