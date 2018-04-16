A comparation for different result for ECDSA and question demo.

A signature with ecc (especially  secp256k1 ):

   sign(message_hash, key) = signature

may vary because of randomness. As of [RFC6979](https://tools.ietf.org/html/rfc6979) , the randomn process of generating K is replaced by deterministic process, which in turn, it will ALWAYS get SAME result with SAME message_hash and private key if using the SAME hash function. So this lead to two questions :

1. The hash function for message in ethereum is keccak256, but the two implementations (eth-lib and secp256k1) use sha256 in the process of generate K according to RFC6979, which in my opinion, is wrong ?

1. Assume the current implementions of eth-lib and secp256k1 is corrent, as bitsharesjs is using sha256
in all cases, the low-level signature result of the same hash and private key should be the same. But
it is not the case of the running result. why ?

