interface Callback{
    methodName:string
    distance:number

}

interface Path{
    id:string
    name:string
    poses:Pose[]
    callbacks:Callback[]
    distValue:boolean  //dist is true, s is false
}