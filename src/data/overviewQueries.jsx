import chains from "./chains";

const txs_query =({days,selectedChains})=> 
{
    console.log(selectedChains);
    const columns = selectedChains.map((chn) => 
    `sum(${chains[chn].name.toLowerCase()}.blocks) AS ${chains[chn].name.toLowerCase()}_total_blocks,
    avg(${chains[chn].name.toLowerCase()}.blocks) AS ${chains[chn].name.toLowerCase()}_blocks_per_day,
    sum(${chains[chn].name.toLowerCase()}.txs) AS ${chains[chn].name.toLowerCase()}_total_txs,
    avg(${chains[chn].name.toLowerCase()}.txs) AS ${chains[chn].name.toLowerCase()}_txs_per_day,
    avg(${chains[chn].name.toLowerCase()}.tpb) AS ${chains[chn].name.toLowerCase()}_avg_tpb,
    avg(${chains[chn].name.toLowerCase()}.tps) AS ${chains[chn].name.toLowerCase()}_avg_tps,
    sum(${chains[chn].name.toLowerCase()}.tx_fees) AS ${chains[chn].name.toLowerCase()}_tx_fees,
    avg(${chains[chn].name.toLowerCase()}.avg_fee) AS ${chains[chn].name.toLowerCase()}_avg_fee,
    avg(${chains[chn].name.toLowerCase()}.users) AS ${chains[chn].name.toLowerCase()}_users_per_day`
    );

    let tables = `(
        SELECT 
        block_timestamp::date as date, 
        COUNT(DISTINCT block_number) AS blocks,
        COUNT(tx_hash) AS txs,
        txs/blocks AS tpb,
        txs/86400 AS tps,
        sum(tx_fee) as tx_fees,
        avg(tx_fee) as avg_fee,
        count(DISTINCT from_address) as users
        FROM ethereum.core.fact_transactions
        WHERE block_timestamp > current_date - ${days} and block_timestamp < current_date
        GROUP BY date
        ) ethereum `;

    if(chains[selectedChains.indexOf(1)]){
        tables += `LEFT JOIN
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
        WHERE block_timestamp > current_date - ${days} and block_timestamp < current_date
        GROUP BY date
        ) bsc
        ON (${chains[selectedChains[0]].name}.date = bsc.date)`
    }

    if(chains[selectedChains.indexOf(2)]){
        tables += `LEFT JOIN
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
        WHERE block_timestamp > current_date - ${days} and block_timestamp < current_date
        GROUP BY date
        ) algorand
        ON (${chains[selectedChains[0]].name}.date = algorand.date) `
    }

    if(chains[selectedChains.indexOf(3)]){
        tables += `LEFT JOIN
        (
        SELECT block_timestamp::date as date, 
        COUNT(DISTINCT block_id) AS blocks,
        COUNT(tx_id) AS txs,
        txs/blocks AS tpb,
        txs/86400 AS tps,
        sum(fee)/pow(10, 9) as tx_fees,
        avg(fee)/pow(10, 9) as avg_fee,
        count(DISTINCT signers[0]) as users
        FROM solana.core.fact_transactions
        WHERE block_timestamp > current_date - ${days} and block_timestamp < current_date
        GROUP BY date
        ) solana
        ON (${chains[selectedChains[0]].name}.date = solana.date)`
    }

    if(chains[selectedChains.indexOf(4)]){
        tables += `LEFT JOIN
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
        WHERE block_timestamp > current_date - ${days} and block_timestamp < current_date
        GROUP BY date
        ) flow
        ON (${chains[selectedChains[0]].name}.date = flow.date)`
    }

    if(chains[selectedChains.indexOf(5)]){
        tables += `LEFT JOIN
        (
        SELECT block_timestamp::date as date, 
        COUNT(DISTINCT block_number) AS blocks,
        COUNT(tx_hash) AS txs,
        txs/blocks AS tpb,
        txs/86400 AS tps,
        sum(tx_fee) as tx_fees,
        avg(tx_fee) as avg_fee,
        count(DISTINCT from_address) as users
        FROM polygon.core.fact_transactions
        WHERE block_timestamp > current_date - ${days} and block_timestamp < current_date
        GROUP BY date
        ) polygon
        ON (${chains[selectedChains[0]].name}.date = polygon.date) `
    }

    if(chains[selectedChains.indexOf(6)]){
        tables += `LEFT JOIN
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
        WHERE block_timestamp > current_date - ${days} and block_timestamp < current_date
        GROUP BY date
        ) arbitrum
        ON (${chains[selectedChains[0]].name}.date = arbitrum.date) `
    }

    if(chains[selectedChains.indexOf(7)]){
        tables += `LEFT JOIN
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
        WHERE block_timestamp > current_date - ${days} and block_timestamp < current_date
        GROUP BY date
        ) optimism
        ON (${chains[selectedChains[0]].name}.date = optimism.date) `
    }


    const query = `SELECT 
    ${columns.join(',')}
    FROM 
    ${tables}
    group by null`;
    
    return query;    
}

const blocktime_query = ({days,selectedChains}) => {

    const columns = selectedChains.map((chn) => 
    `avg(${chains[chn].name.toLowerCase()}.AVG_block_time_defference) as ${chains[chn].name.toLowerCase()}_avg_block_time,
    max(${chains[chn].name.toLowerCase()}.Max_between_block_time) as ${chains[chn].name.toLowerCase()}_max_block_time,
    min(${chains[chn].name.toLowerCase()}.Min_between_block_time) as ${chains[chn].name.toLowerCase()}_min_block_time`
    );

    let tables = `(
        SELECT 
        b.block_timestamp::date as date,
        AVG(DATEDIFF(SECOND, a.block_timestamp, b.block_timestamp)) as AVG_block_time_defference,
        Max(DATEDIFF(SECOND, a.block_timestamp, b.block_timestamp)) as Max_between_block_time,
        Min(DATEDIFF(SECOND, a.block_timestamp, b.block_timestamp)) as Min_between_block_time
        FROM ethereum.core.fact_blocks a
        JOIN ethereum.core.fact_blocks b
        on a.block_number = b.block_number - 1
        where b.block_timestamp > current_date - ${days} and b.block_timestamp < current_date
        group by b.block_timestamp::date
      ) ethereum `;

    if(chains[selectedChains.indexOf(1)]){
        tables += `LEFT JOIN
        (
          SELECT 
          b.block_timestamp::date as date,
          AVG(DATEDIFF(SECOND, a.block_timestamp, b.block_timestamp)) as AVG_block_time_defference,
          Max(DATEDIFF(SECOND, a.block_timestamp, b.block_timestamp)) as Max_between_block_time,
          Min(DATEDIFF(SECOND, a.block_timestamp, b.block_timestamp)) as Min_between_block_time
          FROM bsc.core.fact_blocks a
          JOIN bsc.core.fact_blocks b
          on a.block_number = b.block_number - 1
          where b.block_timestamp > current_date - ${days} and b.block_timestamp < current_date
          group by b.block_timestamp::date
        ) bsc
        ON (${chains[selectedChains[0]].name}.date = bsc.date) `
    }

    if(chains[selectedChains.indexOf(2)]){
        tables += `LEFT JOIN
        (
          SELECT 
          b.block_timestamp::date as date,
          AVG(DATEDIFF(SECOND, a.block_timestamp, b.block_timestamp)) as AVG_block_time_defference,
          Max(DATEDIFF(SECOND, a.block_timestamp, b.block_timestamp)) as Max_between_block_time,
          Min(DATEDIFF(SECOND, a.block_timestamp, b.block_timestamp)) as Min_between_block_time
          FROM Algorand.block a
          JOIN Algorand.block b
          on a.block_id = b.block_id - 1
          where b.block_timestamp > current_date - ${days} and b.block_timestamp < current_date
          group by b.block_timestamp::date
        ) algorand
        ON (${chains[selectedChains[0]].name}.date = algorand.date) `
    }

    if(chains[selectedChains.indexOf(3)]){
        tables += `LEFT JOIN
        (
          SELECT 
          b.block_timestamp::date as date,
          AVG(DATEDIFF(SECOND, a.block_timestamp, b.block_timestamp)) as AVG_block_time_defference,
          Max(DATEDIFF(SECOND, a.block_timestamp, b.block_timestamp)) as Max_between_block_time,
          Min(DATEDIFF(SECOND, a.block_timestamp, b.block_timestamp)) as Min_between_block_time
          FROM solana.core.fact_blocks a
          JOIN solana.core.fact_blocks b
          on a.block_id = b.block_id - 1
          where b.block_timestamp > current_date - ${days} and b.block_timestamp < current_date
          group by b.block_timestamp::date
        ) solana
        ON (${chains[selectedChains[0]].name}.date = solana.date) `
    }

    if(chains[selectedChains.indexOf(4)]){
        tables += `LEFT JOIN
        (
          SELECT 
          b.block_timestamp::date as date,
          AVG(DATEDIFF(SECOND, a.block_timestamp, b.block_timestamp)) as AVG_block_time_defference,
          Max(DATEDIFF(SECOND, a.block_timestamp, b.block_timestamp)) as Max_between_block_time,
          Min(DATEDIFF(SECOND, a.block_timestamp, b.block_timestamp)) as Min_between_block_time
          FROM flow.core.fact_blocks a
          JOIN flow.core.fact_blocks b
          on a.block_height = b.block_height - 1
          where b.block_timestamp > current_date - ${days} and b.block_timestamp < current_date
          group by b.block_timestamp::date
        ) flow
        ON (${chains[selectedChains[0]].name}.date = flow.date) `
    }

    if(chains[selectedChains.indexOf(5)]){
        tables += `LEFT JOIN
        (
            SELECT 
            b.block_timestamp::date as date,
            AVG(DATEDIFF(SECOND, a.block_timestamp, b.block_timestamp)) as AVG_block_time_defference,
            Max(DATEDIFF(SECOND, a.block_timestamp, b.block_timestamp)) as Max_between_block_time,
            Min(DATEDIFF(SECOND, a.block_timestamp, b.block_timestamp)) as Min_between_block_time
            FROM polygon.core.fact_blocks a
            JOIN polygon.core.fact_blocks b
            on a.block_number = b.block_number - 1
            where b.block_timestamp > current_date - ${days} and b.block_timestamp < current_date
            group by b.block_timestamp::date
          ) polygon
        ON (${chains[selectedChains[0]].name}.date = polygon.date) `
    }

    if(chains[selectedChains.indexOf(6)]){
        tables += `LEFT JOIN
        (
            SELECT 
            b.block_timestamp::date as date,
            AVG(DATEDIFF(SECOND, a.block_timestamp, b.block_timestamp)) as AVG_block_time_defference,
            Max(DATEDIFF(SECOND, a.block_timestamp, b.block_timestamp)) as Max_between_block_time,
            Min(DATEDIFF(SECOND, a.block_timestamp, b.block_timestamp)) as Min_between_block_time
            FROM arbitrum.core.fact_blocks a
            JOIN arbitrum.core.fact_blocks b
            on a.block_number = b.block_number - 1
            where b.block_timestamp > current_date - ${days} and b.block_timestamp < current_date
            group by b.block_timestamp::date
          ) arbitrum
        ON (${chains[selectedChains[0]].name}.date = arbitrum.date) `
    }

    if(chains[selectedChains.indexOf(7)]){
        tables += `LEFT JOIN
        (
            SELECT 
            b.block_timestamp::date as date,
            AVG(DATEDIFF(SECOND, a.block_timestamp, b.block_timestamp)) as AVG_block_time_defference,
            Max(DATEDIFF(SECOND, a.block_timestamp, b.block_timestamp)) as Max_between_block_time,
            Min(DATEDIFF(SECOND, a.block_timestamp, b.block_timestamp)) as Min_between_block_time
            FROM optimism.core.fact_blocks a
            JOIN optimism.core.fact_blocks b
            on a.block_number = b.block_number - 1
            where b.block_timestamp > current_date - ${days} and b.block_timestamp < current_date
            group by b.block_timestamp::date
          ) optimism
        ON (${chains[selectedChains[0]].name}.date = optimism.date) `
    }

    const query = `SELECT 
    ${columns.join(',')}
    FROM 
    ${tables}
    group by null`;
    return query
}

export { txs_query , blocktime_query };