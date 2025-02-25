"use client"
import "./styles.scss";
import { PoolsTable } from "../../components/PoolsTable";
const Nori = require("nori-sdk").Nori;
import { useEffect, useState } from "react";
import { Pool } from "../../store/Types/pools";

export default function Page() {
    const [pools,setPools]=useState<Pool[]>([]);
    const [loading,setLoading]=useState<boolean>(true);
    const sdk = new Nori()
    useEffect(()=>{
        async function fetchPools(){
            const data = await sdk.pool.getPools({ chainId: 7000 });
            setPools(data.pools);
            setLoading(false)
        }
        fetchPools()
    },[])

  return (
    <main className="PoolsWrapper">
        <PoolsTable data={pools} loading={loading} error={false}/>
    </main>
  );
}
