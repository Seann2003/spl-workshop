import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import { connection, myKeyPair } from "../utils/constant.ts";
import { PublicKey } from "@solana/web3.js";

const transferTokens = async (
  tokenMint: PublicKey,
  recipientAddress: PublicKey,
  amount: number
) => {
  try {
    const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      myKeyPair,
      tokenMint,
      myKeyPair.publicKey
    );

    const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      myKeyPair,
      tokenMint,
      recipientAddress
    );

    // Transfer tokens
    const transferTx = await transfer(
      connection,
      myKeyPair,
      senderTokenAccount.address,
      recipientTokenAccount.address,
      myKeyPair,
      amount
    );
    const tokenBalance = await connection.getTokenAccountBalance(
      senderTokenAccount.address
    );
    console.log("balance", tokenBalance);
    return transferTx;
  } catch (error) {
    console.error("Error transferring tokens:", error);
    throw error;
  }
};

// Example usage
(async () => {
  const tokenMint = new PublicKey(
    "69LAnxkGXjSK12eCjzZUhDj43HeUFnaVxiuMMdTAGT1y"
  );
  const recipientAddress = new PublicKey(
    "DC6pMzwfKy6MAvjfueeZNYWyRrQGhZb8M5VY8KtZtifR"
  );
  const amount = 100_000_000;
  await transferTokens(tokenMint, recipientAddress, amount);
})();
