import { chainSlugs } from "../../constants";
import { loadRelayerConfigs } from "../utils/relayer.config";

// npx ts-node scripts/query-relayer-config.ts
export const main = async () => {
  const relayerConfigs = loadRelayerConfigs();
  console.log(`relayerConfigs: ${relayerConfigs.size}`);
  console.log(
    `relayerConfig value: ${JSON.stringify(
      relayerConfigs.get(chainSlugs["arbitrum"])
    )}`
  );
};

main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });