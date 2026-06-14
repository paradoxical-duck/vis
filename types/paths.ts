interface Callback{
    methodName:string
    distance:number|string
    distValue:boolean //dist is true, s is false
}

interface Path{
    id:string
    name:string
    poses:Pose[]
    callbacks:Callback[]
    prevEndPose:Pose|null //null for if its the first path
    firstPath:boolean
}