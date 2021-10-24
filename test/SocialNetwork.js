

const { assert } = require('chai');
//const { default: Web3 } = require('web3');

const SocialNetwork = artifacts.require('./SocialNetwork.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('SocialNetwork',([deployer, author, tipper]) => {
    let socialNetwork

    //before hook - do this before starting

    before(async () => {
        socialNetwork = await SocialNetwork.deployed()
    })

    describe('deployment', async () => {
        it('deploys successfully', async() => {
            const address = await socialNetwork.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('Has the right name', async () => {
            const name = await socialNetwork.name();
            assert.equal(name,"Sids Test Social network");
        })

    })
        describe('posts', async () => {
            let result, postCount;

            //reuse result, postCount in multiple tests so in before hook
            before(async() => {
                result = await socialNetwork.createPost('first post', {from: author})
                postCount = await socialNetwork.postCount();
            })

            it('creates posts', async () => {
               //console.log(postCount.toNumber());
               //console.log("llllllll");
               //SUCCESS
               assert.equal(postCount, 1);
               const events = result.logs[0].args
               assert.equal(events.id.toNumber(), postCount.toNumber(), 'id is correct');
               //console.log(events);

               // FAILURE
               await socialNetwork.createPost('', {from: author}).should.be.rejected;

            })
            it('lists posts', async () => {    
                assert.equal(postCount,1);
                const post = await socialNetwork.posts(postCount);
                //console.log(post);
                //console.log(post.author);
                //console.log(author);
                assert.equal(post.author, author,'author is correct');

            })

            it('allows tips to posts', async () => {
                //eth-converter.com helps convert ether to wei - which is 1/10^18th of an ether
                // values tippedmust be in wei, not ether
                // no floating point on the blockchain.
                //use the web3 lib to convert ether to wei
                result = await socialNetwork.tipPost(postCount, { from: tipper, value: web3.utils.toWei('1', 'Ether')});
                //console.log(result);
                const event = result.logs[0].args;
                assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct');
                assert.equal(event.tipAmount, '1000000000000000000', 'tip amount ok');
                assert.equal(event.author, author, 'author ok');
            })
        })
    })
