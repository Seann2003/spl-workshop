import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { myKeyPair } from "./utils/constant.ts";

const connection = new Connection("https://api.devnet.solana.com");

(async () => {
  try {
    const txhash = await connection.requestAirdrop(
      myKeyPair.publicKey,
      2 * LAMPORTS_PER_SOL
    );
    console.log(
      `Success! Check out your TX here: https://explorer.solana.com/tx/${txhash}?cluster=devnet`
    );
  } catch (e) {
    console.error(`Oops something went wrong: ${e}`);
  }
})();
