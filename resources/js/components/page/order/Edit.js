import { useState, useEffect, React } from "react";
import {
	Box,
	Typography,
	Card,
	CardContent,
	Grid,
	Button,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../../layout/Layout";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Edit = () => {
	const navigate = useNavigate();

	const [customerName, setCustomerName] = useState("");
	const [customerPhone, setCustomerPhone] = useState("");
	const [address, setAddress] = useState("");
	const [grandTotal, setGrandTotal] = useState("");
	const [checkoutDate, setCheckoutDate] = useState("");
	const [note, setNote] = useState("");
	const [orderStatus, setOrderStatus] = useState("");
	const [paymentStatus, setPaymentStatus] = useState("");
	const [paymentType, setPaymentType] = useState("");
	const [orderProducts, setOrderProducts] = useState([]);

	const params = useParams();

	const handleChangeOrderStatus = (event) => {
		setOrderStatus(event.target.value);
	};

	const handleChangePaymentStatus = (event) => {
		setPaymentStatus(event.target.value);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);

		formData.append("order_status", orderStatus);
		formData.append("payment_status", paymentStatus);

		axios
			.post(`/api/order/update/${params.id}`, formData)
			.then(function (response) {
				if (response.data.errors) {
					toast(response.data.message);
				} else {
					toast("Data Updated Successful");
				}
			})
			.catch(function (error) {
				console.log(error.message);
				toast("An Error Occured");
			});
	};

	const fetchData = async () => {
		await axios
			.get(`/api/order/edit/${params.id}`)
			.then(({ data }) => {
				const alldata = data.data;

				console.log(alldata);

				setCustomerName(alldata.customer_name);
				setCustomerPhone(alldata.customer_phone);
				setAddress(alldata.shipping_address);
				setGrandTotal(alldata.grand_total);
				setCheckoutDate(alldata.checkout_date);
				setNote(alldata.note);
				setOrderStatus(alldata.order_status);
				setPaymentStatus(alldata.payment_status);
				setPaymentType(alldata.payment_type);
				setOrderProducts(alldata.order_items);

				toast("Data Found");
			})
			.catch(({ response: { data } }) => {
				toast("No Data Found");
			});
	};

	return (
		<Layout>
			<Box
				component={"form"}
				onSubmit={handleSubmit}
				sx={{
					padding: "20px 60px",
					backgroundColor: "#f5f5f5",
					minHeight: "100vh",
				}}
			>
				<Typography
					variant="h4"
					sx={{ marginBottom: 4, textAlign: "center", color: "#3f51b5" }}
				>
					Order Details
				</Typography>
				<Grid container spacing={3}>
					<Grid item xs={12} md={6}>
						<Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
							<CardContent>
								<Typography variant="subtitle1" color="textSecondary">
									Customer Name
								</Typography>
								<Typography variant="h6">{customerName}</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} md={6}>
						<Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
							<CardContent>
								<Typography variant="subtitle1" color="textSecondary">
									Customer Phone
								</Typography>
								<Typography variant="h6">{customerPhone}</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12}>
						<Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
							<CardContent>
								<Typography variant="subtitle1" color="textSecondary">
									Delivery Address
								</Typography>
								<Typography variant="h6">{address}</Typography>
							</CardContent>
						</Card>
					</Grid>

					<Grid item xs={12}>
						<Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
							<CardContent>
								<Typography variant="h5" sx={{ marginBottom: 2 }}>
									Ordered Products
								</Typography>

								{orderProducts.length === 0 ? (
									<Typography>No products found</Typography>
								) : (
									orderProducts.map((item, index) => (
										<Box
											key={index}
											sx={{
												display: "flex",
												alignItems: "center",
												padding: "12px 0",
												borderBottom: "1px solid #ccc",
											}}
										>
											<img
												src={`http://127.0.0.1:8001/uploads/${item.product?.product_images?.[0]?.image_path}`}
												alt="product"
												style={{
													width: 70,
													height: 70,
													borderRadius: 8,
													marginRight: 16,
													objectFit: "cover",
												}}
											/>

											<Box>
												<Typography variant="h6">
													{item.product?.name}
												</Typography>
												<Typography variant="body2" color="textSecondary">
													Quantity: {item.quantity}
												</Typography>
												<Typography variant="body1" sx={{ fontWeight: "bold" }}>
													Unit Price: Tk. {item.unit_price}
												</Typography>
											</Box>
										</Box>
									))
								)}
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} md={6}>
						<Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
							<CardContent>
								<Typography variant="subtitle1" color="textSecondary">
									Grand Total
								</Typography>
								<Typography variant="h6">Tk. {grandTotal}</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} md={6}>
						<Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
							<CardContent>
								<Typography variant="subtitle1" color="textSecondary">
									Payment Method
								</Typography>
								<Typography variant="h6">{paymentType}</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12}>
						<Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
							<CardContent>
								<Typography variant="subtitle1" color="textSecondary">
									Note
								</Typography>
								<Typography variant="h6">{note}</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={6}>
						<FormControl variant="outlined" sx={{ minWidth: 725 }}>
							<InputLabel>Order Status</InputLabel>
							<Select
								labelId="demo-simple-select-standard-label"
								value={orderStatus}
								onChange={handleChangeOrderStatus}
								label="Order Status"
								sx={{ backgroundColor: "white" }}
							>
								<MenuItem value="pending">Pending</MenuItem>
								<MenuItem value="processing">Processing</MenuItem>
								<MenuItem value="delivered">Delivered</MenuItem>
								<MenuItem value="cancelled">Cancelled</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={6}>
						<FormControl variant="outlined" sx={{ minWidth: 725 }}>
							<InputLabel>Payment Status</InputLabel>
							<Select
								labelId="demo-simple-select-standard-label"
								value={paymentStatus}
								onChange={handleChangePaymentStatus}
								label="Payment Status"
								sx={{ backgroundColor: "white" }}
							>
								<MenuItem value="unpaid">Unpaid</MenuItem>
								<MenuItem value="paid">Paid</MenuItem>
								<MenuItem value="returned">Returned</MenuItem>
							</Select>
						</FormControl>
					</Grid>

					<Grid item xs={12}>
						<Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
							<CardContent>
								<Typography variant="subtitle1" color="textSecondary">
									Checkout Date
								</Typography>
								<Typography variant="h6">{checkoutDate}</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={6}>
						<Button variant={"contained"} type={"submit"} sx={{ mt: 3, mb: 2 }}>
							Submit
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Layout>
	);
};

export default Edit;
