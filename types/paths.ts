interface Callback{
    id:string
    methodName:string
    distance:number|string
    distValue:boolean | undefined//dist is true, s is false, undefined is default
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