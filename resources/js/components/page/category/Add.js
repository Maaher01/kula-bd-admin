import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Layout from "../../layout/Layout";
import { toast } from "react-toastify";
import { useState } from "react";
import BackupIcon from "@mui/icons-material/Backup";

const Add = () => {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    images.forEach((img, index) => {
      formData.append(`images[${index}][image]`, img.file);
    });

    axios
      .post("/api/category/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
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

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);

    if (images.length + files.length > 2) {
      toast("You can upload a maximum of 2 images.");
      return;
    }

    const newFiles = files.map((file, index) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newFiles]);
  };

  const deleteImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <Layout>
        <Box component={"form"} onSubmit={handleSubmit}>
          <Grid
            container
            sx={{ padding: "60px 40px", justifyContent: "center" }}
          >
            <Grid item xs={12}>
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
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                startIcon={<BackupIcon />}
                component="label"
                disabled={images.length >= 2}
              >
                {" "}
                Upload Category Images
                <input
                  type="file"
                  hidden
                  multiple
                  onChange={handleFileUpload}
                />
              </Button>
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                {images.map((img, index) => (
                  <div key={index}>
                    <div
                      style={{
                        position: "relative",
                        padding: "5px",
                        borderRadius: "8px",
                      }}
                    >
                      <img
                        src={img.preview}
                        height="120"
                        style={{ borderRadius: "8px" }}
                      />

                      {/* Delete Button */}
                      <Button
                        type="button"
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={() => deleteImage(index)}
                        style={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                          fontSize: "10px",
                          zIndex: 5,
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Grid>
            <Grid item xs={12}>
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
