"use client";
import React, { LegacyRef, useEffect, useState } from "react";
import "./styles.scss";
import dynamic from "next/dynamic";

import Box from "@mui/material/Box";
import { motion } from "framer-motion";
import useTransferStore from "../../..//store/tranfer-store";
import { Token } from "../../..//store/Types/token";
import { useSearchParams } from "next/navigation";
import { CustomTextLoader } from "../../..//common/CustomTextLoader";
import useCustomModal from "../../..//common/useCustomModal";
const Nori = require("nori-sdk").Nori;
import { useFetchDefaultTokens } from "../../..../../../components/hooks/useFetchDefaultTokens";
import { CustomSpinner } from "../../../common/CustomSpinner";
const DynamicTokenModal = dynamic(
  () =>
    import("../../../components/AppModals/TokenModal").then((mod) => mod.TokenModal),
  {
    ssr: false,
  }
);

interface Props {
  isSkip: boolean;
  label: string;
  isInput: boolean;
  chainId: number;
  tokenDetails: Token | undefined;
  amount: string;
  inputRef?: LegacyRef<HTMLInputElement> | undefined;
}


export const TokenInfoContainer = ({
  isSkip,
  label,
  isInput,
  tokenDetails,
  chainId,
  amount,
  inputRef,
}: Props) => {
  const searchParams = useSearchParams();
  const [value, setValue] = useState<string>("");
  const {
    open: openTokenModal,
    handleOpen: handleOpenTokenModal,
    handleClose: handleCloseTokenModal,
  } = useCustomModal();
  const { loading, fetchDefaultTokens } = useFetchDefaultTokens({
    chainId:chainId,
    actionType:label,
    isSkip:false
  })

  useEffect(() => {
    /**
     * Skip default token fetch is search params are valid.
     */
    if (
      !(
        Number(searchParams.get("sourcechain")) &&
        searchParams.get("sourcetoken") &&
        Number(searchParams.get("destinationchain")) &&
        searchParams.get("destinationtoken")
      )
    ) {
      fetchDefaultTokens(chainId);
    }
    
  }, []);

  // Debounce logic
  useEffect(() => {
    const handleUpdateTokenInput = () => {
      useTransferStore.getState().setTokenInAmount(value);
    };
    const handler = setTimeout(() => {
      handleUpdateTokenInput();
    }, 500); // 500ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  /**
   * Function to open token modal and also check for loading states.
   * @returns void
   */
  const handleOpenTokenDetailsModal = () => {
    if (loading || !tokenDetails) return;
    handleOpenTokenModal();
  };



  /**
   * Function to prevent adding faulty values.
   * @param e Input event.
   */
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    if (
      !/^[0-9.]$/.test(key) &&
      key !== "Backspace" &&
      !["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(key)
    ) {
      e.preventDefault();
    }
    if (key === "." && value.includes(".")) {
      e.preventDefault();
    }
  };

  /**
   * Function to store user input.
   * @param e Input event.
   * @returns
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const sanitizedValue = inputValue.replace(/[^0-9.]/g, "");
    const dotCount = (sanitizedValue.match(/\./g) || []).length;
    if (dotCount > 1) {
      return;
    }
    setValue(sanitizedValue);
  };


  return (
    <Box className="TokenInfoWrapper">
      <Box className="TokenInputContainer">
        {isInput ? (
          <input
            ref={inputRef}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            placeholder="0.00"
            className="Token-Input"
          />
        ) : (
          <Box className="Token-Output">
            {loading ? <CustomTextLoader text={amount} /> : amount}
          </Box>
        )}
      </Box>
      <Box className="TokenInfoContainer" onClick={handleOpenTokenDetailsModal}>
        {loading || !tokenDetails ? (
          <Box className="LogoContainer">
            <CustomSpinner size="30" color="#1a1a1a"/>
          </Box>
        ) : (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="TokenLogo"
            >
            </motion.div>
            <Box className="TokenDetailsContainer">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="TokenName"
              >
                {tokenDetails.name}
              </motion.div>
            </Box>
          </>
        )}
      </Box>
      <Box className="ContainerLabel">{label}</Box>
      <DynamicTokenModal
        open={openTokenModal}
        actionType={label}
        handleClose={handleCloseTokenModal}
      />
    </Box>
  );
};
