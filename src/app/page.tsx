'use client'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import PoseControls from "@/components/pose-controls";

export default function Home() {
  return (
    <div className="flex flex-row h-screen p-4">
      <ResizablePanelGroup
        orientation="horizontal"
        className="min-h-full max-w-md rounded-lg border min-w-full"
      >
        <ResizablePanel defaultSize="25%" maxSize="30%" minSize="15%">
          <span>
            <PoseControls/>
          </span>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="50%" minSize="40%">
          <div className="flex h-full w-full items-center justify-center overflow-hidden">
              <img 
                  src="./images/decodeField.png" 
                  className="max-h-full max-w-full object-contain" 
                  alt="Decode Field"
              />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="25%" maxSize="30%" minSize="15%">
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
