import { _decorator, Component, instantiate, log, Node, Prefab, resources, UITransform } from 'cc';
import { Plant_Enum } from '../../Enum/Plant_Enum';
import { Analysis_josn } from '../../Json/Analysis_josn';
import { Plant_CardSlot_Base } from './Plant_CardSlot_Base';
const { ccclass, property } = _decorator;

@ccclass('CardSlot_UI_Base')
export class CardSlot_UI_Base extends Component {

    // 装卡槽的容器节点
    @property(Node)
    protected content: Node;

    /** 相对父节点的世界坐标 */
    public parent_UITransform: UITransform;

    /** 获得世界坐标系 */
    public Get_Parent_UITransform() {
        if (!this.parent_UITransform) {
            this.parent_UITransform = this.content.getComponent(UITransform);
            return this.parent_UITransform;
        }
        return this.parent_UITransform;
    }

    /** 记录所有备战卡槽位置 */
    protected plant_Map: Map<string, Plant_CardSlot_Base> = new Map();
    /** 卡槽预制体 */
    protected plant_Prefab: Prefab;

    /** 预制体路径 */
    protected paths;

    protected onLoad(): void {

        resources.load(this.paths, Prefab, (err, Prefab) => {

            if (err) {
                console.log(err);
                return;
            }

            console.log("更换完成前："+"Plant/"+this.name+"/(1)/spriteFrame");
            this.plant_Prefab = Prefab;
        });
    }

    protected start() {
    }


    /** 往容器节点添加备战卡 */
    public Set_AddContent(Name: string) {

        if(!this.plant_Prefab)
            {
                console.log("预制体为空"+this.paths);
                
                return;
            }

        let node = instantiate(this.plant_Prefab);

        node.parent = this.content;

        // 配置脚本枚举变量获得植物种类
        node.getComponent(Plant_CardSlot_Base).Set_Plant_Name(Plant_Enum[Name]);

        // 激活脚本组件
        node.getComponent(Plant_CardSlot_Base).On_OnButton();
        
        // 存储节点信息
        this.plant_Map.set(Plant_Enum[Name], node.getComponent(Plant_CardSlot_Base));
    }

    /** 更新容器信息 */
    public Update_AddContent(Obj:string)
    {

    }

    /** 动画存储容器 备战卡往卡槽飞行容器*/
    protected map_CardSlot = new Map();
    /** 获得动画物体 如果没有则生成一个 对象池 */
    public Get_map_CardSlot() {

        let CardSlot_Node;

        //计算是否需要生成
        if (this.map_CardSlot.size == 0) {
            this.Set_map_CardSlot(instantiate(this.plant_Prefab));
        }

        //得到最后一个位置的节点
        CardSlot_Node = this.map_CardSlot.get(this.map_CardSlot.size - 1);

        // console.log(CardSlot_Node);

        //删除最后一个位置的节点    使用完之后会有回调添加
        this.map_CardSlot.delete(this.map_CardSlot.size - 1);

        return CardSlot_Node;
    }

    /** 往最后一个位置添加 */
    public Set_map_CardSlot(Prefab: Node) {

        let length = this.map_CardSlot.size;

        this.map_CardSlot.set(length, Prefab);
    }

    /** 生成节点移动，需要传递被点击的容器 */
    public Get_CardSlot_Anim(Plant: Plant_CardSlot_Base,Event_Anim_Fcn?:Function) {
        
        
        this.node.setSiblingIndex(10);

        //获得一个 节点
        const CardSlot :Node = this.Get_map_CardSlot();
        const CardSlot_Script :Plant_CardSlot_Base = CardSlot.getComponent(Plant_CardSlot_Base);
        //修改物体位置于原物体相等
        CardSlot.parent = Plant.node.parent.parent;
        CardSlot.scale = Plant.node.scale;
        CardSlot.position = Plant.node.position;

        //显示节点 
        this.scheduleOnce(()=>{ CardSlot.active=true;},0.01);

        //修改物体位置于原物体相等
        CardSlot_Script.Set_Plant_Name(Plant_Enum[Plant.name]);
        
        //给节点，当前的世界坐标是那个节点，目标的世界坐标在哪，缩放需求
        CardSlot_Script.Set_Tween_to(
            Plant.parent_UITransform,
            Plant.aim_Position,
            Plant.to_Scale
        );

        //开始播放

        CardSlot_Script.Get_CardSlot_Anim(
            ()=>{
                //回调函数
                CardSlot.active=false;
                this.Set_map_CardSlot(CardSlot);
                Event_Anim_Fcn&&Event_Anim_Fcn();
            }
        );
        //获得当前被点击的物体名称 可以不用获取
        return Plant_Enum[Plant.name];
    }

}


