import { useEffect, useState } from "react";
const STATUS_TYPE_AVAILABLE = "available";

const useDownload = (selections?: Array<boolean>, data?: Array<TableData>) => {
  const [enableDownload, setEnableDownload] = useState<boolean>(false);

  useEffect(() => {
    if (!selections || !data) return;
    if (selections.filter((s) => !!s).length === 0) {
      setEnableDownload(false);
      return;
    }
    setEnableDownload(
      selections.reduce((flag, selection, index) => {
        console.log(selection);
        if (!flag) return false;
        if (selection) {
          return data[index].status === STATUS_TYPE_AVAILABLE;
        }
        return flag;
      }, true),
    );
  }, [selections, data]);

  const downloadSelected = () => {
    alert(
      JSON.stringify(
        data?.filter((_, index) => {
          return !!selections?.[index];
        }),
        null,
        2,
      ),
    );
  };

  return { enableDownload, downloadSelected };
};

export default useDownload;
