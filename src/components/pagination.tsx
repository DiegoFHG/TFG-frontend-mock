"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./button";

export default function Pagination({
  onPageChange,
  totalCount,
  rowsPerPage,
}: {
  onPageChange: Function;
  totalCount: number;
  rowsPerPage: number;
}) {
  const pagesCount = Math.floor(totalCount / rowsPerPage);
  const pages = [...new Array(pagesCount)];
  const [currentPage, setCurrentPage] = useState(1);

  const onNextPage = () => setCurrentPage(currentPage + 1);
  const onPreviousPage = () => setCurrentPage(currentPage - 1);

  useEffect(() => { onPageChange(currentPage) }, [currentPage])

  return (
    <div>
      <Button>Anterior</Button>
      <Button>Siguiente</Button>
    </div>
  );
}
