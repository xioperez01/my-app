"use client";

import { useTableState } from "@/hooks/useTable";
import Paginator from "@/components/Paginator/Paginator";
import styles from "./Table.module.css";
import typography from "@/styles/typography.module.css";
import { cn } from "@/utils";
import TableSortIcon from "@/components/icons/TableSortIcon/TableSortIcon";

interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  defaultSortKey: keyof T;
  dataName?: string;
  title?: string;
  onRowClick?: (row: T) => void;
}

export default function Table<T>({
  data,
  columns,
  title,
  defaultSortKey,
  dataName,
  onRowClick,
}: TableProps<T>) {
  const {
    data: tableData,
    sortKey,
    sortOrder,
    handleSort,
    currentPage,
    next,
    prev,
    hasNext,
    hasPrev,
    label,
  } = useTableState(data, defaultSortKey);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {title && (
          <p className={cn(typography.subtitle, typography.textLg)}>{title}</p>
        )}
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((col) => {
                const isActive = sortKey === col.key;

                return (
                  <th
                    key={String(col.key)}
                    onClick={() => col.sortable && handleSort(col.key)}
                    className={col.sortable ? styles.sortableColumn : ""}
                  >
                    <span className={styles.headerContent}>
                      {col.label}
                      {col.sortable && (
                        <TableSortIcon
                          direction={isActive ? sortOrder : undefined}
                        />
                      )}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {tableData?.map((row, index) => (
              <tr
                key={index}
                onClick={() => onRowClick?.(row)}
                className={onRowClick ? styles.clickableRow : ""}
              >
                {columns.map((col) => (
                  <td key={String(col.key)}>
                    {col.render
                      ? col.render(row[col.key], row)
                      : (row[col.key] as any)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Paginator
        currentPage={currentPage}
        next={next}
        prev={prev}
        hasNext={hasNext}
        hasPrev={hasPrev}
        label={label}
        dataName={dataName}
      />
    </div>
  );
}
