import { useState } from "react";
import { Button } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
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
import { hasPermission } from "../../utils/permissions";

const List = () => {
  const [delrow, setDelrow] = useState(0);
  const [searchurl, setSearchurl] = useState("/api/image");
  const [open, setOpen] = useState(false);

  const handleOpen = (id) => {
    setDelrow(id);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div>
          <Link to={`/app/image/edit/${row.id}`} className="btn">
            <i className="material-icons text-warning">
              <CreateIcon sx={{ color: "green" }} />
            </i>
          </Link>
          {hasPermission(158) && (
            <Link className="btn" onClick={() => handleOpen(row.id)}>
              <i className="material-icons text-warning">
                <DeleteIcon sx={{ color: "red" }} />
              </i>
            </Link>
          )}
        </div>
      ),
      selector: (row) => row.id,
      center: true,
    },
    {
      name: "Image",
      cell: (row) => <img src={row._image} width={50} alt={"nothing"} />,
      selector: (row) => row.link,
      center: true,
    },
  ];

  const deleteImage = async () => {
    try {
      await axios.delete(`/api/image/${delrow}`);
      setOpen(false);
      setDelrow(null);
    } catch (error) {
      console.error("Delete Failed:", error);
    }
  };

  const renderDatatable = () => {
    return (
      <Datatablecomponent
        columns={columns}
        url={searchurl}
        delrow={delrow}
      ></Datatablecomponent>
    );
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Warning
            </Typography>
            <ClearIcon onClick={handleClose} sx={{ cursor: "pointer" }} />
          </Stack>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this image?
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{ mt: 4, justifyContent: "end" }}
          >
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={deleteImage}>
              Delete
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Layout>
        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid item xs={11}>
            <Link to="/app/image/add" className="btn">
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ marginBottom: "30px" }}
              >
                ADD
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
