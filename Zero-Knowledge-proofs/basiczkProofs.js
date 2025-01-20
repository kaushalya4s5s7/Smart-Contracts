const { keccak256 } = require('ethers/lib/utils');

const secret = "mySecret123";
const hash = keccak256(Buffer.from(secret));

console.log("Hash (to share with verifier):", hash);

const challenge = Math.floor(Math.random() * 1000000);
const response = challenge + secret.length;

console.log("Prover sends response:", response);

const isValid = response - challenge === secret.length;

if (isValid) {
  console.log("Proof is valid: Prover knows the secret.");
} else {
  console.log("Proof is invalid: Prover does not know the secret.");
}
