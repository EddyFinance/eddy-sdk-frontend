"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./styles.scss";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import  useMediaQuery  from "@mui/material/useMediaQuery";
import useTransferStore from "@/store/tranfer-store";
import { useShallow } from "zustand/react/shallow";
import { useFetchContractConfig } from "../hooks/useFetchContractConfig";
import { useFetchQuoteForBridge } from "../hooks/useFetchQuoteForBridge";
const DynamicTokenInfoContainer = dynamic(
  () => import("./TokenInfoContainer").then((mod) => mod.TokenInfoContainer),
  {
    ssr: false,
    loading: () => <div className="DynamicPlaceholder"></div>,
  }
);

const DynamicButtonsContainer = dynamic(
  () => import("./ButtonsContainer").then((mod) => mod.ButtonsContainer),
  {
    ssr: false,
  }
);


export const CrossChainWidget = () => {
  const isXXLDevice=useMediaQuery("(min-width:1400px");
  const inputRef = useRef<HTMLInputElement>(null);
  const [stopPropagation, setStopPropagation] = useState<boolean>(false);
  const mobileDevice = useMediaQuery("(max-width: 600px)");
  const showRewardsModal = useMediaQuery("(max-width: 800px)");


  // const { loading, error } = useFetchQuoteForTransaction({
  //   fromAmount: tokenInAmount,
  //   fromChainId: payChain,
  //   fromToken: payToken,
  //   toChainId: getChain,
  //   toToken: getToken,
  //   fromTokenId: Number(payToken?.id ?? 0),
  //   toTokenId: Number(getToken?.id ?? 0),
  //   slippage: Number(slippageValue),
  //   walletAddress: address,
  //   isSkip:
  //     !Number(tokenInAmount) ||
  //     !payChain ||
  //     !payToken ||
  //     !getChain ||
  //     !getToken ||
  //     !Number(payToken?.id ?? 0) ||
  //     !Number(getToken?.id ?? 0) ||
  //     !slippageValue,
  // });
  
  const {
    config,
    loading
  }=useFetchContractConfig()

  const {
    quoteLoading,
    quote
  }=useFetchQuoteForBridge()
  const {
    payChain,
    tokenInAmount,
    payToken,
    getChain,
    getToken,
  }=useTransferStore(useShallow((state)=>({
    payChain:state.payChain,
    payToken:state.payToken,
    tokenInAmount:state.tokenInAmount,
    getChain:state.getChain,
    getToken:state.getToken,
  })))
  /**
   * Function to refresh widget state after success.
   */
  const handleRefreshTransferState = () => {
    const event = new Event("change", { bubbles: true });
    const input = inputRef.current;

    if (input) {
      input.value = "0.00";
      input.dispatchEvent(event);
    }
  };


  return (
    <Box className="WidgetWrapper">
      <Box className="CrossChainWidgetWrapper">
        <div className="WidgetSection">
          <Box className="CrossChainWidgetContainer">
            <div className="HeadingContainer">
              <div className="HeadingText">
              <span>Universal Swap</span> 
              </div>
            </div>
            <Box className="TransferActionContainer">
              <Box className="TokenBalanceContainer">
                <DynamicTokenInfoContainer
                  label="From"
                  isInput={true}
                  chainId={payChain}
                  tokenDetails={payToken}
                  amount={tokenInAmount}
                  inputRef={inputRef}
                  isSkip={stopPropagation}
                />
              </Box>
              <Box className="TokenBalanceContainer">
                <DynamicTokenInfoContainer
                  label="To"
                  isInput={false}
                  chainId={getChain}
                  tokenDetails={getToken}
                  amount={"0.00"}
                  isSkip={stopPropagation}
                />
              </Box>
            </Box>
            <DynamicButtonsContainer
              loadingState={false}
              errorState={undefined}
              handleMainButtonClick={()=>{
                console.log("i got clicked")
              }}
            />
          </Box>
        </div>
      </Box>
    </Box>
  );
};
