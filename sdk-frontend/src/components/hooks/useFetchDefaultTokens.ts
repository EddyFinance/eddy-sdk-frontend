import {useEffect, useState } from "react";
const Nori = require("nori-sdk").Nori;
import useTransferStore from "../../store/tranfer-store";
import { useShallow } from "zustand/react/shallow";


interface Props {
    chainId: number;
    actionType: string;
    isSkip: boolean;
  }
  
export const useFetchDefaultTokens=({chainId,actionType,isSkip}:Props)=>{
    const sdk=new Nori();
    const [loading,setLoading]=useState<boolean>(false);
    const {
        payChain,
        getChain
    }=useTransferStore(useShallow((state)=>({
        payChain:state.payChain,
        getChain:state.getChain
    })))
    const fetchDefaultTokens=async(chainId:number)=>{
        setLoading(true)
        const result=await sdk.tokens.getSupportedCrossChainTokens({
            chainId:actionType==="From" ? payChain : getChain
        })
        setLoading(false)
        if(actionType==="From"){
            const token=result.tokens[0]
            const resultToken={}
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