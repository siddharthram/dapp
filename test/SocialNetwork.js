const { assert } = require('chai');

const SocialNetwork = artifacts.require('./SocialNetwork.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('SocialNetwork',([deployer, author, tipper]) => {
    let socialNetwork

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

        describe('posts', async () => {
            let result, postCount;
            it('creates posts', async () => {
               result = await socialNetwork.createPost('First Post', {from: deployer});
               postCount = await socialNetwork.postCount();
               //SUCCESS
               assert.equal(postCount, 1);
               //const events = result.logs[0].args
               //console.log(events);

               // FAILURE
               await socialNetwork.createPost('', {from: author}).should.be.rejected;

            })
            // it('lists posts', async () => {    
            //     assert.equal(0,1);
            // })

            // it('allows tips to posts', async () => {
            //     assert.equal(1,0);
            // })

        })
    })
})