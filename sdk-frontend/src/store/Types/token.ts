export interface Token {
    name:string;
    decimal:number;
    address:string;
    chainId:number
    zrc20Exist:boolean;
  }


  export interface QuoteResponse{
      destChainGasFees: number;
      estimatedReceivedAmount: string;
      quoteAmount: string;
      srcChainGasFees: number;
      minimumReceived: string;
      slippage: number;
      zetaFees: number;
      protocolFees: number;
      estimatedTime: number;
  }

  export interface ContractConfig {
    address?: string;
    abi?: Array<any>;
    args?: Array<any>;
    functionName?: string;
    to?: string;
    value?: string | number | undefined;
    data?: string;
    message?:string;
  }
  