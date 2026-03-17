import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Layout from "../../layout/Layout";
import BackupIcon from "@mui/icons-material/Backup";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    code: "",
    scope: "cart",
    type: "percentage",
    value: "",
    min_purchase: "",
    max_discount: "",
    start_date: "",
    end_date: "",
    per_user_limit: "",
    first_order_only: false,
    is_stackable: false,
    is_active: true,
    buy_product_id: "",
    buy_category_id: "",
    buy_quantity: "",
    get_product_id: "",
    get_category_id: "",
    get_quantity: "",
    products: [],
    categories: [],
  });

  const [productsOptions, setProductsOptions] = useState([]);
  const [categoriesOptions, setCategoriesOptions] = useState([]);

  // Fetch products and categories for multi-select
  useEffect(() => {
    axios
      .get("/api/product")
      .then((res) => setProductsOptions(res.data.data.data));
    axios
      .get("/api/category")
      .then((res) => setCategoriesOptions(res.data.data.data));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/discounts", formData)
      .then((res) => {
        toast.success("Discount Created Successfully");
        navigate("/app/discounts");
      })
      .catch((err) => {
        console.error(err);
        if (err.response?.data?.errors) {
          toast.error(Object.values(err.response.data.errors).join(", "));
        } else {
          toast.error("An error occurred");
        }
      });
  };

  return (
    <Layout>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ padding: "60px 40px" }}
      >
        <Grid container spacing={2}>
          {/* Code */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="code"
              label="Discount Code"
              value={formData.code}
              onChange={handleChange}
              InputProps={{ style: { backgroundColor: "white" } }}
            />
          </Grid>

          {/* Scope */}
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Scope</InputLabel>
              <Select
                name="scope"
                value={formData.scope}
                sx={{ backgroundColor: "white" }}
                onChange={handleChange}
              >
                <MenuItem value="cart">Cart</MenuItem>
                <MenuItem value="product">Product</MenuItem>
                <MenuItem value="category">Category</MenuItem>
                {/* <MenuItem value="buy_x_get_y">Buy X Get Y</MenuItem> */}
              </Select>
            </FormControl>
          </Grid>

          {/* Type */}
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                sx={{ backgroundColor: "white" }}
                value={formData.type}
                onChange={handleChange}
              >
                <MenuItem value="percentage">Percentage</MenuItem>
                <MenuItem value="fixed">Fixed</MenuItem>
                {/* <MenuItem value="free_item">Free Item</MenuItem> */}
              </Select>
            </FormControl>
          </Grid>

          {/* Value */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="value"
              label="Value"
              InputProps={{ style: { backgroundColor: "white" } }}
              value={formData.value}
              onChange={handleChange}
            />
          </Grid>

          {/* Min Purchase */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="min_purchase"
              label="Minimum Purchase"
              value={formData.min_purchase}
              InputProps={{ style: { backgroundColor: "white" } }}
              onChange={handleChange}
            />
          </Grid>

          {/* Max Discount */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="max_discount"
              label="Maximum Discount"
              value={formData.max_discount}
              InputProps={{ style: { backgroundColor: "white" } }}
              onChange={handleChange}
            />
          </Grid>

          {/* Start Date */}
          <Grid item xs={6}>
            <TextField
              type="date"
              fullWidth
              name="start_date"
              label="Start Date"
              sx={{ backgroundColor: "white" }}
              InputLabelProps={{ shrink: true }}
              value={formData.start_date}
              onChange={handleChange}
            />
          </Grid>

          {/* End Date */}
          <Grid item xs={6}>
            <TextField
              type="date"
              fullWidth
              name="end_date"
              label="End Date"
              sx={{ backgroundColor: "white" }}
              InputLabelProps={{ shrink: true }}
              value={formData.end_date}
              onChange={handleChange}
            />
          </Grid>

          {/* First Order Only */}
          {/* <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.first_order_only}
                  name="first_order_only"
                  onChange={handleChange}
                />
              }
              label="First Order Only"
            />
          </Grid> */}

          {/* Stackable */}
          {/* <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.is_stackable}
                  name="is_stackable"
                  onChange={handleChange}
                />
              }
              label="Stackable"
            />
          </Grid> */}

          {/* Active */}
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.is_active}
                  name="is_active"
                  onChange={handleChange}
                />
              }
              label="Active"
            />
          </Grid>

          {/* Buy X Get Y Fields */}
          {formData.scope === "buy_x_get_y" && (
            <>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Buy Product</InputLabel>
                  <Select
                    name="buy_product_id"
                    value={formData.buy_product_id}
                    onChange={handleChange}
                  >
                    <MenuItem value="">None</MenuItem>
                    {productsOptions.map((p) => (
                      <MenuItem key={p.id} value={p.id}>
                        {p.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="buy_quantity"
                  label="Buy Quantity"
                  value={formData.buy_quantity}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Get Product</InputLabel>
                  <Select
                    name="get_product_id"
                    value={formData.get_product_id}
                    onChange={handleChange}
                  >
                    <MenuItem value="">None</MenuItem>
                    {productsOptions.map((p) => (
                      <MenuItem key={p.id} value={p.id}>
                        {p.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="get_quantity"
                  label="Get Quantity"
                  value={formData.get_quantity}
                  onChange={handleChange}
                />
              </Grid>
            </>
          )}
          {formData.scope === "category" && (
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Select Categories</InputLabel>
                <Select
                  multiple
                  name="categories"
                  value={formData.categories}
                  sx={{ backgroundColor: "white" }}
                  onChange={(e) =>
                    handleArrayChange("categories", e.target.value)
                  }
                >
                  {categoriesOptions.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
          {formData.scope === "product" && (
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Select Products</InputLabel>
                <Select
                  multiple
                  name="products"
                  value={formData.products}
                  sx={{ backgroundColor: "white" }}
                  onChange={(e) =>
                    handleArrayChange("products", e.target.value)
                  }
                >
                  {productsOptions.map((product) => (
                    <MenuItem key={product.id} value={product.id}>
                      {product.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Add;
