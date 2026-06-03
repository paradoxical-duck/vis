'use client'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import PoseControls from "@/components/poseControls";


export default function Home() {
  return (
    <div className="flex flex-row h-screen p-4 font-mono bg-[#1c1c1c]">
      <ResizablePanelGroup
        orientation="horizontal"
        className="min-h-full max-w-md rounded-lg border md:min-w-full"
      >
        <ResizablePanel defaultSize="16.7%" maxSize="30%" minSize="7.5%">
      
          <span>
            <PoseControls/>
          </span>
        </ResizablePanel>
        <ResizableHandle withHandle />

        
        <ResizablePanel defaultSize="58.3%" minSize="40%">
          <div className="flex h-full items-center justify-center">
              <span className="font-semibold">
                <img src = "./images/decodeField.png"/>
              </span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="25%" maxSize="30%" minSize="10%">
          <div className="h-full items-center justify-center p-6 h-f">
            <span className="font-semibold">
              
              <div className="flex h-full items-start justify-center p-6 text-3xl text-bold">
                Paths
              </div>
              
              
              </span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
