pragma solidity ^0.4.22;

contract Inbox {

    // instance variable (is storage variable)
    string public message;
    
    constructor(string _message) public {
        // _message is local variable
        message = _message;
    }
    
    function setMessage(string _message) public {
        message = _message;
    }
    
}