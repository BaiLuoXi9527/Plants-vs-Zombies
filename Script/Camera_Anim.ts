import { _decorator, Camera, Component, EventMouse, geometry, log, Node, PhysicsSystem, UITransform, v3, Vec2, Vec3, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Camera_Anim')
export class Camera_Anim extends Component {

    start() {
        
        this.node.on(Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
    }

    update(deltaTime: number) {
        
    }

    public x;
    public y;

    @property(Camera)
    mainCamera: Camera = null;

    @property(Node)
    a: Node = null;

    public onMouseDown(eventMouse: EventMouse)
    { 
        let hitPoint=new Vec3(eventMouse.getUILocationX()-(view.getVisibleSize().x/2),eventMouse.getUILocationY()-(view.getVisibleSize().y/2));

        console.log(hitPoint.x,hitPoint.y);
        

        this.a.position=new Vec3(hitPoint.x,hitPoint.y);         
    }
}

