import {useEffect, useState } from "react";
import {Nori} from "../../../node_modules/test-sdk-eddy"
import useTransferStore from "@/store/tranfer-store";


interface Props {
    chainId: number;
    actionType: string;
    isSkip: boolean;
  }
  
export const useFetchDefaultTokens=({chainId,actionType,isSkip}:Props)=>{
    const sdk=new Nori();
    const [loading,setLoading]=useState<boolean>(false);
    const fetchDefaultTokens=async(chainId:number)=>{
        setLoading(true)
        const result=await sdk.tokens.getSupportedCrossChainTokens({
            chainId:chainId
        })
        setLoading(false)
        console.log(result.tokens)
        if(actionType==="From"){
            const token=result.tokens[0]
            useTransferStore.getState().setPayToken(token)
        }else{
            const token=result.tokens[0]
            useTransferStore.getState().setGetToken(token)
        }
        return result.tokens[0]
    }
    return {
        fetchDefaultTokens,
        loading
    }
}