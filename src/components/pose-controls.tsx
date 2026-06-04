'use client'

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { useState } from "react";

export default function PoseControls() {
    const [arcChecked, setArcChecked] = useState<boolean>(false);
    const [isLocal, setIsLocal] = useState<boolean>(true);

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
                    <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                        <AccordionItem value="item-1">
                        <AccordionTrigger>
                            <div className="flex w-full flex-col gap-1 pr-4">
                                <Input
                                    id="pose-name"
                                    type="text"
                                    placeholder="Pose Name"
                                    defaultValue="Pose 1"
                                    className="w-full transition-colors focus-visible:border-red-500 focus-visible:ring-red-500"
                                    onClick={(e) => e.stopPropagation()}
                                />
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
                                            disabled={!arcChecked}
                                            className="w-20 transition-all duration-300 ease-in-out focus-visible:border-red-500 focus-visible:ring-red-500 disabled:cursor-not-allowed disabled:opacity-40"
                                        />
                                    </Field>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="arc-pose"
                                        checked={arcChecked}
                                        onCheckedChange={(checked: boolean) => setArcChecked(checked)}
                                    />
                                    <label htmlFor="arc-pose" className="cursor-pointer select-none text-sm">
                                        Arc Pose
                                    </label>
                                </div>

                                <div className="mt-2 flex w-full gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsLocal(true)}
                                        className={`flex-1 rounded-md py-2 text-center text-sm font-semibold text-white transition-colors ${
                                            isLocal
                                                ? "bg-red-600"
                                                : "bg-zinc-800 hover:bg-zinc-700"
                                        }`}
                                    >
                                        Local
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsLocal(false)}
                                        className={`flex-1 rounded-md py-2 text-center text-sm font-semibold text-white transition-colors ${
                                            !isLocal
                                                ? "bg-red-600"
                                                : "bg-zinc-800 hover:bg-zinc-700"
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
            </ScrollArea> 
        </div>
    );
}