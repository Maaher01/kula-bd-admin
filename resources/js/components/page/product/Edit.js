import { useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Layout from "../../layout/Layout";
import BackupIcon from "@mui/icons-material/Backup";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// react Quill
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Edit = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [remarks, setRemarks] = useState("");
  const [categoryId, setCategoryId] = useState();
  const [categoryList, setCategoryList] = useState([]);
  const [images, setImages] = useState([]);

  const handleChangeCategory = (event) => {
    setCategoryId(event.target.value);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
      [{ color: [] }, { background: [] }],
    ],
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("description", description);
    formData.append("quantity", quantity);
    formData.append("remarks", remarks);
    formData.append("category_id", categoryId);

    images.forEach((img, index) => {
      formData.append(`images[${index}][image]`, img.file);
      formData.append(`images[${index}][is_primary]`, img.is_primary ? 1 : 0);
      formData.append(`images[${index}][sort_order]`, index);
    });

    axios
      .post(`/api/product/update/${params.id}`, formData)
      .then(function (response) {
        if (response.data.errors) {
          toast(response.data.message);
        } else {
          toast("Data Updated Successful");
        }
        // navigate("/app/dashboard");
      })
      .catch(function (error) {
        console.log(error.message);
        toast("An Error Occured");
      });
  };

  const fetchCategories = async () => {
    axios
      .get("/api/category")
      .then((response) => {
        setCategoryList(response.data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCategories();
    fetchData();
  }, []);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);

    const newFiles = files.map((file, index) => ({
      file,
      preview: URL.createObjectURL(file),
      is_primary: images.length === 0 && index === 0,
    }));

    setImages((prev) => [...prev, ...newFiles]);
  };

  const deleteImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    // Clone the current array
    const reordered = Array.from(images);
    // Remove dragged item
    const [moved] = reordered.splice(result.source.index, 1);
    // Insert it in new place
    reordered.splice(result.destination.index, 0, moved);
    // Auto-assign primary to first image
    const finalImages = reordered.map((img, index) => ({
      ...img,
      is_primary: index === 0, // first image becomes primary
    }));

    setImages(finalImages);
  };

  const fetchData = async () => {
    await axios
      .get(`/api/product/edit/${params.id}`)
      .then(({ data }) => {
        const alldata = data.data;

        setName(alldata.name);
        setPrice(alldata.price);
        setDescription(alldata.description);
        setQuantity(alldata.quantity);
        setRemarks(alldata.remarks);
        setCategoryId(Number(alldata.category_id));
        setImages(
          alldata.product_images.map((img) => ({
            id: img.id,
            file: null,
            preview: `/uploads/${img.image_path}`,
            is_primary: img.is_primary === 1,
          }))
        );

        toast("Data Found");
      })
      .catch(({ response: { data } }) => {
        toast("No Data Found");
      });
  };

  return (
    <>
      <Layout>
        <Box
          component={"form"}
          onSubmit={handleSubmit}
          sx={{ padding: "20px 60px" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                fullWidth
                name="name"
                value={name}
                label="Item Name"
                variant="outlined"
                onChange={(e) => setName(e.target.value)}
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                fullWidth
                name="price"
                value={price}
                label="Price"
                variant="outlined"
                onChange={(e) => setPrice(e.target.value)}
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>

            <Grid item xs={12}>
              <ReactQuill
                name="description"
                label="Description"
                multiline
                value={description}
                onChange={(value) => setDescription(value)}
                style={{ backgroundColor: "white", height: "200px" }}
                modules={modules}
              />
            </Grid>
            <Grid item xs={6}>
              <ReactQuill
                name="quantity"
                label="Quantity"
                multiline
                value={quantity}
                onChange={(value) => setQuantity(value)}
                style={{ backgroundColor: "white", height: "200px" }}
                modules={modules}
              />
            </Grid>
            <Grid item xs={6}>
              <ReactQuill
                name="remarks"
                label="Remarks"
                multiline
                value={remarks}
                onChange={(value) => setRemarks(value)}
                style={{ backgroundColor: "white", height: "200px" }}
                modules={modules}
              />
            </Grid>

            <Grid item xs={6}>
              {categoryList.length > 0 && categoryId !== undefined && (
                <FormControl variant="outlined" sx={{ minWidth: 565 }}>
                  <InputLabel>Item Category</InputLabel>
                  <Select
                    value={categoryId}
                    onChange={handleChangeCategory}
                    label="Category"
                    sx={{ backgroundColor: "white" }}
                  >
                    {categoryList.map((category) => (
                      <MenuItem key={category.id} value={Number(category.id)}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              startIcon={<BackupIcon />}
              component="label"
            >
              {" "}
              Upload Item Images
              <input type="file" hidden multiple onChange={handleFileUpload} />
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="images" direction="horizontal">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}
                  >
                    {images.map((img, index) => (
                      <Draggable
                        key={index}
                        draggableId={index.toString()}
                        index={index}
                      >
                        {(providedDraggable) => (
                          <div
                            ref={providedDraggable.innerRef}
                            {...providedDraggable.draggableProps}
                            {...providedDraggable.dragHandleProps}
                            style={{
                              ...providedDraggable.draggableProps.style,
                              position: "relative",
                              border: img.is_primary
                                ? "3px solid green"
                                : "1px solid #ccc",
                              padding: "5px",
                              borderRadius: "8px",
                              cursor: "grab",
                            }}
                          >
                            <img
                              src={img.preview}
                              height="120"
                              style={{ borderRadius: "8px" }}
                            />

                            {/* Delete Button */}
                            <Button
                              size="small"
                              variant="contained"
                              color="error"
                              onClick={() => deleteImage(index)}
                              style={{
                                position: "absolute",
                                top: "5px",
                                right: "5px",
                                fontSize: "10px",
                              }}
                            >
                              Delete
                            </Button>

                            {index === 0 && (
                              <div
                                style={{
                                  position: "absolute",
                                  bottom: "5px",
                                  left: "5px",
                                  background: "green",
                                  color: "white",
                                  padding: "3px 6px",
                                  borderRadius: "5px",
                                  fontSize: "10px",
                                }}
                              >
                                Primary
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Grid>
          <Grid item xs={6}>
            <Button variant={"contained"} type={"submit"} sx={{ mt: 3, mb: 2 }}>
              Submit
            </Button>
          </Grid>
        </Box>
      </Layout>
    </>
  );
};

export default Edit;
