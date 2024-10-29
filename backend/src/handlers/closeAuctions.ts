import { Auction, Bid, User } from "../db/schema";

export async function closeAuctions(db: D1Database) {
  console.log("CRON task started...");
  const currentTime = new Date().toISOString();
  console.log("Current time: " + currentTime);

  // Fetch auctions that are open and have ended
  const auctionsToClose = await db
    .prepare(`SELECT * FROM auctions WHERE status = 'OPEN' AND endAt <= ?`)
    .bind(currentTime)
    .all();

  for (const auction of auctionsToClose.results as Auction[]) {
    console.log("*********************************");
    const bids = await db
      .prepare(`SELECT user_id, amount FROM bids WHERE auction_id = ?`)
      .bind(auction.id)
      .all();

    const bidAmounts: number[] = bids?.results?.map(
      (bid) => bid.amount
    ) as number[];
    console.log(`Auction ${auction.title}, bids ${bidAmounts}`);
    const highestBidAmount = Math.max(...bidAmounts);
    console.log(`Highest bid amount ${highestBidAmount}`);
    const winningBid: Bid = bids?.results?.find(
      (bid) => bid.amount === highestBidAmount
    ) as Bid;

    if (winningBid) {
      const winner: User = (await db
        .prepare(`SELECT name FROM users WHERE id = ?`)
        .bind(winningBid.user_id)
        .first()) as User;
  
      console.log(`Winner ${winner.name}, amount is ${highestBidAmount}`);
      await db
        .prepare(`UPDATE auctions SET status = 'CLOSED', winner_user_name = ?, winning_amount = ? WHERE id = ?`)
        .bind(winner.name, highestBidAmount, auction.id)
        .run();
    } else {
      await db
        .prepare(`UPDATE auctions SET status = 'CLOSED' WHERE id = ?`)
        .bind(auction.id)
        .run();
    }
    console.log(`******** closed auction ${auction.title} ********`);
  }
  console.log("CRON task finished");
}
