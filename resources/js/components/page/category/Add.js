import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Layout from "../../layout/Layout";
import { toast } from "react-toastify";

const Add = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    axios
      .post("/api/category/add", formData)
      .then(function (response) {
        if (response.data.errors) {
          toast(response.data.message);
        } else {
          toast("Data Inserted Successfully");
        }
        // navigate("/app/category");
      })
      .catch(() => {
        toast("There was an error adding the category");
      });
  };

  return (
    <>
      <Layout>
        <Box component={"form"} onSubmit={handleSubmit}>
          <Grid
            container
            sx={{ padding: "60px 40px", justifyContent: "center" }}
          >
            <Grid item xs={11}>
              <TextField
                id="standard-basic"
                fullWidth
                name="name"
                label="Category Name"
                variant="outlined"
                InputProps={{
                  style: { backgroundColor: "white" },
                }}
                sx={{ maxWidth: 500 }}
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

export default Add;
