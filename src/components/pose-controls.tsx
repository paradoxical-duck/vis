'use client'

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CircleMinus, Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { useCallback, useState } from "react";

export default function PoseControls() {

    const [poses, setPoses] = useState<Pose[]>([]);
    const addPose = () => {
        setPoses((prevPoses) => {
            const nextNumber = prevPoses.length + 1;
            
            const newPose: Pose = {
                id: `pose-${Date.now()}`, // Unique timestamp ensures no duplicate IDs
                name: `Pose ${nextNumber}`,
                x: 0,
                y: 0,
                heading: 0,
                radius: 0,
                arcPose: false,
                local: true,
            };

        return [...prevPoses, newPose]; // Returns a brand new array with the new pose at the end
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
    return (
        <div className="flex h-full flex-col">
            <div className="flex justify-center p-4 text-3xl font-bold text-white">
                Poses
            </div>
            <Button className="flex m-4" onClick={addPose}>
                <Plus/>
                Add Pose
            </Button>
            <ScrollArea className="w-full flex-1 min-h-0 border-t p-4">
                {poses.map((pose)=>(
                <div className=" flex text-white" key={pose.id}>
                    <Accordion type="single" collapsible defaultValue="item-1" className="w-full" >
                        <AccordionItem value="item-1">
                        <AccordionTrigger>
                            <div className="flex w-full flex-row gap-1 pr-4">
                                <Input
                                    id={pose.id}
                                    type="text"
                                    placeholder="Pose Name"
                                    defaultValue={pose.name}
                                    className="w-fit transition-colors focus-visible:border-red-500 focus-visible:ring-red-500"
                                    onClick={(e) => e.stopPropagation()}
                                />
                                <Button className="w-5 bg-[#11111]" onClick={()=>deletePose(pose.id)}>
                                    <CircleMinus color="#C00000"/>
                                </Button>
                            </div>
                        </AccordionTrigger>

                        <AccordionContent className="flex h-full">
                            <div className="flex flex-col gap-3 p-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel htmlFor="x-input" className="text-white">
                                            X:
                                        </FieldLabel>
                                        <Input
                                            id="x-input"
                                            type="number"
                                            placeholder="X"
                                            className="w-20 transition-colors focus-visible:border-red-500 focus-visible:ring-red-500"
                                            value={pose.x}
                                            onChange={(e) => updatePose(pose.id, { x: Number(e.target.value) })}
                                        />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="y-input" className="text-white">
                                            Y:
                                        </FieldLabel>
                                        <Input
                                            id="y-input"
                                            type="number"
                                            placeholder="Y"
                                            className="w-20 transition-colors focus-visible:border-red-500 focus-visible:ring-red-500"
                                            value={pose.y}
                                            onChange={(e) => updatePose(pose.id, { y: Number(e.target.value) })}
                                        />
                                    </Field>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel htmlFor="heading-input" className="text-white">
                                            Heading:
                                        </FieldLabel>
                                        <Input
                                            id="heading-input"
                                            type="number"
                                            placeholder="Heading"
                                            className="w-20 transition-colors focus-visible:border-red-500 focus-visible:ring-red-500"
                                            value={pose.heading}
                                            onChange={(e) => updatePose(pose.id, { heading: Number(e.target.value) })}
                                        />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="radius-input" className="text-white">
                                            Radius:
                                        </FieldLabel>
                                        <Input
                                            id="radius-input"
                                            type="number"
                                            placeholder="Radius"
                                            disabled={!pose.arcPose}
                                            value={pose.radius}
                                            onChange={(e) => updatePose(pose.id, { radius: Number(e.target.value) })}
                                            className="w-20 transition-all duration-300 ease-in-out focus-visible:border-red-500 focus-visible:ring-red-500 disabled:cursor-not-allowed disabled:opacity-40"
                                        />
                                    </Field>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="arc-pose"
                                        checked={pose.arcPose}
                                        onCheckedChange={(checked: boolean) => updatePose(pose.id, { arcPose: checked })}
                                    />
                                    <label htmlFor="arc-pose" className="cursor-pointer select-none text-sm">
                                        Arc Pose
                                    </label>
                                </div>

                                <div className="mt-2 flex w-full gap-2">
                                    <button
                                        type="button"
                                        onClick={() => updatePose(pose.id, { local: true })}
                                        className={`flex-1 rounded-md py-2 text-center text-sm font-semibold text-white transition-colors ${
                                            pose.local
                                                ? "bg-red-600"
                                                : "bg-zinc-800 hover:bg-zinc-700"
                                        }`}
                                    >
                                        Local
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => updatePose(pose.id, { local: false })}
                                        className={`flex-1 rounded-md py-2 text-center text-sm font-semibold text-white transition-colors ${
                                            !pose.local
                                                ? "bg-red-600"
                                                : "bg-zinc-800 hover:bg-zinc-700"
                                        }`}
                                    >
                                        Global
                                    </button>
                                </div>
                               {/*tests*/} 
                                {/* <p>name: {pose.name}</p> 
                                <p>x: {pose.x}</p> 
                                <p>y: {pose.y}</p> 
                                <p>head: {pose.heading}</p> 
                                <p>radius: {pose.radius}</p> 
                                <p>arcPose: {pose.arcPose ? "true":"false"}</p> 
                                <p>isLocal: {pose.local ? "true":"false"}</p>  */}
                            </div>
                        </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    
                </div>
                ))}
            </ScrollArea> 
        </div>
    );
}