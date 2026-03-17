import { useState, useEffect, React } from "react";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Layout from "../layout/Layout";
import BackupIcon from "@mui/icons-material/Backup";
import { toast } from "react-toastify";

const Companysetup = () => {
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState(null);
  const [img, setImg] = useState(null);
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [mobile, setMobile] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [vatPercentage, setVatPercentage] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(`/api/companysetup`);
      const alldata = data.data[0];

      setId(alldata.id);
      setName(alldata._name);
      setEmail(alldata._email);
      setPhone(alldata._phone);
      setMobile(alldata._mobile);
      setLatitude(alldata.latitude ?? "");
      setLongitude(alldata.longitude ?? "");
      setWebsite(alldata._website);
      setImageUrl(alldata._image);
      setDescription(alldata._description);
      setVatPercentage(alldata.vat_percentage);

      toast("Data Found");
    } catch (error) {
      toast("No Data Found");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    if (img) formData.append("image", img);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);

    try {
      if (!id) {
        const response = await axios.post("/api/companysetup", formData);
        if (response.data.errors) toast(response.data.message);
        else toast("Data Created Successfully");
      } else {
        const response = await axios.post(`/api/companysetup/${id}`, formData);
        toast("Update Successful");
      }
    } catch (error) {
      console.error(error);
      toast("Something went wrong!");
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setImg(file);

    const reader = new FileReader();
    reader.onloadend = () => setImageUrl(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <Layout>
      <Box
        component={"form"}
        onSubmit={handleSubmit}
        sx={{ padding: "20px 60px" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="name"
              label="Company Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{ style: { backgroundColor: "white" } }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              name="phone"
              label="Phone"
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{ style: { backgroundColor: "white" } }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              name="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{ style: { backgroundColor: "white" } }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              name="mobile"
              label="Mobile"
              variant="outlined"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{ style: { backgroundColor: "white" } }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              name="website"
              label="Website"
              variant="outlined"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{ style: { backgroundColor: "white" } }}
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              fullWidth
              name="latitude"
              label="Latitude"
              variant="outlined"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{ style: { backgroundColor: "white" } }}
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              fullWidth
              name="longitude"
              label="Longitude"
              variant="outlined"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{ style: { backgroundColor: "white" } }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              name="description"
              label="Address"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{ style: { backgroundColor: "white" } }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              name="vatpercentage"
              label="VAT Percentage"
              variant="outlined"
              value={vatPercentage}
              onChange={(e) => setVatPercentage(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{ style: { backgroundColor: "white" } }}
            />
          </Grid>

          <Grid item xs={6} sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              startIcon={<BackupIcon />}
              component="label"
              sx={{ mb: 3 }}
            >
              Upload Logo
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileUpload}
              />
            </Button>
          </Grid>

          <Grid item xs={12}>
            {imageUrl && (
              <img src={imageUrl} alt="Uploaded Image" height="150" />
            )}
          </Grid>

          <Grid item xs={6}>
            <Button variant="contained" type="submit" sx={{ mt: 3, mb: 2 }}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Companysetup;
