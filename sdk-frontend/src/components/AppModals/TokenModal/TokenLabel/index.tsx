import React, { act, useState } from "react";
import "./styles.scss";
import Box from "@mui/material/Box";

import { Token } from "../../../../store/Types/token";
import useTransferStore from "../../../../store/tranfer-store";

interface Props{
  name:string;
  decimal:number;
  address:string;
  chainId:number
  zrc20Exist:boolean;
  actionType:string;
  handleClick:()=>void;
}
export const TokenLabel = ({
  name,
  decimal,
  address,
  zrc20Exist,
  actionType,
  chainId,
  handleClick
}:Props) => {
  if(actionType==="To" && !zrc20Exist){
    return
  }
  return (
    <>
        <div className="TokenLabel" onClick={()=>{
          if(actionType==="From"){
            useTransferStore.getState().setPayToken({
              name,
              decimal,
              address,
              zrc20Exist,
              chainId
            })
          }else{
            useTransferStore.getState().setGetToken({
              name,
              decimal,
              address,
              zrc20Exist,
              chainId
            })
          }
         handleClick()
        }}>
          <Box className="TokenDetails">
            <Box className="TokenNameContainer">
              <span className="TokenName">{name}</span>
            </Box>
          </Box>
        </div>
    </>
  );
};
