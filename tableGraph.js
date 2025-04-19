// currtrigger = -10;

const voltarr = [
  0, 12.8, 25.7, 38.4, 51.0, 63.5, 75.9, 87.8, 98.9, 109.1, 119.2,
];
const curarr = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20];

var xValues = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
var logValues = [0, 12.8, 25.7, 38.4, 51.0, 63.5, 75.9, 87.8, 98.9, 109.1, 119.2];
var count = 0;
let ebg = 0;
let slope = 0;
const set = new Set();
let trigger = 0;
let flag = 0;
setTimeout(() => {
  fillTable();
}, 3700);

const range = document.getElementById("range");

range.addEventListener("input", (event) => {
  if (sessionStorage.getItem("circuitComplete") == "true") {
    const newIndex = event.target.value;
    sessionStorage.setItem("newIndex", newIndex);
  } else {
    alert("Complete the circuit first");
  }
});
var currarrgraph = [];
var voltarrgraph = [];
document.getElementById("addtable").addEventListener("click", addTable);
let rowCountIndex = 0;
let idx;
function addTable() {
  if (sessionStorage.getItem("circuitComplete") === "true") {
    srno = document.getElementsByClassName("srno")[rowCountIndex];
    current = document.getElementsByClassName(`curr`)[rowCountIndex];
    voltage = document.getElementsByClassName(`voltage`)[rowCountIndex];

    let curr = sessionStorage.getItem("current");
    let volt = sessionStorage.getItem("voltage");
    currarrgraph.push(curr);
    voltarrgraph.push(volt);
    // console.log(currarrgraph)
    srno.value = rowCountIndex + 1;
    current.value = curr;
    voltage.value = volt;
    rowCountIndex++;
  } else {
    alert("Complete the circuit first");
  }
}

// function fillTable() {
//   filltableintrval = setInterval(() => {

//     var rowData = JSON.parse(sessionStorage.getItem("rowData"));
//     if (rowData.sno < 10) {
//       srno = document.getElementsByClassName("srno")[rowData.sno];
//       cur = document.getElementsByClassName("curr")[rowData.sno];
//       volt = document.getElementsByClassName("voltage")[rowData.sno];

//       currarrgraph.push(rowData.curr);
//       voltarrgraph.push(rowData.volt);
//       myChart.update();
//       count++;
    

//       if (rowData.sno == 10) {
//         clearInterval(filltableintrval);
//       }
//     }
//   }, 500);
// }

// let ctx = document.getElementById("myChart").getContext("2d");
// let myChart = new Chart(ctx, {
//   type: "line",
//   data: {
//     labels: xValues,
//     datasets: [
//       {
//         label: "Current vs Voltage",
//         data: currarrgraph,
//         borderColor: "rgba(75, 192, 192, 1)",
//         backgroundColor: "rgba(75, 192, 192, 0.2)",
//         borderWidth: 2,
//         fill: false,
//       },
//     ],
//   },
//   options: {
//     scales: {
//       xAxes: [
//         {
//             scaleLabel: {
//             display: true,
//             labelString: "1/T (1/K)",
//           },
//         },
//       ],
//       yAxes: [
//         {
//             ticks: {
//                 beginAtZero: true, // Start y-axis from 0
//               },
//             scaleLabel: {
//             display: true,
//             labelString: "log(Is / T^2)",
//             beginAtZero: true,
//           },
//         },
//       ],
//     },
//     responsive: true,
//     maintainAspectRatio: false,
//     animation:{
//         duration:1
//     }
//   },
// });



function fillTable() {
  let lastProcessedSno = -1; // Track last processed row
  
  filltableintrval = setInterval(() => {
    var rowData = JSON.parse(sessionStorage.getItem("rowData"));
    
    // Only process if this is a new data point we haven't graphed yet
    if (rowData && rowData.sno > lastProcessedSno && rowData.sno < 10) {
      lastProcessedSno = rowData.sno;
    //   console.log(lastProcessedSno);
      
      // Update table cells
      let srno = document.getElementsByClassName("srno")[rowData.sno];
      let cur = document.getElementsByClassName("curr")[rowData.sno];
      let volt = document.getElementsByClassName("voltage")[rowData.sno];
      
      // Assuming you want to update the table cell values
      if (srno) srno.textContent = rowData.sno + 1; // +1 if you want 1-based indexing
      if (cur) cur.textContent = rowData.curr;
      if (volt) volt.textContent = rowData.volt;
      
      // Add to chart data
      currarrgraph.push(rowData.curr);
      voltarrgraph.push(rowData.volt);
      myChart.update();
    }
    
    // Stop the interval if we've reached the end (10 data points)
    if (rowData && rowData.sno >= 9) { // Using >= 9 since sno is 0-based and we want 10 points
      clearInterval(filltableintrval);
    }
  }, 500);
}
  

let ctx = document.getElementById("myChart").getContext("2d");
let myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: currarrgraph,
    datasets: [
      {
        label: "Current vs Voltage",
        data: voltarrgraph,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        fill: false,
      },
    ],
  },
  options: {
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Current (mA)",
          },
          position: "top",
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            reverse: false,
          },
          scaleLabel: {
            display: true,
            labelString: "Voltage (mV)",
          },
        },
      ],
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1,
    },
  },
});

document.querySelector(".calcslope").addEventListener("click", calslope);
function calslope() {
  let x1, x2, y1, y2;
  let slopevalue = document.querySelector(".slopev");
  document.querySelector(".svalue").style.display = "block";
  x1 = xValues[1];
  x2 = xValues[4];

  y1 = logValues[1];
  y2 = logValues[4];

  slope = (y2 - y1) / (x2 - x1);
  slopevalue.innerHTML = slope.toFixed(4);
  // document.querySelector(".ebg").style.display = "block";
}


async function downloadGraph() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  // Set background color
  doc.setFillColor(0, 123, 255); // Blue color (RGB)
  doc.rect(10, 5, 190, 10, "F");
  // Add a header with black text
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255); // Set text color to black
  doc.setFontSize(20); // Set font size for the header
  doc.text("Graph", 75, 12);

  const chartImage = myChart.toBase64Image();

  doc.addImage(chartImage, "PNG", 25, 150, 150, 120);
}

async function downloadGraphAndObservations() {
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Set background color
    doc.setFillColor(0, 123, 255); // Blue color (RGB)
    doc.rect(10, 5, 190, 10, "F");
    // Add a header with black text
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255); // Set text color to black
    doc.setFontSize(20); // Set font size for the header
    doc.text("Observations Table", 75, 12); // Add text at x=10, y=10

    const tableCanvas = await html2canvas(document.querySelector("#table1"), {
      scale: 2,
    });
    const tableImgData = tableCanvas.toDataURL("image/png");
    doc.addImage(tableImgData, "PNG", 15, 17, 180, 120);

    // Add the graph
    const chartImage = myChart.toBase64Image();
    // doc.addPage();

    // //Add the graph head
    // Set background color
    doc.setFillColor(0, 123, 255); // Blue color (RGB)
    doc.rect(10, 140, 190, 10, "F");
    // Add a header with black text
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255); // Set text color to black
    doc.setFontSize(20); // Set font size for the header
    doc.text("Graph", 95, 147); // Add text at x=10, y=10

    doc.addImage(chartImage, "PNG", 25, 150, 150, 120);

    doc.addPage();
    //calculation page
    //Add the labels
    doc.setFillColor(0, 123, 255); // Blue color (RGB)
    doc.rect(10, 5, 190, 10, "F");
    // Add a header with black text
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255); // Set text color to black
    doc.setFontSize(20); // Set font size for the header
    doc.text("Calculation", 75, 12);

    document.querySelector(".calcbtn").style.display = "none";
    const calc = await html2canvas(document.querySelector(".formula"), {
      scale: 2,
    });
    const calcimg = calc.toDataURL("image/png");
    doc.addImage(calcimg, "PNG", 15, 17, 180, 80);

    // Save the PDF
    doc.save("observations_and_graph.pdf");
    document.querySelector(".calcbtn").style.display = "block";
  } catch (error) {
    console.log(error.message);
    if (error.message === "Incomplete or corrupt PNG file") {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Please complete the calculation using the Graph",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }
}

// Add event listener to the download button
document
  .getElementById("download")
  .addEventListener("click", downloadGraphAndObservations);
document
  .getElementById("downloadgraph")
  .addEventListener("click", downloadGraph);
document
  .getElementById("inlineFormSelectPref")
  .addEventListener("change", function () {
    var contentUrl = this.value;
    document.getElementById("main-svg").data = contentUrl;
    // localStorage.setItem("diodetype", contentUrl);
  });

function clearTableInputs() {
  //chart
  myChart.data.datasets.forEach((dataset) => {
    dataset.data = [];
  });
  // Update the chart to reflect the changes
  myChart.update();

  // Get the table
  const table = document.getElementById("table1");

  // Get all input elements within the table
  const inputs = table.getElementsByTagName("input");

  // Loop through each input and clear its value
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}

function updateValue(value) {
  document.getElementById("sliderValue").textContent = value;
}
