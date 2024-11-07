import LiteGraph from 'npm:@comfyorg/litegraph@0.8.20';

const graph = new LiteGraph.LGraph();

const node_time = LiteGraph.createNode("basic/time");
graph.add(node_time);

const node_console = LiteGraph.createNode("basic/console");
node_console.mode = LiteGraph.ALWAYS;
graph.add(node_console);

node_time.connect( 0, node_console, 1 );

graph.start()

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log("Add 2 + 3 =", add(2, 3));
}
