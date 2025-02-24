"use client"
import "./styles.scss";
import { PoolsTable } from "@/components/PoolsTable";
import { Eddy } from "../../../node_modules/test-sdk-eddy/dist"
import { useEffect, useState } from "react";
import { Pool } from "@/store/Types/pools";


export default function Page() {
    const [pools,setPools]=useState<Pool[]>([]);
    const [loading,setLoading]=useState<boolean>(true);
    const sdk = new Eddy()
    useEffect(()=>{
        async function fetchPools(){
            const data = await sdk.pool.getPools({ chainId: 7000 });
            console.log(data)
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
