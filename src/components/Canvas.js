import React, { useState, useEffect , useRef } from 'react';
import { fabric  } from 'fabric';
import { useSelector } from 'react-redux';
import styles from "./Canvas.module.css"


const CanvasComp = ()=>{
 
  const imageUrl = useSelector((state)=>state.image.imageURL);
  console.log(imageUrl);

  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [downloadDisabled, setDownloadDisabled] = useState(false)
  // const [image, setImage] = useState(null);

  useEffect(() => {
    const fabricCanvas = new fabric.Canvas(canvasRef.current , {
      width: 600,
        height: 400,
        selection:true,
    });
    setCanvas(fabricCanvas);


    fabricCanvas.on('object:moving', (event) => {
      const target = event.target;
      target.setCoords(); // Update object coordinates
    });

    fabricCanvas.on('object:scaling', (event) => {
      const target = event.target;
      target.setCoords(); // Update object coordinates
    });

    // Clean up
    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  const handleButtonClick = () => {
    if (!canvas) return;

    // Create a new rectangle on button click
    const newRect = new fabric.Rect({
      width: 100,
      height: 100,
      fill: 'red',
      left: 50,
      top: 50,
      selectable: true,
      hasControls: true,
      hasBorders: true,
    });

    canvas.add(newRect);
    canvas.setActiveObject(newRect);
    canvas.renderAll();
  };



  const handleAddCircle = () => {
    if (!canvas) return;

    // Create a circle on button click
    const circle = new fabric.Circle({
      radius: 50,
      fill: 'blue',
      left: 80,
      top: 200,
      selectable: true,
      hasControls: true, // Enable resizing controls
      hasBorders: true, // Enable borders
      lockRotation: true, // Disable rotation
      lockUniScaling: true, // Disable independent scaling on x and y axis
      lockScalingFlip: true,
    });

    canvas.add(circle);
    canvas.setActiveObject(circle);
    canvas.renderAll();
  };

  const handleAddTriangle = () => {
    if (!canvas) return;

    // Create a triangle on button click
    const triangle = new fabric.Triangle({
      width: 90,
      height: 90,
      fill: 'green',
      left: 200,
      top: 150,
      selectable: true,
      hasControls: true,
      hasBorders: true,
    });

    canvas.add(triangle);
    canvas.setActiveObject(triangle);
    canvas.renderAll();
  };

  const handleAddPolygon = () => {
    if (!canvas) return;

    // Create a polygon on button click
    const points = [
      { x: 300, y: 300 },
      { x: 350, y: 350 },
      { x: 400, y: 300 },
    ];
    const polygon = new fabric.Polygon(points, {
      fill: 'orange',
      selectable: true,
      // hasControls: true,
      // hasBorders: true,
    });

    canvas.add(polygon);
    canvas.setActiveObject(polygon);
    canvas.renderAll();
  };


  const handleAddImage = () => {
    if (!canvas) return;

    setDownloadDisabled(true)
    // Load image and add to canvas
    fabric.Image.fromURL(imageUrl, (img) => {
      const scaleFactor = Math.min(
        canvas.width / img.width,
        canvas.height / img.height
      );
      const scaledWidth = img.width * scaleFactor;
      const scaledHeight = img.height * scaleFactor;

      img.set({
        scaleX: scaleFactor,
        scaleY: scaleFactor,
        left: (canvas.width - scaledWidth) / 2,
        top: (canvas.height - scaledHeight) / 2,
        selectable: false,
        evented: false,
      });
      canvas.add(img);
    });
  };


  const handleAddText = () => {
    if (!canvas) return;

    const text = new fabric.IText('Add Caption', {
      left: 150,
      top: 150,
      fill: 'black',
      fontSize: 20,
    
    });

    canvas.add(text);
    canvas.setActiveObject(text); // Make the text object active
    canvas.renderAll(); // Render the canvas to reflect the changes
  };

  const handleDownload = () => {
    if (!canvas) return;

    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1,
    });

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'canvas_image.png';
    link.click();
  };

  return (
    <div className={styles.main}>
    <div className={styles.canvasDiv}>      
      <canvas ref={canvasRef}  style={{ border: '1px solid black'}}
      onLoad={() => {
        const newCanvas = new fabric.Canvas(canvasRef.current);
        newCanvas.selection = true; // Enable selection
        setCanvas(canvasRef.current && new fabric.Canvas(canvasRef.current));
      }}
      />
      </div>
       
      <div className={styles.buttons}>
        <div className={styles.imageDiv}>
          <img src={imageUrl} style={{width:"150px" , height:"150px"}}/>
        </div>
      <button onClick={handleAddImage}>Add Image</button>
      <button onClick={handleButtonClick}>Add Rectangle</button>
      <button onClick={handleAddCircle}>Add Circle</button>
      <button onClick={handleAddTriangle}>Add Triangle</button>
      <button onClick={handleAddPolygon}>Add Polygon</button>
      <button onClick={handleAddText}>Add Caption</button>
      <div className={styles.downloadBtn}>
      <button onClick={handleDownload} disabled={downloadDisabled}>Download Canvas</button>
      </div>
      <p>Adding image will disabled download button as the image is not allowed to download!<br/>
        Only allowed to download canvas without adding image</p>

    </div>
    </div>
  );
}

export default CanvasComp;