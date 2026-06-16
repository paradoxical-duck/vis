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
    deleteControlPoint: (pathId: string, currentPoints: ControlPoints[], controlPointId: string) => void;
    addControlPoint: (pathId: string, currentPoints?: ControlPoints[]) => void;
    updateControlPoint: (pathId: string, currentPoints: ControlPoints[], controlPointId: string, updatedFields: Partial<ControlPoints>) => void;
    addCallback: (pathId: string, currentCallbacks?: Callback[]) => void;
    updateCallback: (pathId: string, currentCallbacks: Callback[], callbackId: string, updatedFields: Partial<Callback>) => void;
    deleteCallback: (pathId: string, currentCallbacks: Callback[], controlPointId: string) => void;
}

export default function PathControls({
    Poses,
    paths,
    setPaths,
    addPath,
    updatePath,
    deletePath,
    deleteControlPoint,
    addControlPoint,
    updateControlPoint,
    addCallback,
    updateCallback,
    deleteCallback
}: pathControlProps) {
    const poses = Poses || [];

    return (
        <div className="flex h-full flex-col bg-black">
            <div className="flex justify-center p-4 text-3xl font-bold text-white">
                Paths
            </div>
            <Button className="flex m-4" onClick={addPath}>
                <Plus/>
                Add Path
            </Button>
            <ScrollArea className="w-full flex-1 min-h-0 border-t p-4">
                <Sortable
                    value={paths}
                    onValueChange={setPaths}
                    getItemValue={(item) => item.id}
                >
                    <Table className="">
                        <TableHeader>
                            <TableRow className="border-none">
                            </TableRow>
                        </TableHeader>
                        <SortableContent asChild>
                            <TableBody>
                                {paths.map((path) => (
                                    <SortableItem key={path.id} value={path.id} asChild>
                                        <TableRow className="bg-black hover:bg-transparent border-b-0">
                                            <TableCell className="w-fit">
                                                <SortableItemHandle asChild>
                                                    <Button variant="ghost" size="icon" className="size-8 cursor-grab active:cursor-grabbing text-zinc-500 hover:text-white hover:bg-transparent">
                                                        <GripVertical className="h-5 w-5" />
                                                    </Button>
                                                </SortableItemHandle>
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                <div className="flex text-white flex-col">
                                                    <Accordion type="single" collapsible defaultValue="item-1" className="w-full" >
                                                        <AccordionItem value="item-1" className="border-none">
                                                            <div className="flex flex-row w-full">
                                                                <AccordionTrigger className="hover:no-underline">
                                                                    <div className="flex w-fit flex-row gap-2 mr-2">
                                                                        <Input
                                                                            id={"PATH"}
                                                                            type="text"
                                                                            placeholder="Pose Name"
                                                                            value={path.name}
                                                                            className="transition-colors mr-2 focus-visible:border-red-500 focus-visible:ring-red-500 bg-black"
                                                                            onChange={(e) => updatePath(path.id, {name: e.target.value})}
                                                                            onClick={(e) => e.stopPropagation()}
                                                                            onKeyDown={(e) => {
                                                                                if (e.key === " ") {
                                                                                    e.preventDefault();
                                                                                }
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </AccordionTrigger>
                                                                <Button className="ml-2 mt-2 bg-transparent hover:bg-transparent" onClick={() => deletePath(path.id)}>
                                                                    <CircleMinus color="#C00000"/>
                                                                </Button>
                                                            </div>
                                                            <AccordionContent className="flex h-full">
                                                                <div className="flex flex-col ml-5 w-fit ">
                                                                    <Accordion type="single" collapsible defaultValue="item-1" className="w-full" >
                                                                        <AccordionItem value="item-1" className="border-none">
                                                                            <div className="flex flex-row w-fit">
                                                                                <AccordionTrigger className="hover:no-underline">
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
                                                                                            <TableRow className="border-none">
                                                                                            </TableRow>
                                                                                        </TableHeader>
                                                                                        <SortableContent asChild>
                                                                                            <TableBody>
                                                                                                {(path.controlPoints || []).map((controlPoint) => (
                                                                                                    <SortableItem key={controlPoint.id} value={controlPoint.id} asChild>
                                                                                                        <TableRow className="bg-black hover:bg-transparent border-b-0">
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
                                                                                                                                className="bg-black"
                                                                                                                            />
                                                                                                                            <ComboboxContent className="bg-black">
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
                                                                                                                    <Button variant="ghost" size="icon" className="size-8 cursor-grab active:cursor-grabbing text-zinc-500 hover:text-white hover:bg-transparent">
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
                                                                                        <div className="size-full rounded-md bg-transparent" />
                                                                                    </SortableOverlay>
                                                                                </Sortable>
                                                                            </AccordionContent>
                                                                        </AccordionItem>
                                                                    </Accordion>
                                                                    <Accordion type="single" collapsible defaultValue="item-1" className="w-full" >
                                                                        <AccordionItem value="item-1" className="border-none">
                                                                            <div className="flex flex-row w-full">
                                                                                <AccordionTrigger className="hover:no-underline">
                                                                                    <div className="flex w-fit flex-row text-xs gap-2 mr-2">
                                                                                        Callbacks
                                                                                    </div>
                                                                                </AccordionTrigger>
                                                                                <Button className="ml-2 mt-1 bg-transparent hover:bg-transparent" onClick={() => addCallback(path.id, path.callbacks)}>
                                                                                    <CirclePlus color="#03fc0f"/>
                                                                                </Button>
                                                                            </div>
                                                                            <AccordionContent className="flex h-full flex-col">
                                                                                {(path.callbacks || []).map((callback) => (
                                                                                    <div className="flex flex-row mt-2 items-center gap-2 text-2xl" key={callback.id}>
                                                                                        <Button className="bg-transparent hover:bg-transparent" onClick={() => deleteCallback(path.id, path.callbacks, callback.id)}>
                                                                                            <CircleMinus color="#C00000"/>
                                                                                        </Button>
                                                                                        <div className="flex flex-row items-center w-full gap-0.5">
                                                                                            <Input
                                                                                                id="callback-input"
                                                                                                type="number"
                                                                                                placeholder="Dist"
                                                                                                value={callback.distance}
                                                                                                onChange={(e) => {
                                                                                                    updateCallback(path.id, path.callbacks, callback.id, {
                                                                                                        distance: e.target.value
                                                                                                    });
                                                                                                }}
                                                                                                onClick={() => {
                                                                                                    if(callback.distance == 0){
                                                                                                        updateCallback(path.id, path.callbacks, callback.id, {
                                                                                                            distance: ""
                                                                                                        });
                                                                                                    }
                                                                                                }}
                                                                                                className="h-7 min-w-16 max-w-20 transition-colors focus-visible:border-red-500 focus-visible:ring-red-500 bg-black"
                                                                                            />
                                                                                            <div className="ml-1">
                                                                                                <Combobox items={["S","D"]}
                                                                                                    onValueChange={(value) => {
                                                                                                        updateCallback(path.id, path.callbacks, callback.id, {
                                                                                                            distValue: value == "S" ? false : true
                                                                                                        });
                                                                                                    }}
                                                                                                >
                                                                                                    <ComboboxInput
                                                                                                        placeholder=""
                                                                                                        className="h-7 min-w-14 max-w-14 focus-visible:border-red-500 focus-visible:ring-red-500 bg-black"
                                                                                                    />
                                                                                                    <ComboboxContent className="bg-black">
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
                                                                                                value={callback.methodName}
                                                                                                onChange={(e) => {
                                                                                                    updateCallback(path.id, path.callbacks, callback.id, {
                                                                                                        methodName: e.target.value
                                                                                                    });
                                                                                                }}
                                                                                                placeholder="Method"
                                                                                                className="h-7 min-w-33 max-w-full transition-colors focus-visible:border-red-500 focus-visible:ring-red-500 bg-black"
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                ))}
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
                        <div className="size-full rounded-md bg-transparent" />
                    </SortableOverlay>
                </Sortable>
            </ScrollArea>
        </div>
    );
}