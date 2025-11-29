import { useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Layout from "../../layout/Layout";
import { useParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const params = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios
      .get(`/api/category/edit/${params.id}`)
      .then(({ data }) => {
        const alldata = data.data;

        setName(alldata.name);
        toast("Data Found");
      })
      .catch(({ response: { data } }) => {
        toast("No Data Found");
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    axios
      .post(`/api/category/update/${params.id}`, formData)
      .then(function (response) {
        if (response.data.errors) {
          toast(response.data.message);
        } else {
          toast("Data Updated Successful");
        }
      })
      .catch(() => {
        toast("There was an error editing the Category");
      });
  };

  return (
    <>
      <Layout>
        <Box component={"form"} onSubmit={handleSubmit}>
          <Grid container sx={{ padding: "0 40px" }}>
            <Grid item xs={11}>
              <TextField
                id="standard-basic"
                fullWidth
                name="name"
                label="Category Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputProps={{ style: { backgroundColor: "white" } }}
              />
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
};

export default Edit;
