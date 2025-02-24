import { useEffect, useState } from "react";
import { Eddy} from "../../../node_modules/test-sdk-eddy";
import useTransferStore from "@/store/tranfer-store";
import { useShallow } from "zustand/react/shallow";
import { Token } from "@/store/Types/token";

interface Props {
  actionType: string;
}

export const useFetchContractConfig = ({ actionType }: Props) => {
  const sdk = new Eddy();
  const {
     payChain, 
     getChain,
     tokenInAmount
    } = useTransferStore(
    useShallow((state) => ({
      payChain: state.payChain,
      getChain: state.getChain,
      tokenInAmount:state.tokenInAmount,
    }))
  );

  useEffect(() => {
    const fetchContractConfig = async () => {
      try {
    //    const result=await sdk.bridge.getContractConfigForTx({
    //     sourceChainId:payChain,
    //     destinationChainId:getChain,
    //     amount:
    //    })
      } catch (error) {
        console.error("Error fetching tokens:", error);
      
      } finally {
      }
    };

    fetchContractConfig();
  }, [actionType, payChain, getChain]); 

  return {
    tokenLoading,
    tokens,
  };
};
