import { useEffect } from "react";
import { createGraph } from "../editor.ts";
import { resgisterCustomNodes } from "../nodes/register.ts";
export function useGraph(canvas: React.RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    canvas.current && resgisterCustomNodes() && createGraph(canvas.current);
  }, [canvas]);
}
