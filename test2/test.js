const assert = require("chai").assert;

const database = (() => {
    const _database = {
      621: { id: 621, name: "XxDragonSlayerxX", friends: [123, 251, 631] },
      123: { id: 123, name: "FriendNo1", friends: [621, 631] },
      251: { id: 251, name: "SecondBestFriend", friends: [621] },
      631: { id: 631, name: "ThirdWh33l", friends: [621, 123, 251] },
    };
  
    const getUser = (id) => new Promise((res, rej) => {
        setTimeout(() => {
          _database[id] ? res(_database[id]) : rej(new Error("not_found"));
        }, 300);
    });
  
    const listUserIDs = () => Promise.resolve([621, 123, 251, 631]);
  
    return { _database, getUser, listUserIDs };
})();

const expected = [
    { id: 123, name: "FriendNo1", friends: [
        { id: 621, name: "XxDragonSlayerxX", friends: [123, 251, 631] },
        { id: 631, name: "ThirdWh33l", friends: [621, 123, 251] }
    ] },
    { id: 251, name: "SecondBestFriend", friends: [
        { id: 621, name: "XxDragonSlayerxX", friends: [123, 251, 631] }
    ] },
    { id: 621, name: "XxDragonSlayerxX", friends: [
        { id: 123, name: "FriendNo1", friends: [621, 631] },
        { id: 251, name: "SecondBestFriend", friends: [621] },
        { id: 631, name: "ThirdWh33l", friends: [621, 123, 251] }
    ] },
    { id: 631, name: "ThirdWh33l", friends: [
        { id: 621, name: "XxDragonSlayerxX", friends: [123, 251, 631] },
        { id: 123, name: "FriendNo1", friends: [621, 631] },
        { id: 251, name: "SecondBestFriend", friends: [621] },
    ] },
];

const validate = (result) => {
    try {
        assert.deepEqual(result, expected);
        console.log('Success');
    } catch (e) {
        console.error("Failed", e);
    }
};

let friends = [];

const getFriendsofFriend = (ids) => {
    let result = [];
    ids.map(id => {
        let index = friends.findIndex(x => x.id === id);
        result.push(friends[index]);
    })
    return result;
};

const getFriend = (friend) => {
    let newFriend = {
        id: friend.id,
        name: friend.name,
        friends: getFriendsofFriend(friend.friends)
    }
    return newFriend;
};

const getFriendsList = (friendsList) => {
    Object.keys(friendsList).forEach(function(key) {
        friends.push(friendsList[key])
    });

    let newFriends = friends.map(getFriend);
    return newFriends;
}

// implement a method to create this result
const result = getFriendsList(database._database);

// At the end call validate
validate(result);