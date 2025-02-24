export interface Token {
    name:string;
    decimals:number;
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