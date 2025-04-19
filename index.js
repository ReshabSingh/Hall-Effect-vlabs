// 0->one 1->two 2->three 3->four

wireTerminalCheck = [
    { one: false, two: false },
    { three: false, four: false },
    { five: false, thirteen: false },
    { two: false, four: false },
  ];
  
  terminalMap = {
    0: "one",
    1: "two",
    2: "three",
    3: "four",
    4: "five",
    5: "six",
    6: "seven",
    7: "eight",
    8: "nine",
    9: "ten",
    10: "eleven",
    11: "twelve",
    12: "thirteen",
    13: "fourteen",
    14: "fifteen",
    15: "sixteen",
    16: "seventeen",
    17: "eighteen",
    18: "nineteen",
    19: "twenty",
    20: "twentyone",
    21: "twentytwo",
    22: "twentythree",
    23: "twentyfour",
    24: "twentyfive",
    25: "twentysix",
    26: "twentyseven",
  };
  
  var xValues = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360];
  
  sequenceNum = 0;
  
  var rowData = { sno: 0, curr: 0, volts: 0 };
  sessionStorage.setItem("rowData", JSON.stringify(rowData));
  // sessionStorage.setItem("fullScreen", false);
  sessionStorage.setItem("newIndex", 0);
  
  var btnPressed = [false, false];
  
  setTimeout(() => {
    enablingSequence(sequenceNum);
  }, 2000);
  
  function enablingSequence(sequenceNum) {
    sessionStorage.setItem("circuitComplete",false)
    if(document.querySelector(".forward")){
      sessionStorage.setItem("type",false);
    }else{
      sessionStorage.setItem("type",true);
    }
  
    if (sequenceNum <= wireTerminalCheck.length) {
      for (var key in wireTerminalCheck[sequenceNum]) {
        elem = document.getElementsByClassName(key)[0];
        elem.style.stroke = "#FFFF00";
        elem.style.animationName = "pulse";
        elem.style.opacity = "1";
      }
    }
  }
  
  function trial(componentSom) {
    componentSomMap = terminalMap[componentSom];
    for (var key in wireTerminalCheck[sequenceNum])
      if (key == componentSomMap) wireTerminalCheck[sequenceNum][key] = true;
  
    elem = document.getElementsByClassName(componentSomMap)[0];
    elem.style.animationName = "none";
    elem.style.stroke = "none";
    // console.log(checkPair())
    dum = checkPair(sequenceNum);
    // console.log(dum)
    if (dum) {
      wireName = "wire" + (sequenceNum + 1);
      document.getElementById(wireName).style.transition = "display 10s";
      document.getElementById(wireName).style.display = "block";
      ++sequenceNum;
      if (sequenceNum < wireTerminalCheck.length) {
        enablingSequence(sequenceNum);
        // console.log('here')
      } else {
        // console.log('here')
        replacement();
      }
    }
  }
  
  function checkPair(sequenceNum) {
    count = 0;
    for (var key in wireTerminalCheck[sequenceNum])
      if (wireTerminalCheck[sequenceNum][key] == true) count++;
    // console.log(count, 'count')
    if (count == 2) return true;
    return false;
  }
  
  function keyPut() {
    document.getElementById("key1").style.animation = "none";
    document.getElementById("key1").onclick = function () {};
    document.getElementById("keyBase1").onclick = function () {};
  }
  
  function replacement() {
    // document.getElementById("black-board").classList.add("hidden");
    // document.getElementById("table-board").classList.add("replacement");
  
    // document.getElementById("on-off-btn").style.stroke = "yellow";
    // document.getElementById("on-off-btn").style.strokeWidth = "0.25%";
    // document.getElementById("on-off-btn").onclick = function () {
    //   // checkbtnPressed(0);
    // };
  
    // document.getElementById("key1").style.display = "block";
    // document.getElementById("key1").classList.add("key-up-down");
    // document.getElementById("key1").onclick = function () {
    //   checkbtnPressed(1);
    //   keyPut();
    // };
    // document.getElementById("keyBase1").onclick = function () {
    //   checkbtnPressed(1);
    //   keyPut();
    // };
    // sessionStorage.setItem("fullScreen", true);/
    sessionStorage.setItem("circuitComplete",true);
    // sessionStorage.setItem("initialCurrent",1.0);
    localStorage.setItem("circuitComplete", true);
  }
  
  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function checkbtnPressed(btnNum) {
    btnPressed[btnNum] = true;
    if (btnNum == 0) {
      console.log("check btn called")
      // document.getElementById("on-off-btn").textContent = "03.00";
      // document.getElementById("volt").textContent = "00.36";
      document.getElementById("on-off-btn").style.stroke = "red";
    document.getElementById("on-off-btn").style.strokeWidth = "1.25%";
    sessionStorage.setItem("circuitComplete",true)
    }
    // if (btnPressed[0] && btnPressed[1]) {
      
    //   sessionStorage.setItem("circuitComplete",true)
  
    //   // if(document.querySelector(".forward")){
    //   //   // startWorkingForward();
    //   // }
    //   // else{
    //   //   // startWorkingReverse();
    //   // }
    // }
  }
  
  // function keyOp(){
  //     document.getElementById('key1').style.display = "none"
  //     document.getElementById('key2').style.animation = "none"
  //     document.getElementById('key2').onclick = function(){}
  //     document.getElementById('keyBase2').onclick = function(){}
  // }
  
  
  function filldata(srno, volt, curr) {
    rowData = { srno: 0, volt: 0, curr: 0 };
    sessionStorage.setItem("rowData", JSON.stringify(rowData));
    rowData.srno = srno;
    rowData.volt = volt;
    rowData.curr = curr;
    console.log(srno);
    sessionStorage.setItem("rowData", JSON.stringify(rowData));
  }


  
// setTimeout(() => {
//     setInitialCurrent();
//   }, 1000);

// function setInitialCurrent(){
//     if(sessionStorage.getItem("circuitComplete") == "true"){
//     alert("Circuit is complete. Current source is ON.");
//     sessionStorage.setItem("initialCurrent",1.0);
//     let current = getElementById("tspan2")
//     current.textContent = sessionStorage.getItem("initialCurrent");
// }

  //ye wala code range ke sath ke lia hai



setTimeout(() => {
    rangeSelector();
  }, 100);
const voltarr = [0, 12.8, 25.7, 38.4, 51.0, 63.5, 75.9, 87.8, 98.9, 109.1, 119.2];
const curarrforward = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
  // const currreverse = [1, 1, 1, 0, 0.4, 0.7, 2.3, 15.5, 15.8, 25, 35.9];
  
  function rangeSelector() {
    newIndexinterval = setInterval(() => {
      
  
      let newIndex = sessionStorage.getItem("newIndex"); // Retrieve newIndex
      newIndex = Math.floor(newIndex / 10); // Map to range [1, 10]
      
      if(newIndex == 0){
        let volttext = document.getElementById("tspan4");
        let currtext = document.getElementById("tspan2");
        volttext.textContent = "0.000";
        currtext.textContent = "0.000";
      }

      // Ensure newIndex stays within bounds of the array
      if (newIndex < 0 || newIndex > 10) {
        console.error("newIndex out of range");
        
        return; // Skip this iteration if out of bounds
      }
  
      let volttext = document.getElementById("tspan4");
      let currtext = document.getElementById("tspan2");

      // let currtext = document.getElementById("curr");
      volttext.textContent = voltarr[newIndex - 1];
      currtext.textContent = "1.000"

      sessionStorage.setItem("current", curarrforward[newIndex-1]);
      sessionStorage.setItem("voltage", voltarr[newIndex - 1]);
    }, 500);
  }

  

  