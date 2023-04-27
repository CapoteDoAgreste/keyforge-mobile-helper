import { useDrag } from "react-dnd";
import aembar from "./images/single-aembar.png";

function DraggableItem({ id, text }) {
  const [{ isDragging }, dragRef] = useDrag({
    item: { id, type: "item" },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={dragRef} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <img src={aembar} class="aembar" />
    </div>
  );
}
export default DraggableItem;
