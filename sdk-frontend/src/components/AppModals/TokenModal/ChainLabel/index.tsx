"use client";
import { useState } from "react";
import "./styles.scss";
import Box from "@mui/material/Box";
interface Props{
  chainId: number;
  name: string;
  actionType:string;
  setChainId:(actionType:string, chainId:number)=>void;
  currentChainId:number;
}
export const ChainLabel = ({
  name,
  currentChainId,
  chainId,
  setChainId,
  actionType,
}: Props) => {
  const [showLine, setShowLine] = useState(false);
   const handleClick=()=>{
    setShowLine(true)
      if (chainId === currentChainId) return;
      setChainId(actionType,chainId)
   }
  return (
    <Box
      className={`ChainLabel ${
        showLine || (currentChainId === chainId) ? "show-line" : ""
      }`}
      onClick={handleClick}
      onMouseOver={() => setShowLine(true)}
      onMouseOut={() => setShowLine(false)}
    >
      <span className="ChainName">{name}</span>
    </Box>
  );
};
