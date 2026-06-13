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
import { ChevronDown, CircleMinus, CirclePlus, Plus} from "lucide-react";
import { Input } from "./ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "./ui/combobox";

interface pathControlProps {
    Poses: Pose[];
}

// const Tree = {
//     items:[{
//     'root': {
//       index: 'root',
//       isFolder: true,
//       children: ['Path 1'],
//       data: 'Root Container',
//     },
//     'Path 1': {
//       index: 'Path 1',
//       isFolder: true,
//       children: ['Control-Points','Callbacks'],
//       data: 'Path 1',
//     },
//     'Control-Points': {
//       index: 'Control-Points',
//       isFolder: true,
//       children: [],
//       data: 'Control Points',
//     },
//     'Callbacks': {
//       index: 'Callbacks',
//       isFolder: true,
//       children: ['10-in'],
//       data: 'Callbacks',
//     },
//     '10-in': {
//       index: '10-in',
//       isFolder: true,
//       children: ['method'],
//       data: '10-in',
//     },
//     'method': {
//       index: 'method',
//       isFolder: false,
//       children: [],
//       data: 'method',
//     },
//   }]
// };





export default function PathControls({ Poses }: pathControlProps) {
    const poses = Poses || [];
    // const items = useMemo(() => ({ ...Tree.items }), []);
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
                      {/* <style>{`
                        :root {
                          --rct-color-tree-bg: transparent;
                          --rct-color-search-highlight-bg: transparent;

                          --rct-color-tree-focus-outline: transparent;  
                          --rct-bar-color: transparent;
                          --rct-focus-outline: transparent;

                          --rct-color-focustree-item-selected-bg: transparent;
                          --rct-color-focustree-item-hover-bg: transparent;
                          --rct-color-focustree-item-hover-text: white;
                          --rct-color-focustree-item-active-bg: transparent;
                          --rct-color-focustree-item-active-text: white;
                          --rct-color-arrow: #C00000;
                          --rct-arrow-size: 30px;
                          --rct-arrow-padding: 20px;
                        }`
                      }</style>   
                     <UncontrolledTreeEnvironment 
                      dataProvider={new StaticTreeDataProvider(items[0], (item, data) => ({ ...item, data }))}
                      getItemTitle={item => item.data}
                      viewState={{}}
                      >
                      <Tree treeId="tree-1" rootItem="root" treeLabel="Tree Example" />
                    </UncontrolledTreeEnvironment> */}

                    

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
                            <div className="flex flex-col ml-10 ">
                                <Accordion type="single" collapsible defaultValue="item-1" className="w-full" >
                                  <AccordionItem value="item-1">
                                  <div className="flex flex-row w-full">
                                      <AccordionTrigger>
                                          <div className="flex w-fit flex-row gap-2 mr-2">
                                              Control Points
                                          </div>
                                      </AccordionTrigger>
                                      
                                      <Button className=" ml-2 mt-2 bg-[#11111] hover:bg-[#11111]" >
                                          <CirclePlus color="#03fc0f"/>
                                      </Button>
                                  </div>
                                  <AccordionContent className="flex h-full">
                                    <div className="flex flex-row w-fit">
                                      <div className="flex w-5">
                                        {/* todo: make the button green if the dropdown is enabled, red if it isnt
                                        take a look at xenon's code with the local and global thing */}
                                        <Button className="bg-[#11111] hover:bg-[#11111]" >
                                          <CircleMinus color="#C00000"/>
                                        </Button>
                                      </div>
                                      <div className="flex ml-2 w-5">
                                        <Button className="bg-[#11111] hover:bg-[#11111]" >
                                          <ChevronDown color="#C00000"/>
                                        </Button>
                                      </div>
                                      <div className="flex flex-row gap-2 ml-3 w-40">
                                        <Combobox items={poses.map((p) => p.name)}  >
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
                                        <div className="flex w-fit flex-row gap-2 mr-2">
                                            Callbacks
                                        </div>
                                    </AccordionTrigger>
                                    
                                    <Button className=" ml-2 mt-2 bg-[#11111] hover:bg-[#11111]" >
                                        <CirclePlus color="#03fc0f"/>
                                    </Button>
                                </div>
                                <AccordionContent className="flex h-full">
                                    <div className="flex flex-col gap-2 ">
                                        
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

