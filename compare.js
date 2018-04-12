const bitsharesjs = require('bitsharesjs');
const Accounts = require('web3-eth-accounts');

const keyStore = require('./from_address.json');
// const keyStore = require('./to_address.json');

const Prompt = require('prompt-password');
var prompt = new Prompt({
    type: 'password',
    message: '输入密码',
    name: 'password',
    mask: require('prompt-password-strength')
});

prompt.run()
    .then(password => {
        var account = Accounts.prototype.decrypt(keyStore, password);
        console.log(account);
        const pkey = account.privateKey;

        var key_buf = new Buffer(pkey.substring(2), 'hex');

        // key_buf.reverse();

        const message1 = 'test';

        const result1 = Accounts.prototype.sign(message1, pkey);

        console.log(result1);

        const pkey_bts = bitsharesjs.PrivateKey.fromBuffer(key_buf);

        console.log(pkey_bts);

        const result2 = bitsharesjs.Signature.signBufferSha256(new Buffer(result1.messageHash.substring(2), 'hex'), pkey_bts);
        console.log(result2);

        console.log(result2.toHex());

        console.log(result1.signature.substring(2).substring(0, result1.signature.length - 4) ==
            result2.toHex().substring(2)
        )
    })

