import { _decorator, Component,  resources, Sprite, SpriteFrame } from 'cc';
import { Anim_Base } from '../Base/Anim_Base';
import { Base } from '../Base/Base';
import { Plant_Enum } from '../Enum/Plant_Enum';
const { ccclass, property } = _decorator;


@ccclass('Anim_Mag')
export class Anim_Mag extends Component {

    /** 图片动画集 */
    @property([SpriteFrame])
    public Anim_Atlas:SpriteFrame[]=[];

    /** 物体的种类或名字 */
    public Alias:Plant_Enum=Plant_Enum.Pea_Shooter;
    /** 需要更换的显示图片 */
    public sprite = null;


    onLoad() {
        
        this.sprite=this.getComponent(Sprite);      //获得需要更换的图片组件

        const directionName = this.Alias;     //  获得变量名字

        this.name=directionName;

        console.log("Plant/"+this.name);

        resources.loadDir("Plant/"+this.name, SpriteFrame, (err, spriteFrame) => {

            // console.log("Plant/"+this.name+"/"+spriteFrame[0].name);

            this.Anim_Atlas=spriteFrame;
            
            this.sprite.spriteFrame=this.Anim_Atlas[0];

            // console.log("加载后的资源"+this.Anim_Atlas.length);
        });

    }

    i=0;
    j=1;
    update(deltaTime: number) {

        this.i+=deltaTime;
        if(this.i>=0.1)
        {
            if(this.j>=this.Anim_Atlas.length-1)
                {
                    this.j=0;
                }
                else
                {
                    this.j++;
                }
            this.sprite.spriteFrame=this.Anim_Atlas[this.j];

            this.i=0;

        }
    }
}


