import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Grid from "@mui/material/Grid";
import Layout from "../../layout/Layout";
import Datatablecomponent from "../../Datatable";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const List = () => {
  const [delrow, setDelrow] = useState(0);
  const [searchurl, setSearchurl] = useState("/api/order");
  const [open, setOpen] = useState(false);

  const columns = [
    {
      name: "Customer Name",
      selector: (row) => row.customer_name,
      center: true,
      width: "225px",
    },
    {
      name: "Phone",
      selector: (row) => row.customer_phone,
      center: true,
      width: "225px",
    },
    {
      name: "Delivery Address",
      selector: (row) => row.shipping_address,
      center: true,
    },
    {
      name: "Grand Total",
      selector: (row) => formatPrice(row.grand_total),
      center: true,
      width: "225px",
    },
    {
      name: "Checkout Date",
      selector: (row) => row.checkout_date,
      center: true,
      width: "225px",
    },
    {
      name: "Notes",
      selector: (row) => row.notes,
      center: true,
    },
    {
      name: "Order Status",
      selector: (row) => row.order_status,
      center: true,
    },
    {
      name: "Payment Status",
      selector: (row) => row.payment_status,
      center: true,
    },
    {
      name: "Payment Type",
      selector: (row) => row.payment_type,
      center: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to={`/app/order/edit/${row.id}`} className="btn">
            <i className="material-icons text-warning">
              <RemoveRedEyeIcon sx={{ color: "blue" }} />
            </i>
          </Link>
        </div>
      ),
      selector: (row) => row.id,
      center: true,
    },
  ];

  const formatPrice = (price) => {
    if (price === null || price === undefined) return "";

    // Convert to number
    const num = Number(price);

    // Check if whole number
    if (num % 1 === 0) {
      return `Tk. ${num}`; // remove .00
    } else {
      return `Tk. ${num.toFixed(2)}`; // keep 2 decimals
    }
  };

  const renderDatatable = () => {
    return (
      <Datatablecomponent
        columns={columns}
        url={searchurl}
        delrow={delrow}
      ></Datatablecomponent>
    );
  };
  return (
    <>
      <Layout>
        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            {renderDatatable()}
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default List;
