// "use client";

// import React, { useState, useRef, useEffect } from "react";
// // import { fabric } from "fabric";
// // import { saveAs } from "file-saver";

// const Whiteboard = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
//   const [drawingMode, setDrawingMode] = useState<boolean>(true);

//   useEffect(() => {
//     if (canvasRef.current) {
//     //   const newCanvas = new fabric.Canvas(canvasRef.current);
//     //   setCanvas(newCanvas);
//     }
//   }, []);

//   const handleDrawingModeChange = () => {
//     setDrawingMode(!drawingMode);
//     if (canvas) {
//       canvas.isDrawingMode = !drawingMode;
//       canvas.forEachObject((object) => {
//         object.selectable = !drawingMode;
//       });
//     }
//   };

//   const handleEraserMode = () => {
//     if (canvas) {
//       canvas.freeDrawingBrush.color = "#FFFFFF"; // Set eraser color to white
//       canvas.freeDrawingBrush.width = 20; // Set eraser size
//       canvas.isDrawingMode = true;
//     }
//   };

//   const handleImportImage = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       const file = event.target.files[0];
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         if (canvas) {
//           fabric.Image.fromURL(e.target!.result as string, (img) => {
//             img.scaleToWidth(canvas.width!);
//             img.scaleToHeight(canvas.height!);
//             canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
//           });
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleZoomIn = () => {
//     if (canvas) {
//       canvas.setZoom(canvas.getZoom() * 1.1);
//       canvas.setWidth(canvas.getWidth() * 1.1);
//       canvas.setHeight(canvas.getHeight() * 1.1);
//       canvas.renderAll();
//     }
//   };

//   const handleZoomOut = () => {
//     if (canvas) {
//       canvas.setZoom(canvas.getZoom() / 1.1);
//       canvas.setWidth(canvas.getWidth() / 1.1);
//       canvas.setHeight(canvas.getHeight() / 1.1);
//       canvas.renderAll();
//     }
//   };

//   const handleExportJson = () => {
//     if (canvas) {
//       const json = JSON.stringify(canvas.toJSON());
//       const blob = new Blob([json], { type: "application/json" });
//       saveAs(blob, "whiteboard.json");
//     }
//   };

//   const handleExportImage = () => {
//     if (canvas) {
//       const dataURL = canvas.toDataURL({
//         format: "png",
//         multiplier: 2, // Increase the resolution for better quality
//       });
//       const link = document.createElement("a");
//       link.href = dataURL;
//       link.download = "whiteboard.png";
//       link.click();
//     }
//   };

//   //if server side

//   if (window === undefined) {
//     return null;
//   }

//   return (
//     <div className="flex flex-col items-center">
//       <div className="flex space-x-2 my-4">
//         <button
//           className={`px-4 py-2 rounded ${drawingMode ? "bg-blue-500 text-white" : "bg-gray-300"}`}
//           onClick={handleDrawingModeChange}
//         >
//           {drawingMode ? "Drawing Mode" : "Selection Mode"}
//         </button>
//         <button
//           className={`px-4 py-2 rounded ${!drawingMode ? "bg-blue-500 text-white" : "bg-gray-300"}`}
//           onClick={handleEraserMode}
//         >
//           Eraser
//         </button>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImportImage}
//           className="hidden"
//           id="import-image-input"
//         />
//         <label
//           htmlFor="import-image-input"
//           className="px-4 py-2 rounded bg-gray-300 cursor-pointer"
//         >
//           Import Image
//         </label>
//         <button className="px-4 py-2 rounded bg-gray-300" onClick={handleZoomIn}>
//           Zoom In
//         </button>
//         <button className="px-4 py-2 rounded bg-gray-300" onClick={handleZoomOut}>
//           Zoom Out
//         </button>
//         <button className="px-4 py-2 rounded bg-gray-300" onClick={handleExportJson}>
//           Export JSON
//         </button>
//         <button className="px-4 py-2 rounded bg-gray-300" onClick={handleExportImage}>
//           Export Image
//         </button>
//       </div>
//       <canvas ref={canvasRef} className="border border-gray-300" width={800} height={600} />
//     </div>
//   );
// };

// export default Whiteboard;

export default function WhiteboardPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-white">
      <h1 className="text-3xl font-bold">Whiteboard</h1>
    </div>
  );
}
