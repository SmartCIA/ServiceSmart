//variaveis globais
var bathroom;
var bedroom;
var kitchen;
var roomOne;
var roomTwo;
var connection_lamp_all;
var statusCurtain;
var tv = 0;
var valorCheck = "";
var socket = io.connect('http://10.88.112.88:5040');


function statusLampOff(idLampOffimg,src){
  //document.getElementById(idLampOffimg).src = src;
  document.getElementById("lampbathroom").src = "img/leddesligada.png";
}

function statusLampOn(idLampOnimg,src) {
    document.getElementById(idLampOnimg).src = src;
}

//FUNÇAO LAMPADA bathroom
function acenderLampBathroom() {
    if (bathroom == 0) {
        bathroom = 1;
        connection_lamp_all += 1;
        statusLampOn("lampbathroom","img/ledligada.png");
        status();
    } else {
        bathroom = 0;
        statusLampOff("lampbathroom","img/leddesligada.png");
        connection_lamp_all -= 1;
        status();
    }

}
function sendLampBathroom(){
  socket.emit('lamp_All', "lampBathroom");
}
// FUNÇAO DA LAMPADA DA kitchen
function acenderLampkitchen() {
    if (kitchen == 0) {
        kitchen = 1;
        statusLampOn("lampkitchen","img/ledligada.png");
        connection_lamp_all += 1;
        status();
    } else {
        kitchen = 0;
        statusLampOff("lampkitchen","img/leddesligada.png");
        connection_lamp_all -= 1;
        status();
    }
}

// FUNÇAO DA LAMPADA DO bedroom
function acenderLampbedroom() {
    if (bedroom == 0) {
        bedroom = 1;
        statusLampOn("lampbedroom","img/ledligada.png");
        connection_lamp_all += 1;
        status();
    } else {
        bedroom = 0;
        statusLampOff("lampbedroom","img/leddesligada.png");
        connection_lamp_all -= 1;
        status();
    }
}
// FUNÇAO DA LAMPADA 1 DA SALA
function acenderLamproomOne() {
    if (roomOne == 0) {
        roomOne = 1;
        statusLampOn("lamp1Sala","img/ledligada.png");
        connection_lamp_all += 1;
        status();
    } else {
        roomOne = 0;
        statusLampOff("lamp1Sala","img/leddesligada.png");
        connection_lamp_all -= 1;
        status();
    }
}
//FUNÇAO DA LAMPADA 2 DA SALA
function acenderLamproomTwo() {
    if (roomTwo == 0) {
        roomTwo = 1;
        statusLampOn("lamp2Sala","img/ledligada.png");
        connection_lamp_all += 1;
        status();
    } else {
        roomTwo = 0;
        statusLampOff("lamp2Sala","img/leddesligada.png");
        connection_lamp_all -= 1;
        status();
    }
}

function status() {
    if (connection_lamp_all == 5) {
        document.getElementById("cmn-toggle-2").checked = true;
    } else if (connection_lamp_all < 5) {
        var checkStatus = document.getElementById("cmn-toggle-2").checked;
        if (checkStatus == true) {
            document.getElementById("cmn-toggle-2").checked = false;
        }
    } else {
        return;
    }
}
//FUNÇAO DE TODAS AS LAMPADAS
function controlAllLamps() {
    valorCheck = document.getElementById("cmn-toggle-2").checked;

    if (valorCheck == true) {
        statusLampOn("lampbathroom","img/ledligada.png");
        statusLampOn("lampkitchen","img/ledligada.png");
        statusLampOn("lampbedroom","img/ledligada.png");
        statusLampOn("lamp2Sala","img/ledligada.png");
        statusLampOn("lamp1Sala","img/ledligada.png");

        bathroom = 1;
        kitchen = 1;
        bedroom = 1;
        roomOne = 1;
        roomTwo = 1;
        connection_lamp_all = 5;
    } else {
        statusLampOff("lampbathroom","img/leddesligada.png");
        statusLampOff("lampkitchen","img/leddesligada.png");
        statusLampOff("lampbedroom","img/leddesligada.png");
        statusLampOff("lamp2Sala","img/leddesligada.png");
        statusLampOff("lamp1Sala","img/leddesligada.png");

        bathroom = 0;
        kitchen = 0;
        bedroom = 0;
        roomOne = 0;
        roomTwo = 0;
        connection_lamp_all = 0;
    }
}

//FUNCAO CORTINA
function activeCurtain() {
    if (statusCurtain == 0) {
        document.getElementById("curtain_img").src = "img/cortina-aberta.png";
        statusCurtain = 1;
    } else {
        document.getElementById("curtain_img").src = "img/cortina-fechada.png";
        statusCurtain = 0;
    }
}

function acaoBtn() {
    btntvimg = document.getElementById('tv_img');
    if (tv === 0) {
        tv = 1;
        btntvimg.src = "img/tvligada.png";
    } else {
        tv = 0;
        btntvimg.src = "img/tvdesligada.png";
    }
}

socket.on('connect', function(data) {
  console.log("Conectado");
  socket.on('allLamp',function(data){
    data.lampBathroom == 0 ? statusLampOff("lampbathroom","img/ledligada.png") : statusLampOn("lampbathroom","img/leddesligada.png");
    bathroom = data.lampBathroom;
    data.lampKitchen == 0 ? statusLampOff("lampKitchen","img/ledligada.png") : statusLampOn("lampkitchen","img/leddesligada.png");
      kitchen = data.lampKitchen;
    data.lampBedroom == 0 ? statusLampOff("lampbedroom","img/ledligada.png") : statusLampOn("lampbedroom","img/leddesligada.png");
      bedroom = data.lampBedroom;
    data.lampRoomOne == 0 ? statusLampOff("lamp1Sala","img/ledligada.png") : statusLampOn("lamp1Sala","img/leddesligada.png");
      roomOne = data.lampRoomOne;
    data.lampRoomTwo == 0 ? statusLampOff("lamp2Sala","img/ledligada.png") : statusLampOn("lamp2Sala","img/leddesligada.png");
      roomTwo = data.lampRoomTwo;
    console.log(data);
  });
 });

socket.on('lamp_All', function(lamps) {
 console.log(lamps);
 if (lamps == "lampBathroom"){
  acenderLampBathroom();
 }
});

