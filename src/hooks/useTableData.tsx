import { useEffect, useMemo, useState } from "react";
import { TABLE_DATA } from "../constants";
import { CheckboxState } from "../components/AppCheckbox/Checkbox";

const useTableData = () => {
  const [data, setData] = useState<Array<TableData>>();
  const [selections, setSelections] = useState<Array<boolean>>();
  const [state, setState] = useState<CheckboxState>("indeterminate");
  const [selectAll, setSelectAll] = useState<boolean>(false);

  useEffect(() => {
    setData(TABLE_DATA);
  }, []);

  useEffect(() => {
    setSelections(new Array(data?.length).fill(false));
  }, [data]);

  const headers = useMemo<Array<string> | undefined>(() => {
    if (!data) return [];
    return ["", ...Object.keys(data?.[0])];
  }, [data]);

  const handleSelectionChange = (checked: boolean, index: number) => {
    setSelections(
      selections?.map((selection, pos) => {
        if (index === pos) return checked;
        return selection;
      }),
    );
  };

  useEffect(() => {
    if (selectAll) {
      setState("checked");
      setSelections(selections?.map(() => true));
    } else {
      setState("indeterminate");
      setSelections(selections?.map(() => false));
    }
  }, [selectAll]);

  return {
    data,
    setData,
    headers,
    selections,
    handleSelectionChange,
    state,
    selectAll,
    setSelectAll,
  };
};

export default useTableData;
