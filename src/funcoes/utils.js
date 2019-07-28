"use strict";

export const maskCurrency = (value, maxLength = 8, radix = ",") => {
    const currencyRegExp = new RegExp(
        `(\\d{1,${maxLength - 2}})(.)?(\\d{2})`,
        "g"
    );
    return value.replace(currencyRegExp, (match, p1, p2, p3) =>
        [p1, p3].join(radix)
    );
};

export const numberToReal = (numero) => {
    var numero = numero.toFixed(2).split('.');
    console.log(numero)
    numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
    return numero.join(',');
}

export const formatMoney = (valor, places, symbol, thousand, decimal) => {
	places = !isNaN(places = Math.abs(places)) ? places : 2;
	symbol = symbol !== undefined ? symbol : "$";
	thousand = thousand || ",";
	decimal = decimal || ".";
	var number = valor, 
	    negative = number < 0 ? "-" : "",
	    i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
	    j = (j = i.length) > 3 ? j % 3 : 0;
	return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};

