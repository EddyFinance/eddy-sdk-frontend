"use client"
import { useEffect, useState } from "react";
import {Nori} from "../../../node_modules/test-sdk-eddy"
import useTransferStore from "@/store/tranfer-store";
import { useShallow } from "zustand/react/shallow";
import {useAccount} from "wagmi";
import { QuoteResponse } from "@/store/Types/token";
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
        console.log("fetching response")
        if(!payToken || !getToken || !payChain || !getChain) return;
       const result=await sdk.bridge.getQuoteForBridge({
        inputTokenAddress:payToken?.address as string,
        outputTokenAddress:getToken?.address as string,
        sourceChainId:payChain,
        destinationChainId:getChain,
        slippage:0.5,
        amount:(Number(tokenInAmount)*Number(payToken?.decimals)).toString(),
       })
      setQuote(result)
       setLoading(false)
       console.log(result)
      } catch (error) {
        console.error("Error fetching tokens:", error);
      }
    };

    fetchQuoteForBridge();
  }, [payChain, getChain]); 

  return {
    quote,
   quoteLoading
  };
};
