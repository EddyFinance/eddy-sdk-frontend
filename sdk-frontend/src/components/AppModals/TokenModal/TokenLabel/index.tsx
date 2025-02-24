import React, { useState } from "react";
import "./styles.scss";
import Box from "@mui/material/Box";

import { Token } from "@/store/Types/token";

export const TokenLabel = ({
  name,
  decimals,
  address,
  zrc20Exist
}: Token) => {
  return (
    <>
        <Box className="TokenLabel">
          <Box className="TokenDetails">
            {/* <Box className="TokenLogo">
              <CustomIcon src={tokenLogo} />
            </Box> */}
            <Box className="TokenNameContainer">
              <span className="TokenName">{name}</span>
            </Box>
          </Box>
        </Box>
    </>
  );
};
