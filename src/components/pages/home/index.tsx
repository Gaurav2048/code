import { useEffect, useState } from "react";
import useTableData from "../../../hooks/useTableData";
import { AppCheckbox } from "../../AppCheckbox";
import {
  AppTable,
  AppTableCell,
  AppTableHeader,
  AppTableRow,
} from "../../AppTable";
import useDownload from "../../../hooks/useDownload";

const HomePage: React.FC = () => {
  const {
    data,
    headers,
    selections,
    handleSelectionChange,
    state,
    selectAll,
    setSelectAll,
  } = useTableData();
  const { enableDownload, downloadSelected } = useDownload(selections, data);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const count = selections?.filter((selection) => !!selection).length;

    setLabel(count === 0 ? "None Selected" : `${count} Selected`);
  }, [selections]);

  return (
    <>
      <div className="options">
        <AppCheckbox
          checked={selectAll}
          onChange={(checked) => setSelectAll(checked)}
          state={
            !!selections?.filter((selection) => !!selection).length
              ? state
              : "unchecked"
          }
          label={label}
        />
        <button onClick={downloadSelected} disabled={!enableDownload}>
          Download Selected
        </button>
      </div>
      <AppTable>
        <thead>
          <AppTableRow>
            {headers?.map((header) => (
              <AppTableHeader key={header}>{header}</AppTableHeader>
            ))}
          </AppTableRow>
        </thead>
        <tbody>
          {data?.map((el: TableData, index) => (
            <AppTableRow key={el.path}>
              <AppTableCell>
                <AppCheckbox
                  checked={selections?.[index] || false}
                  state={selections?.[index] ? state : "unchecked"}
                  onChange={(checked) => handleSelectionChange(checked, index)}
                />
              </AppTableCell>
              {Object.keys(el).map((key: string, index: number) => (
                <AppTableCell key={index}>
                  {el[key as keyof TableData]}
                </AppTableCell>
              ))}
            </AppTableRow>
          ))}
        </tbody>
      </AppTable>
    </>
  );
};

export default HomePage;
