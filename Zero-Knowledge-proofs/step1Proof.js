const { keccak256 } = require('ethers/lib/utils');
const crypto = require('crypto');

const secret = "mySecret123";
const secretHash = keccak256(Buffer.from(secret));

console.log("Hash (to share with verifier):", secretHash);

const challenge = Math.floor(Math.random() * 1000000);
const nonce = crypto.randomInt(1, 100000);

const commitment = keccak256(Buffer.from(`${secret}${nonce}${challenge}`));
console.log("Prover sends commitment:", commitment);

const verifierChallenge = Math.floor(Math.random() * 1000000);
console.log("Verifier sends challenge:", verifierChallenge);

const response = {
  nonce,
  proof: keccak256(Buffer.from(`${secret}${nonce}${verifierChallenge}`)),
};

console.log("Prover sends response:", response);

const recomputedCommitment = keccak256(
  Buffer.from(`${secret}${response.nonce}${challenge}`)
);

if (response.proof === keccak256(Buffer.from(`${secret}${response.nonce}${verifierChallenge}`))) {
  console.log("Proof is valid: Prover knows the secret.");
} else {
  console.log("Proof is invalid: Prover does not know the secret.");
}

console.log("Note: Replace keccak256 with zk-friendly hash functions for real ZKP implementations.");
