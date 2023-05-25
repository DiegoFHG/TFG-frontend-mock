"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";
import { DataTable } from "./data-table";
import Pagination from "./pagination";
import { Button } from "./button";
import http from "@/lib/http";

export default function DataTableContainer({
  data,
  totalCount,
  cols,
  limit,
  url,
}: {
  data: any;
  cols: ColumnDef<any>[];
  totalCount: number;
  limit: number;
  url: string;
}) {
  const numberOfPages = Math.ceil(totalCount / limit);
  const didMount = useRef(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentData, setCurrentData] = useState([...data]);

  useEffect(() => {
    async function fetchData(url: string) {
      const data = await (await http(url)).json();

      setCurrentData(data.data);
    }

    if (didMount.current)
      fetchData(`${url}?limit=${limit}&skip=${currentPage * limit}`);
    else didMount.current = true;
  }, [currentPage, url, limit]);

  return (
    <div>
      <DataTable columns={cols} data={currentData} />
      <div className="flex justify-end mt-3">
        <Button
          className="mr-3"
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Anterior
        </Button>
        <Button
          disabled={
            currentPage * limit === totalCount ||
            currentData.length < limit
          }
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
