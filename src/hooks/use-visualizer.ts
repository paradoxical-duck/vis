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