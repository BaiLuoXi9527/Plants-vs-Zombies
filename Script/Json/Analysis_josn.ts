import { _decorator, Component, JsonAsset, log, Node, resources } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Analysis_josn')
export class Analysis_josn{
    private static instance;

    //单例模式
    /** 使用类成员 */
    public static getInstance(){
        if (!this.instance) {
            this.instance = new this();
        }
        return this.instance ;
    }

    onLoad(Event?:Function)
    {
        this.Analysis(Event);
    }

    /** 植物的配置文件路径 */
    private location:string="Plant_json";

    /** 不公开的 */
    private Plant_Map=new Map();

    /** 表中存在的键值 */
    public Plant_Map_key:string[];

    /**从名字获得数据*/
    public Get_Plant(key?:string)
    {
        if(this.Plant_Map.size>2)
            {
                return this.Plant_Map.get(key);
            }
        return this.Plant_Map.get(key);
    }

    /**加载配置文件 */
    public Analysis(Event?:Function)
    {
        console.log("加载开始:");
        resources.load(this.location,(err: any, Object: JsonAsset)=>{
            if(err)
            {
                console.log(err);
                return;
            }

            //获得配置数据
            const jsonData: object = Object.json!;

            //版本号
            // console.log(jsonData["engine"]);
            // console.log(jsonData["version"]);
            //初始数组空间
            this.Plant_Map_key=new Array(jsonData["Plant_Name"].length)

            for (let index = 0; index < jsonData["Plant_Name"].length; index++) 
            {
                let root=jsonData["Plant_Name"][index];

                //赋值
                this.Plant_Map.set(root["Name"],root["Money"]);

                this.Plant_Map_key[index]=root["Name"];
            }

            Event&&Event();
            // console.log("加载完成:");
            //检测配置结果
            // console.log(this.Plant_Map_key.length);
        });
    }
}


