import { Contract, Signer } from "ethers";
import { arrayify, defaultAbiCoder, keccak256 } from "ethers/lib/utils";
import { getSigner } from "./utils/relayer.config";
import * as TransmitManagerABI from "../../artifacts/contracts/TransmitManager.sol/TransmitManager.json";
import { isTransactionSuccessful } from "./utils/transaction-helper";

export const setProposeGasLimit = async (
  srcChainId: number,
  dstChainId: number,
  transmitManagerAddress: string,
  proposeGasLimit: number
) => {
  try {
    const signer: Signer = getSigner(srcChainId);

    const transmitterAddress: string = await signer.getAddress();

    const transmitManagerInstance: Contract = new Contract(
      transmitManagerAddress,
      TransmitManagerABI.abi,
      signer
    );

    // get nextNonce from TransmitManager
    let nonce: number = await transmitManagerInstance.nextNonce(
      transmitterAddress
    );

    const digest = keccak256(
      defaultAbiCoder.encode(
        ["string", "uint256", "uint256", "uint256", "uint256"],
        [
          "PROPOSE_GAS_LIMIT_UPDATE",
          srcChainId,
          dstChainId,
          nonce,
          proposeGasLimit,
        ]
      )
    );

    const signature = await signer.signMessage(arrayify(digest));

    const tx = await transmitManagerInstance.setProposeGasLimit(
      nonce,
      dstChainId,
      proposeGasLimit,
      signature
    );

    await tx.wait();

    return isTransactionSuccessful(tx.hash, srcChainId);
  } catch (error) {
    console.log("Error while sending transaction", error);
    throw error;
  }
};