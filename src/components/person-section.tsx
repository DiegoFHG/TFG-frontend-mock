import { GrAdd } from "react-icons/gr";
import { Button } from "./button";

export default function PersonSection({ title, onActionClick } : { title: string, onActionClick?: Function }) {
  return <div className="mb-4 mt-4">
    <div className="flex justify-between">
      <h2 className="mb-3 text-xl font-bold">{title}</h2>
      { onActionClick !== undefined ? <Button type="button" variant="ghost" onClick={() => onActionClick()}>
        <GrAdd />
      </Button>: null }
    </div>
    <hr />
  </div>
}