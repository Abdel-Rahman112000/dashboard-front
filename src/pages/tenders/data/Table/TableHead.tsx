import {
  TableCell,
  TableHead as MuiTableHead,
  TableRow,
  Checkbox,
} from "@mui/material";
import { useContext } from "react";
import { TableContext } from "../TableContext";

function TableHead() {
  const { tenderTableData, setTenderId, tenderId } = useContext(TableContext);
  const selectAllHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    let values: number[] | undefined =
      typeof tenderTableData === "object"
        ? tenderTableData?.map((tender) => {
            return tender.id;
          })
        : [];
    if (checked) setTenderId && setTenderId(values || []);
    else setTenderId && setTenderId([]);
  };
  return (
    <MuiTableHead>
      <TableRow>
        <TableCell>
          <Checkbox
            checked={tenderId?.length === tenderTableData?.length}
            onChange={selectAllHandler}
          />
        </TableCell>
        <TableCell>الرقم المرجعي</TableCell>
        <TableCell>رقم المنافسة</TableCell>
        <TableCell>الجهة الحكومية</TableCell>
        <TableCell>اسم المنافسة</TableCell>
        <TableCell>أخر موعد للتقديم</TableCell>
        <TableCell>تاريخ الإنتهاء من التقديم</TableCell>
        <TableCell>قيمة المنافسة</TableCell>
        <TableCell>مدة العقد</TableCell>
        <TableCell>القسم التابع له</TableCell>
        <TableCell>قبول القسم</TableCell>
        <TableCell>حالة المنافسة لدي الجهة</TableCell>
        <TableCell>حالة العرض الفني</TableCell>
        <TableCell>حالة العرض المالي</TableCell>
        <TableCell>حالة عرض التقديم</TableCell>
        <TableCell></TableCell>
      </TableRow>
    </MuiTableHead>
  );
}

export default TableHead;
