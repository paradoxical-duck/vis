import { useState, useCallback } from "react";

export const Poses=() =>{
    
    const [poses, setPoses] = useState<Pose[]>([]);
    const addPose = () => {
        setPoses((prevPoses) => {
            const nextNumber = prevPoses.length + 1;
            
            const newPose:Pose = {
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
            const prevPath = !firstPath ? prevPaths[prevPaths.length - 1] : null;
            const prevEndPose = prevPath ? (prevPath.controlPoints.at(-1) || null) : null;
            const newPath: Path = {
                id: `path-${Date.now()}`, 
                name: `Path${nextNumber}`,
                controlPoints: [], 
                callbacks: [],
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



    const addControlPoint = (pathId: string, currentPoints: ControlPoint[] = []) => {
        const newPoint: ControlPoint = {
            id: `Point${Date.now()}`,
            poseName: "",
            poseId:undefined
        };
        updatePath(pathId, {
            controlPoints: [...currentPoints, newPoint]
        });
    };

    const updateControlPoint = (pathId: string, currentPoints: ControlPoint[], controlPointId: string, updatedFields: Partial<ControlPoint>) => {
        const updatedPoints = currentPoints.map((point) =>
            point.id === controlPointId ? { ...point, ...updatedFields } : point
        );
        updatePath(pathId, { controlPoints: updatedPoints });
    };

    const deleteControlPoint = (pathId: string, currentPoints: ControlPoint[], controlPointId: string) => {
        const filteredPoints = currentPoints.filter((point) => point.id !== controlPointId);
        updatePath(pathId, { controlPoints: filteredPoints });
    };

    const addCallback = (pathId: string, currentCallbacks: Callback[] = []) => {
        const newCallback: Callback = {
            id: `Point${Date.now()}`,
            methodName:"",
            distance:"",
            distValue:undefined
        };
        updatePath(pathId, {
            callbacks: [...currentCallbacks, newCallback]
        });
    };
    const updateCallback = (pathId: string, currentCallbacks: Callback[],callbackId: string, updatedFields: Partial<Callback>) => {
        const updatedCallbacks = currentCallbacks.map((callback) =>
            callback.id === callbackId ? { ...callback, ...updatedFields } : callback
        );
        updatePath(pathId, { callbacks: updatedCallbacks });
    };
    const deleteCallback = (pathId: string, currentCallbacks: Callback[], controlPointId: string) => {
        const filteredPoints = currentCallbacks.filter((callback) => callback.id !== controlPointId);
        updatePath(pathId, { callbacks: filteredPoints });
    };

    return{paths,setPaths,addPath,updatePath,deletePath,addControlPoint,updateControlPoint,deleteControlPoint,addCallback,updateCallback,deleteCallback}
}
