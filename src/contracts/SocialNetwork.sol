pragma solidity ^0.5.0;

contract SocialNetwork {
    string public name;
    uint public postCount = 0;
    //mapping is  KV store that allows us to store data
    // writes to the blockchain.
    // works like a hash
    mapping(uint => Post) public posts;//id mapping to post struct
    struct Post {
        uint id;
        string content;
        uint tipAmount;
        address payable author;// ethereum address
    }
// event for creation
    event PostCreated(
        uint id,
        string content,
        uint tipAmount,
        address payable author
    );
// event for tipping post
    event PostTipped(
        uint id,
        string content,
        uint tipAmount,
        address payable author
    );

    constructor() public  {
        name = "Sids Test Social network";
    }
//https://ethereum.stackexchange.com/questions/1701/what-does-the-keyword-memory-do-exactly
//The Ethereum Virtual Machine has three areas where it can store items.
//The first is “storage”, where all the contract state variables reside. Every contract has its own storage and it is persistent between function calls and quite expensive to use.
//The second is “memory”, this is used to hold temporary values. It is erased between (external) function calls and is cheaper to use.
//The third one is the stack, which is used to hold small local variables. It is almost free to use, but can only hold a limited amount of values.
// function arguments should always be in memory

    function createPost(string memory _content) public {

        // check if conditions are met
        // if this returns false, the function will not continue!
        require(bytes(_content).length > 0);
        // if it evaluates to false, gas is refunded
        postCount++;   

        //msg is a global made available
       Post memory p = Post(postCount,_content,0, msg.sender);
       posts[postCount]=  p;

        // send an even to anyone interested           
        emit PostCreated(postCount, _content, 0, msg.sender);

    }

// to create a function in solidity that accepts ether
// it needs to be tagged as payable

    function tipPost(uint _id) public payable{
        
        //require(_id > 0 && _id <= postCount);
        //Fetch the post
        Post memory _post = posts[_id];

       // Fetch the owner of the post (author)
       address payable _author = _post.author;

        // pay the author
        address(_author).transfer(msg.value);

       // increment the tip amount
       // The amount is in the metadata (same as sender)

       _post.tipAmount +=  msg.value;

       // update the post
        posts[_id] = _post;
        emit PostTipped(postCount, _post.content, _post.tipAmount, _author);
    }
}