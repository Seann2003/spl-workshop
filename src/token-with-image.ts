import {
  createAndMint,
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
import { mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine";
import { fromWeb3JsKeypair } from "@metaplex-foundation/umi-web3js-adapters";
import { myKeyPair } from "../utils/constant.ts";

// Example metadata
// Call upon Umi's `uploadJson` function to upload our metadata to Arweave via Irys.
(async () => {
  const { umi } = setupUmiClient();
  umi.use(mplCandyMachine()).use(irysUploader());
  const mint = generateSigner(umi);
  const imageFile = readFileSync("./cat.png");

  const umiImageFile = createGenericFile(imageFile, "cat.png", {
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
    .then(() => {
      console.log(
        "Some success message like: 0.00001 GOLDSOL (",
        mint.publicKey,
        ") minted"
      );
    });
})();
