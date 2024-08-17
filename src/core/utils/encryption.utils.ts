import { RSA_PKCS1_OAEP_PADDING } from "node:constants";
import { privateDecrypt } from "node:crypto";
import { AuthUtils } from "./auth.utils";

export class EncryptionUtils {
  constructor() {}

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
      process.env.RSA_PASSPHRASE.length,
      false,
    );
    const { generateKeyPairSync } = require("node:crypto");

    const { publicKey, privateKey } = generateKeyPairSync("rsa", {
      modulusLength: 1024,
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
