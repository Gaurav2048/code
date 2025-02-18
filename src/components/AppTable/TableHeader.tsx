import React from "react";

interface TableHeaderProps {
  children: React.ReactNode;
}

const TableHeader: React.FC<TableHeaderProps> = ({ children }) => {
  return <th>{children}</th>;
};

export default TableHeader;
