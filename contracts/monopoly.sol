pragma solidity ^0.4.24;
import "./bytesLib.sol";
/**
 * @title ERC20Interface
 * @dev Simpler version of ERC20 interface
 * @dev see https://github.com/ethereum/EIPs/issues/179
 */
contract ERC20Basic {
    uint256 public totalSupply;

    function balanceOf(address who) constant public returns (uint256);

    function transfer(address to, uint256 value) public returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
}

/**
 * @title ourMath
 * @dev Math operations with safety checks that throw on error
 */
library ourMath {
    function mul(uint256 a, uint256 b) internal constant returns (uint256) {
        uint256 c = a * b;
        assert(a == 0 || c / a == b);
        return c;
    }

    function div(uint256 a, uint256 b) internal constant returns (uint256) {
        // assert(b > 0); // Solidity automatically throws when dividing by 0
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold
        return c;
    }

    function sub(uint256 a, uint256 b) internal constant returns (uint256) {
        assert(b <= a);
        return a - b;
    }

    function add(uint256 a, uint256 b) internal constant returns (uint256) {
        uint256 c = a + b;
        assert(c >= a);
        return c;
    }
}

/**
 * @title Basic
 * @dev Basic version of StandardToken, list balance, transfer function, balanceOf function
 */
contract BasicToken is ERC20Basic {
    using ourMath for uint256;

    mapping (address => uint256) balances;

    /**
    * @dev transfer token for a specified address
    * @param _to The address to transfer to.
    * @param _value The amount to be transferred.
    */
    function transfer(address _to, uint256 _value) public returns (bool) {
        balances[msg.sender] = balances[msg.sender].sub(_value);
        balances[_to] = balances[_to].add(_value);
        Transfer(msg.sender, _to, _value);
        return true;
    }

    /**
    * @dev Gets the balance of the specified address.
    * @param _owner The address to query the the balance of.
    * @return An uint256 representing the amount owned by the passed address.
    */
    function balanceOf(address _owner) constant public returns (uint256 balance) {
        return balances[_owner];
    }

}

/**
 * @title ERC20 token interface
 * @dev see https://github.com/ethereum/EIPs/issues/20
 */
contract ERC20 is ERC20Basic {
    function allowance(address owner, address spender) constant public returns (uint256);

    function transferFrom(address from, address to, uint256 value) public returns (bool);

    function approve(address spender, uint256 value) public returns (bool);

    event Approval(address indexed owner, address indexed spender, uint256 value);
}


/**
 * @title Standard ERC20 token
 *
 * @dev Implementation of the basic standard token.
 * @dev https://github.com/ethereum/EIPs/issues/20
 * @dev Based on code by FirstBlood: https://github.com/Firstbloodio/token/blob/master/smart_contract/FirstBloodToken.sol
 */
contract StandardToken is ERC20, BasicToken {

    mapping (address => mapping (address => uint256)) allowed;


    /**
     * @dev Transfer tokens from one address to another
     * @param _from address The address which you want to send tokens from
     * @param _to address The address which you want to transfer to
     * @param _value uint256 the amout of tokens to be transfered
     */
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
        var _allowance = allowed[_from][msg.sender];

        // Check is not needed because sub(_allowance, _value) will already throw if this condition is not met
        // require (_value <= _allowance);

        balances[_to] = balances[_to].add(_value);
        balances[_from] = balances[_from].sub(_value);
        allowed[_from][msg.sender] = _allowance.sub(_value);
        Transfer(_from, _to, _value);
        return true;
    }

    /**
     * @dev Aprove the passed address to spend the specified amount of tokens on behalf of msg.sender.
     * @param _spender The address which will spend the funds.
     * @param _value The amount of tokens to be spent.
     */
    function approve(address _spender, uint256 _value)  public returns (bool) {

        // To change the approve amount you first have to reduce the addresses`
        //  allowance to zero by calling `approve(_spender, 0)` if it is not
        //  already 0 to mitigate the race condition described here:
        //  https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
        require((_value == 0) || (allowed[msg.sender][_spender] == 0));

        allowed[msg.sender][_spender] = _value;
        Approval(msg.sender, _spender, _value);
        return true;
    }

    /**
     * @dev Function to check the amount of tokens that an owner allowed to a spender.
     * @param _owner address The address which owns the funds.
     * @param _spender address The address which will spend the funds.
     * @return A uint256 specifing the amount of tokens still available for the spender.
     */
    function allowance(address _owner, address _spender) constant returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }
    
}

/**
 * @title OpenLottoToken
 * @dev Open Lotto pay for who help maintain this system
 */
contract MonopolyGame is StandardToken {
    using BytesLib for bytes;

    string public name = "Open Monopoly";
    string public symbol = "OPENM";
    uint256 public decimals = 18;
    
    uint256 public MAX_SUPPLY = 100000000 * 1 ether;
    uint256 public FOUNDER_TOKEN = 1000000 * 1 ether;
    
    uint32 public GAME_NUMBER = 14;
    uint32 public MAX_NUMBER = 9;

    address public FOUNDER;
    
    uint8 public currentMap = 1;

    bytes32 lastRoll;

    struct Map {
        uint256 blockCount;
        uint256 playerCount;
        
        mapping(address => Player) players;
        mapping(bytes => Block) blocks;
        mapping(bytes => House) houses;
        
        bool isValid;
        bytes32 lastHash;
    }
  
    struct Player {
        bool isValid; 
        Block block;
        bytes location;
        uint256 locationTotal;
        mapping(bytes => House) houses;
        uint256 balances;
    }
    
    struct House {
        bytes blockAddress;
        uint256 blockType;
        uint256 houseLevel;
    }
    
    struct Block {
        bytes blockAddress;
        bytes blockType;
        uint256 left;
        uint256 right;
        uint256 up;
        uint256 down;
    }

    mapping(uint256 => Map) public mapInfo;
    
    /**
    * @dev Contructor that gives msg.sender 1,000,000 OPENLT
    * -> Founder should give pay 1 ETH for first 1,000,000 OPENLT
    * -> Start first round 
    */
    function () public payable {
        FOUNDER = msg.sender;
        lastRoll = block.blockhash(block.number - 1);
    }
    
    /**
    * @dev Modifier
    */
    modifier onlyRolling(uint256 playMap) {
        require(playMap > 0);
        require(msg.value > 0);
        _;
    }
    modifier onlyNotValidPlayer(uint256 playMap) {
        require(!mapInfo[playMap].players[msg.sender].isValid);
        _;
    }
    modifier onlyValidPlayer(uint256 playMap) {
        require(mapInfo[playMap].players[msg.sender].isValid);
        _;
    }
    
    /**
    * @dev Main function
    */
    function start(uint256 playMap)
    public onlyRolling(playMap) onlyNotValidPlayer(playMap) payable {
        Map storage map = mapInfo[playMap];
        bytes32 lastSalt;
        if (map.isValid) {
            lastSalt = map.lastHash;
        }
        if (!map.isValid) {
            map.isValid = true;
            lastSalt = block.blockhash(block.number - 4);
        }
        bytes32 salt = block.blockhash(block.number - 1);
        map.lastHash = salt;
        bytes memory result = getRandom(salt, lastSalt);

        Player storage player = mapInfo[playMap].players[msg.sender];
        require(!player.isValid);
        player.isValid = true;
        player.balances = msg.value;
        mapInfo[playMap].playerCount ++;
        
        // Setup location
        bytes memory newLocation = result.slice(10, 4);
        // Get left down up right from random array
        bytes memory tempBytes = new bytes(31);
        bytes memory up = newLocation.slice(0, 1);
        up = tempBytes.concat(up);
        // uint256 upNumber = up.toUint(0);
        bytes memory right = newLocation.slice(1, 1);
        right = tempBytes.concat(right);
        // uint256 rightNumber = right.toUint(0);
        bytes memory down = newLocation.slice(2, 1);
        down = tempBytes.concat(down);
        // uint256 downNumber = down.toUint(0);
        bytes memory left = newLocation.slice(3, 1);
        left = tempBytes.concat(left);
        // uint256 leftNumber = left.toUint(0);
        
        player.location = newLocation;
        player.block.blockAddress = newLocation;
        
        player.block.up = up.toUint(0);
        player.block.right = right.toUint(0);
        player.block.down = down.toUint(0);
        player.block.left = left.toUint(0);
        
        player.locationTotal = up.toUint(0) + right.toUint(0) + down.toUint(0) + left.toUint(0);
    }
    
    function rolling(uint256 playMap)
    public onlyRolling(playMap) onlyValidPlayer(playMap) payable returns (bool) {
        // Get random
        bytes memory result = getRandom(block.blockhash(block.number - 1), mapInfo[playMap].lastHash);
        mapInfo[playMap].lastHash = block.blockhash(block.number - 1);
        // Get player infomation
        Player storage player = mapInfo[playMap].players[msg.sender];
        
        bytes memory newLocation = result.slice(10, 4);
        // Get left down up right from random array
        bytes memory tempBytes = new bytes(31);
        bytes memory up = newLocation.slice(0, 1);
        up = tempBytes.concat(up);
        // uint256 upNumber = up.toUint(0);
        bytes memory right = newLocation.slice(1, 1);
        right = tempBytes.concat(right);
        // uint256 rightNumber = right.toUint(0);
        bytes memory down = newLocation.slice(2, 1);
        down = tempBytes.concat(down);
        // uint256 downNumber = down.toUint(0);
        bytes memory left = newLocation.slice(3, 1);
        left = tempBytes.concat(left);
        // uint256 leftNumber = left.toUint(0);
        
        // // For first time rolling player will random there location
        // uint256 total = up.toUint(0) + right.toUint(0) + down.toUint(0) + left.toUint(0);
        // total = total - player.locationTotal;
        
        // // Setup location
        // player.location = newLocation;
        // player.block.blockAddress = newLocation;
        
        // player.block.up = up.toUint(0);
        // player.block.right = right.toUint(0);
        // player.block.down = down.toUint(0);
        // player.block.left = left.toUint(0);
        // // Add balances
        // player.balances += msg.value;
        
    }
    
    /**
    * @dev Get random 14 character from last block hash and current block hash
    */
    function getRandom(bytes32 playerSalt, bytes32 salt) returns (bytes) {
        bytes memory allNumbers = new bytes(MAX_NUMBER);
        bytes memory numbers = new bytes(GAME_NUMBER);
        // All Number that you can pick
        for (uint i = 0; i < MAX_NUMBER; i++) {
            allNumbers[i] = byte(i + 1);
        }
        uint n = 0;
        uint r = 0;
        // Get number
        for (i = 0; i < GAME_NUMBER / 2; i++) {
            n = MAX_NUMBER - i;
            r = (
                uint(playerSalt[i * 4])
                + (uint(playerSalt[i * 4 + 1]) << 8)
                + (uint(playerSalt[i * 4 + 2]) << 16)
                + (uint(playerSalt[i * 4 + 3]) << 24)
            ) % n;
    
            numbers[i] = allNumbers[r];
        }
        for (i = 0; i < GAME_NUMBER / 2; i++) {
            n = MAX_NUMBER - i;
            r = (
                uint(salt[i * 4])
                + (uint(salt[i * 4 + 1]) << 8)
                + (uint(salt[i * 4 + 2]) << 16)
                + (uint(salt[i * 4 + 3]) << 24)
            ) % n;
    
            numbers[GAME_NUMBER / 2 + i] = allNumbers[r];
        }
        return numbers;
    }
}