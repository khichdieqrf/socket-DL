import { IntegrationTypes, NativeSwitchboard } from "../../../src";

import { fastSwitchboard } from "./fastSwitchboard";
import { optimisticSwitchboard } from "./optimisticSwitchboard";

// natives
import { arbitrumL1Switchboard } from "./arbitrumL1Switchboard";
import { arbitrumL2Switchboard } from "./arbitrumL2Switchboard";
import { optimismSwitchboard } from "./optimismSwitchboard";
import { polygonL1Switchboard } from "./polygonL1Switchboard";
import { polygonL2Switchboard } from "./polygonL2Switchboard";
import { switchboards } from "../../constants";


export const getSwitchboardDeployData = (
  integrationType, localChain, remoteChain, socketAddress, oracleAddress, signerAddress
) => {
  if (integrationType === IntegrationTypes.fastIntegration) {
    return fastSwitchboard(localChain, oracleAddress, signerAddress);
  } else if (integrationType === IntegrationTypes.optimisticIntegration) {
    return optimisticSwitchboard(localChain, oracleAddress, signerAddress);
  } else if (integrationType === IntegrationTypes.nativeIntegration) {
    const switchboardType = switchboards[localChain]?.[remoteChain]?.["switchboard"]
    if (switchboardType === NativeSwitchboard.ARBITRUM_L1) {
      return arbitrumL1Switchboard(localChain, socketAddress, oracleAddress, signerAddress);
    } else if (switchboardType === NativeSwitchboard.ARBITRUM_L2) {
      return arbitrumL2Switchboard(socketAddress, oracleAddress, signerAddress);
    } else if (switchboardType === NativeSwitchboard.OPTIMISM) {
      return optimismSwitchboard(socketAddress, oracleAddress, signerAddress);
    } else if (switchboardType === NativeSwitchboard.POLYGON_L1) {
      return polygonL1Switchboard(localChain, socketAddress, oracleAddress, signerAddress);
    } else if (switchboardType === NativeSwitchboard.POLYGON_L2) {
      return polygonL2Switchboard(localChain, socketAddress, oracleAddress, signerAddress);
    } else {
      return { contractName: "", args: [], path: "" };
    }
  } else {
    // TODO: handle invalid data
    return { contractName: "", args: [], path: "" };
  }
}