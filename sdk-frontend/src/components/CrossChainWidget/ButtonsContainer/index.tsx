"use client";
import React, { useEffect, useState } from "react";
import "./styles.scss";

import Box from "@mui/material/Box";
import { ApolloError } from "@apollo/client";
interface Props {
  loadingState: boolean;
  errorState: ApolloError | undefined;
  handleMainButtonClick: () => void;
}

export const ButtonsContainer = ({
}: Props) => {
  return <Box className="ButtonsContainer">
    <Box
              className="ButtonVariantGreen"
            >
              Send Transaction
            </Box>
  </Box>;
};
