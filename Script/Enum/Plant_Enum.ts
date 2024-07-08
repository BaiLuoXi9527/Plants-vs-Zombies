import { _decorator, Component, Enum, Node } from 'cc';
const { ccclass, property } = _decorator;
/** 植物名用于区分植物 */
export enum  Plant_Enum {
    Pea_Shooter="Pea_Shooter",
    Sun_Flower="Sun_Flower",
    Wall_Nut="Wall_Nut"
}

Enum(Plant_Enum);



