"use client"
import { useEffect, useState } from "react";
const Nori = require("nori-sdk").Nori;
import useTransferStore from "../../store/tranfer-store";
import { useShallow } from "zustand/react/shallow";
import { QuoteResponse } from "../../store/Types/token";
interface Props {
  actionType: string;
}

export const useFetchQuoteForBridge = () => {
  const sdk = new Nori();
  const [quote,setQuote]=useState<QuoteResponse>();
  const [quoteLoading,setLoading]=useState<boolean>(false);
  const {
     payChain, 
     getChain,
     tokenInAmount,
     payToken,
     getToken
    } = useTransferStore(
    useShallow((state) => ({
      payChain: state.payChain,
      getChain: state.getChain,
      tokenInAmount:state.tokenInAmount,
      payToken:state.payToken,
      getToken:state.getToken
    }))
  );

  useEffect(() => {
    const fetchQuoteForBridge = async () => {
      try {
        setLoading(true)
        if(!payToken || !getToken || !payChain || !getChain || !Number(tokenInAmount)) return;
       const result=await sdk.bridge.getQuoteForBridge({
        inputTokenAddress:payToken?.address as string,
        outputTokenAddress:getToken?.address as string,
        sourceChainId:payChain,
        destinationChainId:getChain,
        slippage:0.5,
        amount:(Number(tokenInAmount)*(10**Number(payToken?.decimal))).toString(),
       })
      setQuote(result)
      useTransferStore.getState().setTokenOutAmount(result.estimatedReceivedAmount)
       setLoading(false)
      } catch (error) {
        console.error("Error fetching tokens:", error);
      }
    };

    fetchQuoteForBridge();
  }, [payChain, getChain,payToken,getToken,tokenInAmount]); 

  return {
    quote,
   quoteLoading
  };
};
