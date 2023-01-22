const highestSalesNftCollections =({days,limit=10})=> 
{
    const query = `select 
    nft_address,
    project_name,
    count(tx_hash) as tx_count,
    sum(price_usd) as amount
  from ethereum.core.ez_nft_sales
  where event_type='sale'
    and price > 0 
    and price_usd > 0
    and block_timestamp > current_date - ${days} and block_timestamp < current_date
    group by 1,2
  order by amount desc
  limit ${limit}`;
    return query;    
}

const nftCollectionSales =({days,address})=> 
{
    const query = `SELECT 
    sum(price_usd) sales_amount,
    sum(tx_fee_usd) total_fees,
    avg(price_usd) as avg_sales_amount,
    min(price_usd) as min_sold_amount,
    max(price_usd) as max_sold_amount,
    median(price_usd) as median_sold_amount,
    count(distinct tx_hash) as sales,
    count(distinct tokenid) as nfts,
    count(distinct buyer_address) as buyers,
    count(distinct seller_address) as sellers
  from ethereum.core.ez_nft_sales
    where nft_address='${address}'
    and event_type = 'sale'
    and price_usd > 0
    and block_timestamp > current_date - ${days} and block_timestamp < current_date
  group by nft_address`;
    return query;    
}

const nftCollectionHolders =({days,address,limit=10,order='nfts'})=> 
{
    const query = `with collection_data as (
        SELECT *
      from ethereum.core.ez_nft_sales 
        where nft_address='${address}'
        and event_type = 'sale'
        and price_usd > 0
        and block_timestamp > current_date - ${days} and block_timestamp < current_date
      ),
        nft_holders as (
        select 
        tokenid,
        price_usd,
        buyer_address as holder_address
        from collection_data
        qualify row_number() over (partition by tokenid order by block_timestamp desc) = 1
        )
      
      select holder_address,
      count(distinct tokenid) as nfts,
      sum(price_usd) as amount
      from nft_holders
      group by holder_address
      order by ${order} desc
      limit ${limit}`;
    return query;    
}

const nftCollectionTraders =({days,address,limit=10})=> 
{
    const query = `with sell_data as (SELECT 
        seller_address,
        price_usd,
        tokenid
      from ethereum.core.ez_nft_sales 
        where nft_address='${address}'
        and event_type = 'sale'
        and price_usd > 0
        and block_timestamp > current_date - ${days} and block_timestamp < current_date),
      buy_data as (SELECT 
        buyer_address,
          price_usd,
        tokenid
      from ethereum.core.ez_nft_sales
      where nft_address='${address}'
      and event_type = 'sale'
      and price_usd > 0
      and block_timestamp > current_date - ${days} and block_timestamp < current_date),
      
      mixed_data as (
        select 
        s.seller_address,
        s.tokenid,
        s.price_usd as sale_price,
        b.price_usd as buy_price
        from sell_data as s
        left join buy_data as b
        on b.buyer_address = s.seller_address
        and b.tokenid = s.tokenid
      ),
      
      final_data as (
        SELECT 
        seller_address,
        tokenid,
        CASE
        when buy_price is null then sale_price
        when buy_price is not null then (sale_price - buy_price)
        end as profit
        from mixed_data
      where sale_price is not null)
      
      SELECT
      seller_address as trader,
      count(distinct tokenid) as nfts,
      sum(profit) as total_profit
      from final_data
      group by seller_address
      order by total_profit DESC
        limit ${limit}`;
    return query;    
}

const nftHoldersByCategory =({address})=> 
{
    const query = `SELECT
    case 
      when current_bal_unadj = 1 then 'Wallets Holding 1 NFT'
      when current_bal_unadj BETWEEN 1 and 10 then 'Wallets Holding 1-10 NFTs'
      when current_bal_unadj BETWEEN 10 and 50 then 'Wallets Holding 10-50 NFTs'
      when current_bal_unadj BETWEEN 50 and 100 then 'Wallets Holding 50-100 NFTs'
      when current_bal_unadj BETWEEN 100 and 200 then 'Wallets Holding 100-200 NFTs'
      when current_bal_unadj > 200 then 'Wallets Holding 200+ NFTs'
    end as category,
      count(distinct user_Address) as holders
  from ethereum.core.ez_current_balances 
    where contract_address = '${address}'
  and current_bal_unadj > 0
  GROUP by 1
  ORDER by 1`;
    return query;    
}

export { 
    highestSalesNftCollections, 
    nftCollectionSales, 
    nftCollectionHolders, 
    nftCollectionTraders,
    nftHoldersByCategory };