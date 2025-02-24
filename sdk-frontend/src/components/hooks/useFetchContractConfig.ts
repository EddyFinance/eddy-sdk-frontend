import { useEffect, useState } from "react"
import {Nori} from "nori-sdk"
import useTransferStore from "@/store/tranfer-store";
import { useShallow } from "zustand/react/shallow";
interface Props {
  actionType: string;
}

export const useFetchContractConfig = () => {
   const sdk = new Nori();
  const [config,setConfig]=useState();
  const [loading,setLoading]=useState<boolean>(false);
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
    const fetchContractConfig = async () => {
      try {
        setLoading(true)
        if(!payToken || !getToken || !payChain || !getChain) return;
       const result=await sdk.bridge.getContractConfigForTx({
        inputTokenAddress:payToken?.address as string,
        outputTokenAddress:getToken?.address as string,
        sourceChainId:payChain,
        destinationChainId:getChain,
        slippage:0.5,
        amount:(Number(tokenInAmount)*(10**Number(payToken?.decimals))).toString(),
        walletAddress:"0x00ce496A3aE288Fec2BA5b73039DB4f7c31a9144" as string,
       })
       setConfig(result)
       setLoading(false)
      } catch (error) {
        console.error("Error fetching tokens:", error);
      }
    };

    fetchContractConfig();
  }, [payChain, getChain]); 

  return {
    config,
   loading
  };
};
