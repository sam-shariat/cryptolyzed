import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Overview.module.css'
import { useState, useEffect } from "react";
import { Flipside, Query, QueryResultSet } from "@flipsidecrypto/sdk";



export default function Overview() {

    const flipside = new Flipside(
        "d0709327-3a14-45e6-99cc-e1e381800d62",
        "https://node-api.flipsidecrypto.com"
      );
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const query = {
        sql: `SELECT 
        avg(polygon.blocks) AS polygon_blocks_per_day,
        sum(polygon.blocks) AS polygon_total_blocks,
        avg(polygon.txs) AS polygon_txs_per_day,
        sum(polygon.txs) AS polygon_total_txs,
        avg(polygon.tpb) AS polygon_avg_tpb,
        avg(polygon.tps) AS polygon_avg_tps,
        sum(polygon.tx_fees) AS polygon_tx_fees,
        avg(polygon.avg_fee) AS polygon_avg_fee,
        avg(polygon.users) AS polygon_users_per_day,
      
        avg(ethereum.blocks) AS ethereum_blocks_per_day,
        sum(ethereum.blocks) AS ethereum_total_blocks,
        avg(ethereum.txs) AS ethereum_txs_per_day,
        sum(ethereum.txs) AS ethereum_total_txs,
        avg(ethereum.tpb) AS ethereum_avg_tpb,
        avg(ethereum.tps) AS ethereum_avg_tps,
        sum(ethereum.tx_fees) AS ethereum_tx_fees,
        avg(ethereum.avg_fee) AS ethereum_avg_fee,
        avg(ethereum.users) AS ethereum_users_per_day,
        
        avg(arbitrum.blocks) AS arbitrum_blocks_per_day,
        sum(arbitrum.blocks) AS arbitrum_total_blocks,
        avg(arbitrum.txs) AS arbitrum_txs_per_day,
        sum(arbitrum.txs) AS arbitrum_total_txs,
        avg(arbitrum.tpb) AS arbitrum_avg_tpb,
        avg(arbitrum.tps) AS arbitrum_avg_tps,
        sum(arbitrum.tx_fees) AS arbitrum_tx_fees,
        avg(arbitrum.avg_fee) AS arbitrum_avg_fee,
        avg(arbitrum.users) AS arbitrum_users_per_day,
        
        avg(bsc.blocks) AS bsc_blocks_per_day,
        sum(bsc.blocks) AS bsc_total_blocks,
        avg(bsc.txs) AS bsc_txs_per_day,
        sum(bsc.txs) AS bsc_total_txs,
        avg(bsc.tpb) AS bsc_avg_tpb,
        avg(bsc.tps) AS bsc_avg_tps,
        sum(bsc.tx_fees) AS bsc_tx_fees,
        avg(bsc.avg_fee) AS bsc_avg_fee,
        avg(bsc.users) AS bsc_users_per_day,
      
        avg(optimism.blocks) AS optimism_blocks_per_day,
        sum(optimism.blocks) AS optimism_total_blocks,
        avg(optimism.txs) AS optimism_txs_per_day,
        sum(optimism.txs) AS optimism_total_txs,
        avg(optimism.tpb) AS optimism_avg_tpb,
        avg(optimism.tps) AS optimism_avg_tps,
        sum(optimism.tx_fees) AS optimism_tx_fees,
        avg(optimism.avg_fee) AS optimism_avg_fee,
        avg(optimism.users) AS optimism_users_per_day,
        
        avg(flow.blocks) AS flow_blocks_per_day,
        sum(flow.blocks) AS flow_total_blocks,
        avg(flow.txs) AS flow_txs_per_day,
        sum(flow.txs) AS flow_total_txs,
        avg(flow.tpb) AS flow_avg_tpb,
        avg(flow.tps) AS flow_avg_tps,
        sum(flow.tx_fees) AS flow_tx_fees,
        avg(flow.avg_fee) AS flow_avg_fee,
        avg(flow.users) AS flow_users_per_day,
      
        avg(algorand.blocks) AS algorand_blocks_per_day,
        sum(algorand.blocks) AS algorand_total_blocks,
        avg(algorand.txs) AS algorand_txs_per_day,
        sum(algorand.txs) AS algorand_total_txs,
        avg(algorand.tpb) AS algorand_avg_tpb,
        avg(algorand.tps) AS algorand_avg_tps,
        sum(algorand.tx_fees) AS algorand_tx_fees,
        avg(algorand.avg_fee) AS algorand_avg_fee,
        avg(algorand.users) AS algorand_users_per_day,
      
        avg(solana.blocks) AS solana_blocks_per_day,
        sum(solana.blocks) AS solana_total_blocks,
        avg(solana.txs) AS solana_txs_per_day,
        sum(solana.txs) AS solana_total_txs,
        avg(solana.tpb) AS solana_avg_tpb,
        avg(solana.tps) AS solana_avg_tps,
        sum(solana.tx_fees) AS solana_tx_fees,
        avg(solana.avg_fee) AS solana_avg_fee,
        avg(solana.users) AS solana_users_per_day
        
      FROM 
      (
        SELECT 
        block_timestamp::date as date, 
        COUNT(DISTINCT block_number) AS blocks,
        COUNT(tx_hash) AS txs,
        txs/blocks AS tpb,
        txs/86400 AS tps,
        sum(tx_fee) as tx_fees,
        avg(tx_fee) as avg_fee,
        count(DISTINCT from_address) as users
        FROM polygon.core.fact_transactions
        WHERE block_timestamp::date > current_date - 7
        GROUP BY date
      ) polygon
      LEFT JOIN
      (
        SELECT block_timestamp::date as date, 
        COUNT(DISTINCT block_number) AS blocks,
        COUNT(tx_hash) AS txs,
        txs/blocks AS tpb,
        txs/86400 AS tps,
        sum(tx_fee) as tx_fees,
        avg(tx_fee) as avg_fee,
        count(DISTINCT from_address) as users
        FROM ethereum.core.fact_transactions
        WHERE (block_timestamp::date > current_date - 7)
        GROUP BY date
      ) ethereum
      ON (polygon.date = ethereum.date) 
      LEFT JOIN
      (
        SELECT block_timestamp::date as date, 
        COUNT(DISTINCT block_number) AS blocks,
        COUNT(tx_hash) AS txs,
        txs/blocks AS tpb,
        txs/86400 AS tps,
        sum(tx_fee) as tx_fees,
        avg(tx_fee) as avg_fee,
        count(DISTINCT from_address) as users
        FROM BSC.core.fact_transactions
        WHERE (block_timestamp::date > current_date - 7)
        GROUP BY date
      ) bsc
      ON (polygon.date = bsc.date) 
      LEFT JOIN
      (
        SELECT block_timestamp::date as date, 
        COUNT(DISTINCT block_number) AS blocks,
        COUNT(tx_hash) AS txs,
        txs/blocks AS tpb,
        txs/86400 AS tps,
        sum(tx_fee) as tx_fees,
        avg(tx_fee) as avg_fee,
        count(DISTINCT from_address) as users
        FROM arbitrum.core.fact_transactions
        WHERE (block_timestamp::date > current_date - 7)
        GROUP BY date
      ) arbitrum
      ON (polygon.date = arbitrum.date) 
      LEFT JOIN
      (
        SELECT block_timestamp::date as date, 
        COUNT(DISTINCT block_number) AS blocks,
        COUNT(tx_hash) AS txs,
        txs/blocks AS tpb,
        txs/86400 AS tps,
        sum(tx_fee) as tx_fees,
        avg(tx_fee) as avg_fee,
        count(DISTINCT from_address) as users
        FROM optimism.core.fact_transactions
        WHERE (block_timestamp::date > current_date - 7)
        GROUP BY date
      ) optimism
      ON (polygon.date = optimism.date) 
      LEFT JOIN
      (
        SELECT block_timestamp::date as date, 
        COUNT(DISTINCT block_height) AS blocks,
        COUNT(tx_id) AS txs,
        txs/blocks AS tpb,
        txs/86400 AS tps,
        0 as tx_fees,
        0 as avg_fee,
        count(DISTINCT payer) as users
        FROM flow.core.fact_transactions
        WHERE (block_timestamp::date > current_date - 7)
        GROUP BY date
      ) flow
      ON (polygon.date = flow.date) 
      LEFT JOIN
      (
        SELECT block_timestamp::date as date, 
        COUNT(DISTINCT block_id) AS blocks,
        COUNT(tx_id) AS txs,
        txs/blocks AS tpb,
        txs/86400 AS tps,
        sum(fee) as tx_fees,
        avg(fee) as avg_fee,
        count(DISTINCT sender) as users
        FROM flipside_prod_db.algorand.transactions
        WHERE (block_timestamp::date > current_date - 7)
        GROUP BY date
      ) algorand
      ON (polygon.date = algorand.date) 
      LEFT JOIN
      (
        SELECT block_timestamp::date as date, 
        COUNT(DISTINCT block_id) AS blocks,
        COUNT(tx_id) AS txs,
        txs/blocks AS tpb,
        txs/86400 AS tps,
        sum(fee) as tx_fees,
        avg(fee) as avg_fee,
        count(DISTINCT signers[0]) as users
        FROM solana.core.fact_transactions
        WHERE (block_timestamp::date > current_date - 7)
        GROUP BY date
      ) solana
      ON (polygon.date = solana.date) 
      group by null`,
        ttlMinutes: 10,
      };
      
      // Send the `Query` to Flipside's query engine and await the results
      
      /*const fetchMyAPI = (async () => {
        let response = await flipside.query.run(query);
        response.records.map((record) => {
            console.log('data is here');
            console.log(record);
            setData(record);
            setLoading(false)
          });
      }, [])
    
      useEffect(() => {
        setLoading(true)
        fetchMyAPI()
      }, [fetchMyAPI])

      */

      useEffect(() => {
        const getData = async () => {
            setLoading(true)
            const result = await flipside.query.run(query);
            console.log('data is here');
            console.log(result);
            setData(result);
            setLoading(false)
        };
      
        getData(); // run it, run it
      
        return () => {
          // this now gets called when the component unmounts
        };
      }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Cryptolyzed - Overview</title>
        <meta name="description" content="Crypto Analytics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Overview
        </h1>
        <div className='spaceh'></div>
        <div className={styles.grid}>
          <a href="/ethereum" className={styles.card}>
            <h2>Ethereum &rarr;</h2>
            <p></p>
          </a>

          <a href="/polygon" className={styles.card}>
            <h2>Polygon &rarr;</h2>
            <p></p>
          </a>

          <a
            href="/algorand"
            className={styles.card}
          >
            <h2>Algorand &rarr;</h2>
            <p></p>
          </a>

          <a
            href="/Solana"
            className={styles.card}
          >
            <h2>Solana &rarr;</h2>
            <p>
            
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://cryptolyzed.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
