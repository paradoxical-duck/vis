import { useState, useCallback } from "react";

export const Poses=() =>{
    
    const [poses, setPoses] = useState<Pose[]>([]);
    const addPose = () => {
        setPoses((prevPoses) => {
            const nextNumber = prevPoses.length + 1;
            
            const newPose: Pose = {
                id: `pose-${Date.now()}`,
                name: `Pose${nextNumber}`,
                x: 0,
                y: 0,
                heading: 0,
                radius: 0,
                arcPose: false,
                local: true,
            };

        return [...prevPoses, newPose]; 
        });
    };
    const updatePose = (id: string, updatedFields: Partial<Pose>) => {
        setPoses((prev) =>
            prev.map((pose) => 
            pose.id === id ? { ...pose, ...updatedFields } : pose
            )
        );
    };

    const deletePose = useCallback((id: string) => {
        setPoses((prev) => prev.filter((pose) => pose.id !== id));
    }, []);


    return {poses,deletePose,addPose,updatePose, setPoses};
}

export const Paths=()=>{
    const [paths, setPaths] = useState<Path[]>([]);
    const addPath = () => {
        setPaths((prevPaths) => {
            const nextNumber = prevPaths.length + 1;
            
        
            const firstPath = prevPaths.length === 0;
            const lastPath = !firstPath ? prevPaths[prevPaths.length - 1] : null;
            const prevEndPose = lastPath ? (lastPath.poses.at(-1) || null) : null;
            const newPath: Path = {
                id: `path-${Date.now()}`, 
                name: `Path ${nextNumber}`,
                poses: [], 
                callbacks: [{
                    methodName: "",
                    distance: "",
                    distValue: false,
                }],
                firstPath: firstPath,
                prevEndPose: prevEndPose
            };

            return [...prevPaths, newPath]; 
        });
    };

    const updatePath = (id: string, updatedFields: Partial<Path>) => {
        setPaths((prev) =>
            prev.map((path) => 
            path.id === id ? { ...path, ...updatedFields } : path
            )
        );
    };
    const deletePath = useCallback((id: string) => {
            setPaths((prev) => prev.filter((path) => path.id !== id));
    }, [setPaths]);


    return{paths,setPaths,addPath,updatePath,deletePath}
}