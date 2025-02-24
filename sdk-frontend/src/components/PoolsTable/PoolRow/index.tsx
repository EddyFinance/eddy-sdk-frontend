import React from "react";
import "./styles.scss";
import { motion } from "framer-motion";
import useMediaQuery  from "@mui/material/useMediaQuery";
import { CurvePoolLabel } from "./CurvePoolLabel";
import { UniV2PoolLabel } from "./UniV2PoolLabel";
import { UniV3PoolLabel } from "./UniV3PoolLabel";
interface Props {
  name: string;
  tvl: number;
  apy: number;
  poolType: string;
  index: number;
}

export const PoolRow = ({
  name,
  tvl,
  apy,
  poolType,
  index,
}: Props) => {
  const mobileDevice = useMediaQuery("(max-width: 768px)");
  return (
    <motion.div
      transition={{ delay: 0.2 + index / 50 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="PoolRow"
    >
      <div className="MobilePoolInfo">
        {poolType === "Stable Pool" && <CurvePoolLabel />}
        {poolType === "Uni V2" && <UniV2PoolLabel />}
        {poolType === "Uni V3" && <UniV3PoolLabel/>}
      </div>
      <div className="PoolDetailsContainer">
        <div className="TokenDetailsContainer">
          <div className="PoolName">
            {name}
          </div>
          <div className="PoolInfo">
          {poolType === "Stable Pool" && <CurvePoolLabel />}
          {poolType === "Uni V2" && <UniV2PoolLabel />}
          {poolType === "Uni V3" && <UniV3PoolLabel/>}
          </div>
        </div>
      </div>
      <div className="PoolTVLContainer">
        <span className="Label">TVL</span>
        <span className="TVLValue">${Number(tvl).toLocaleString()}</span>
      </div>
      <div className="APYContainer">
        <span className="Label">APY</span>
        <div className="APYValueContainer">
          <span className="APYValue">{apy.toFixed(2)}%</span>
        </div>
      </div>
    </motion.div>
  );
};
