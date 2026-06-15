'use client'

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button";
import 'react-complex-tree/lib/style-modern.css';


import { 
    StaticTreeDataProvider, 
    Tree, 
    UncontrolledTreeEnvironment, 
    TreeItem 
} from "react-complex-tree";
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronDownCircle, CircleMinus, CirclePlus, GripVertical, Plus} from "lucide-react";
import { Input } from "./ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "./ui/combobox";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Sortable, SortableContent, SortableItem, SortableItemHandle, SortableOverlay } from "./ui/sortable";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
interface pathControlProps {
    Poses: Pose[];
    paths: Path[];
    setPaths: Dispatch<SetStateAction<Path[]>>;
    addPath: () => void;
    updatePath: (id: string, updatedFields: Partial<Path>) => void;
    deletePath: (id: string) => void;
}

export default function PathControls({ 
    Poses,
    paths,
    setPaths,
    addPath,
    updatePath,
    deletePath  
 }: pathControlProps) {
    const poses = Poses || [];
    const addControlPoint = (pathId: string, currentPoints: ControlPoints[] = []) => {
        const newPoint: ControlPoints = {
            id: `Point${Date.now()}`,
            poseName: ""
        };
        updatePath(pathId, {
            controlPoints: [...currentPoints, newPoint]
        });
    };

    const updateControlPoint = (pathId: string, currentPoints: ControlPoints[], controlPointId: string, updatedFields: Partial<ControlPoints>) => {
        const updatedPoints = currentPoints.map((point) =>
            point.id === controlPointId ? { ...point, ...updatedFields } : point
        );
        updatePath(pathId, { controlPoints: updatedPoints });
    };

    const deleteControlPoint = (pathId: string, currentPoints: ControlPoints[], controlPointId: string) => {
        const filteredPoints = currentPoints.filter((point) => point.id !== controlPointId);
        updatePath(pathId, { controlPoints: filteredPoints });
    };
    
    return (
        <div className="flex h-full flex-col">
            <div className="flex justify-center p-4 text-3xl font-bold text-white">
                Paths
            </div>
            <Button className="flex m-4" onClick={addPath}>
                <Plus/>
                Add Path
            </Button>
           
            <ScrollArea className="w-full flex-1  min-h-0 border-t p-4">
                <Sortable
                value={paths}
                onValueChange={setPaths}
                getItemValue={(item) => item.id}
                >
                <Table className="">
                    <TableHeader>
                    <TableRow className="bg-accent/50">
                    </TableRow>
                    </TableHeader>
                    <SortableContent asChild>
                    <TableBody>
                        {paths.map((path) => (
                        <SortableItem key={path.id} value={path.id} asChild>
                            <TableRow>
                            <TableCell className="w-fit">
                                <SortableItemHandle asChild>
                                <Button variant="ghost" size="icon" className="size-8">
                                    <GripVertical className="h-4 w-4" />
                                </Button>
                                </SortableItemHandle>
                            </TableCell>
                            <TableCell className="font-medium"> 

                                <div className="flex text-white flex-col">

                                    <Accordion type="single" collapsible defaultValue="item-1" className="w-full" >
                                        <AccordionItem value="item-1">
                                        <div className="flex flex-row w-full">
                                            <AccordionTrigger>
                                                <div className="flex w-fit flex-row gap-2 mr-2">
                                                    <Input
                                                        id={"PATH"}
                                                        type="text"
                                                        placeholder="Pose Name"
                                                        value={path.name}
                                                        className="transition-colors mr-2 focus-visible:border-red-500 focus-visible:ring-red-500"
                                                        onChange={(e)=>updatePath(path.id,{name:e.target.value})}
                                                        onClick={(e) => e.stopPropagation()}
                                                        onKeyDown={(e) => {
                                                            if (e.key === " ") {
                                                            e.preventDefault();
                                                            }
                                                        }}
                                                    />
                                                    
                                                </div>
                                            </AccordionTrigger>
                                            
                                            <Button className=" ml-2 mt-2 bg-[#11111] hover:bg-[#11111]" onClick={()=>deletePath(path.id)}>
                                                <CircleMinus color="#C00000"/>
                                            </Button>
                                            
                                        </div>
                                        <AccordionContent className="flex h-full">
                                            <div className="flex flex-col ml-5 w-fit ">
                                                <Accordion type="single" collapsible defaultValue="item-1" className="w-full" >
                                                    <AccordionItem value="item-1">
                                                    <div className="flex flex-row w-fit">
                                                        <AccordionTrigger>
                                                            <div className="flex w-fit text-xs flex-row gap-2 mr-2">
                                                                Control Points
                                                            </div>
                                                        </AccordionTrigger>
                                                        
                                                        <Button 
                                                            className="ml-2 mt-1 bg-transparent hover:bg-transparent" 
                                                            onClick={() => addControlPoint(path.id, path.controlPoints)}
                                                        >
                                                            <CirclePlus color="#03fc0f"/>
                                                        </Button>
                                                    </div>
                                                    
                                                    <AccordionContent className="flex flex-col h-full">
                                                        <Sortable
                                                            value={path.controlPoints || []}
                                                            onValueChange={(newPoints) => updatePath(path.id, { controlPoints: newPoints })}
                                                            getItemValue={(item) => item.id}
                                                        >
                                                        <Table className="">
                                                            <TableHeader>
                                                            <TableRow className="bg-accent/50">
                                                            </TableRow>
                                                            </TableHeader>
                                                            <SortableContent asChild>
                                                            <TableBody>
                                                                {(path.controlPoints || []).map((controlPoint) => (
                                                                <SortableItem key={controlPoint.id} value={controlPoint.id} asChild>
                                                                    <TableRow>
                                                                    <TableCell className="font-medium"> 
                                                                        <div className="flex flex-row w-fit" key={controlPoint.id}>
                                                                            <div className="flex">
                                                                                <Button 
                                                                                    className="bg-transparent hover:bg-transparent" 
                                                                                    onClick={() => deleteControlPoint(path.id, path.controlPoints, controlPoint.id)}
                                                                                >
                                                                                    <CircleMinus color="#C00000"/>
                                                                                </Button>
                                                                            </div>
                                                                            <div className="flex flex-row">
                                                                                <Combobox 
                                                                                    items={poses.map((p) => p.name)}
                                                                                    onValueChange={(value) => {
                                                                                        updateControlPoint(path.id, path.controlPoints, controlPoint.id, { 
                                                                                            poseName: (value as string) ?? "" 
                                                                                        });
                                                                                    }}
                                                                                >

                                                                                    <ComboboxInput 
                                                                                        placeholder="Select a Pose" 
                                                                                        value={controlPoint.poseName || ""} 
                                                                                    />
                                                                                    <ComboboxContent>
                                                                                        <ComboboxEmpty>No Poses found.</ComboboxEmpty>
                                                                                        <ComboboxList>
                                                                                            {(item) => (
                                                                                                <ComboboxItem key={item} value={item}>
                                                                                                    {item}
                                                                                                </ComboboxItem>
                                                                                            )}
                                                                                        </ComboboxList>
                                                                                    </ComboboxContent>
                                                                                </Combobox>
                                                                            </div>
                                                                        </div>

                                                                    </TableCell>
                                                                    <TableCell className="w-fit">
                                                                        <SortableItemHandle asChild>
                                                                        <Button variant="ghost" size="icon" className="size-8">
                                                                            <GripVertical className="h-4 w-4" />
                                                                        </Button>
                                                                        </SortableItemHandle>
                                                                    </TableCell>
                                                                    </TableRow>
                                                                </SortableItem>
                                                                ))}
                                                            </TableBody>
                                                            </SortableContent>
                                                        </Table>
                                                        <SortableOverlay>
                                                            <div className="size-full rounded-none bg-primary/10" />
                                                        </SortableOverlay>
                                                        </Sortable>
                                                    </AccordionContent>
                                                    </AccordionItem>
                                                </Accordion>
                                                <Accordion type="single" collapsible defaultValue="item-1" className="w-full" >
                                                <AccordionItem value="item-1">
                                                <div className="flex flex-row w-full">
                                                    <AccordionTrigger>
                                                        <div className="flex w-fit flex-row text-xs gap-2 mr-2">
                                                            Callbacks
                                                        </div>
                                                    </AccordionTrigger>
                                                    
                                                    <Button className=" ml-2 mt-1 bg-[#11111] hover:bg-[#11111]" >
                                                        <CirclePlus color="#03fc0f"/>
                                                    </Button>
                                                </div>
                                                <AccordionContent className="flex h-full">
                                                    <div className="flex flex-row items-center gap-2 text-2xl">
                                                        <Button className="bg-[#111111] hover:bg-[#111111]" >
                                                            <CircleMinus color="#C00000"/>
                                                        </Button>
                                                        
                                                        
                                                        <div className="flex flex-row items-center w-full gap-0.5">
                                                            <Input
                                                                id="callback-input"
                                                                type="number"
                                                                placeholder="Dist"
                                                                className="h-7 min-w-16 max-w-20 transition-colors focus-visible:border-red-500 focus-visible:ring-red-500"
                                                            />
                                                            
                                                            <div className="ml-1">
                                                                <Combobox items={["S","D"]}>
                                                                
                                                                    <ComboboxInput 
                                                                        placeholder="" 
                                                                        className="h-7 min-w-14 max-w-14 focus-visible:border-red-500 focus-visible:ring-red-500"
                                                                    />
                                                                    <ComboboxContent>
                                                                        <ComboboxList>
                                                                            {(item) => (
                                                                                <ComboboxItem key={item} value={item}>
                                                                                    {item}
                                                                                </ComboboxItem>
                                                                            )}
                                                                        </ComboboxList>
                                                                    </ComboboxContent>
                                                                </Combobox>
                                                            </div>
                                                            
                                                            <div className="self-center transform -translate-y-0.5 text-white">:</div>
                                                            
                                                            <Input
                                                                id="method-input"
                                                                type="text"
                                                                placeholder="Method"
                                                                className="h-7 min-w-33 max-w-full transition-colors focus-visible:border-red-500 focus-visible:ring-red-500"
                                                            />
                                                        </div>
                                                    </div>
                                                </AccordionContent>
                                                </AccordionItem>
                                            </Accordion>
                                            </div>
                                        </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                            
                                </div>

                            </TableCell>
                            </TableRow>
                        </SortableItem>
                        ))}
                    </TableBody>
                    </SortableContent>
                </Table>
                <SortableOverlay>
                    <div className="size-full rounded-none bg-primary/10" />
                </SortableOverlay>
                </Sortable>
            </ScrollArea>
        </div>
    );
}





