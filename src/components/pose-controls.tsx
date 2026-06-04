'use client'

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { useState } from "react";


export default function PoseControls(){
    const [arcChecked, setArcChecked] = useState<boolean>(false);
    return (
        <div className="flex h-full flex-col">
            <div className="flex justify-center p-4 text-3xl font-bold text-white">
                Poses
            </div>
            <Button className="flex m-4">
                <Plus/>
                Add Pose  
            </Button>
            <ScrollArea className="w-full flex-1 min-h-0 border-t p-4">
                <div className="flex text-white">
                    <Accordion type="single" collapsible defaultValue="item-1">
                        <AccordionItem value="item-1">
                        <AccordionTrigger>
                            
                            <div className="flex flex-col gap-1">
                                <Input 
                                id="pose-name" 
                                type="text"
                                placeholder="Pose Name" 
                                className="w-full" 
                                defaultValue={"Pose 1"}
                                />
                            </div>

                        </AccordionTrigger>
                        <AccordionContent className="flex h-full"> 



                            <div className="flex flex-col gap-3 p-5">
                                <div className="grid grid-cols-2 gap-4">
                                
                                    <Field>
                                        <FieldLabel htmlFor="x-input" className=" text-white">
                                            X:
                                        </FieldLabel>
                                        <Input
                                        id="x-input"
                                        type="number"
                                        placeholder="X"
                                        className="w-20" 
                                        />

                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="y-input" className=" text-white">
                                            Y:
                                        </FieldLabel>
                                        <Input
                                        id="y-input"
                                        type="number"
                                        placeholder="Y"
                                        className="w-20"
                                        />
                                    </Field>
                                </div>

                        
                                <div className="grid grid-cols-2 gap-4">
                                
                                    <Field>
                                        <FieldLabel htmlFor="heading-input" className=" text-white">
                                            Heading:
                                        </FieldLabel>
                                        <Input
                                        id="heading-input"
                                        type="number"
                                        placeholder="Heading"
                                        className="w-20" 
                                        />

                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="radius-input" className=" text-white" >
                                            Radius:
                                        </FieldLabel>
                                        <Input
                                        id="radius-input"
                                        type="number"
                                        placeholder="Radius"
                                        className="w-20"
                                        disabled={!arcChecked}
                                        />
                                    </Field>
                                </div>




                                <div className="flex items-center space-x-2">
                                    <Switch 
                                    id="arc-pose" 
                                    checked={arcChecked} 
                                    onCheckedChange={(checked: boolean) => setArcChecked(checked)}
                                    />
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