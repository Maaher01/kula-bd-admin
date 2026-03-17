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
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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

  useEffect(() => {
    fetchDiscount();
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchDiscount = async () => {
    try {
      const res = await axios.get(`/api/discounts/${id}`);
      const discount = res.data.data;

      setFormData({
        ...discount,
        start_date: discount.start_date?.substring(0, 10) || "",
        end_date: discount.end_date?.substring(0, 10) || "",
        products: discount.products?.map((p) => p.id) || [],
        categories: discount.categories?.map((c) => c.id) || [],
      });
    } catch (error) {
      toast.error("Failed to load discount");
    }
  };

  const fetchProducts = async () => {
    const res = await axios.get("/api/product");
    setProductsOptions(res.data.data.data);
  };

  const fetchCategories = async () => {
    const res = await axios.get("/api/category");
    setCategoriesOptions(res.data.data.data);
  };

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`/api/discounts/${id}`, formData);
      toast.success("Discount Updated Successfully");
      navigate("/app/discounts");
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
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
                onChange={handleChange}
                sx={{ backgroundColor: "white" }}
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
                value={formData.type}
                onChange={handleChange}
                sx={{ backgroundColor: "white" }}
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
              value={formData.value}
              onChange={handleChange}
              InputProps={{ style: { backgroundColor: "white" } }}
            />
          </Grid>

          {/* Min Purchase */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="min_purchase"
              label="Minimum Purchase"
              value={formData.min_purchase}
              onChange={handleChange}
              InputProps={{ style: { backgroundColor: "white" } }}
            />
          </Grid>

          {/* Max Discount */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="max_discount"
              label="Maximum Discount"
              value={formData.max_discount}
              onChange={handleChange}
              InputProps={{ style: { backgroundColor: "white" } }}
            />
          </Grid>

          {/* Start Date */}
          <Grid item xs={6}>
            <TextField
              type="date"
              fullWidth
              name="start_date"
              label="Start Date"
              value={formData.start_date || ""}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              InputProps={{ style: { backgroundColor: "white" } }}
            />
          </Grid>

          {/* End Date */}
          <Grid item xs={6}>
            <TextField
              type="date"
              fullWidth
              name="end_date"
              label="End Date"
              value={formData.end_date || ""}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              InputProps={{ style: { backgroundColor: "white" } }}
            />
          </Grid>

          {/* Category Selector */}
          {formData.scope === "category" && (
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Select Categories</InputLabel>
                <Select
                  multiple
                  value={formData.categories}
                  onChange={(e) =>
                    handleArrayChange("categories", e.target.value)
                  }
                  sx={{ backgroundColor: "white" }}
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

          {/* Product Selector */}
          {formData.scope === "product" && (
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Select Products</InputLabel>
                <Select
                  multiple
                  value={formData.products}
                  onChange={(e) =>
                    handleArrayChange("products", e.target.value)
                  }
                  sx={{ backgroundColor: "white" }}
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

          {/* Checkboxes */}
          {/* <Grid item xs={4}>
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

          {/* <Grid item xs={4}>
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

          <Grid item xs={4}>
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

          {/* Submit */}
          <Grid item xs={12}>
            <Button variant="contained" type="submit">
              Update Discount
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Edit;
