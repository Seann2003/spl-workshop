import { AccountLayout, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import { connection } from "../utils/constant.ts";

(async () => {
  const tokenAccounts = await connection.getTokenAccountsByOwner(
    new PublicKey("CUn6pWkWMKhDGcpK1qUSfyyNnncqvMmoN5QeS4PUAJ7E"),
    {
      programId: TOKEN_PROGRAM_ID,
    }
  );

  console.log("Token                                         Balance");
  console.log("------------------------------------------------------------");
  tokenAccounts.value.forEach((tokenAccount) => {
    const accountData = AccountLayout.decode(tokenAccount.account.data);
    console.log(`${new PublicKey(accountData.mint)}   ${accountData.amount}`);
  });
})();
