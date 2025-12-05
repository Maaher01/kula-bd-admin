import { useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Layout from "../../layout/Layout";
import { useParams } from "react-router-dom";
import BackupIcon from "@mui/icons-material/Backup";

const Edit = () => {
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [images, setImages] = useState([]);

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
				setImages(
					alldata.category_images.map((img) => ({
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

	const handleSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);

		images.forEach((img, index) => {
			if (img.file) {
				formData.append(`images[${index}][image]`, img.file);
			}
		});

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

	const handleFileUpload = (event) => {
		const files = Array.from(event.target.files);

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
						<Grid item xs={12} sx={{ mt: 2 }}>
							<Button
								variant="outlined"
								startIcon={<BackupIcon />}
								component="label"
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
										</div>
									</div>
								))}
							</div>
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
