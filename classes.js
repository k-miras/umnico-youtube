
class Event {
  getName(){
    throw new Error("not defined");
  }
  getPoints(){
    throw new Error("not defined");
  }
  getSideEffects(){
    throw new Error("not defined");
  }
}
class Reply extends Event {
  getName(){
    return "Reply";
  }
  getPoints(){
    return 50;
  }
  getSideEffects(){
    return [];
  }
}

class Comment extends Event {
  getName(){
    return "Comment";
  }
  getPoints(){
    return 1;
  }
  getSideEffects(){
    return [new Reply()];
  }
}

class Thread extends Event {
  getName(){
    return "Thread";
  }
  getPoints(){
    return 1;
  }
  getSideEffects(){
    return [new Comment()];
  }
}

class Video extends Event {
  getName(){
    return "Video";
  }
  getPoints(){
    return 1;
  }
  getSideEffects(){
    let result = [];
    for (var i = 0; i < 50; i++) {
      result.push(new Thread())
    }
    return result;
  }
}

class ChannelInfo extends Event {
  getName(){
    return "ChannelInfo";
  }
  getPoints(){
    return 1;
  }
  getSideEffects(){
    return [new Video()];
  }
}

// ChannelInfo -> Video -> Thread -> Comment -> Reply
let queueStats= (queue)=>{
  let names={};
  for (let event of queue) {
    if(names[event.getName()]===undefined){
      names[event.getName()]=1;
    }else {
      names[event.getName()]++;
    }
  }
  return names;
}
module.exports = {ChannelInfo,queueStats};
