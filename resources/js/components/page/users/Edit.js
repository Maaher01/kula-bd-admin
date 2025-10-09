import { useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Layout from "../../layout/Layout";
import { useParams } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const Edit = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roleid, setRoleid] = useState();
  const [rolelist, setRolelist] = useState([]);

  const params = useParams();

  useEffect(() => {
    fetchData();
    fetchRoles();
  }, []);

  const handleChangerole = (event) => {
    setRoleid(event.target.value);
  };

  const fetchData = async () => {
    await axios
      .get(`/api/users/edit/${params.id}`)
      .then(({ data }) => {
        const alldata = data.data;
        setName(alldata.name);
        setEmail(alldata.email);
        setRoleid(alldata.role.id);
        toast("Data Found");
      })
      .catch(({ response: { data } }) => {
        toast("No Data Found");
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    axios
      .post(`/api/users/update/${params.id}`, formData)
      .then((response) => {
        if (response.data.errors) {
          toast(response.data.message);
        } else {
          toast("Data Inserted Successfully");
          navigate("/app/users");
        }
      })
      .catch(() => {
        toast("There was en error updating the data");
      });
  };

  const fetchRoles = async () => {
    axios
      .get("/api/role")
      .then((response) => {
        setRolelist(response.data.data.data);
      })
      .catch((error) => {
        console.log(error);
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
            <Grid item xs={8}>
              <TextField
                id="standard-basic"
                fullWidth
                name="name"
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="standard-basic"
                fullWidth
                name="email"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl variant="outlined" sx={{ minWidth: 975 }}>
                <InputLabel>User Role</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  value={roleid ?? ""}
                  onChange={handleChangerole}
                  label="Role"
                  name="role_id"
                  style={{ backgroundColor: "white" }}
                >
                  {rolelist.length === 0 ? (
                    <MenuItem disabled>Loading roles...</MenuItem>
                  ) : (
                    rolelist.map((role) => (
                      <MenuItem key={role.id} value={role.id}>
                        {role.name}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={8}>
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
