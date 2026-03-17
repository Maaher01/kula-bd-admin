import { useState, useEffect, React } from "react";
import { Box, Button, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Layout from "../../layout/Layout";
import { toast } from "react-toastify";

const Edit = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [status, setStatus] = useState(1);
  const [userName, setUserName] = useState("");
  const [productName, setProductName] = useState("");
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const handleChangestatus = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`/api/review/update/${params.id}`, { _status: status })
      .then((response) => {
        if (response.data.errors) {
          toast(response.data.message);
        } else {
          toast("Status Updated Successfully");
          // navigate("/app/review/list"); // optional redirect
        }
      })
      .catch((error) => {
        console.log(error.message);
        toast("An Error Occurred");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`/api/review/edit/${params.id}`);
      const review = data.data;

      console.log(review);

      setUserName(review.user?.name || "Unknown");
      setProductName(review.product?.name || "Unknown");
      setRating(review.rating);
      setComment(review.comment);
      setStatus(review._status);
    } catch (error) {
      toast("No Data Found");
    }
  };

  return (
    <Layout>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ padding: "20px 60px" }}
      >
        <Grid container spacing={2}>
          {/* User Name - Read Only */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="User Name"
              variant="outlined"
              value={userName}
              InputProps={{
                readOnly: true,
                style: { backgroundColor: "#f5f5f5" },
              }}
            />
          </Grid>

          {/* Product Name - Read Only */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Product Name"
              variant="outlined"
              value={productName}
              InputProps={{
                readOnly: true,
                style: { backgroundColor: "#f5f5f5" },
              }}
            />
          </Grid>

          {/* Rating - Read Only */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Rating"
              variant="outlined"
              value={rating}
              InputProps={{
                readOnly: true,
                style: { backgroundColor: "#f5f5f5" },
              }}
            />
          </Grid>

          {/* Comment - Read Only */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Comment"
              variant="outlined"
              value={comment}
              multiline
              maxRows={4}
              InputProps={{
                readOnly: true,
                style: { backgroundColor: "#f5f5f5" },
              }}
            />
          </Grid>

          {/* Status - Editable */}
          <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                onChange={handleChangestatus}
                label="Status"
                sx={{ backgroundColor: "white" }}
              >
                <MenuItem value={1}>Active</MenuItem>
                <MenuItem value={0}>Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button variant="contained" type="submit" sx={{ mt: 3 }}>
              Update Status
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Edit;
