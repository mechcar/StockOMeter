parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"mpVp":[function(require,module,exports) {
var e={financeKey:"57edb9d42emsh2e21cedcaa1cecbp1f2a9ajsn8c9fb7947387",financeHost:"apidojo-yahoo-finance-v1.p.rapidapi.com",summaryURL:"https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US",symbol:"1",movers:function(){return{async:!0,crossDomain:!0,url:"https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-movers?region=US&lang=en-US&count=10&start=0",method:"GET",headers:{"x-rapidapi-key":e.financeKey,"x-rapidapi-host":e.financeHost}}},news:function(){return{async:!0,crossDomain:!0,url:"https://apidojo-yahoo-finance-v1.p.rapidapi.com/news/v2/get-details?uuid=9803606d-a324-3864-83a8-2bd621e6ccbd&region=US",method:"GET",headers:{"x-rapidapi-key":e.financeKey,"x-rapidapi-host":e.financeHost}}},summary:function(){return{async:!0,crossDomain:!0,url:"".concat(e.summaryURL,"&symbols=").concat(e.symbol),method:"GET",headers:{"x-rapidapi-key":e.financeKey,"x-rapidapi-host":e.financeHost}}},chart:function(){return{async:!0,crossDomain:!0,url:"https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?interval=5m&symbol=".concat(e.symbol,"&range=1d&region=US"),method:"GET",headers:{"x-rapidapi-key":e.financeKey,"x-rapidapi-host":e.financeHost}}},profile:function(){return{async:!0,crossDomain:!0,url:"https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-profile?symbol=".concat(e.symbol,"&region=US"),method:"GET",headers:{"x-rapidapi-key":e.financeKey,"x-rapidapi-host":e.financeHost}}},getMovers:function(){return $.ajax(e.movers()).then(function(t){var a={gainers:t.finance.result[0],losers:t.finance.result[1],mostActive:t.finance.result[2]};e.updateTime(),"closed"==e.marketOpen()&&$(".movers").toggleClass("showMarketClosed"),e.moverSize=6,a.gainers.quotes.slice(0,e.moverSize).forEach(function(e){var t='<div class="gainer">\n                <button id="moverSymbol" value='.concat(e.symbol,">").concat(e.symbol,"</button>\n            </div>");$(".gainers").append(t)}),a.losers.quotes.slice(0,e.moverSize).forEach(function(e){var t='<div class="loser">\n                <button id="moverSymbol" value='.concat(e.symbol,">").concat(e.symbol,"</button>\n            </div>");$(".losers").append(t)}),$(".gainers").toggleClass("show"),$(".gainersTitle").toggleClass("show"),$(".losers").toggleClass("show"),$(".losersTitle").toggleClass("show"),"open"==e.marketOpen()&&($(".mostActive").toggleClass("show"),$(".mostActiveTitle").toggleClass("show"),a.mostActive.quotes.slice(0,e.moverSize).forEach(function(e){var t='<div class="mostActiveSymbols">\n                    <button id="moverSymbol" value='.concat(e.symbol,">").concat(e.symbol,"</button>\n                </div>");$(".mostActive").append(t)})),$("button").click(function(t){t.preventDefault(),e.symbol=$(this).val(),e.getSummary(e.summary()),e.getChart(e.chart()),e.getProfile(e.profile())})})},getNews:function(){return $.ajax(e.news()).then(function(t){contents=t.data.contents[0].content,articleTitle=contents.title,articleSummary=contents.summary,articleTickers=contents.finance.stockTickers,articleLink=contents.canonicalUrl.url,$(".articleTitle").text(articleTitle),articleTickers.forEach(function(e){var t='<div class="articleTicker">\n                <button id="articleSymbol" value='.concat(e.symbol,">").concat(e.symbol,"</button>\n            </div>");$(".articleTickers").append(t)}),$("button").click(function(t){t.preventDefault(),e.symbol=$(this).val(),e.getSummary(e.summary()),e.getChart(e.chart()),e.getProfile(e.profile())}),$(".articleSummary").text(articleSummary),$(".articleLink").attr("href",articleLink),$("#news").addClass("show"),$("#news").removeClass("hidden")})},getSelectValue:function(){$("form").on("submit",function(t){t.preventDefault(),e.symbol=$("#symbol").val().toUpperCase(),e.symbol.length>5?(console.log("Error 1!"),$(".quotesContent").addClass("hidden"),$(".quotesContent").removeClass("show"),$(".chart").addClass("hidden"),$(".chart").removeClass("show"),Swal.fire({title:"Error!",text:"It appears that ".concat(e.symbol," is not a listed US security. Most symbols traded in the US have a symbol length between 1 and 5 characters. Did you mean ").concat(e.symbol.slice(0,5),"?"),icon:"warning",confirmButtonText:"Continue",timer:5e3,timerProgressBar:!0}),$("#symbol").val(""),$(".profileInformation").addClass("show"),$(".profileInformation").removeClass("hidden")):($(".quotesContent").removeClass("hidden"),$(".quotesContent").addClass("show"),$(".chart").removeClass("hidden"),$(".chart").addClass("show"),e.getSummary(e.summary()),e.getChart(e.chart()),e.getProfile(e.profile()))})},getSummary:function(){return $.ajax(e.summary()).then(function(t){if(values=t.quoteResponse.result[0],"undefined"==typeof values)return console.log("Error 2!"),$(".quotesContent").addClass("hidden"),$(".quotesContent").removeClass("show"),$(".chart").addClass("hidden"),$(".chart").removeClass("show"),Swal.fire({title:"Error!",text:"It appears that ".concat(e.symbol," is not a listed US security. Try another symbol."),icon:"warning",confirmButtonText:"Continue",timer:3e3,timerProgressBar:!0}),$("#symbol").val(""),$(".profileInformation").addClass("show"),void $(".profileInformation").removeClass("hidden");if(e.updateTime(),validExchanges=["NYQ","PNK","NMS","YHD","NCM","NGM","ARC","BATS","NGS","OOTC","OTC","ASE"],exchange=values.exchange,!validExchanges.includes(exchange))return console.log("Error 3!",exchange),$(".symbol").text("".concat(e.symbol)),$(".quotesContent").addClass("hidden"),$(".quotesContent").removeClass("show"),$(".chart").addClass("hidden"),$(".chart").removeClass("show"),Swal.fire({title:"Error!",text:"It appears that ".concat(e.symbol," is not a listed US security. It trades on ").concat(exchange,". Try another symbol."),icon:"warning",confirmButtonText:"Continue",timer:3e3,timerProgressBar:!0}),$("#symbol").val(""),$(".profileInformation").addClass("show"),void $(".profileInformation").removeClass("hidden");e.changeCheck=values.regularMarketChange;var a={longName:values.longName,previousClosingPrice:values.regularMarketPreviousClose,openingPrice:values.regularMarketOpen,price:values.regularMarketPrice,daysChangeDollars:values.regularMarketChange,daysChangePercent:values.regularMarketChangePercent,regularMarketDayLow:values.regularMarketDayLow,regularMarketDayHigh:values.regularMarketDayHigh,fiftyTwoWeekLow:values.fiftyTwoWeekLow,fiftyTwoWeekHigh:values.fiftyTwoWeekHigh,regularMarketVolume:values.regularMarketVolume,averageVolume10Day:values.averageDailyVolume10Day},o=Object.entries(a),r=Object.entries(a);for(i=0;i<o.length;i++)void 0===o[i][1]&&(r[i][1]=0);var n={longName:r[0][1],previousClosingPrice:r[1][1],openingPrice:r[2][1],price:r[3][1],daysChangeDollars:r[4][1],daysChangePercent:r[5][1],regularMarketDayLow:r[6][1],regularMarketDayHigh:r[7][1],fiftyTwoWeekLow:r[8][1],fiftyTwoWeekHigh:r[9][1],regularMarketVolume:r[10][1],averageVolume10Day:r[11][1]},s=Object.values(n);for(e.check=0,i=0;i<s.length;i++)0!==s[i]&&"$0.00"!==s[i]&&"0.00%"!==s[i]||(e.check+=1);12==e.check?(console.log("Error 4!"),Swal.fire({title:"Error!",text:"It appears that ".concat(e.symbol," is not an active US security. Try another symbol."),icon:"warning",confirmButtonText:"Continue",timer:3e3,timerProgressBar:!0}),$("#symbol").val(""),$(".profileInformation").addClass("show"),$(".profileInformation").removeClass("hidden")):(e.populate=function(){e.updateTime(),e.pennyStockFormatter=function(e){return"number"==typeof e?e<1?e.toFixed(3):e.toFixed(2):(end=e[e.length-1],"$"===e[0]?parseFloat(e.slice(1))<1?"$".concat(parseFloat(e.slice(1)).toFixed(3)):"$".concat(parseFloat(e.slice(1)).toFixed(2)):"%"===e[end]?parseFloat(e.slice(0,end))<1?"".concat(parseFloat(e.slice(0,end)).toFixed(3),"%"):"".concat(parseFloat(e.slice(0,end)).toFixed(2),"%"):void 0)},n.previousClosingPrice=e.pennyStockFormatter(n.previousClosingPrice),n.openingPrice=e.pennyStockFormatter(n.openingPrice),n.daysChangeDollars=e.bracketWrapNegatives(e.pennyStockFormatter(n.daysChangeDollars),"$"),n.daysChangePercent=e.bracketWrapNegatives(e.pennyStockFormatter(n.daysChangePercent),"%"),n.regularMarketDayLow=e.pennyStockFormatter(n.regularMarketDayLow),n.regularMarketDayHigh=e.pennyStockFormatter(n.regularMarketDayHigh),n.fiftyTwoWeekLow=e.pennyStockFormatter(n.fiftyTwoWeekLow),n.fiftyTwoWeekHigh=e.pennyStockFormatter(n.fiftyTwoWeekHigh),n.price=e.bracketWrapNegatives(e.pennyStockFormatter(n.price),"$"),$(".longName").text(n.longName),$(".previousClosingPrice").text("$".concat(n.previousClosingPrice)),$(".openingPrice").text("$".concat(n.openingPrice)),$(".daysChangeDollars").text(n.daysChangeDollars),$(".daysChangePercent").text(n.daysChangePercent),parseFloat(n.openingPrice)<parseFloat(n.previousClosingPrice)?$(".openingPrice").addClass("negativeValue"):$(".openingPrice").removeClass("negativeValue"),values.regularMarketChange<0?($(".regularMarketPrice").addClass("negativeValue"),$(".daysChangeDollars").addClass("negativeValue"),$(".daysChangePercent").addClass("negativeValue")):($(".regularMarketPrice").removeClass("negativeValue"),$(".daysChangeDollars").removeClass("negativeValue"),$(".daysChangePercent").removeClass("negativeValue")),$(".daysRange").text("$".concat(n.regularMarketDayLow," - $").concat(n.regularMarketDayHigh)),$(".fiftyTwoWeekRange").text("$".concat(n.fiftyTwoWeekLow," - $").concat(n.fiftyTwoWeekHigh)),$(".regularMarketVolume").text("".concat(n.regularMarketVolume.toLocaleString("en-US"))),$(".averageVolume10Day").text("".concat(n.averageVolume10Day.toLocaleString("en-US"))),$("#news").addClass("hidden"),$("#news").removeClass("show"),$("#quotesContent").addClass("show"),$("#quotesContent").removeClass("hidden"),$(".symbol").text("".concat(e.symbol))},"open"==e.marketOpen()?(e.populate(),$(".regularMarketPrice").text("".concat(n.price))):(e.populate(),$(".regularMarketPrice").addClass("hidden"),$(".regularMarketPriceHeader").addClass("hidden"),$(".closePrice").text("".concat(n.price)),$(".closeHeader").removeClass("hidden"),$(".closeHeader").addClass("show"),values.regularMarketChange<0?$(".closePrice").addClass("negativeValue"):$(".closePrice").removeClass("negativeValue")))})},getChartColor:function(){e.chartColor="green",e.changeCheck<0&&(e.chartColor="red")},getChart:function(){$.ajax(e.chart()).then(function(t){e.getChartColor();var a=t.chart.result[0];if(timeAxis=a.timestamp,priceAxis=a.indicators.quote[0].open,null==timeAxis&&e.getSummary())console.log("Error 5!"),$(".chart").addClass("hidden"),$(".chart").removeClass("show"),Swal.fire({title:"Error!",text:"It appears that ".concat(e.symbol," does not have updated chart information."),icon:"warning",confirmButtonText:"Continue",timer:3e3,timerProgressBar:!0}),$("#symbol").val("");else{if(null==timeAxis)return console.log("Error 6!"),$(".quotesContent").addClass("hidden"),$(".quotesContent").removeClass("show"),$(".chart").addClass("hidden"),$(".chart").removeClass("show"),Swal.fire({title:"Error!",text:"It appears that ".concat(e.symbol," is not an active US security. It may have been delisted. Try another symbol."),icon:"warning",confirmButtonText:"Continue",timer:3e3,timerProgressBar:!0}),$("#symbol").val(""),$(".profileInformation").addClass("show"),void $(".profileInformation").removeClass("hidden");$(".quotesContent").removeClass("hidden"),$(".quotesContent").addClass("show"),$(".chart").removeClass("hidden"),$(".chart").addClass("show")}businessOpenEpoch=function(t){for(i=0;i<t.length;i++)if("9:30"===e.epochToDate(t[i]))return i},businessCloseEpoch=function(t){for(j=0;j<t.length;j++){if("16:05"===e.epochToDate(t[j]))return j;if(j===t.length)return j}};var o=businessOpenEpoch(timeAxis),r=businessCloseEpoch(timeAxis);for(getBusinessHoursIndex=function(e){return e.slice(o,r)},timeAxis=getBusinessHoursIndex(timeAxis),i=0;i<timeAxis.length;i++)timeAxis[i]=e.epochToDate(timeAxis[i]);for("closed"==e.marketOpen()&&timeAxis.length<75&&(console.log("Error 7!"),$(".chart").addClass("hidden"),$(".chart").removeClass("show"),Swal.fire({title:"Error!",text:"It appears that ".concat(e.symbol," is missing chart data for parts of the regular market open."),icon:"warning",confirmButtonText:"Continue",timer:3e3,timerProgressBar:!0}),$("#symbol").val("")),priceAxis=getBusinessHoursIndex(priceAxis),i=0;i<priceAxis.length;i++)null===priceAxis[i]?priceAxis[i]=priceAxis[i-1]:priceAxis[i]<1?priceAxis[i]=parseFloat(priceAxis[i].toFixed(4)):priceAxis[i]=parseFloat(priceAxis[i].toFixed(2));function n(){var t=google.visualization.arrayToDataTable(dataTable);options={title:"".concat(e.symbol," - ").concat(e.dateInNewTimezone),hAxis:{title:"Time",titleTextStyle:{color:"white"},textStyle:{color:"white"}},vAxis:{minValue:Math.min(priceAxis)-5,maxValue:Math.max(priceAxis)+5,title:"Price",titleTextStyle:{color:"white"},textStyle:{color:"white"}},legend:{textStyle:{color:"white"}},titleTextStyle:{color:"white"},backgroundColor:"black",chartArea:{backgroundColor:"black"},colors:["".concat(e.chartColor)]},new google.visualization.AreaChart(document.getElementById("graph")).draw(t,options)}concatArr=function(e,t){return e.map(function(e,a){return[e,t[a]]})},timePrice=concatArr(timeAxis,priceAxis),dataTable=[["Time","".concat(e.symbol)]].concat(timePrice),google.charts.load("current",{packages:["corechart"]}),google.charts.setOnLoadCallback(n),$(window).resize(function(){n()})})},getProfile:function(){$.ajax(e.profile()).then(function(t){if(e.companyDescription=t.assetProfile.longBusinessSummary,void 0===e.companyDescription)$(".profileInformation").addClass("hidden"),Swal.fire({title:"Error!",text:"It appears that ".concat(e.symbol," is missing information from its profile."),icon:"warning",confirmButtonText:"Continue",timer:3e3,timerProgressBar:!0}),$("#symbol").val("");else{$(".profileInformation").empty();var a='<button class="getProfile" value='.concat(e.symbol,">View Profile</button>");$(".profileInformation").append(a),$(".profileInformation").on("click",function(t){t.stopImmediatePropagation(),t.preventDefault(),Swal.fire({title:"Profile for ".concat(e.symbol,":"),text:e.companyDescription,icon:"info",width:600,confirmButtonText:"Return to Quote"})}),$("#symbol").val("")}})},currentTime:function(){return new Date},dateConversion:function(){e.currentTime.toLocaleTimeString,e.options={day:"2-digit",month:"2-digit",year:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",timeZone:"America/New_York",timeZoneName:"short"},e.formatter=new Intl.DateTimeFormat("sv-SE",e.options),e.startingDate=e.currentTime(),e.dateInNewTimezone=e.formatter.format(e.startingDate),e.hours=parseInt(e.dateInNewTimezone.slice(8,11)),e.minutes=parseInt(e.dateInNewTimezone.slice(12,15))},businessHours:function(){return(e.hours>=9||9===e.hours&&e.minutes>=30)&&e.hours<16}};e.dayOfWeek=e.currentTime().getDay(),e.isWeekend=6===e.dayOfWeek||0===e.dayOfWeek,e.marketOpen=function(){return e.isWeekend||!e.businessHours()?"closed":"open"},e.marketStatusAndTime=function(){$(".marketStatus").text("Market is currently ".concat(e.marketOpen(),".")),$(".currentTime").text("Last refreshed: ".concat(e.dateInNewTimezone))},e.updateTime=function(){e.currentTime(),e.dateConversion(),e.marketOpen(),e.marketStatusAndTime()},e.bracketWrapNegatives=function(e,t){if(void 0===e)return 0;if("("===e[0]&&")"===e[e.length-1]&&(e="-".concat(e.slice(1,e.length-1))),"$"===e[1]?e=e.slice(2):"$"===e[0]?e=e.slice(1):"%"===e[e.length-1]&&(e=e.slice(0,e.length-1)),(e=parseFloat(e))<0){if("$"===t)return"(".concat(t).concat(Math.abs(e).toFixed(2),")");if("%"===t)return"(".concat(Math.abs(e).toFixed(2)).concat(t,")")}else{if("$"===t)return"".concat(t).concat(e.toFixed(2));if("%"===t)return"".concat(e.toFixed(2)).concat(t)}},e.epochToDate=function(e){e<1e10&&(e*=1e3);e+=-1*(new Date).getTimezoneOffset();return hours=new Date(e).getHours(),minutes=new Date(e).getMinutes()+1,60==minutes?(minutes="00",hours+=1):5==minutes&&(minutes="05"),time="".concat(hours,":").concat(minutes),time},e.init=function(){this.getNews(),this.getMovers(),this.getSelectValue()},$(function(){e.init()});
},{}]},{},["mpVp"], null)
//# sourceMappingURL=/script.8a24bda4.js.map