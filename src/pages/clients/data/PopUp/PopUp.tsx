import {
  Alert,
  Box,
  Button,
  Dialog,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { FormData, individualInitial, reducer } from "../../addClient/reducer";
import { Api } from "../../../../constants";
import { useNavigate } from "react-router-dom";
import { Branch, Broker } from "../../../../types";
import { Snackbar } from "@mui/material";
type PropsType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
function PopUp({ open, setOpen }: PropsType) {
  const [searchClient, dispatch] = useReducer(reducer, individualInitial);
  const navigate = useNavigate();
  const [branches, setBranches] = useState<Branch[] | undefined>(undefined);
  const [brokers, setBrokers] = useState<Broker[] | undefined>(undefined);
  const paddingSize = 0.1;
  const [toaster, setToaster] = useState<ToasterType>({
    open: false,
    message: "",
    severity: "success",
  });
  function updateToaster(partial: Partial<ToasterType>) {
    setToaster({ ...toaster, ...partial });
  }
  function updateAndOpenToaster(partial: Partial<ToasterType>) {
    updateToaster({ ...partial, open: true });
  }
  function handleCloseToaster() {
    updateToaster({ open: false });
  }
  useEffect(() => {
    axios
      .get<{ branches: Branch[]; brokers: Broker[] }>(
        Api("employee/client/use")
      )
      .then(({ data }) => {
        setBranches(data.branches);
        setBrokers(data.brokers);
      })
      .catch((err) => {
        setBranches(undefined);
        setBrokers(undefined);
        console.log("err", err);
      });
  }, []);
  const handleClose = () => {
    setOpen(false);
  };
  const getClient = () => {
    console.log(searchClient);

    axios
      .get<{ data: FormData }>(Api(`employee/client/edit`), {
        params: {
          name: searchClient.name,
          phone: searchClient.phone,
          branch_id: searchClient.branch_id,
          broker_id: searchClient.broker_id,
        },
      })
      .then(({ data }) => {
        if (data.data) {
          navigate(`${data.data.name}/edit`);
        }
        updateAndOpenToaster({
          severity: "error",
          message: "لا يوجد عميل بهذه البيانات",
        });
      })
      .catch((err) => {
        console.log("no");

        console.log("errdswd", err);
        updateAndOpenToaster({
          severity: "error",
          message: "تعذر في حفظ العقد ",
        });
      });
  };
  function changeTypeHandler(type: "individual" | "company") {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) dispatch({ type: "TYPE", payload: type });
    };
  }
  function submitHandle(
    e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>
  ) {
    e.preventDefault();
    getClient();
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <IconButton
        aria-label="delete"
        size="small"
        sx={{
          position: "absolute",
          right: 20,
          mt: 3,
          border: "solid 1px ",
          borderRadius: "8px",
        }}
        color="primary"
        onClick={() => setOpen(!open)}
      >
        <CloseIcon fontSize="inherit" />
      </IconButton>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1 },
          p: 5,
        }}
        noValidate
        autoComplete="off"
        onSubmit={submitHandle}
      >
        <Typography>نو ع العميل</Typography>
        <RadioGroup name="use-radio-group" defaultValue="فرد">
          <Box sx={{ mb: 2 }}>
            <FormControlLabel
              control={
                <Radio
                  checked={searchClient.type === "individual"}
                  onChange={changeTypeHandler("individual")}
                />
              }
              label="فرد    "
            />

            <FormControlLabel
              control={
                <Radio
                  checked={searchClient.type === "company"}
                  onChange={changeTypeHandler("company")}
                />
              }
              label="شركة"
            />
          </Box>
        </RadioGroup>
        <Grid container>
          <Grid item p={paddingSize} md={6}>
            <Stack>
              <Typography component="label" sx={{ ml: 2 }}>
                {searchClient.type === "individual"
                  ? "اسم العميل *"
                  : "اسم الشركه *"}
              </Typography>
              <TextField
                id="outlined-name-input"
                type="text"
                required
                size="small"
                value={searchClient.name}
                onChange={(e) => {
                  dispatch({
                    type: "NAME",
                    payload: e.target.value,
                  });
                }}
              />
            </Stack>
          </Grid>
          <Grid item p={paddingSize} md={6}>
            <Stack>
              <Typography sx={{ ml: 2 }} component="label">
                رقم الجوال *
              </Typography>
              <TextField
                id="outlined-phone-input"
                type="text"
                required
                size="small"
                value={searchClient.phone}
                onChange={(e) => {
                  console.log(e.target.value);

                  dispatch({
                    type: "PHONE_NUMBER",
                    payload: e.target.value,
                  });
                }}
              />
            </Stack>
          </Grid>

          <Grid item p={paddingSize} md={6}>
            <Stack>
              <Typography sx={{ ml: 2 }} component="label">
                الوسيط
              </Typography>
              <TextField
                id="outlined-select-currency"
                select
                size="small"
                onChange={(e) => {
                  dispatch({
                    type: "BROKER_ID",
                    payload: parseInt(e.target.value),
                  });
                }}
              >
                {brokers?.map((broker) => (
                  <MenuItem key={broker.id} value={broker.id}>
                    {broker.name}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </Grid>
          <Grid item p={paddingSize} md={6}>
            <Stack>
              <Typography sx={{ ml: 2 }} component="label">
                الفرع *
              </Typography>
              <TextField
                id="outlined-select-currency"
                select
                size="small"
                onChange={(e) => {
                  dispatch({
                    type: "BRANCH_ID",
                    payload: parseInt(e.target.value),
                  });
                }}
              >
                {branches?.map((branch) => (
                  <MenuItem key={branch.id} value={branch.id}>
                    {branch.name}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </Grid>
          <Grid item p={paddingSize} md={9} sx={{ marginX: "auto", mt: 2 }}>
            <Button
              fullWidth
              onSubmit={submitHandle}
              type="submit"
              variant="contained"
            >
              بحث
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={toaster.open}
        autoHideDuration={6000}
        onClose={handleCloseToaster}
        // action={action}
      >
        <Alert
          onClose={handleCloseToaster}
          severity={toaster.severity}
          sx={{ width: "100%" }}
        >
          {toaster.message}
        </Alert>
      </Snackbar>
    </Dialog>
  );
}

export default PopUp;

export type ToasterType = {
  open: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
};
