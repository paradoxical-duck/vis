'use client'

import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CircleMinus, GripVertical, Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { Dispatch, SetStateAction } from "react";
import { Sortable, SortableContent, SortableItem, SortableItemHandle, SortableOverlay } from "./ui/sortable";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export interface Pose {
  id: string;
  name: string;
  x: number | string;
  y: number | string;
  heading: number | string;
  radius: number | string;
  arcPose: boolean;
  local: boolean;
}

interface PoseControlProps {
  deletePose: (id: string) => void;
  poses: Pose[];
  addPose: () => void;
  updatePose: (id: string, updatedFields: Partial<Pose>) => void;
  setPoses: Dispatch<SetStateAction<Pose[]>>;
}

export default function PoseControls({
  poses, deletePose, addPose, updatePose, setPoses
}: PoseControlProps) {
  
  return (
    <div className="flex h-full flex-col">
      <div className="flex justify-center p-4 text-3xl font-bold text-white">
        Poses
      </div>
      
      <Button className="flex m-4" onClick={addPose}>
        <Plus className="mr-2 h-4 w-4" />
        Add Pose
      </Button>
      
      <ScrollArea className="w-full flex-1 min-h-0 border-t p-4">
        <Sortable 
          value={poses} 
          onValueChange={setPoses}
          getItemValue={(item) => item.id}
        >
          <Table>
            <SortableContent asChild>
              <TableBody>
                {poses.map((pose) => (
                  <SortableItem key={pose.id} value={pose.id} asChild>
                    <TableRow className="border-b border-zinc-800">
                      <TableCell className="p-2">
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value={pose.id} className="border-none">
                            <div className="flex flex-row items-center w-full justify-between gap-4 py-1 text-white">
                              <div className="flex items-center gap-2 flex-1">
                                <SortableItemHandle>
                                  <Button variant="ghost" className="h-8 w-8 p-0 cursor-grab active:cursor-grabbing text-zinc-400 hover:text-white">
                                    <GripVertical className="h-4 w-4" />
                                  </Button>
                                </SortableItemHandle>

                                <Input
                                  id={`name-${pose.id}`}
                                  type="text"
                                  placeholder="Pose Name"
                                  defaultValue={pose.name}
                                  className="transition-colors max-w-xs focus-visible:border-red-500 focus-visible:ring-red-500 bg-zinc-900"
                                  onChange={(e) => updatePose(pose.id, { name: e.target.value })}
                                />
                              </div>

                              <div className="flex items-center gap-2">
                                <AccordionTrigger className="py-0 border-none hover:no-underline text-xs text-zinc-400 gap-1">
                                  Details
                                </AccordionTrigger>
                                
                                <Button 
                                  variant="ghost" 
                                  className="bg-[#111111] hover:bg-zinc-900 h-8 w-8 p-0" 
                                  onClick={() => deletePose(pose.id)}
                                >
                                  <CircleMinus className="h-5 w-5" color="#C00000" />
                                </Button>
                              </div>
                            </div>

                            <AccordionContent className="pt-2 pb-4">
                              <div className="flex flex-col gap-4 ml-8">
                                <div className="grid grid-cols-2 gap-2">
                                  <Field>
                                    <FieldLabel htmlFor={`x-${pose.id}`} className="text-white text-xs">
                                      X:
                                    </FieldLabel>
                                    <Input
                                      id={`x-${pose.id}`}
                                      type="number"
                                      placeholder="X"
                                      min={-70.5}
                                      max={70.5}
                                      className="w-20 h-7 transition-colors focus-visible:border-red-500 focus-visible:ring-red-500 bg-zinc-900"
                                      value={pose.x}
                                      onClick={() => {
                                        if (pose.x === 0) updatePose(pose.id, { x: "" });
                                      }}
                                      onChange={(e) => {
                                        const val = e.target.value;
                                        updatePose(pose.id, { x: val === "" ? "" : Math.max(-70.5, Math.min(70.5, Number(val))) });
                                      }}
                                    />
                                  </Field>

                                  <Field>
                                    <FieldLabel htmlFor={`y-${pose.id}`} className="text-white text-xs">
                                      Y:
                                    </FieldLabel>
                                    <Input
                                      id={`y-${pose.id}`}
                                      type="number"
                                      placeholder="Y"
                                      min={-70.5}
                                      max={70.5}
                                      className="w-20 h-7 transition-colors focus-visible:border-red-500 focus-visible:ring-red-500 bg-zinc-900"
                                      value={pose.y}
                                      onClick={() => {
                                        if (pose.y === 0) updatePose(pose.id, { y: "" });
                                      }}
                                      onChange={(e) => {
                                        const val = e.target.value;
                                        updatePose(pose.id, { y: val === "" ? "" : Math.max(-70.5, Math.min(70.5, Number(val))) });
                                      }}
                                    />
                                  </Field>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                  <Field>
                                    <FieldLabel htmlFor={`heading-${pose.id}`} className="text-white text-xs">
                                      Heading:
                                    </FieldLabel>
                                    <Input
                                      id={`heading-${pose.id}`}
                                      type="number"
                                      placeholder="Heading"
                                      min={0}
                                      max={360}
                                      className="w-20 h-7 transition-colors focus-visible:border-red-500 focus-visible:ring-red-500 bg-zinc-900"
                                      value={pose.heading}
                                      onClick={() => {
                                        if (pose.heading === 0) updatePose(pose.id, { heading: "" });
                                      }}
                                      onChange={(e) => {
                                        const val = e.target.value;
                                        updatePose(pose.id, { heading: val === "" ? "" : Number(val) % 360 });
                                      }}
                                    />
                                  </Field>

                                  <Field>
                                    <FieldLabel htmlFor={`radius-${pose.id}`} className="text-white text-xs">
                                      Radius:
                                    </FieldLabel>
                                    <Input
                                      id={`radius-${pose.id}`}
                                      type="number"
                                      placeholder="Radius"
                                      disabled={!pose.arcPose}
                                      min={2}
                                      className="w-20 h-7 transition-all duration-300 ease-in-out focus-visible:border-red-500 focus-visible:ring-red-500 disabled:cursor-not-allowed disabled:opacity-40 bg-zinc-900"
                                      value={pose.radius}
                                      onClick={() => {
                                        if (pose.radius === 2) updatePose(pose.id, { radius: "" });
                                      }}
                                      onChange={(e) => {
                                        const val = e.target.value;
                                        updatePose(pose.id, { radius: val === "" ? "" : (Number(val) <= 2 && pose.arcPose) ? 2 : Number(val) });
                                      }}
                                    />
                                  </Field>
                                </div>

                                <div className="flex items-center space-x-2 mt-1">
                                  <Switch
                                    id={`arc-pose-${pose.id}`}
                                    checked={pose.arcPose}
                                    onCheckedChange={(checked: boolean) => {
                                      updatePose(pose.id, { arcPose: checked, radius: checked ? 2 : 0 });
                                    }}
                                  />
                                  <label htmlFor={`arc-pose-${pose.id}`} className="text-xs cursor-pointer select-none">
                                    Arc Pose
                                  </label>
                                </div>

                                <div className="flex w-full gap-2 mt-1">
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