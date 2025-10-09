import { useState, useEffect, React } from "react";

import {
  Box,
  Button,
  Container,
  TextField,
  CssBaseline,
  Typography,
} from "@mui/material";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Layout from "../../layout/Layout";
import { toast } from "react-toastify";

function Add() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    axios
      .post("/api/faq/add", formData)
      .then(function (response) {
        if (response.data.errors) {
          toast(response.data.message);
        } else {
          toast("Data Inserted Successful");
        }
        navigate("/app/faq");
      })
      .catch(() => toast("hello"));
  };

  const handleChangestatus = (event) => {
    setStatus(event.target.value);
  };

  return (
    <>
      <Layout>
        <Box
          component={"form"}
          onSubmit={handleSubmit}
          sx={{ padding: "60px 40px", justifyContent: "center" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={11}>
              <TextField
                id="standard-basic"
                fullWidth
                name="question"
                label="Qestion"
                variant="outlined"
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>

            <Grid item xs={11}>
              <TextField
                id="standard-basic"
                fullWidth
                name="answer"
                label="Answer"
                variant="outlined"
                InputProps={{ style: { backgroundColor: "white" } }}
                multiline
                maxRows={10}
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl variant="outlined" sx={{ minWidth: 620 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  value={status}
                  onChange={handleChangestatus}
                  label="Status"
                  name="status"
                  sx={{ backgroundColor: "white" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="1">Active</MenuItem>
                  <MenuItem value="2">In Active</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={11}>
              <Button
                variant={"contained"}
                type={"submit"}
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Layout>
    </>
  );
}

export default Add;
