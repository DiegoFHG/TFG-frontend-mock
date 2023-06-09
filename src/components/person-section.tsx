import { GrAdd } from "react-icons/gr";
import { Button } from "./button";
import Link from "next/link";

export default function PersonSection({
  title,
  onActionClick,
}: {
  title: string;
  onActionClick?: string;
}) {
  return (
    <div className="mb-4 mt-4">
      <div className="flex justify-between">
        <h2 className="mb-3 text-xl font-bold">{title}</h2>
        {onActionClick !== undefined ? (
          <Link href={onActionClick}>
            <Button type="button" variant="ghost">
              <GrAdd />
            </Button>
          </Link>
        ) : null}
      </div>
      <hr />
    </div>
  );
}
