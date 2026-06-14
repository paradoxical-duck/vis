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
import { useMemo, useState } from "react";
import { ChevronDown, ChevronDownCircle, CircleMinus, CirclePlus, Plus} from "lucide-react";
import { Input } from "./ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "./ui/combobox";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface pathControlProps {
    Poses: Pose[];
}






export default function PathControls({ Poses }: pathControlProps) {
    const poses = Poses || [];
    const [dropdown,setDropdown] = useState<boolean>(true);
    
    return (
        <div className="flex h-full flex-col">
            <div className="flex justify-center p-4 text-3xl font-bold text-white">
                Paths
            </div>
            <Button className="flex m-4">
                <Plus/>
                Add Path
            </Button>
           
            <ScrollArea className="w-full flex-1  min-h-0 border-t p-4">
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
                                        defaultValue={"Path1"}
                                        className="transition-colors mr-2 focus-visible:border-red-500 focus-visible:ring-red-500"
                                        onClick={(e) => e.stopPropagation()}
                                        onKeyDown={(e) => {
                                            if (e.key === " ") {
                                            e.preventDefault();
                                            }
                                        }}
                                    />
                                    
                                </div>
                            </AccordionTrigger>
                            
                            <Button className=" ml-2 mt-2 bg-[#11111] hover:bg-[#11111]" >
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
                                      
                                      <Button className=" ml-2 mt-1 bg-[#11111] hover:bg-[#11111]" >
                                          <CirclePlus color="#03fc0f"/>
                                      </Button>
                                      {/*this top layer can only be implemented when I implement the path interface
                                      PLS REMEMBER TO DO THIS MEEE*/}
                                      <Button className="mt-1 mr-5 bg-[#11111] hover:bg-[#11111]" >
                                        <ChevronDown color="#C00000"/>
                                      </Button>
                                  </div>
                                  <AccordionContent className="flex h-full">
                                    <div className="flex flex-row w-fit">
                                      <div className="flex">
                                        <Button className="bg-[#11111] hover:bg-[#11111]" >
                                          <CircleMinus color="#C00000"/>
                                        </Button>
                                      </div>
                                      <div className="flex ml-2">
                                        <Button className="bg-[#11111] hover:bg-[#11111]"
                                            onClick={() => setDropdown(prev => !prev)}>
                                          <ChevronDown color={`
                                            ${dropdown
                                                ? "#03fc0f"
                                                : "#C00000"
                                            }`}/>
                                        </Button>
                                      </div>
                                      <div className="flex flex-row gap-2 ml-4">
                                        <Combobox items={poses.map((p) => p.name)} openOnInputClick={dropdown}>
                                          <ComboboxInput placeholder="Select a Pose" />
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
                                        
                                      
                                        <div className="flex flex-row items-center gap-0.5">
                                            <Input
                                                id="callback-input"
                                                type="number"
                                                placeholder="Callback"
                                                className="h-7 min-w-16 transition-colors focus-visible:border-red-500 focus-visible:ring-red-500"
                                            />
                                            
                                            <div className="ml-1">
                                                <Combobox items={["S","D"]}>
                                                
                                                    <ComboboxInput 
                                                        placeholder="" 
                                                        className="h-7 min-w-14 focus-visible:border-red-500 focus-visible:ring-red-500"
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
                                                className="h-7 min-w-22 transition-colors focus-visible:border-red-500 focus-visible:ring-red-500"
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
            </ScrollArea>
        </div>
    );
}

