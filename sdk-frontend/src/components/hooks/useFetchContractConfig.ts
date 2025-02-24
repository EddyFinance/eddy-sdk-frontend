import { useEffect, useState } from "react"
import {Nori} from "../../../node_modules/test-sdk-eddy"
import useTransferStore from "@/store/tranfer-store";
import { useShallow } from "zustand/react/shallow";
import {useAccount} from "wagmi"
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
 console.log(tokenInAmount)
  useEffect(() => {
    const fetchContractConfig = async () => {
      try {
        setLoading(true)
        console.log("fetcing config early")
        if(!payToken || !getToken || !payChain || !getChain) return;
        console.log("fetcing config")
       const result=await sdk.bridge.getContractConfigForTx({
        inputTokenAddress:payToken?.address as string,
        outputTokenAddress:getToken?.address as string,
        sourceChainId:payChain,
        destinationChainId:getChain,
        slippage:0.5,
        amount:(Number(tokenInAmount)*Number(payToken?.decimals)).toString(),
        walletAddress:"0x00ce496A3aE288Fec2BA5b73039DB4f7c31a9144" as string,
       })
       setConfig(result)
       setLoading(false)
       console.log(result)
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
