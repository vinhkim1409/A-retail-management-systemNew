import React, { useState } from "react";
import "./AddNewCategory.scss";
import {
  Box,
  FormHelperText,
  Grid,
  InputLabel,
  Modal,
  OutlinedInput,
  Stack,
  styled,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const AddNewCategory = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState("");
  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleCancel = () => {
    handleClose();
  };
  return (
    <div className="addnewcategory-container">
      <button onClick={handleOpen} className="addcatalog-btn">
        Add category
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="addnewcategory-container">
          <div className="title">Add Category </div>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel
                htmlFor="title"
                style={{ fontWeight: 600, color: "gray" }}
              >
                Name of Category
              </InputLabel>
              <OutlinedInput
                size="small"
                sx={{
                  boxShadow: 3,
                }}
                onChange={handleChangeName}
                error={false}
              />
              <FormHelperText error={false}>
                {false ? "Please enter a Position" : ""}
              </FormHelperText>
            </Stack>
          </Grid>
          <div className="btn-box">
            <button className="btn cancel" onClick={handleCancel}>Cancel</button>
            <button className="btn save">Save change</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default AddNewCategory;
