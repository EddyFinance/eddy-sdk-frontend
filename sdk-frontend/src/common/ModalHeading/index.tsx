import React from "react";
import "./styles.scss";

import Box from "@mui/material/Box";
import { GrClose } from "react-icons/gr";

interface Props {
  heading: string;
  handleClick: () => void;
}

export const ModalHeading = ({ heading, handleClick }: Props) => {
  return (
    <Box className="ModalHeadingWrapper">
      <Box className="ModalHeadingContainer">
        <Box className="HeadingText">
          <span>{heading}</span>
        </Box>
        <Box className="HeadingBtn" onClick={handleClick}>
          <GrClose />
        </Box>
      </Box>
      <hr />
    </Box>
  );
};
