import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PenSquare, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TableColumn<T> {
  header: string;
  accessor: keyof T | ((data: T) => React.ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  keyField: keyof T;
  statusOptions?: {
    field: keyof T;
    values: Record<string, { className: string }>;
  };
}

export function DataTable<T>({
  columns,
  data,
  onEdit,
  onDelete,
  keyField,
  statusOptions,
}: DataTableProps<T>) {
  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <Table>
        <TableHeader>
          <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
            {columns.map((column, index) => (
              <TableHead 
                key={index} 
                className={cn(
                  "min-w-[155px]", 
                  index === 0 ? "xl:pl-7.5" : "",
                  column.className
                )}
              >
                {column.header}
              </TableHead>
            ))}
            {(onEdit || onDelete) && (
              <TableHead className="text-right xl:pr-7.5">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item) => (
            <TableRow 
              key={String(item[keyField])} 
              className="border-[#eee] dark:border-dark-3"
            >
              {columns.map((column, index) => (
                <TableCell 
                  key={index} 
                  className={cn(
                    index === 0 ? "xl:pl-7.5" : "",
                    column.className
                  )}
                >
                  {typeof column.accessor === "function" 
                    ? column.accessor(item)
                    : statusOptions && column.accessor === statusOptions.field
                      ? (
                        <div
                          className={cn(
                            "max-w-fit rounded-full px-3.5 py-1 text-sm font-medium",
                            statusOptions.values[String(item[statusOptions.field])].className
                          )}
                        >
                          {String(item[statusOptions.field])}
                        </div>
                      )
                      : String(item[column.accessor as keyof T])
                  }
                </TableCell>
              ))}
              
              {(onEdit || onDelete) && (
                <TableCell className="xl:pr-7.5">
                  <div className="flex items-center justify-end gap-x-3.5">
                    {onEdit && (
                      <button 
                        className="hover:text-primary"
                        onClick={() => onEdit(item)}
                      >
                        <span className="sr-only">Edit Item</span>
                        <PenSquare className="h-5 w-5" />
                      </button>
                    )}

                    {onDelete && (
                      <button 
                        className="hover:text-primary"
                        onClick={() => onDelete(item)}
                      >
                        <span className="sr-only">Delete Item</span>
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
