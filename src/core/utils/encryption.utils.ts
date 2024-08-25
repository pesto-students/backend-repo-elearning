import { RSA_PKCS1_OAEP_PADDING } from "node:constants";
import { privateDecrypt, publicEncrypt } from "node:crypto";
import { AuthUtils } from "./auth.utils";

export class EncryptionUtils {
  constructor() {}

  static async encryptWithPublicKey(data: string): Promise<string>{
    const bufferMessage: Buffer = Buffer.from(data, "utf8");
    console.log(data)
    const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiFD2xLhutZRIPZVr6a8H
1+Dz82HyfPZTc3DW15WNCKPwSd3uUY36h8D5+ICfRaqFIe01QTlzUKKCgUP0FvWB
x3ydgFAoTFPCEsNgJtt1MyfrJe8xBrFGr8K+b4bu3YAAlTAyV2wNvY1Kho4IxTUb
aSCRVioLHRcCWP4kdGEyB671CJD56gT1NarUTp4O1NBGWf0JKpQf/LeE4sqhPR/P
i8ttxB/o1A4ahhoU4dr27xX8GRMLMAhpL9XRqAknUv+4N7UtlCrbVAt+3BaG3mNA
0I46RymIid5slbkkILDz+SStrmDvInguTr+3ybKqkhDUjBfNV1Po80q6f52d33Pk
tQIDAQAB
-----END PUBLIC KEY-----`;
    const encryptedData: Buffer = publicEncrypt(
      {
        key: publicKey,
        padding: RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
      },
      bufferMessage,
    );

    return encryptedData.toString("base64");
  }

  // decryption is done by using Web Crypto API
  static decryptWithPrivateKey(encryptedData: string): string {
    const arrayBuffer = Buffer.from(encryptedData, "base64");
    const privateKey = process.env.RSA_PRIVATE_ENCRYPTION_KEY;

    const decryptedData = privateDecrypt(
      {
        key: privateKey,
        padding: RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
        passphrase: process.env.RSA_PASSPHRASE,
      },
      arrayBuffer,
    );
    const originalDecryptedData = decryptedData.toString("utf8");
    return originalDecryptedData;
  }

  static generatePublicPrivateKey(): {
    passPhrase: string;
    privateKey: string;
    publicKey: string;
  } {
    const passPhrase: string = AuthUtils.generateSecurePassword(
      32,
      false,
    );
    const { generateKeyPairSync } = require("node:crypto");

    const { publicKey, privateKey } = generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
        cipher: "aes-256-cbc",
        passphrase: passPhrase,
      },
    });

    return { passPhrase, privateKey, publicKey };
  }
}
