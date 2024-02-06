import {
  Button,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import SourceOutlinedIcon from "@mui/icons-material/SourceOutlined";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import { SoilDataContext } from "../../../..";
import { useContext, useEffect } from "react";
import LimitTypography from "../../../../../../../components/LimitTypograpgy";
import { formatDate } from "../../../../../../../methods";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Api } from "../../../../../../../constants";
export default function TableComponent({ title, noData }: PropsType) {
  const { soilData } = useContext(SoilDataContext);
  const { id } = useParams();
  function convertBytetoMB(byte: number): string {
    const mb = `${(byte / 1024 ** 2).toFixed(2)}MB`;
    return mb;
  }

  if (typeof soilData === "object") {
    return (
      <Stack component={Paper} bgcolor={"Background"} p={2}>
        <Typography variant="h6" sx={{ fontWeight: "800" }} gutterBottom>
          {title}
        </Typography>
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>اسم الملف</TableCell>
                  <TableCell>النوع</TableCell>
                  <TableCell>الحجم</TableCell>
                  <TableCell>المنشيء</TableCell>
                  <TableCell>تاريخ الانشاء</TableCell>
                  <TableCell>تحميل</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      component={`a`}
                      href={``}
                      target="_blank"
                      download
                      color="primary"
                      size="small"
                    >
                      <SourceOutlinedIcon sx={{ fontSize: "20px", mr: 1 }} />
                    </IconButton>
                    <LimitTypography>-</LimitTypography>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>- </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>
                    <IconButton
                      component={`a`}
                      href={``}
                      target="_blank"
                      download
                      color="primary"
                      size="small"
                    >
                      <CloudDownloadOutlinedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Stack>
    );
  } else return <></>;
}

type PropsType = {
  title: string;
  noData?: boolean;
};
