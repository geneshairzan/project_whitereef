import React, { useContext } from "react";
import { Typography, Stack, IconButton, MenuItem, Menu } from "@mui/material";
import Context from "@/component/context";

import { Link } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ActionConfirm from "@/component/gip-ui/actionConfirm";
import { fetcher, useNavigate } from "@/component/gip-form/fetcher";

export default function Action({ model, id, isRefetch }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { setisLoading } = useContext(Context);

  async function deleteUser(params) {
    setAnchorEl(null);
    setisLoading(true);
    await fetcher({
      url: `${model}/${id}`,
      method: "DELETE",
    });

    isRefetch(true, setisLoading(false));
  }

  return (
    <Stack className="center">
      <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Link to={`${id}`}>
          <MenuItem>View / Edit</MenuItem>
        </Link>
        <MenuItem>
          <ActionConfirm
            msgTitle={`Are your sure want to delete this ${model} ?`}
            element={<Typography color="error">Delete</Typography>}
            onYes={() => deleteUser()}
            isOpen={() => {}}
          />
        </MenuItem>
      </Menu>
    </Stack>
  );
}
