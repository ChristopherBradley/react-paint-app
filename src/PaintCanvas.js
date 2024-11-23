import React, { useRef, useState } from 'react';
import Graph from 'graphology';

const PaintCanvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [graph] = useState(new Graph());

  const startDrawing = (e) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current.getContext('2d');
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    ctx.lineTo(x, y);
    ctx.stroke();

    // Add drawing points as nodes to the graph
    const nodeId = `${x},${y}`;
    if (!graph.hasNode(nodeId)) {
      graph.addNode(nodeId, { x, y });
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: '1px solid black' }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      ></canvas>
      <button onClick={() => console.log(graph.export())}>Log Graph</button>
    </div>
  );
};

export default PaintCanvas;
