import * as React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react";

import { FaSortDown, FaSortUp } from "react-icons/fa";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useDataTable } from "../stores/useDataTable";

export const DataTable = React.forwardRef(function DataTable(
  { data, columns },
  ref
) {
  const [rowSelection, setRowSelection] = useDataTable((state) => [
    state.rowSelection,
    state.setRowSelection,
  ]);
  const [sorting, setSorting] = React.useState([]);
  const table = useReactTable({
    columns,
    data,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      rowSelection,
      sorting,
    },
  });

  return (
    <Table ref={ref}>
      <Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header, index) => {
              const meta = header.column.columnDef.meta;
              return (
                <Th
                  key={header.id}
                  onClick={
                    index > 0
                      ? header.column.getToggleSortingHandler()
                      : undefined
                  }
                  isNumeric={meta?.isNumeric}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}

                  <chakra.span pl="4">
                    {header.column.getIsSorted() ? (
                      header.column.getIsSorted() === "desc" ? (
                        <FaSortDown aria-label="sorted descending" />
                      ) : (
                        <FaSortUp aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              );
            })}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map((row) => (
          <Tr key={row.id}>
            {row.getVisibleCells().map((cell) => {
              const meta = cell.column.columnDef.meta;
              return (
                <Td key={cell.id} isNumeric={meta?.isNumeric}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              );
            })}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
});
