import { Box, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import "./SelecIndustry.scss";
const style = {
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid white",
  p: 4,
  outline:"none",
  borderRadius:"10px"
};
const industrys = [
  "",
  "Industry 1",
  "Industry 2",
  "Industry 3",
  "Industry 4",
  "Industry 5",
  "Industry 6",
];
const subInds = [
  [],
  ["Sub 1.1", "Sub 1.2", "Sub 1.3", "Sub 1.4", "Sub 1.5"],
  ["Sub 2.1", "Sub 2.2", "Sub 2.3", "Sub 2.4", "Sub 2.5"],
  ["Sub 3.1", "Sub 3.2", "Sub 3.3", "Sub 3.4", "Sub 3.5"],
  ["Sub 4.1", "Sub 4.2", "Sub 4.3", "Sub 4.4", "Sub 4.5"],
  ["Sub 5.1", "Sub 5.2", "Sub 5.3", "Sub 5.4", "Sub 5.5"],
  ["Sub 6.1", "Sub 6.2", "Sub 6.3", "Sub 6.4", "Sub 6.5"],
  ["Sub 7.1", "Sub 7.2", "Sub 7.3", "Sub 7.4", "Sub 7.5"],
];
const subSubInds = [
  [],
  ["Sub 1.1", "Sub 1.2", "Sub 1.3", "Sub 1.4", "Sub 1.5"],
  ["Sub 2.1", "Sub 2.2", "Sub 2.3", "Sub 2.4", "Sub 2.5"],
  ["Sub 3.1", "Sub 3.2", "Sub 3.3", "Sub 3.4", "Sub 3.5"],
  ["Sub 4.1", "Sub 4.2", "Sub 4.3", "Sub 4.4", "Sub 4.5"],
  ["Sub 5.1", "Sub 5.2", "Sub 5.3", "Sub 5.4", "Sub 5.5"],
  ["Sub 6.1", "Sub 6.2", "Sub 6.3", "Sub 6.4", "Sub 6.5"],
  ["Sub 7.1", "Sub 7.2", "Sub 7.3", "Sub 7.4", "Sub 7.5"],
];
function SelecIndustry() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [numInd, setNumInd] = useState(0);
  const [numSub, setNumSub] = useState(0);
  const [numSubSub, setNumSubSub] = useState(0);
  return (
    <Modal open={false}>
      <Box sx={style} className="SelecIndustry-container">
        <Typography className="title">
          Select Industry
        </Typography>
        <div className="industry-container">
          <div className="industry">
            {industrys.map((industry, index) => (
              <>
                {index > 0 ? (
                  <div
                    className={index === numInd ? `inds selected` : `inds`}
                    onClick={() => {
                      setNumInd(index);
                      setNumSub(0);
                      setNumSubSub(0)
                    }}
                    key={index}
                  >
                    {industry}
                  </div>
                ) : (
                  <></>
                )}
              </>
            ))}
          </div>

          {numInd > 0 ? (
            <div className="industry">
              {subInds[numInd].map((subInd, index) => (
                <>
                  {index > 0 ? (
                    <div
                      key={index}
                      className={index === numSub ? `inds selected` : `inds`}
                      onClick={() => {
                        setNumSub(index);
                        setNumSubSub(0)
                      }}
                    >
                      {subInd}
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              ))}
            </div>
          ) : (
            <></>
          )}

          {numSub > 0 ? (
            <div className="industry">
              {subSubInds[numSub].map((subSubInd, index) => (
                <>
                  {index > 0 ? (
                    <div
                      className={index === numSubSub ? `inds selected` : `inds`}
                      onClick={() => {
                        setNumSubSub(index);
                      }}
                      key={index}
                    >
                      {subSubInd}
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      </Box>
    </Modal>
  );
}

export default SelecIndustry;
