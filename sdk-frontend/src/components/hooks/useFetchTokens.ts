import { useEffect, useState } from "react";
const Nori = require("nori-sdk").Nori;
import useTransferStore from "../../store/tranfer-store";
import { useShallow } from "zustand/react/shallow";
import { Token } from "../../store/Types/token";

interface Props {
  actionType: string;
}

export const useFetchTokens = ({ actionType }: Props) => {
  const sdk = new Nori();
  const [tokens, setTokens] = useState<Token[] | null>(null);
  const [tokenLoading, setTokenLoading] = useState<boolean>(true);

  const { payChain, getChain } = useTransferStore(
    useShallow((state) => ({
      payChain: state.payChain,
      getChain: state.getChain,
    }))
  );

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        setTokenLoading(true);
        let result;
        if (payChain !== getChain) {
          result = await sdk.tokens.getSupportedCrossChainTokens({
            chainId: actionType === "From" ? payChain : getChain,
          });
        } else {
          result = await sdk.tokens.getSupportedSameChainTokens({
            chainId: actionType === "From" ? payChain : getChain,
          });
        }
        setTokens(result.tokens);
      } catch (error) {
        console.error("Error fetching tokens:", error);
        setTokens([]);
      } finally {
        setTokenLoading(false);
      }
    };

    fetchTokens();
  }, [actionType, payChain, getChain]); 

  return {
    tokenLoading,
    tokens,
  };
};
