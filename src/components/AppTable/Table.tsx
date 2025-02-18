import React from "react";
import { TableProvider } from "./TableContext";

interface TableProps {
  children: React.ReactNode;
}

const Table: React.FC<TableProps> = ({ children }) => {
  return (
    <table>
      <TableProvider>{children}</TableProvider>
    </table>
  );
};

export default Table;
