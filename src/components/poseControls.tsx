'use client'
import React from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";


export default function PoseControls(){
    return (
    <div className="flex h-full flex-col">
        <div className="flex justify-center p-4 text-3xl font-bold text-white">
                Poses
                
        </div>
        
        <Button className="flex m-4 bg-[#C00000] text-white">
            <Plus/>
            Add Pose  
        </Button>
        <ScrollArea className="w-full flex-1 min-h-0 rounded-md border p-4">
            <div className="flex text-white">
                <Accordion type="single" collapsible defaultValue="item-1">
                    <AccordionItem value="item-1">
                    <AccordionTrigger>Pose 1</AccordionTrigger>
                    <AccordionContent className="flex h-full"> 
                        
                                

                        <div className="flex flex-col gap-3">
                            
                            <div className="flex flex-col gap-1">
                                    <FieldLabel htmlFor="pose-name" className="text-muted-foreground text-white">
                                        Pose name:
                                    </FieldLabel>
                                    <Input
                                    id="pose-name"
                                    type="text"
                                    placeholder="Pose"
                                    className="w-full" 
                                    />
                            </div>

                            <div className="flex flex-col gap-1">
                                <FieldLabel htmlFor="x-input" className="text-muted-foreground  text-white">
                                    x:
                                </FieldLabel>
                                <Input
                                id="x-input"
                                type="number"
                                placeholder="X"
                                className="w-20" 
                                />
                            </div>
                       
                            <div className="flex flex-col gap-1.5">
                                <FieldLabel htmlFor="y-input" className="text-muted-foreground  text-white">
                                    y:
                                </FieldLabel>
                                <Input
                                id="y-input"
                                type="number"
                                placeholder="Y"
                                className="w-20" 
                                />
                            </div>
                            
                            
                            <div className="flex items-center space-x-2">
                                <Switch id="arc-pose"  />
                                <label htmlFor="arc-pose" className="text-sm select-none cursor-pointer">
                                Arc Pose
                                </label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <label htmlFor="local" className="text-sm select-none cursor-pointer">
                                Local
                                </label>
                                <Switch id="local-global"/>
                                <label htmlFor="global" className="text-sm select-none cursor-pointer">
                                Global
                                </label>
                            </div>
                        </div>
                    </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </ScrollArea> 
    </div>
    );
}