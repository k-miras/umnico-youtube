const request = require('request-promise-native');
const { v4: uuidv4 } = require('uuid');

let getOptions = ()=>{
  return {
    uri: 'https://www.googleapis.com/youtube/v3/activities',
    qs:{
      part: "snippet,contentDetails",
      channelId: "UC_x5XG1OV2P6uZZ5FSM9Ttw",
      maxResults: "25",
      quotaUser: uuidv4(),
      key: "AIzaSyCV4KBX0uk9AhtIYg1B9wvFtPtV6y_EbIc"
    },
    simple: true
  };
}

(async() => {
  let speed = 200;
  for (var i = 0; i < 200000/speed; i++) {
    let concurrent = [];
    for (var j = 0; j < speed; j++) {
      concurrent.push(request.get(getOptions()))
    }
    let result = await Promise.all(concurrent);
    console.log(i*speed);
  }

})();
