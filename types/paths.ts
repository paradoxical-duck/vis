interface Callbacks{
    methodName:string
    distance:number

}

interface Path{
    id:string
    name:string
    poses:Pose[]
    callbacks:Callbacks[]
}