"use client";
import React, { useState, useEffect } from "react";
import "./styles.scss";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Grow from "@mui/material/Grow";
const Nori = require("nori-sdk").Nori;
import { ModalHeading } from "../../../common/ModalHeading";
import { ChainLabel } from "./ChainLabel";
import { CustomSpinner } from "../../../common/CustomSpinner";
import { TokenLabel } from "./TokenLabel";
import Slide from "@mui/material/Slide"
import useMediaQuery from "@mui/material/useMediaQuery";
import { Token } from "../../../store/Types/token";
import { Chain } from "../../../store/Types/chain";
import useTransferStore from "../../../store/tranfer-store";
import { useFetchTokens } from "../../../components/hooks/useFetchTokens";
import { useShallow } from "zustand/react/shallow";
interface Props {
  open: boolean;
  actionType: string;
  handleClose: () => void;
  callType?:string;
}

export const TokenModal = ({
  open,
  actionType,
  handleClose,
  callType
}: Props) => {
  const mobileDevice = useMediaQuery("(max-width: 600px)");
  const [query, setQuery] = useState("");
  const [chains,setChains]=useState<Chain[]>([]);
  const [loading,setLoading]=useState<boolean>(true);
  const sdk = new Nori();
  const {
    payChain,
    getChain
  }=useTransferStore(useShallow((state)=>({
    payChain:state.payChain,
    getChain:state.getChain
  })))
  useEffect(()=>{
      async function fetchChains(){
          const data = await sdk.bridge.getSupportedChains()

         setChains(data.supportedChains)
          setLoading(false)
      }
      fetchChains()
  },[])


  const {
   tokenLoading,
   tokens
  }=useFetchTokens({
    actionType:actionType
  })

  /**
   * Render token list once data is fetched from backend.
   * @returns void
   */
  const renderTokensList = () => {
      return (
        <>
          {tokens!==null  && tokens.map((item: Token,index:number) => (
            <TokenLabel
              key={index}
              name={item.name}
              decimal={item.decimal}
              address={item.address}
              zrc20Exist={item.zrc20Exist}
              chainId={item.chainId}
              actionType={actionType}
              handleClick={handleClose}
            />
          ))}
        </>
      );
  };

  const handleSetChainId=(actionType:string,chainId:number)=>{
    if(actionType==="From"){
      useTransferStore.getState().setPayChain(chainId)
    }else{
      useTransferStore.getState().setGetChain(chainId)
    }
  }

  /**
   * On close of modal clear sorted selection array.
   */
  const handleCloseModal = () => {
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        backdropFilter: "blur(5px)",
      }}
    >
      <Box className="TokenModalWrapper">
        {!mobileDevice && (
          <Grow in={open}>
            <Box className="TokenModalContainer">
              <ModalHeading
                heading={actionType}
                handleClick={handleCloseModal}
              />
              <Box className="TokensChainsContainer">
                <Box className="ChainWrapper">
                  <Box className="ContainerHeading">Chains</Box>
                  <Box className="ChainsContainer">
                    {chains.map((item, index) => (
                      <ChainLabel
                        key={index}
                        name={item.name}
                        chainId={item.chainId}
                        currentChainId={actionType === "From" ? payChain : getChain}
                        setChainId={handleSetChainId}
                        actionType={actionType}
                      />
                    ))}
                  </Box>
                </Box>
                <Box className="DividerLine"></Box>
                <Box className="TokensWrapper">
                  <Box className="ContainerHeading">Assets</Box>
                  <Box className="TokensContainer">
                  {
                      loading && 
                          <>
                          <Box className="LoaderContainer">
                            <CustomSpinner size="20" color="#909090" />
                          </Box>
                          </>
                    }
                    {renderTokensList()}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grow>
        )}
        {mobileDevice && (
          <Slide in={open} direction="up">
            <Box className="TokenModalContainer">
              <ModalHeading
                heading={actionType}
                handleClick={handleCloseModal}
              />
              <Box className="TokensChainsContainer">
                <Box className="ChainWrapper">
                  <Box className="ContainerHeading">Chains</Box>
                  <Box className="ChainsContainer">
                  {chains.map((item, index) => (
                      <ChainLabel
                        key={index}
                        name={item.name}
                        chainId={item.chainId}
                        currentChainId={actionType === "From" ? payChain : getChain}
                        setChainId={handleSetChainId}
                        actionType={actionType}
                      />
                    ))}
                  </Box>
                </Box>
                <Box className="DividerLine"></Box>
                <Box className="TokensWrapper">
                  <Box className="ContainerHeading">Assets</Box>
                  <Box className="TokensContainer">
                  {loading && 
                          <>
                          <Box className="LoaderContainer">
                            <CustomSpinner size="20" color="#909090" />
                          </Box>
                          </>
                    }
                    {renderTokensList()}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Slide>
        )}
      </Box>
    </Modal>
  );
};
