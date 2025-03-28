import { Connection, Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import dotenv from "dotenv";

dotenv.config();
export const connection = new Connection(
  "https://api.devnet.solana.com",
  "confirmed"
);

export const myKeyPair = Keypair.fromSecretKey(
  new Uint8Array(bs58.decode(process.env.SOLANA_PRIVATE_KEY!))
);
