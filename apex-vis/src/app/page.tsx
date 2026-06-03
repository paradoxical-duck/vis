import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} 
from "@/components/ui/accordion"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { SidebarContent, SidebarGroup, SidebarHeader } from "@/components/ui/sidebar";
import { Sidebar } from "lucide-react";
import Image from "next/image";





export default function Home() {
  return (
    <div className="flex h-screen bg-red-800 p-4 font-mono">
      <ResizablePanelGroup
        orientation="horizontal"
        className="min-h-full max-w-md rounded-lg border md:min-w-full"
      >
        <ResizablePanel defaultSize="16.7%" maxSize="30%" minSize="7.5%">
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">
              <div>
                <Sidebar>
                <SidebarHeader>
                  Poses
                </SidebarHeader>
                  <SidebarContent>
                    <SidebarGroup>
                     <Accordion type="single" collapsible defaultValue="item-1">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>Pose 1</AccordionTrigger>
                          <AccordionContent>
                            Put Data here
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </SidebarGroup>
                  </SidebarContent>
                </Sidebar>
              </div>

            </span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="58.3%" minSize="40%">
          <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Field</span>
          </div>
        </ResizablePanel>


        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="25%" maxSize="30%" minSize="10%">
          <div className="flex h-full items-center justify-center p-6 h-f">
            <span className="font-semibold">Paths</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>

  );
}
