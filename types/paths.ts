interface Callback{
    methodName:string
    distance:number|string
    distValue:boolean //dist is true, s is false
}

interface ControlPoints{
    id: string;
    poseName: string;
}

interface Path{
    id:string
    name:string
    controlPoints:ControlPoints[]
    callbacks:Callback[]
    prevEndPose:ControlPoints|null //null for if its the first path
    firstPath:boolean
}