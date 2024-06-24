import { Pagination } from "@mui/material";

export default function App({ ...props }) {
  return (
    <Pagination
      page={props?.page}
      // onChange={handleChange}
      // count={raw?.pages?.length}
      boundaryCount={20}
      variant="outlined"
      shape="rounded"
      hidePrevButton
      hideNextButton
      // color="primary"

      {...props}
    />
  );
}
