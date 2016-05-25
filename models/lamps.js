var bathroom = 0;
var connection_lamp_all = 0;
var kitchen = 0;
var roomOne = 0;
var roomTwo = 0;
var controlAll_lamp = 0;
var bedroom = 0;

exports.control_lampAll = function(){
  if(connection_lamp_all === 0){
    console.log(connection_lamp_all);
    connection_lamp_all = 1;
    app.sensors.relay_kitchen.digitalWrite(0);
    app.sensors.relay_bathroom.digitalWrite(0);
    app.sensors.relay_room.digitalWrite(0);
    app.sensors.relay_roomTwo.digitalWrite(0);
    app.sensors.relay_bedroom.digitalWrite(0);
    bathroom = 1;
    kitchen = 1;
    roomOne = 1;
    roomTwo = 1;
    bedroom = 1;
    controlAll_lamp = 1;
  } else {
    console.log(connection_lamp_all);
    connection_lamp_all = 0;
    app.sensors.relay_kitchen.digitalWrite(1);
    app.sensors.relay_bathroom.digitalWrite(1);
    app.sensors.relay_room.digitalWrite(1);
    app.sensors.relay_roomTwo.digitalWrite(1);
    app.sensors.relay_bedroom.digitalWrite(1);
    bathroom = 0;
    kitchen = 0;
    roomOne = 0;
    roomTwo = 0;
    bedroom = 0;
    controlAll_lamp = 0;
  }
};

exports.roomTwo = function(){
  if(roomTwo === 0){
    roomTwo = 1;
    app.sensors.relay_roomTwo.digitalWrite(0);
    controlAll_lamp += 1;
    statusLamps();
  } else {
    roomTwo = 0;
    app.sensors.relay_roomTwo.digitalWrite(1);
    controlAll_lamp -= 1;
    statusLamps();
  }
  return roomTwo;
};

exports.roomOne = function(){
  if(roomOne === 0){
    roomOne = 1;
    app.sensors.relay_room.digitalWrite(0);
    controlAll_lamp += 1;
    statusLamps();
  } else {
    roomOne = 0;
    app.sensors.relay_room.digitalWrite(1);
    controlAll_lamp -= 1;
    statusLamps();
  }
  return room;
};

exports.bedroom = function(){
  if(bedroom == 0){
    bedroom = 1;
    app.sensors.relay_bedroom.digitalWrite(0);
    controlAll_lamp += 1;
    statusLamps();
  } else {
    bedroom = 0;
    app.sensors.relay_bedroom.digitalWrite(1);
    controlAll_lamp -= 1;
    statusLamps();
  }
  return bedroom;
};

exports.kitchen = function(){
  if(kitchen == 0){
    kitchen = 1;
    app.sensors.relay_kitchen.digitalWrite(0);
   controlAll_lamp += 1;
   statusLamps();
 } else {
    kitchen = 0;
   app.sensors.relay_kitchen.digitalWrite(1);
   controlAll_lamp -= 1;
   statusLamps();
 }
  return kitchen;
};

exports.bathroom = function(){
    if(bathroom === 0){
        bathroom = 1;
        app.sensors.relay_bathroom.digitalWrite(0);
        statusLamps();
    } else {
      bathroom = 0;
      app.sensors.relay_bathroom.digitalWrite(1);
      statusLamps();
    }
  return bathroom;
};

function statusLamps(){
  if(controlAll_lamp === 4){
    connection_lamp_all = 1;
  }else if(controlAll_lamp < 4){
    connection_lamp_all = 0;
  }
};

exports.socket_Lamps = function(){
  socket.on('connect', function (client) {
  
  socket.emit('allLamp',{
    'lampBathroom':bathroom,
    'lampKitchen':kitchen,
    'lampBedroom':bedroom,
    'lampRoomOne':roomOne,
    'lampRoomTwo':roomTwo
  });

  client.on('lamp_All', function(lamps){
    console.log("Servidor " + lamps);

    if(lamps == "lampBathroom"){
     app.relay_bathroomController();
    }
    client.broadcast.emit("lamp_All", lamps);
   });
 });
}

