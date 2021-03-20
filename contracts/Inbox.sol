pragma solidity >=0.8.2;


contract InboxContract{
    string public message;
     
    constructor(string memory initialMessage){
         message = initialMessage;
    }
     
    function setMessage(string memory newMessage) public{
        message = newMessage;
    }
    
    
    function getMessage() public view returns (string memory){
        return message;
    }
    
    
}