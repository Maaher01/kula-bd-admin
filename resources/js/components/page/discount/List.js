import { useState } from "react";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import Layout from "../../layout/Layout";
import Datatablecomponent from "../../Datatable";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";

const List = () => {
  const [delrow, setDelrow] = useState(null);
  const [searchurl, setSearchurl] = useState("/api/discounts");
  const [open, setOpen] = useState(false);

  const handleOpen = (id) => {
    setDelrow(id);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const deleteDiscount = async () => {
    try {
      await axios.delete(`/api/discounts/${delrow}`);
      setOpen(false);
      setDelrow(null);
    } catch (error) {
      console.error("Delete Failed:", error);
    }
  };

  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to={`/app/discount/edit/${row.id}`}>
            <CreateIcon sx={{ color: "green", cursor: "pointer" }} />
          </Link>
          <DeleteIcon
            sx={{ color: "red", cursor: "pointer" }}
            onClick={() => handleOpen(row.id)}
          />
        </div>
      ),
      selector: (row) => row.id,
      center: true,
      width: "120px",
    },
    {
      name: "Code",
      selector: (row) => row.code ?? "-",
      center: true,
      width: "150px",
    },
    {
      name: "Type",
      selector: (row) => row.type,
      center: true,
      width: "150px",
    },
    {
      name: "Value",
      selector: (row) =>
        row.type === "percentage" ? row.value + "%" : "Tk." + row.value,
      center: true,
      width: "120px",
    },
    {
      name: "Scope",
      selector: (row) => row.scope,
      center: true,
      width: "150px",
    },
    {
      name: "Active",
      selector: (row) => (row.is_active ? "Yes" : "No"),
      center: true,
      width: "100px",
    },
    {
      name: "Start Date",
      selector: (row) => row.start_date ?? "-",
      center: true,
      width: "150px",
    },
    {
      name: "End Date",
      selector: (row) => row.end_date ?? "-",
      center: true,
      width: "150px",
    },
  ];

  const renderDatatable = () => {
    return (
      <Datatablecomponent columns={columns} url={searchurl} delrow={delrow} />
    );
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Typography variant="h6">Warning</Typography>
            <ClearIcon onClick={handleClose} sx={{ cursor: "pointer" }} />
          </Stack>
          <Typography sx={{ mt: 2 }}>
            Are you sure you want to delete this discount?
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{ mt: 4, justifyContent: "end" }}
          >
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={deleteDiscount}>
              Delete
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Layout>
        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid item xs={11}>
            <Link to="/app/discount/add">
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ marginBottom: "30px" }}
              >
                ADD DISCOUNT
              </Button>
            </Link>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            {renderDatatable()}
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default List;
