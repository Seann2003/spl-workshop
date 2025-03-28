/*
 * Setup Umi client, you can choose to use the default Umi client or create your own
 */
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { connection, myKeyPair } from "./constant.ts";
import { fromWeb3JsKeypair } from "@metaplex-foundation/umi-web3js-adapters";
import dotenv from "dotenv";

dotenv.config();
export function setupUmiClient() {
  const umi = createUmi(connection.rpcEndpoint);
  const umiSigner = createSignerFromKeypair(umi, fromWeb3JsKeypair(myKeyPair));
  umi.use(signerIdentity(umiSigner));

  return { umi, umiSigner };
}
