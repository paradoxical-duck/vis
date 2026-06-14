'use client'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

import PathControls from "@/components/path-controls";
import { Paths, Poses } from "@/hooks/use-visualizer";
import PoseControls from "@/components/pose-controls";


export default function Home() {
  
  const{
   poses,
   deletePose,
   addPose,
   updatePose,
   setPoses,
  }
   = Poses();

   const{
    paths,
    setPaths,
    addPath,
    updatePath,
    deletePath
   } = Paths();

  return (
    <div className="flex flex-row h-screen p-4">
      <ResizablePanelGroup
        orientation="horizontal"
        className="min-h-full max-w-md rounded-lg border min-w-full"
      >
        <ResizablePanel defaultSize="25%" maxSize="30%" minSize="17%">
          <span>
            <PoseControls
              poses={poses}
              deletePose= {deletePose} 
              addPose = {addPose}
              updatePose = {updatePose} 
              setPoses = {setPoses}
            />
          </span>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="50%" minSize="30%">
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
        <ResizablePanel defaultSize="35%" maxSize="40%" minSize="27%">
          <div className="h-full items-center justify-center h-f">
            <span className="font-semibold">
              <PathControls 
              Poses={poses}
              paths={paths}
              setPaths={setPaths}
              addPath={addPath}
              updatePath={updatePath}
              deletePath={deletePath}
              /> 
              
            </span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
