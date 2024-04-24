import { useState } from "react";
import "./MultiSelectTable.css";

import { CheckBox } from "../../MUI/mui.index";

interface IMultiSelectTable {
  colDef: Record<string, any>[];
  tableData: Record<string, any>[];
  isMultiSelect?: boolean;
  multiSelectKey?: string | any;
  selectedRow?: (value: any) => void;
  disableKey?: string;
}
export const MultiSelectTable = (props: IMultiSelectTable) => {
  const {
    colDef,
    tableData,
    isMultiSelect = false,
    selectedRow,
    multiSelectKey = "isSelected",
  } = props;
  const [allSelect, setAllSelect] = useState<boolean>(false);
  const [rowData, setRowData] = useState(tableData);

  const setSelectedRows = (
    type: string,
    _data?: Record<string, any> | any,
    index?: number
  ) => {
    if (type && type === "select_all") {
      let temp = tableData.map((m) => {
        m[multiSelectKey] = !allSelect ? true : false;
        return m;
      });
      setAllSelect(!allSelect);
      setRowData(temp);
      selectedRow && selectedRow(temp);
    } else {
      if (index != undefined) {
        tableData[index][multiSelectKey] = !tableData[index][multiSelectKey];
        setRowData(tableData);

        selectedRow && selectedRow([...tableData]);
        if (tableData.every((ev) => ev[multiSelectKey] === false))
          setAllSelect(false);
      }
    }
  };

  return (
    <>
      <table className="multi-table" style={{ border: 20 }}>
        <thead className="multi-table__thead">
          <tr className="multi-table__thead__tr">
            {isMultiSelect && (
              <th className="multi-table__thead__tr__td">
                <CheckBox
                  onClick={() => setSelectedRows("select_all")}
                  checked={
                    tableData?.every((ev) => ev[multiSelectKey] === true) &&
                    allSelect
                  }
                  disableRipple
                />
              </th>
            )}
            {colDef?.map((th: any) => (
              <th className="multi-table__thead__tr__td" style={th?.style}>
                {th?.headerName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="multi-table__tbody">
          {rowData?.map((tr: any, index) => (
            <tr
              className="multi-table__tbody__tr"
              style={{
                backgroundColor: Boolean(tr[multiSelectKey])
                  ? `rgba(88,25,143, 0.2)`
                  : "",
              }}
            >
              {isMultiSelect && (
                <td className="multi-table__thead__tr__td">
                  <CheckBox
                    checked={Boolean(tr[multiSelectKey])}
                    onClick={() => setSelectedRows("single", tr, index)}
                    disableRipple
                  />
                </td>
              )}
              {colDef.map((td: any) => (
                <td className="multi-table__tbody__tr__td" style={td?.style}>
                  {tr[td?.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
