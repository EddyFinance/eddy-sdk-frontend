import { create } from "zustand";
import { persist } from "zustand/middleware";
import { QuoteResponse, Token } from "./Types/token";
interface TransferStore {
  payChain: number;
  getChain: number;
  payToken: Token | undefined;
  getToken: Token | undefined;
  payTokenBalance: string;
  inputAmount: string;
  tokenInAmount: string;
  tokenOutAmount: string;
  destChainGasFees: string;
  srcChainGasFees: string;
  quote:QuoteResponse | undefined;
  setPayChain: (chainId: number) => void;
  setGetChain: (chainId: number) => void;
  setPayToken: (token: Token) => void;
  setGetToken: (token: Token) => void;
  setPayTokenBalance: (balance: string) => void;
  setInputAmount: (value: string) => void;
  setTokenInAmount: (value: string) => void;
  setQuoteResponse:(quote:QuoteResponse)=>void;
  setTokenOutAmount: (value: string) => void;
}

const useTransferStore = create<TransferStore>((set, get) => ({
      payChain: 7000,
      getChain: 8453,
      payToken: undefined,
      getToken: undefined,
      quote:undefined,
      payTokenBalance: "0.00",
      inputAmount: "0",
      tokenInAmount: "0.00",
      tokenOutAmount: "0.00",
      destChainGasFees: "0",
      srcChainGasFees: "0",
      setPayChain: (chainId: number) => {
        set((state) => ({ payChain: chainId }));
      },
      setGetChain: (chainId: number) => {
        set((state) => ({ getChain: chainId }));
      },
      setPayToken: (token: Token) => {
        console.log("setting pay token",token)
        set((state) => ({ payToken: token }));
      },
      setGetToken: (token: Token) => {
        set((state) => ({ getToken: token }));
      },
      setPayTokenBalance: (balance: string) => {
        set((state) => ({ payTokenBalance: balance }));
      },
      setInputAmount: (value: string) => {
        set((state) => ({ tokenInAmount: value }));
      },
      setTokenInAmount: (value: string) => {
        set((state) => ({ tokenInAmount: value }));
      },
      setTokenOutAmount: (value: string) => {
        set((state) => ({ tokenOutAmount: value }));
      },
      setQuoteResponse:(quote:QuoteResponse)=>{
        set((state)=>({
          quote:quote
        }))
      }
    }),
);

export default useTransferStore;
