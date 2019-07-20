var pdf = require('html-pdf');
import { Quotation, Offer } from '../../types/types';
var options = { format: 'Letter' };

function head() {
  var head = `<!DOCTYPE HTML5><html><head>
  <title>Ejercicios prácticos HTML5</title>
  <meta charset="utf-8">
  <meta name="author" content="">
  </head>`;
  return head;
}

function body(quote: Quotation, company: String) {
  var body = `<body><center> <h1>${company}</h1></center>
  <p>ID Company: <output id = "id">${ quote.idCompany}</output></p>
    <p>Description: <output id="description" > ${ quote.description} </output></p>
      <p>Date: <output id="creation" > ${ quote.creationDate} </output></p>
        <center>`;
  return body;
}

function tablaService(servic: Offer) {
  var service = ``;
  for (var j = 0; j < servic.services.length; j++) {
    service = service + `<tr>
      <td>${servic.services[j].idService}</td>
        <td> ${servic.services[j].description} </td>
          <td> ${servic.services[j].unitValue}</td>
          <td> ${servic.services[j].amount} </td>
          <td> ${servic.services[j].totalValue}</td>
            </tr>`;
  }
  return service;
}

function tablaOffer(quote: Quotation) {
  var offer = ``;
  console.log(quote.offers.length)
  for (var i = 0; i < quote.offers.length; i++) {
    offer = offer + `<table border="1" >
    <caption>Offer </caption><tr>
    <th>ID Service </th>
      <th> Description </th>
      <th> Unit Value </th>
      <th> Amount </th>
      <th> Total Value </th>
      </tr>`;
    console.log(quote.offers[i].services)
    offer = offer + tablaService(quote.offers[i]);
    offer = offer + `</table>
      <p> Total: <output id="total"> ${quote.offers[i].total} </output></p>`;
  }
  return offer;
}
function generatePDF(html: String) {
  console.log(html)
  pdf.create(html, options).toFile('./tmp/example.pdf', function (err, res) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/businesscard.pdf' }
  });
}

export const generateHTML = (quote: Quotation, company: String) => {
  var html = ``;
  html = head();
  html = html + body(quote, company);
  html = html + tablaOffer(quote);
  html = html + `</center> </body></html>`;
  generatePDF(html);
}
