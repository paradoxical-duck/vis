interface Callback{
    id:string
    methodName:string
    distance:number|string
    distValue:boolean | undefined//dist is true, s is false, undefined is default
}

interface ControlPoint{
    id: string;
    poseId:string|undefined;
    poseName: string;
}

interface Path{
    id:string
    name:string
    controlPoints:ControlPoint[]
    callbacks:Callback[]
    prevEndPose:ControlPoint|null //null for if its the first path
    firstPath:boolean
}