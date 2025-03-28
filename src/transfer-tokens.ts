import {
  createAssociatedToken,
  findAssociatedTokenPda,
  mplToolbox,
  transferTokens,
} from "@metaplex-foundation/mpl-toolbox";
import { publicKey } from "@metaplex-foundation/umi";
import { base58 } from "@metaplex-foundation/umi/serializers";
import fs from "fs";
import { setupUmiClient } from "../utils/setupClient.ts";
import { connection } from "../utils/constant.ts";
import { PublicKey } from "@solana/web3.js";
import { getAccount } from "@solana/spl-token";

const transferSplTokens = async () => {
  const { umi } = setupUmiClient();
  umi.use(mplToolbox());

  // The address of the Token you want to transfer.
  const splToken = publicKey("GRiexnEHDcErgSJouKVba744dtqA7yuzTcGyuCdX4r6q");

  // The address of the wallet you want to transfer the Token to.
  const destinationWallet = publicKey(
    "EqmjJKnLAJfZHaUoHjDLB68x9KQmisYzT8AAPHpMEb1"
  );

  // Find the associated token account for the SPL Token on the senders wallet.
  const sourceTokenAccount = findAssociatedTokenPda(umi, {
    mint: splToken,
    owner: umi.identity.publicKey,
  });

  // Find the associated token account for the SPL Token on the receivers wallet.
  const destinationTokenAccount = findAssociatedTokenPda(umi, {
    mint: splToken,
    owner: destinationWallet,
  });

  //   try {
  //     const senderAccount = await getAccount(
  //       connection,
  //       new PublicKey(sourceTokenAccount[0])
  //     );
  //     console.log("Sender's ATA exists:", senderAccount.address.toBase58());
  //   } catch (err) {
  //     console.log(
  //       "Sender does not have an Associated Token Account for this token."
  //     );
  //     return;
  //   }

  //   try {
  //     const receiverAccount = await getAccount(
  //       connection,
  //       new PublicKey(destinationTokenAccount[0])
  //     );
  //     console.log("Receiver's ATA exists:", receiverAccount.address.toBase58());
  //   } catch (err) {
  //     console.log(
  //       "Receiver does not have an Associated Token Account for this token yet."
  //     );
  //     await createAssociatedToken(umi, {
  //       mint: splToken,
  //       owner: destinationWallet,
  //     }).sendAndConfirm(umi);
  //   }

  const tokenBalance = await connection.getTokenAccountBalance(
    new PublicKey(sourceTokenAccount[0])
  );
  console.log("balance", tokenBalance.value.amount);
  // Finally we can deserialize the signature that we can check on chain.
  const signature = base58.deserialize(res.signature)[0];

  // Log out the signature and the links to the transaction and the NFT.
  console.log("View Transaction on Solana Explorer: ");
  console.log(`https://explorer.solana.com/tx/${signature}?cluster=devnet`);
};

transferSplTokens();
