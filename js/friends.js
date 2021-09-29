function loadFriendList(friend_list) {
  for (const friend of friend_list) {
    var img = document.createElement("img");
    var friend_name = document.createElement("div");
    var node = document.createElement("LI");
    var textnode = document.createTextNode(friend['name']);
    friend_name.appendChild(textnode);
    document.getElementById("friend-list").appendChild(node);
  }
}