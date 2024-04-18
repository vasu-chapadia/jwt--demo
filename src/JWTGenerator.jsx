import React from "react";
import { v4 as uuidv4 } from "uuid";
import SHA256 from "crypto-js/sha256";
import HmacSHA256 from "crypto-js/hmac-sha256";
import Base64 from "crypto-js/enc-base64";

const JWTGenerator = () => {
  const generateJWT = () => {
    // Step 1: Header Generation
    const header = {
      typ: "JWT",
      alg: "RS256",
      kid: "02c3d8bb-e665-4759-bca9-69798e5b6af0", // Replace with the value assigned at the gateway via the JWK endpoint
    };
    const encodedHeader = Base64.stringify(
      Base64.parse(JSON.stringify(header))
    );

    // Step 2: JWT Claims
    const requestBody = {
      requestId: uuidv4(), // Replace with actual request ID
      // Other fields in the request body
    };

    const claims = {
      jti: requestBody.requestId || uuidv4(),
      iat: Math.floor(Date.now() / 1000), // Current time in seconds
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // Expiry time: current time + 1 hour
      content_hash: SHA256(JSON.stringify(requestBody)).toString(Base64),
    };
    const encodedClaims = Base64.stringify(
      Base64.parse(JSON.stringify(claims))
    );

    // Step 3: JWT Signature
    const combinedString = encodedHeader + "." + encodedClaims;
    const privateKey = "yourprivatekey"; // Replace with your actual private key
    const signatureBytes = HmacSHA256(combinedString, privateKey).toString(
      Base64
    );

    // Step 4: Finalize Token
    const finalToken = combinedString + "." + signatureBytes;

    console.log("tokeN::::::", finalToken);
    alert(finalToken);
  };

  return (
    <div>
      <button onClick={generateJWT}>Generate JWT</button>
    </div>
  );
};

export default JWTGenerator;
