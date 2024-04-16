import React, { useState } from "react";
import "./AddNewReview.scss";
import { Grid, InputLabel, OutlinedInput, Rating, Stack } from "@mui/material";
function AddNewReview() {
  const [stars, setStars] = useState(0);
  const [title,setTitle] = useState("");
  const [desc,setDesc] = useState("")
  return (
    <>
      <div className="Addnewreview-container">
        <div className="title">Review Product</div>
        <div className="minilable">Write a Review</div>
        <div className="rating">
          <div className="rating-title">Select a rating {"(Required)"}</div>
          <div className="star">
            <Rating
              name="simple-controlled"
              value={stars}
              onChange={(event, newValue) => {
                setStars(newValue);
              }}
            />
          </div>
        </div>
        <div className="addtitle-box">
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel
                htmlFor="title"
                style={{ fontWeight: 600, color: "gray" }}
              >
                {"Add a title"}
              </InputLabel>
              <OutlinedInput
                placeholder="3000 characters remaining "
                multiline
                sx={{ boxShadow: 3 }}
                onChange={(event)=>{
                  setTitle(event.target.value)
                }}
              />
            </Stack>
          </Grid>
        </div>
        <div className="review-box">
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel
                htmlFor="title"
                style={{ fontWeight: 600, color: "gray" }}
              >
                {"Details please! Your review helps other shoppers."}
              </InputLabel>
              <OutlinedInput
                placeholder="What did you like or dislike ? What should other shoppers know before buying ? "
                multiline
                rows={10}
                sx={{ boxShadow: 3 }}
                onChange={(event)=>{
                  setDesc(event.target.value)
                }}
              />
            </Stack>
          </Grid>
        </div>

        <div className="btn-box">
          <button className="btn" onClick={()=>{
            console.log(title,desc)
          }}>Review</button>
        </div>
      </div>
    </>
  );
}
export default AddNewReview;
