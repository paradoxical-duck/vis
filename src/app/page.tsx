'use client'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

import PathControls from "@/components/path-controls";
import { Poses } from "@/hooks/use-visualizer";
import PoseControls from "@/components/pose-controls";


export default function Home() {
  
  const{
   poses,
   deletePose,
   addPose,
   updatePose 
  }
   = Poses();

  return (
    <div className="flex flex-row h-screen p-4">
      <ResizablePanelGroup
        orientation="horizontal"
        className="min-h-full max-w-md rounded-lg border min-w-full"
      >
        <ResizablePanel defaultSize="25%" maxSize="30%" minSize="17%">
          <span>
            <PoseControls poses={poses} deletePose= {deletePose} addPose = {addPose} updatePose = {updatePose} />
          </span>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="50%" minSize="40%">
          <div className="flex h-full w-full items-center justify-center overflow-hidden">
              <img 
                  src="./images/decodeField.png" 
                  className="max-h-full max-w-full object-contain" 
                  alt="Decode Field"
                  draggable="false"
              />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="25%" maxSize="30%" minSize="22%">
          <div className="h-full items-center justify-center h-f">
            <span className="font-semibold">
              <PathControls Poses={poses}/> 
              
            </span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
