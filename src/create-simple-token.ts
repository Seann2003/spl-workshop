import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
} from "@solana/spl-token";
import { connection, myKeyPair } from "../utils/constant.ts";
import { Keypair } from "@solana/web3.js";

(async () => {
  const mintAuthority = Keypair.generate();
  const freezeAuthority = Keypair.generate();
  const mint = await createMint(
    connection,
    myKeyPair,
    mintAuthority.publicKey,
    freezeAuthority.publicKey,
    9
  );
  console.log(
    `https://explorer.solana.com/address/${mint.toBase58()}?cluster=devnet`
  );
  // Step 2: Mint some tokens to your wallet
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    myKeyPair,
    mint,
    myKeyPair.publicKey
  );
  const tx = await mintTo(
    connection,
    myKeyPair,
    mint,
    tokenAccount.address,
    mintAuthority,
    10_000
  );
  console.log(`https://explorer.solana.com/transaction/${tx}?cluster=devnet`);
  return mint;
})();
