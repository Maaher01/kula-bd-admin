import { Box } from "@mui/material";
import Layout from "../../layout/Layout";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

const Edit = () => {
  const [roleid, setRoleid] = useState();
  const [rolelist, setRolelist] = useState([]);
  const [permissionsConfig, setPermissionsConfig] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState({});

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const flatPermissions = Object.values(selectedPermissions).flat();

    const payload = {
      role_id: roleid,
      permissions: flatPermissions,
    };

    try {
      await axios
        .post("/api/role/change-permissions", payload)
        .then(() => toast("Permissions updated successfully."));

      await fetchRoles();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangerole = (event) => {
    const selectedRoleId = event.target.value;
    setRoleid(event.target.value);

    const selectedRole = rolelist.find((role) => role.id === selectedRoleId);

    if (selectedRole?.permissions) {
      const permissionIds = selectedRole.permissions
        .split(",")
        .map((id) => parseInt(id));

      const newSelectedPermissions = {};

      permissionsConfig.forEach((module) => {
        const modulePermissions = module.actions
          .filter((action) => permissionIds.includes(action.id))
          .map((action) => action.id);

        if (modulePermissions.length > 0) {
          newSelectedPermissions[module.id] = modulePermissions;
        }
      });

      setSelectedPermissions(newSelectedPermissions);
    } else {
      setSelectedPermissions({});
    }
  };

  const fetchRoles = async () => {
    axios
      .get("/api/role")
      .then((response) => {
        console.log("Roles", response);
        setRolelist(response.data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchPermissions = async () => {
    try {
      const response = await axios.get("/api/permissions");
      console.log("Permissions", response);
      setPermissionsConfig(response.data);
    } catch (error) {
      console.error("Failed to fetch permissions:", error);
    }
  };

  const handlePermissionChange = (moduleId, actionId) => {
    setSelectedPermissions((prev) => {
      const current = prev[moduleId] || [];
      const updated = current.includes(actionId)
        ? current.filter((id) => id !== actionId)
        : [...current, actionId];

      return { ...prev, [moduleId]: updated };
    });
  };

  return (
    <Layout>
      <Box
        component={"form"}
        sx={{ padding: "20px 60px" }}
        onSubmit={handleSubmit}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl variant="outlined" sx={{ minWidth: 725 }}>
              <InputLabel>User Role</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                value={roleid}
                onChange={handleChangerole}
                label="Status"
                name="status"
                style={{ backgroundColor: "white" }}
              >
                {rolelist.map((role) => (
                  <MenuItem value={role.id}>{role.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {roleid && (
          <>
            <Grid item xs={6}>
              <Button
                variant={"contained"}
                type={"submit"}
                sx={{ mt: 3, mb: 2 }}
              >
                Update
              </Button>
            </Grid>
            <Grid item xs={12} sx={{ mt: 4 }}>
              {permissionsConfig.map((module) => (
                <Box key={module.id} sx={{ mb: 2 }}>
                  <h4>{module.name}</h4>
                  <Grid container spacing={2}>
                    {module.actions.map((action) => (
                      <Grid item key={action.id}>
                        <label>
                          <input
                            type="checkbox"
                            value={action.id}
                            checked={
                              selectedPermissions[module.id]
                                ? selectedPermissions[module.id].includes(
                                    action.id
                                  )
                                : false
                            }
                            onChange={() =>
                              handlePermissionChange(module.id, action.id)
                            }
                          />
                          {action.action}
                        </label>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ))}
            </Grid>
            <Grid item xs={6}>
              <Button
                variant={"contained"}
                type={"submit"}
                sx={{ mt: 3, mb: 2 }}
              >
                Update
              </Button>
            </Grid>
          </>
        )}
      </Box>
    </Layout>
  );
};

export default Edit;
