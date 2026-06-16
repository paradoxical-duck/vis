'use client'

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CircleMinus, GripVertical, Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { Sortable, SortableContent, SortableItem, SortableItemHandle, SortableOverlay } from "./ui/sortable";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface poseControlProps{
    deletePose: (id: string) => void;
    poses: Pose[];
    addPose: () => void;
    updatePose: (id: string, updatedFields: Partial<Pose>) => void;
    setPoses: Dispatch<SetStateAction<Pose[]>>;
}

export default function PoseControls({
    poses,
    deletePose,
    addPose,
    updatePose,
    setPoses
}: poseControlProps) {
    return (
        <div className="flex h-full flex-col bg-black">
            <div className="flex justify-center p-4 text-3xl font-bold text-white">
                Poses
            </div>
            <Button className="flex m-4" onClick={addPose}>
                <Plus/>
                Add Pose
            </Button>
            <ScrollArea className="w-full flex-1 min-h-0 border-t p-4">
                <Sortable
                    value={poses}
                    onValueChange={setPoses}
                    getItemValue={(item) => item.id}
                >
                    <Table className="">
                        <TableHeader>
                            <TableRow className="border-none">
                            </TableRow>
                        </TableHeader>
                        <SortableContent asChild>
                            <TableBody>
                                {poses.map((pose) => (
                                    <SortableItem key={pose.id} value={pose.id} asChild>
                                        <TableRow className="bg-black hover:bg-transparent border-b-0">
                                            <TableCell className="w-fit">
                                                <SortableItemHandle asChild>
                                                    <Button variant="ghost" size="icon" className="size-8 cursor-grab active:cursor-grabbing text-zinc-500 hover:text-white hover:bg-transparent">
                                                        <GripVertical className="h-5 w-5" />
                                                    </Button>
                                                </SortableItemHandle>
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                <div className="flex text-white">
                                                    <Accordion type="single" collapsible defaultValue="item-1" className="w-full" >
                                                        <AccordionItem value="item-1" className="border-none">
                                                            <div className="flex flex-row w-full">
                                                                <AccordionTrigger className="hover:no-underline">
                                                                    <div className="flex w-fit flex-row gap-2 mr-2">
                                                                        <Input
                                                                            id={pose.id}
                                                                            type="text"
                                                                            placeholder="Pose Name"
                                                                            defaultValue={pose.name}
                                                                            className="transition-colors mr-2 focus-visible:border-red-500 focus-visible:ring-red-500 bg-black"
                                                                            onClick={(e) => e.stopPropagation()}
                                                                            onChange={(e) => updatePose(pose.id, {name: e.target.value})}
                                                                            onKeyDown={(e) => {
                                                                                if (e.key === " ") {
                                                                                    e.preventDefault();
                                                                                }
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </AccordionTrigger>
                                                                <Button className="ml-2 mt-2 bg-transparent hover:bg-transparent" onClick={() => deletePose(pose.id)}>
                                                                    <CircleMinus color="#C00000"/>
                                                                </Button>
                                                            </div>
                                                            <AccordionContent className="flex h-full">
                                                                <div className="flex flex-col gap-2 ml-5">
                                                                    <div className="grid grid-cols-2 gap-2">
                                                                        <Field>
                                                                            <FieldLabel htmlFor="x-input" className="text-white text-xs">
                                                                                X:
                                                                            </FieldLabel>
                                                                            <Input
                                                                                id="x-input"
                                                                                type="number"
                                                                                placeholder="X"
                                                                                min={-70.5}
                                                                                max={70.5}
                                                                                onClick={() => {
                                                                                    if(pose.x == 0){
                                                                                        updatePose(pose.id, {x: ""})
                                                                                    }
                                                                                }}
                                                                                className="w-20 h-7 transition-colors focus-visible:border-red-500 focus-visible:ring-red-500 bg-black"
                                                                                value={pose.x}
                                                                                onChange={(e) => {
                                                                                    const val = e.target.value;
                                                                                    updatePose(pose.id, { x: Number(val) });
                                                                                    if(Number(val) >= 70.5){
                                                                                        updatePose(pose.id, {x: 70.5})
                                                                                    } else if(Number(val) <= -70.5){
                                                                                        updatePose(pose.id, {x: -70.5})
                                                                                    }
                                                                                }}
                                                                            />
                                                                        </Field>
                                                                        <Field>
                                                                            <FieldLabel htmlFor="y-input" className="text-white text-xs">
                                                                                Y:
                                                                            </FieldLabel>
                                                                            <Input
                                                                                id="y-input"
                                                                                min={-70.5}
                                                                                max={70.5}
                                                                                type="number"
                                                                                placeholder="Y"
                                                                                className="w-20 h-7 transition-colors focus-visible:border-red-500 focus-visible:ring-red-500 bg-black"
                                                                                value={pose.y}
                                                                                onClick={() => {
                                                                                    if(pose.y == 0){
                                                                                        updatePose(pose.id, {y: ""})
                                                                                    }
                                                                                }}
                                                                                onChange={(e) => {
                                                                                    const val = e.target.value;
                                                                                    updatePose(pose.id, { y: Number(val) });
                                                                                    if(Number(val) >= 70.5){
                                                                                        updatePose(pose.id, {y: 70.5})
                                                                                    } else if(Number(val) <= -70.5){
                                                                                        updatePose(pose.id, {y: -70.5})
                                                                                    }
                                                                                }}
                                                                            />
                                                                        </Field>
                                                                    </div>
                                                                    <div className="grid grid-cols-2 gap-2">
                                                                        <Field>
                                                                            <FieldLabel htmlFor="heading-input" className="text-white text-xs">
                                                                                Heading:
                                                                            </FieldLabel>
                                                                            <Input
                                                                                id="heading-input"
                                                                                type="number"
                                                                                placeholder="Heading"
                                                                                min={0}
                                                                                max={360}
                                                                                className="w-20 h-7 transition-colors focus-visible:border-red-500 focus-visible:ring-red-500 bg-black"
                                                                                value={pose.heading}
                                                                                onClick={() => {
                                                                                    if(pose.heading == 0){
                                                                                        updatePose(pose.id, {heading: ""})
                                                                                    }
                                                                                }}
                                                                                onChange={(e) => {
                                                                                    const val = e.target.value;
                                                                                    updatePose(pose.id, { heading: Number(val) });
                                                                                    if(Number(val) >= 360){
                                                                                        updatePose(pose.id, {heading: 360})
                                                                                    } else if(Number(val) <= 0){
                                                                                        updatePose(pose.id, {heading: 0})
                                                                                    }
                                                                                }}
                                                                            />
                                                                        </Field>
                                                                        <Field>
                                                                            <FieldLabel htmlFor="radius-input" className="text-white text-xs">
                                                                                Radius:
                                                                            </FieldLabel>
                                                                            <Input
                                                                                id="radius-input"
                                                                                type="number"
                                                                                placeholder="Radius"
                                                                                disabled={!pose.arcPose}
                                                                                min={2}
                                                                                value={pose.radius}
                                                                                onClick={() => {
                                                                                    if(pose.radius == 2){
                                                                                        updatePose(pose.id, {radius: ""})
                                                                                    }
                                                                                }}
                                                                                onChange={(e) => {
                                                                                    const val = e.target.value;
                                                                                    updatePose(pose.id, { radius: Number(val) });
                                                                                    if(Number(val) <= 2 && pose.arcPose){
                                                                                        updatePose(pose.id, {radius: 2})
                                                                                    }
                                                                                }}
                                                                                className="w-20 h-7 transition-all duration-300 ease-in-out focus-visible:border-red-500 focus-visible:ring-red-500 disabled:cursor-not-allowed disabled:opacity-40 bg-black"
                                                                            />
                                                                        </Field>
                                                                    </div>
                                                                    <div className="flex items-center space-x-2">
                                                                        <Switch
                                                                            id="arc-pose"
                                                                            checked={pose.arcPose}
                                                                            onCheckedChange={(checked: boolean) => {
                                                                                updatePose(pose.id, { arcPose: checked })
                                                                                updatePose(pose.id, {radius: 0})
                                                                            }}
                                                                        />
                                                                        <label htmlFor="arc-pose" className="text-xs cursor-pointer select-none">
                                                                            Arc Pose
                                                                        </label>
                                                                    </div>
                                                                    <div className="flex w-full gap-2">
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => updatePose(pose.id, { local: true })}
                                                                            className={`flex-1 rounded-md justify-center text-center text-xs h-7 font-semibold text-white transition-colors ${
                                                                                pose.local ? "bg-red-600" : "bg-zinc-800 hover:bg-zinc-700"
                                                                            }`}
                                                                        >
                                                                            Local
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => updatePose(pose.id, { local: false })}
                                                                            className={`flex-1 rounded-md justify-center text-center text-xs h-7 font-semibold text-white transition-colors ${
                                                                                !pose.local ? "bg-red-600" : "bg-zinc-800 hover:bg-zinc-700"
                                                                            }`}
                                                                        >
                                                                            Global
                                                                        </button>
                                                                    </div>
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