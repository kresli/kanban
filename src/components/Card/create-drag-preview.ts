export function createDragPreview(event: React.DragEvent) {
  const target = event.target as HTMLElement;
  const targetRect = target.getBoundingClientRect();
  event.dataTransfer.dropEffect = "move";

  // Get the mouse position relative to the target element
  const mouseLeft = event.clientX - targetRect.left;
  const mouseTop = event.clientY - targetRect.top;

  // Clone the target element to create the preview
  const clonedElement = target.cloneNode(true) as HTMLElement;

  const computedStyles = window.getComputedStyle(target);

  // Apply the computed styles to the cloned element
  Array.from(computedStyles).forEach((style) => {
    clonedElement.style[style as unknown as number] =
      computedStyles.getPropertyValue(style);
  });

  const angle = 5;

  // Initial styling for the preview element
  // clonedElement.style.border = "1px solid blue";
  clonedElement.style.transform = `rotate(${angle}deg)`; // Example rotation
  clonedElement.style.transformOrigin = "0 0"; // Keep transform origin at top-left corner
  clonedElement.style.opacity = "0.8";
  clonedElement.style.outlineWidth = "0";

  // Create a container for the drag preview
  const previewContainer = document.createElement("div");
  previewContainer.style.position = "fixed";
  previewContainer.style.left = "-9999px";
  previewContainer.style.top = "-9999px";
  previewContainer.style.pointerEvents = "none";
  previewContainer.style.visibility = "hidden";

  previewContainer.appendChild(clonedElement);
  document.body.appendChild(previewContainer);

  const rotatedMouse = rotatePoint(mouseLeft, mouseTop, angle);

  const bbox = getBoundingBox(
    [
      [0, 0],
      [targetRect.width, 0],
      [targetRect.width, targetRect.height],
      [0, targetRect.height],
    ],
    angle
  );

  event.dataTransfer.setDragImage(
    previewContainer,
    -bbox.x + rotatedMouse.x,
    -bbox.y + rotatedMouse.y
  );

  const cleanup = () => {
    document.body.removeChild(previewContainer); // Clean up the preview
  };
  previewContainer.addEventListener("dragend", cleanup);
}

function getBoundingBox(points: [number, number][], angle: number) {
  const rotatedPoints = points.map(([x, y]) => rotatePoint(x, y, angle));
  const minX = Math.min(...rotatedPoints.map((p) => p.x));
  const maxX = Math.max(...rotatedPoints.map((p) => p.x));
  const minY = Math.min(...rotatedPoints.map((p) => p.y));
  const maxY = Math.max(...rotatedPoints.map((p) => p.y));
  return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
}

function rotatePoint(x: number, y: number, angleDegrees: number) {
  // Convert angle from degrees to radians
  const angleRadians = (angleDegrees * Math.PI) / 180;

  // Apply the rotation formula
  const xNew = x * Math.cos(angleRadians) - y * Math.sin(angleRadians);
  const yNew = x * Math.sin(angleRadians) + y * Math.cos(angleRadians);

  return { x: xNew, y: yNew };
}
