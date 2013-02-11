var fs = require('fs');

var messageMaster = {
  messages : [],
  loadFromFile : function(){
    var messageData = fs.readFileSync('chatlogs.json', 'utf8');
    //console.log(messageData);
    if(messageData){
      this.messages = JSON.parse(messageData);
    }
  },
  getRoomMessages: function(room){
    var roomMessage = [];
    for(var i =0; i < this.messages.length; i++){
      if(this.messages[i].room === room)
      {
        roomMessage.push(this.messages[i]);
      }
    }
    return roomMessage;
  },
  writeToFile: function(data,room){
    var mess = JSON.parse(data);
    mess.room = room;
    this.messages.push(mess);
    var that = this;
    fs.unlink('chatlogs.json', function(){
      fs.appendFile('chatlogs.json', JSON.stringify(that.messages));
    });
  }
};


exports.messageMaster = messageMaster;