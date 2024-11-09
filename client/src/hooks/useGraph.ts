import { useEffect } from "react";
import { createGraph } from "../editor.ts";
import { resgisterCustomNodes } from "../nodes/register.ts";
export function useGraph(canvasRef: React.RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    if (canvasRef.current) {
      resgisterCustomNodes();
      const { graph } = createGraph(canvasRef.current);
      return () => {
        graph.stop();
      };
    }
  }, [canvasRef]);
}
