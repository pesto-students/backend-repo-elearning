const { pbkdf2Sync, pbkdf2, randomBytes, createHmac } = require("node:crypto");
import * as zlib from "zlib";
import { StringUtils } from "./string.utils";
import { UserSessionDto } from "../dto/user-session.dto";

export class AuthUtils {
  constructor() {}

  static async matchHashPassword(
    password: string,
    userInputPassword: string,
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // Extract salt, iterations, and hash from the hashed password
      const [iterationsStr, salt, hash] = password.split("$").slice(1);

      // Check if iterations is a valid integer
      const iterations = parseInt(iterationsStr);

      if (isNaN(iterations)) {
        reject(false);
      } else {
        // Verify the user input password
        pbkdf2(
          userInputPassword,
          salt,
          iterations,
          32,
          "sha256",
          (err, derivedKey) => {
            if (err) {
              reject(false);
            } else {
              const derivedHash = derivedKey.toString("base64");

              if (derivedHash === hash) {
                resolve(true);
              } else {
                resolve(false);
              }
            }
          },
        );
      }
    });
  }

  /**
   * This function accept normal string and return hashed string
   * @param password
   * @return hashedPassword
   */
  static async createPasswordHash(password: string) {
    const salt = randomBytes(16).toString("base64"); // Generate a random salt
    const iterations = 260000; // You can adjust the number of iterations as needed
    const keyLength = 32; // Output key length in bytes
    const digest = "sha256"; // Hash function

    const pass = await pbkdf2Sync(
      password,
      salt,
      iterations,
      keyLength,
      digest,
    );

    const hashedPassword = `pbkdf2_sha256$${iterations}$${salt}$${pass.toString("base64")}`;

    return hashedPassword;
  }

  static generateSecurePassword(
    length: number = 12,
    allowSpecialChars: boolean = true,
  ): string {
    const charSet = {
      letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
      numbers: "0123456789",
      specialChars: "!@#$%&()[]{}|<>/?",
    };

    let characters = charSet.letters + charSet.numbers;
    if (allowSpecialChars) {
      characters += charSet.specialChars;
    }

    let password = "";
    while (password.length < length) {
      const randomValue = randomBytes(1)[0];
      const index = randomValue % characters.length;
      password += characters[index];
    }

    return password;
  }

  static async encodeSession(
    dataToEncode: Record<string, any>,
    secretKey: string = "",
  ): Promise<string> {
    // Step 1: Serialize JSON
    const jsonData = JSON.stringify(dataToEncode);

    // Step 2: Compression
    const compressedData = zlib.deflateSync(
      Buffer.from(jsonData, "utf-8"),
    ) as any;

    // Step 3: Base64 encode
    const encodedData = StringUtils.base64Encode(compressedData);

    // Step 4: Sign the cookie using Flask's secret key
    const signature = createHmac("sha256", secretKey)
      .update(Buffer.from(encodedData, "binary"))
      .digest("base64");

    // Combine the encoded data and signature
    const result = `.${encodedData}:${signature}`;

    return result;
  }

  static async decodeSession(
    encodedData: string,
    secretKey?: string,
  ): Promise<UserSessionDto> {
    try {
      // Step 1: Base64 Decode
      const decodedData = StringUtils.base64Decode(encodedData);

      // Step 2: Decompression (if needed)order/cart
      let decompressedData;

      try {
        // Attempt to decompress with zlib.inflateSync
        decompressedData = zlib
          .inflateSync(Buffer.from(decodedData, "binary"))
          .toString("utf-8");
      } catch (inflateError) {
        // If zlib.inflateSync fails, try zlib.unzipSync
        decompressedData = zlib
          .unzipSync(Buffer.from(decodedData, "binary"))
          .toString("utf-8");
      }

      // Step 3: Deserialize JSON
      const sessionData = JSON.parse(decompressedData);

      // Step 4: Verify Signature (if needed)

      return sessionData;
    } catch (error) {
      return null;
    }
  }
}
