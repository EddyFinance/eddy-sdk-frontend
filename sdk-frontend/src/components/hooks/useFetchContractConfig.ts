import { useEffect, useState } from "react"
const Nori = require("nori-sdk").Nori;
import useTransferStore from "../../store/tranfer-store";
import { useShallow } from "zustand/react/shallow";
import { ContractConfig } from "../../store/Types/token";
interface Props {
  actionType: string;
}

export const useFetchContractConfig = () => {
   const sdk = new Nori();
  const [config,setConfig]=useState<ContractConfig>();
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
        amount:(Number(tokenInAmount)*(10**Number(payToken?.decimal))).toString(),
        walletAddress:"0x00ce496A3aE288Fec2BA5b73039DB4f7c31a9144" as string,
       })
       const config={
        args:result.args,
        address:result.address,
        data:result.data,
        functionName:result.functionName,
        gasLimit:result.gasLimit,
        to:result.to,
        value:result.value
       }
       setConfig(config)
       setLoading(false)
      } catch (error) {
        console.error("Error fetching tokens:", error);
      }
    };

    fetchContractConfig();
  }, [payChain, getChain,payToken,getToken,tokenInAmount]); 

  return {
    config,
   loading
  };
};
