import { useState, useEffect } from "react";
import { Box, Typography, Grid, Button, Paper, Divider } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../../layout/Layout";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { format } from "date-fns";

const Edit = () => {
	const navigate = useNavigate();

	const [customerName, setCustomerName] = useState("");
	const [customerPhone, setCustomerPhone] = useState("");
	const [address, setAddress] = useState("");
	const [grandTotal, setGrandTotal] = useState("");
	const [vat, setVat] = useState("");
	const [subTotal, setSubTotal] = useState("");
	const [checkoutDate, setCheckoutDate] = useState("");
	const [updateDate, setUpdateDate] = useState("");
	const [note, setNote] = useState("");
	const [orderStatus, setOrderStatus] = useState("");
	const [orderId, setOrderId] = useState("");
	const [paymentStatus, setPaymentStatus] = useState("");
	const [paymentType, setPaymentType] = useState("");
	const [orderProducts, setOrderProducts] = useState([]);

	const params = useParams();

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
				const vat = data.vat;

				console.log(alldata);

				setCustomerName(alldata.customer_name);
				setCustomerPhone(alldata.customer_phone);
				setAddress(alldata.shipping_address);
				setVat(vat);
				setGrandTotal(alldata.grand_total);
				setSubTotal(alldata.sub_total);
				setCheckoutDate(alldata.created_at);
				setUpdateDate(alldata.updated_at);
				setNote(alldata.note);
				setOrderId(alldata.id);
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

	const formatDateTime = (datetime) => {
		if (!datetime) return "";
		const date = new Date(datetime);

		return format(date, "MMM d, yyyy h:mm a");
	};

	return (
		<Layout>
			<Box
				component="form"
				onSubmit={handleSubmit}
				sx={{
					padding: "30px 40px",
					backgroundColor: "#f1f3f6",
					minHeight: "100vh",
				}}
			>
				<Typography variant="h4" fontWeight="bold" textAlign="center">
					Order Management
				</Typography>
				<Typography
					variant="h5"
					fontWeight="bold"
					textAlign="center"
					sx={{ mb: 4 }}
				>
					Order ID: {orderId}
				</Typography>

				<Grid container spacing={4}>
					{/* LEFT SIDE */}
					<Grid item xs={12} md={8}>
						{/* CUSTOMER DETAILS */}
						<Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
							<Typography variant="h6" sx={{ mb: 2 }}>
								Customer Information
							</Typography>

							<Grid container spacing={2}>
								<Grid item xs={12} md={6}>
									<Typography color="textSecondary">Customer Name</Typography>
									<Typography fontWeight="bold">{customerName}</Typography>
								</Grid>

								<Grid item xs={12} md={6}>
									<Typography color="textSecondary">Phone</Typography>
									<Typography fontWeight="bold">{customerPhone}</Typography>
								</Grid>

								<Grid item xs={12}>
									<Typography color="textSecondary">Address</Typography>
									<Typography fontWeight="bold">{address}</Typography>
								</Grid>
							</Grid>
						</Paper>

						{/* PRODUCT LIST */}
						<Paper elevation={3} sx={{ mt: 4, p: 3, borderRadius: 2 }}>
							<Typography variant="h6" sx={{ mb: 2 }}>
								Products
							</Typography>

							<Divider sx={{ mb: 2 }} />

							{orderProducts.map((item, index) => (
								<Box
									key={index}
									sx={{
										display: "flex",
										gap: 2,
										mb: 3,
										alignItems: "center",
									}}
								>
									<img
										src={`http://127.0.0.1:8001/uploads/${item.product?.product_images?.[0]?.image_path}`}
										alt=""
										style={{
											width: 70,
											height: 70,
											borderRadius: 8,
											objectFit: "cover",
										}}
									/>

									<Box>
										<Typography fontWeight="bold">
											{item.product?.name}
										</Typography>
										<Typography color="textSecondary">
											Qty: {item.quantity}
										</Typography>
										<Typography color="textSecondary">
											Unit Price: Tk. {item.unit_price}
										</Typography>

										<Typography fontWeight="bold">
											Total: Tk. {item.quantity * item.unit_price}
										</Typography>
									</Box>
								</Box>
							))}
						</Paper>

						{/* NOTE */}
						<Paper elevation={3} sx={{ mt: 4, p: 3, borderRadius: 2 }}>
							<Typography variant="h6" sx={{ mb: 1 }}>
								Note
							</Typography>
							<Typography>{note || "No notes provided"}</Typography>
						</Paper>
					</Grid>

					{/* RIGHT SIDE SUMMARY + CONTROLS */}
					<Grid item xs={12} md={4}>
						<Paper elevation={4} sx={{ p: 3, borderRadius: 2 }}>
							<Typography variant="h6" sx={{ mb: 2 }}>
								Order Summary
							</Typography>

							<Typography>Subtotal: Tk. {subTotal}</Typography>
							<Typography>VAT: Tk. {vat}</Typography>
							<Typography fontWeight="bold" sx={{ mt: 1 }}>
								Grand Total: Tk. {grandTotal}
							</Typography>

							<Divider sx={{ my: 3 }} />

							<FormControl fullWidth sx={{ mb: 3 }}>
								<InputLabel>Order Status</InputLabel>
								<Select
									value={orderStatus}
									onChange={(e) => setOrderStatus(e.target.value)}
									label="Order Status"
								>
									<MenuItem value="pending">Pending</MenuItem>
									<MenuItem value="processing">Processing</MenuItem>
									<MenuItem value="delivered">Delivered</MenuItem>
									<MenuItem value="cancelled">Cancelled</MenuItem>
								</Select>
							</FormControl>

							<FormControl fullWidth sx={{ mb: 3 }}>
								<InputLabel>Payment Status</InputLabel>
								<Select
									value={paymentStatus}
									onChange={(e) => setPaymentStatus(e.target.value)}
									label="Payment Status"
								>
									<MenuItem value="unpaid">Unpaid</MenuItem>
									<MenuItem value="paid">Paid</MenuItem>
									<MenuItem value="returned">Returned</MenuItem>
								</Select>
							</FormControl>

							<Button variant="contained" fullWidth type="submit">
								Update Order
							</Button>
						</Paper>

						<Paper elevation={3} sx={{ mt: 3, p: 3, borderRadius: 2 }}>
							<Typography variant="subtitle2" color="textSecondary">
								Checkout Date
							</Typography>
							<Typography fontWeight="bold">
								{formatDateTime(checkoutDate)}
							</Typography>
							<Typography variant="subtitle2" color="textSecondary">
								Last Updated
							</Typography>
							<Typography fontWeight="bold">
								{formatDateTime(updateDate)}
							</Typography>

							<Divider sx={{ my: 2 }} />

							<Typography variant="subtitle2" color="textSecondary">
								Payment Method
							</Typography>
							<Typography fontWeight="bold">{paymentType}</Typography>
						</Paper>
					</Grid>
				</Grid>
			</Box>
		</Layout>
	);
};

export default Edit;
