import React, { createContext, ReactNode, useContext } from "react";

interface TableContextType {
  children: ReactNode;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export const useTableContext = (): TableContextType => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTableContext must be used within a Table component");
  }
  return context;
};

export const TableProvider: React.FC<TableContextType> = ({ children }) => {
  return (
    <TableContext.Provider value={{ children }}>
      {children}
    </TableContext.Provider>
  );
};
