window.onload = function () {

  init();

};

function init () {

  var currencyList = [
    {"path": "currency.AUD.json"},
    {"path": "currency.USD.json"},
    {"path": "currency.GBP.json"},
    {"path": "currency.ARS.json"},
    {"path": "currency.BRL.json"},
    {"path": "currency.CAD.json"},
    {"path": "currency.CLP.json"},
    {"path": "currency.CNY.json"},
    {"path": "currency.HRK.json"},
    {"path": "currency.CZK.json"},
    {"path": "currency.DKK.json"},
    {"path": "currency.EUR.json"},
    {"path": "currency.HKD.json"},
    {"path": "currency.HUF.json"},
    {"path": "currency.INR.json"},
    {"path": "currency.IDR.json"},
    {"path": "currency.ILS.json"},
    {"path": "currency.JPY.json"},
    {"path": "currency.KWD.json"},
    {"path": "currency.MYR.json"},
    {"path": "currency.MXN.json"},
    {"path": "currency.XPF.json"},
    {"path": "currency.NZD.json"},
    {"path": "currency.NOK.json"},
    {"path": "currency.OMR.json"},
    {"path": "currency.PLN.json"},
    {"path": "currency.QAR.json"},
    {"path": "currency.SAR.json"},
    {"path": "currency.SGD.json"},
    {"path": "currency.SBD.json"},
    {"path": "currency.ZAR.json"},
    {"path": "currency.KRW.json"},
    {"path": "currency.LKR.json"},
    {"path": "currency.SEK.json"},
    {"path": "currency.CHF.json"},
    {"path": "currency.TWD.json"},
    {"path": "currency.THB.json"},
    {"path": "currency.TRY.json"},
    {"path": "currency.AED.json"},
    {"path": "currency.VUV.json"},
    {"path": "currency.VND.json"},
    {"path": "currency.WST.json"}
  ];

  var startTime = new Date().getTime();
  var table = document.getElementById('currency-table');

  var updateTable = function (i, table) {
    getNextFile(startTime, currencyList[i].path, populateTable, table, currencyList.length);
  };

  for (var i = 0; i < currencyList.length; i++) {
  // for (var i = 3; i < 4; i++) {
    updateTable(i, table);
  }

}

function getNextFile (startTime, filePath, callback, table, progressBarValue) {

  var xmlhttp = new XMLHttpRequest(), response;

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4) {

      if (xmlhttp.status == 200) {

        response = JSON.parse(xmlhttp.responseText);

        callback(response, table, progressBarValue);

      }

      else {

        response = false;

      }

    }

  };

  xmlhttp.open("GET", "assets/" + filePath + '?cachebuster=' + startTime, true);
  xmlhttp.send();

}

function populateTable (nextFile, table, progressBarValue) {

  for (var i = 0; i < nextFile.currencies.length; i++) {

    var row = document.createElement('tr');
    row.innerHTML =
      '<td>' + nextFile.currencies[i].currencyName + '</td>' +
      '<td>' + nextFile.currencies[i].currencyTitle + '</td>' +
      '<td>' + nextFile.currencies[i].bbCashTChqs + '</td>' +
      '<td>' + nextFile.currencies[i].bbForeignCheques + '</td>' +
      '<td>' + nextFile.currencies[i].bbImt + '</td>' +
      '<td>' + nextFile.currencies[i].bsCashTmcTChqs + '</td>' +
      '<td>' + nextFile.currencies[i].bsImt + '</td>';

    table.appendChild(row);
    console.log("appended");
  }
  console.log("currency updated");
  var progressBarEl = document.getElementsByClassName('progress-bar')[0];
  var style = window.getComputedStyle(progressBarEl, null);
  progressBarEl.style.width = (parseFloat(style.width) + window.innerWidth/progressBarValue) + 'px';
  console.log('progressBarEl.style.width ' , progressBarEl.style.width);
}
