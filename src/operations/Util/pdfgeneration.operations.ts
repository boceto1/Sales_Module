const pdf = require('html-pdf');
import {
  createMailCtrl,
} from '../Util/mail.operation';
import { Quotation, Offer, OfferService, Company, Mail } from '../../types/types';
var options = { format: 'A4' };

function head() {
  var head = `<!DOCTYPE HTML5><html><head>
  <title>Cotizacion</title>
  <meta charset="utf-8">
  <meta name="author" content="">
  <style>
  .box {
    overflow: hidden;
}

.content {
    font-size: 15px;
    line-height: 20px;
    padding: 0 20px;
    text-align: justify;
}

.left {
    float: left;
    width: 50%;
}

.left .content {
    border-right: 5px solid #000000  ;
}

.right {
    float: right;
    width: 50%;
}
H1 { text-align: center}
H3 { text-align: center}
td {
  font-size: 15px;
  line-height: 20px;
  padding: 0 20px;
  text-align: justify;
  vertical-align: top;

}

</style>
  </head>`;
  return head;
}

function body(quote: Quotation, company: Company[]) {
  var body = `<body><h1>${company[0].name}</h1> <h3>COTIZACION</h3>
      <div class="box">
      <div class="left">
          <div class="content">
          <h3>Company</h3>
          <p>Name: <output id = "id">${ company[0].name}</output></p>
          <p>RUC: <output id="ruc" > ${ company[0].ruc} </output></p>
            <p>Address: <output id="address" > ${ company[0].address} </output></p>  
            <p>Phone: <output id="phone" > ${ company[0].phone} </output></p>  
            <p>Mail: <output id="mail" > ${ company[0].mail} </output></p>  
          </div>
      </div>
      <div class="right">
          <div class="content">
          <h3>Client</h3>
          <p>Name: <output id = "id1">${ company[1].name}</output></p>
          <p>RUC: <output id="ruc1" > ${ company[1].ruc} </output></p>
            <p>Address: <output id="address1" > ${ company[1].address} </output></p>  
            <p>Phone: <output id="phone1" > ${ company[1].phone} </output></p>  
            <p>Mail: <output id="mail1" > ${ company[1].mail} </output></p>  
          </div>
      </div>
  </div>
  <p>Description: <output id="description" > ${ quote.description} </output></p>
    <p>Date: <output id="creation" > ${ quote.creationDate.toDateString()}</output></p>  
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
  <td >${item.idService}</td>
    <td WIDTH="70%"> ${item.description} </td>
      <td> ${item.unitValue}</td>
      <td> ${item.amount} </td>
      <td> ${item.totalValue}</td>
  </tr>`
}

function renderOffer(item: Offer) {
  var html = `<table border="1" >
  <caption>Offer</caption><tr>
  <th >ID Service</th>
    <th WIDTH="70%"> Description </th>
    <th> Unit Value </th>
    <th> Amount </th>
    <th> Total Value </th>
    </tr>`;
  html = html + tablaService(item);
  html = html + `</table>
    <p align="right" > Total: <output id="total"> ${item.total} </output></p>`;
  return html;
}


function tablaOffer(quote: Quotation,quotes: Quotation) {
  console.log(quote.offers.length)
  const rede = quotes.offers.map(renderOffer);

  const render = rede.reduce(function (valorAnterior, valorActual) {
    return valorAnterior + valorActual;
  });
  return render;
}

const generatePDF = async (html: String,mail:Mail) => {
  pdf.create(html, options).toFile('./tmp/cotizacion.pdf', function (err, res) {
    if (err) return "error";
    console.log(res);
    createMailCtrl(mail);
    return "realizado"; // { filename: '/app/businesscard.pdf' }
  });
}

export const generateHTML = async (quote: Quotation, company: Company[],quotes: Quotation,mail:Mail): Promise<any> => {
  var html = ``;
  html = head();
  html = html + body(quote, company);
  html = html + tablaOffer(quote,quotes);
  html = html + `</center> </body></html>`;
  await generatePDF(html,mail);
}