import {
  createAndMint,
  mplTokenMetadata,
  TokenStandard,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  base58,
  createGenericFile,
  generateSigner,
  percentAmount,
} from "@metaplex-foundation/umi";
import { readFileSync } from "fs";
import { setupUmiClient } from "../utils/setupClient.ts";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";

(async () => {
  const { umi } = setupUmiClient();
  umi.use(mplTokenMetadata()).use(irysUploader());
  const mint = generateSigner(umi);
  const imageFile = readFileSync("");

  const umiImageFile = createGenericFile(imageFile, "", {
    tags: [{ name: "contentType", value: "image/png" }],
  });

  const imageUri = await umi.uploader.upload([umiImageFile]).catch((err) => {
    throw new Error(err);
  });
  console.log(imageUri[0]);

  const metadata = {
    name: "Test",
    symbol: "OSAD",
    description: "testing token",
    image: imageUri,
  };

  //   const testUri =
  //     "https://raw.githubusercontent.com/solana-developers/program-examples/new-examples/tokens/tokens/.assets/spl-token.json";

  const metadataUri = await umi.uploader.uploadJson(metadata).catch((err) => {
    throw new Error(err);
  });

  console.log(metadataUri);

  createAndMint(umi, {
    mint,
    authority: umi.identity,
    name: metadata.name,
    symbol: metadata.symbol,
    uri: metadataUri,
    sellerFeeBasisPoints: percentAmount(0),
    decimals: 9,
    amount: 10_000,
    tokenOwner: umi.identity.publicKey,
    tokenStandard: TokenStandard.Fungible,
  })
    .sendAndConfirm(umi)
    .then((tx) => {
      console.log("token (", mint.publicKey, ") minted");
      console.log(
        "Transaction Hash:",
        `https://explorer.solana.com/${tx.signature}?=cluster=devnet`
      );
    });
})();
