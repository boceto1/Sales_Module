var pdf = require('html-pdf');
import { Quotation, Offer, OfferService } from '../../types/types';
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
  const rede = servic.services.map(renderOfferService);
  const render = rede.reduce(function (valorAnterior, valorActual) {
    return valorAnterior + valorActual;
  });
  return render;
}

function renderOfferService(item: OfferService) {
  return `<tr>
  <td>${item.idService}</td>
    <td> ${item.description} </td>
      <td> ${item.unitValue}</td>
      <td> ${item.amount} </td>
      <td> ${item.totalValue}</td>
  </tr>`
}

function renderOffer(item: Offer) {
  var html = `<table border="1" >
  <caption>Offer </caption><tr>
  <th>ID Service </th>
    <th> Description </th>
    <th> Unit Value </th>
    <th> Amount </th>
    <th> Total Value </th>
    </tr>`;
  html = html + tablaService(item);
  html = html + `</table>
    <p> Total: <output id="total"> ${item.total} </output></p>`;
  return html;
}


function tablaOffer(quote: Quotation) {
  console.log(quote.offers.length)
  const rede = quote.offers.map(renderOffer);

  const render = rede.reduce(function (valorAnterior, valorActual) {
    return valorAnterior + valorActual;
  });
  return render;
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