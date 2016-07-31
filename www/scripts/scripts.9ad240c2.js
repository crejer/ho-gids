function onDeviceReady(){7===parseFloat(window.device.version)&&(document.body.style.marginTop="20px")}L.RotatedMarker=L.Marker.extend({options:{angle:0},_setPos:function(a){if(L.Marker.prototype._setPos.call(this,a),L.DomUtil.TRANSFORM)this._icon.style[L.DomUtil.TRANSFORM]+=" rotate("+this.options.angle+"deg)";else if(L.Browser.ie){var b=this.options.angle*(Math.PI/180),c=Math.cos(b),d=Math.sin(b);this._icon.style.filter+=" progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', M11="+c+", M12="+-d+", M21="+d+", M22="+c+")"}}}),L.rotatedMarker=function(a,b){return new L.RotatedMarker(a,b)},document.addEventListener("deviceready",onDeviceReady,!1),angular.module("hoGidsApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","wu.masonry","leaflet-directive","snap","LocalStorageModule"]).config(["$routeProvider","snapRemoteProvider","localStorageServiceProvider",function(a,b,c){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/informatie",{templateUrl:"views/informatie.html",controller:"InformatieCtrl"}).when("/programma",{templateUrl:"views/programma.html",controller:"ProgrammaCtrl"}).when("/instellingen",{templateUrl:"views/instellingen.html",controller:"InstellingenCtrl"}).when("/over",{templateUrl:"views/over.html",controller:"OverCtrl"}).when("/kaart",{templateUrl:"views/kaart.html",controller:"KaartCtrl"}).when("/kaart/:highlightPlaats",{templateUrl:"views/kaart.html",controller:"KaartCtrl"}).when("/leefregels",{templateUrl:"views/leefregels.html",controller:"LeefregelsCtrl"}).otherwise({redirectTo:"/"}),b.globalOptions={hyperextensible:!1,touchToDrag:!1,tapToClose:!0},c.setPrefix("hogids").setStorageCookie(0,"/")}]).run(["localStorageService","Programma","$rootScope","snapRemote",function(a,b,c,d){navigator.splashscreen&&navigator.splashscreen.hide();var e=a.get("gouw");e&&b.gouwen.forEach(function(b){b.naam==e.naam&&a.set("gouw",b)}),c.$on("$locationChangeStart",function(){d.close()}),c.$on("$routeChangeStart",function(){$(".content-view").hide(),d.close()}),c.$on("$viewContentLoaded",function(){$(".content-view").show()})}]),angular.module("hoGidsApp").controller("MainCtrl",["$scope",function(){}]),angular.module("hoGidsApp").controller("ProgrammaCtrl",["$scope","$location","Programma","localStorageService",function(a,b,c,d){a.programma=c.programma,a.gouw=d.get("gouw"),a.toonOpKaart=function(c){c.plaats&&(c.selected=!0,c.plaats.toLowerCase().indexOf("gouw")>=0?a.gouw&&b.path("/kaart/"+a.gouw.grond):b.path("/kaart/"+c.plaats))}}]);var labelClassName="map-label",iconClassName="map-icon",iconRectClassName="map-icon-rect",hogeRielenCenter=L.latLng(51.24230669704754,4.936895370483398),hogeRielenBounds=L.latLngBounds(L.latLng(51.23,4.909),L.latLng(51.253,4.957)),DEFAULT_ZOOM=14,POLL_LOCATION_INTERVAL=7,POLL_LOCATION_TIMEOUT=8,POLL_LOCATION_INTERVAL_OUTSIDE_AREA=600,POSITION_DESIRED_ACCURACY=50,POSITION_MAX_ALLOWED_ACCURACY=350,styles={podium:{fillColor:"#f07d00",fillOpacity:1,stroke:!1},podiumgrond:{fillColor:"#006f93",fillOpacity:1,stroke:!1},pavilioen:{fillColor:"#e2afc4",fillOpacity:1,stroke:!1},loods:{fillColor:"#dae283",fillOpacity:1,stroke:!1},kampeergrond:{fillColor:"#51af31",fillOpacity:1,stroke:!1,lineJoin:"round"},"kampeergrond-ongebruikt":{fillColor:"#fdf7f4",fillOpacity:1,stroke:!1,lineJoin:"round"},aanbod:{fillColor:"#da0c25",fillOpacity:1,stroke:!1,lineJoin:"round"},vijver:{fillColor:"#009fe3",fillOpacity:.6,stroke:!1,lineJoin:"round"},bos:{fillColor:"#7e216e",fillOpacity:1,weight:1,color:"37af6b"},"weg-hard":{weight:4,opacity:1,color:"white",lineCap:"square"},"weg-hard-2":{weight:3,opacity:1,color:"white",lineCap:"square"},"weg-halfhard":{weight:3,opacity:1,color:"white",lineCap:"square"},"weg-zand":{weight:1,opacity:1,color:"#f0a68f",dashArray:"5"},faciliteit:{stroke:!1,radius:4,fillColor:"#0e7594",fillOpacity:1},border:{fillColor:"#fcefe9",weight:5,color:"#f0a68f",fillOpacity:1,opacity:1},"default":{fillColor:"black",weight:1,opacity:1,color:"white",fillOpacity:.7}},accuracyCircleStyle={fillOpacity:.3,fillColor:"#1d9c5a",stroke:!1},accuracyCircleStyleInvalid={fillOpacity:.3,fillColor:"#9C2A1D",stroke:!1},icons={ehboIcon:L.icon({iconUrl:"images/kaart/ehbo.png",iconSize:[24,24],className:iconClassName}),infoIcon:L.icon({iconUrl:"images/kaart/infopunt.png",iconSize:[24,24],className:iconClassName}),sisIcon:L.icon({iconUrl:"images/kaart/sis.png",iconSize:[24,24],className:iconClassName}),onthaalIcon:L.icon({iconUrl:"images/kaart/onthaal.png",iconSize:[24,24],className:iconClassName}),sanitair:L.icon({iconUrl:"images/kaart/sanitair.png",iconSize:[24,24],className:iconClassName}),afwasbatterij:L.icon({iconUrl:"images/kaart/afwasbatterij.png",iconSize:[24,24],className:iconClassName}),evacuatiepunt:L.icon({iconUrl:"images/kaart/evacuatiepunt.png",iconSize:[24,24],className:iconClassName}),bar:L.icon({iconUrl:"images/kaart/bar.png",iconSize:[24,24],className:iconClassName}),eten:L.icon({iconUrl:"images/kaart/eten.png",iconSize:[24,24],className:iconClassName}),tent:L.icon({iconUrl:"images/kaart/tent.png",iconSize:[128,64],className:iconRectClassName}),locationIcon:L.icon({iconUrl:"images/kaart/marker-location.png",iconRetinaUrl:"images/kaart/marker-location-2x.png",shadowUrl:"images/kaart/marker-shadow.png",shadowRetinaUrl:"images/kaart/marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],shadowSize:[41,41]})};angular.module("hoGidsApp").controller("KaartCtrl",["$scope","$http","leafletData","$routeParams","$log","localStorageService","$rootScope",function(a,b,c,d,e,f,g){function h(a){return styles[a.properties.style]||styles.default}function i(a,b){if(a.properties.name)switch(a.properties.name.toLowerCase()){case"ehbo":return L.marker(b,{icon:icons.ehboIcon});case"infopunt":return L.marker(b,{icon:icons.infoIcon});case"sis":return L.marker(b,{icon:icons.sisIcon});case"onthaal":return L.marker(b,{icon:icons.onthaalIcon});case"sanitair":return L.marker(b,{icon:icons.sanitair});case"afwasbatterij":return L.marker(b,{icon:icons.afwasbatterij});case"evacuatiepunt":return L.marker(b,{icon:icons.evacuatiepunt});case"centrale bar":return L.marker(b,{icon:icons.bar});case"bar":return L.marker(b,{icon:icons.bar});case"eten":return L.marker(b,{icon:icons.eten})}return L.circle(b,7)}function j(a){return a.properties.show_on_map!==!1}function k(a,b){l(a,b),m(a,b)}function l(a,b){if("Polygon"===a.geometry.type){var c=L.polygon(b._latlngs);if("kampeergrond"===a.properties.style&&L.marker(c.getBounds().getCenter(),{icon:icons.tent}).addTo(D),a.properties.name){var d=L.divIcon({className:labelClassName,html:a.properties.name});L.marker(c.getBounds().getCenter(),{icon:d}).addTo(D)}}}function m(a,b){if(n(a)){var c=b._latlngs?L.polygon(b._latlngs).getBounds().getCenter():b._latlng;c&&(A=L.marker(c).addTo(D))}}function n(a){if(d.highlightPlaats){var b=a.properties.name,c=a.properties.alias,e=d.highlightPlaats.toLowerCase();return b&&b.toLowerCase()===e||c&&c.toLowerCase().indexOf(e)>=0}return!1}function o(){var a=D.getZoom(),b={14:6,15:7,16:12,17:14,18:20};angular.element("."+labelClassName).css("fontSize",b[a]+"px");var c={14:10,15:16,16:24,17:44,18:56},d=c[a],e=-1*d/2;angular.element("."+iconClassName).css("width",d+"px").css("height",d+"px").css("margin-left",e+"px").css("margin-top",e+"px");var f={14:10,15:16,16:32,17:56,18:64},g=f[a],h=-1*g,i=-1*g/2;angular.element("."+iconRectClassName).css("width",2*g+"px").css("height",g+"px").css("margin-left",h+"px").css("margin-top",i+"px")}function p(){y&&A?(D.setZoom(DEFAULT_ZOOM+2,{animate:!1}),D.fitBounds(L.latLngBounds(A.getLatLng(),y.getLatLng()),{animate:!0,duration:1,maxZoom:DEFAULT_ZOOM+2})):(y||A)&&(D.setZoom(DEFAULT_ZOOM+2,{animate:!1}),o(),y?D.panTo(y.getLatLng(),{animate:!0,duration:1}):A&&D.panTo(A.getLatLng(),{animate:!0,duration:1}))}function q(a){r(a)}function r(a){if(console.log(a),g.latLng="["+a.latlng.lat+", "+a.latlng.lng+"], "+a.accuracy,hogeRielenBounds.contains(a.latlng)){if(a.accuracy<POSITION_MAX_ALLOWED_ACCURACY){var b=a.accuracy/2;y&&z?(y.setLatLng(a.latlng),y.update(),z.setLatLng(a.latlng),z.setRadius(b),z.setStyle(accuracyCircleStyle),z.redraw()):(y=L.marker(a.latlng,{icon:icons.locationIcon}),D.addLayer(y),z=L.circle(a.latlng,b,accuracyCircleStyle),D.addLayer(z),p())}}else t(),w(POLL_LOCATION_INTERVAL_OUTSIDE_AREA)}function s(a){e.warn("Position not found",a),z&&z.setStyle(accuracyCircleStyleInvalid)}function t(){y&&D.removeLayer(y),z&&D.removeLayer(z),y=void 0,z=void 0,g.latLng=void 0}function u(){C&&(D.on("accuratepositionprogress",q),D.on("accuratepositionfound",r),D.on("accuratepositionerror",s),v())}function v(){e.info("Request position."),D.findAccuratePosition({maxWait:1e3*POLL_LOCATION_TIMEOUT,desiredAccuracy:POSITION_DESIRED_ACCURACY}),w(POLL_LOCATION_INTERVAL)}function w(a){x(),B=setInterval(v,1e3*a)}function x(){B&&clearInterval(B)}var y,z,A,B,C=f.get("locationEnabled")!==!1;g.pollLocationInterval=POLL_LOCATION_INTERVAL;var D=L.map("map",{center:hogeRielenCenter,zoom:DEFAULT_ZOOM,minZoom:14,maxBounds:hogeRielenBounds});D.whenReady(function(){D.on("layeradd",o),D.on("zoomend",o)});var E="http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png";L.tileLayer(E,{attribution:""}).addTo(D),L.Icon.Default.imagePath="images/kaart",b.get("data/map.geo.json").success(function(a){L.geoJson(a,{style:h,pointToLayer:i,filter:j,onEachFeature:k}).addTo(D),u(),setTimeout(p,600)}),document.addEventListener("pause",x,!1),document.addEventListener("resume",v,!1),a.$on("$destroy",function(){console.log("destroy"),x()})}]),angular.module("hoGidsApp").controller("MenuCtrl",["$scope","$location","localStorageService",function(a,b,c){a.gouw=c.get("gouw"),a.isActive=function(a){return 0===b.path().indexOf(a)},a.go=function(a){b.path(a)}}]),angular.module("hoGidsApp").service("Programma",function(){var a=[{titel:"Kapoenen",plaats:"K10",beschrijving:"Kom op ontdekking en leer waar jij en je kapoenen goed in zijn! \nNieuwe spelen, moeilijke kapoenen, voorlezen, spelen in elkaar boksen, gescheiden ouders,... dit en méér kan je vinden in het kapoenenaanbod!"},{titel:"Welpen, kabouters",plaats:"K14",beschrijving:"Of je nu nieuw bent in de horde, al wat lessen van Baloe onder de knie hebt, of een ervaren Akela bent, doet er niet zo toe. Bij ons vind je workshops om ervaringen uit te wisselen, om nieuwe spellen te leren, om je danskunsten bij te schaven,... Kortom, in onze jungle is er voor elk wat wils."},{titel:"Jongverkenners, jonggidsen",plaats:"K12",beschrijving:"Alle leiding zijn helden maar alleen als team zijn ze ontoombaar. Als leiding ben je een held voor je leden omdat je ze vanalles kan leren, maar een held blijf je pas als je zelf steeds bijleert."},{titel:"Verkenners, gidsen",plaats:"Vijver 1",beschrijving:"Klaar om een fantastisch jaar als giverleiding tegemoet te gaan? Na het volgen van een van onze werkwinkels zeker wel! Aan de vijver bieden wij jullie inspiratie om in het kader van het jaarthema met je givers van het buitenleven te genieten, tips en tricks om originele en uitdagende projecten op te bouwen, een kans om even stil te staan bij totemisatie en nog veel meer."},{titel:"Jins",plaats:"K11",beschrijving:"Zin om je jinjaar zonder kleerscheuren te overleven? Op zoek naar een originele jinvergadering? Ideeën nodig voor het eerste jinweekend? Zin in een leuk project, maar weet je niet goed hoe eraan te beginnen? Inspiratie nodig? Meer weten over kampen, leefweek en kleurentotems? \nPrima, wees dan welkom op onze Jingrond. We bewijzen dat vorming allesbehalve saai hoeft te zijn door zowel inhoudelijke als praktische werkwinkels aan te bieden. Dit alles is natuurlijk, zoals het de jins betaamt, overgoten met een zotte en speelse saus."},{titel:"Groepsleiding",plaats:"KKK",beschrijving:"Net groepsleiding geworden? Al veel ervaring, maar de groepsadministratie vlot niet? Waar en hoe vind ik nieuwe leiding? Hoe start ik een oudercomité op? Talloze vragen waar je hier een antwoord op vindt!"},{titel:"Zeescouting",plaats:"Vijver 1",beschrijving:""},{titel:"Akabe",plaats:"P13",beschrijving:"Scouting... zonder beperking! \nEen handicap hoeft geen beperking te zijn. Ontdek hoe je het maximum kan halen uit je groep en echt iedereen meekrijgt bij scouting, of je nu een lid hebt met ADHD, autisme of downsyndroom. Rolstoelspelen, klauteren in de bossen, zwaardgevechten... we doen het gewoon bij Akabe!"},{titel:"Actie en spel",plaats:"KKG",beschrijving:"Scouting da’s proeven. Op de actie en spelgrond kan je vooral zelf heel wat spelen ontdekken. Van zwerkbal tot bosspel. We nemen je mee op een ontdekkingstocht."},{titel:"EHBO",plaats:"KKG",beschrijving:"Eerste Hulp Bij Ongevallen kunnen toedienen, het blijft een handige vaardigheid voor leiding. Het Jeugd Rode Kruis komt het ons nog eens allemaal haarfijn uitleggen."},{titel:"Techniekenmarkt",plaats:"KKG",beschrijving:"Een markt vol met technieken en experimenten. Van knopen leggen tot vuur maken, van hout klieven tot… , wij voorzien techniekenweetjes voor ervaren en minder ervaren techneuten"},{titel:"Zit je scoutscarrière erop",plaats:"Infopunt",beschrijving:"...maar kriebelt het om nog iets meer te doen? Inspiratie nodig over een goede stam- of oudleidingswerking? Heb je expertise waar we bij Scouts en Gidsen Vlaanderen nog iets mee kunnen doen? (enkel tijdens sessie 1)"}],b=[{titel:"Volksdansen (0u)",plaats:"Hoofdpodium",beschrijving:""},{titel:"Scouteske zangavond (1u)",plaats:"Hoofdpodium",beschrijving:""},{titel:"Labyrjinth",plaats:"L341",beschrijving:""},{titel:"Hopper café met karaoke",plaats:"K10",beschrijving:""},{titel:"Pijl en boog",plaats:"LK10",beschrijving:""},{titel:"Kampvuur",plaats:"KKG",beschrijving:""}],c=[{titel:"Optreden 1a (23u)",plaats:"Hoofdpodium",beschrijving:""},{titel:"Optreden 1b (23u)",plaats:"K10",beschrijving:""},{titel:"Optreden 2a (0u45)",plaats:"Hoofdpodium",beschrijving:""},{titel:"Optreden 2b (0u30)",plaats:"K10",beschrijving:""},{titel:"Hopper café",plaats:"LK10",beschrijving:""},{titel:"Kampvuur",plaats:"KKG",beschrijving:""}],d={programma:[{dag:"Vrijdag",items:[{start:"19:00",titel:"Aankomst",beschrijving:"Aankomst en inschrijving"},{start:"20:00",titel:"Installeren",beschrijving:"Tentje opzetten, matje uitrollen",plaats:"Gouwgrond"},{start:"20:00",stop:"22:45",titel:"Gouwfoor",beschrijving:"Gouwfoor op de grote grond",plaats:"KKG"},{start:"22:45",stop:"23:15",titel:"Opwarmer",beschrijving:"Opwarmer op het grote podium",plaats:"KKG"},{start:"23:15",stop:"00:00",titel:"Openingsshow",beschrijving:"Openingsshow op het grote podium",plaats:"KKG"},{start:"00:00",stop:"02:30",titel:"Scouteske avond",beschrijving:"Scouteske avond met animo, kampvuur en café",plaats:"",subitems:b},{start:"03:00",titel:"Slaapwel",beschrijving:"Tijd om in je slaapzak te kruipen",plaats:"Gouwgrond"}]},{dag:"Zaterdag",items:[{start:"08:00",stop:"09:00",titel:"Opstaan",beschrijving:"Opstaan en ontbijt op je gouwgrond",plaats:"Gouwgrond"},{start:"09:00",stop:"11:00",titel:"Gouw- en districtsmoment",plaats:"Gouwgrond"},{start:"11:15",stop:"11:45",titel:"Opening van de dag",plaats:"KKG"},{start:"11:45",stop:"12:30",titel:"Gouwbattle",plaats:"Gouwgrond"},{start:"12:30",stop:"13:30",titel:"Picknick",beschrijving:"Massa-picknick op de grote grond met animo",plaats:"KKG"},{start:"13:40",stop:"15:40",titel:"Tak- en themamoment",beschrijving:"Vorming op de tak- en themagronden",plaats:"Vormingsgronden",subitems:a},{start:"16:20",stop:"18:20",titel:"Tak- en themamoment",beschrijving:"Vorming op de tak- en themagronden",plaats:"Vormingsgronden",subitems:a},{start:"18:40",stop:"20:00",titel:"Avondeten",beschrijving:"Warm avondmaal op je gouwgrond",plaats:"Gouwgrond"},{start:"20:00",stop:"22:00",titel:"Gouwmoment",plaats:"Gouwgrond"},{start:"22:15",stop:"22:45",titel:"Zin in HO",beschrijving:"ZIN in HO op het grote podium",plaats:"KKG"},{start:"22:45",stop:"02:30",titel:"Avondaanbod",beschrijving:"Avondgebeuren met optredens, animo, kampvuur en café",plaats:"",subitems:c},{start:"03:00",titel:"Slaapwel",beschrijving:"Tijd om in je slaapzak te kruipen",plaats:"Gouwgrond"}]},{dag:"Zondag",items:[{start:"08:00",stop:"09:00",titel:"Opstaan",plaats:"Gouwgrond"},{start:"09:15",stop:"11:45",titel:"Markt",beschrijving:"Een actieve markt met walking brunch op de grote grond",plaats:"KKG"},{start:"11:45",stop:"12:00",titel:"Jaarthemalied",plaats:"KKG"},{start:"12:00",stop:"13:00",titel:"Afsluiter HO",beschrijving:"Slotshow op het grote podium",plaats:"KKG"},{start:"13:00",stop:"14:00",titel:"Opruim",beschrijving:"Opruim en afbraak"},{start:"15:30",titel:"Vertrek naar huis"}]}],gouwen:[{naam:"Antwerpen",grond:"K1",grondDetail:"oost"},{naam:"Gent",grond:"K6",grondDetail:"west"},{naam:"Heide",grond:"K5"},{naam:"Kempen",grond:"K9"},{naam:"Land van Egmont",grond:"K4",grondDetail:"zuid"},{naam:"Limburg",grond:"K3"},{naam:"Noordzee",grond:"K4",grondDetail:"noord"},{naam:"Oost-Brabant",grond:"K6",grondDetail:"oost"},{naam:"Opsinjoor",grond:"K7"},{naam:"Waas",grond:"K1",grondDetail:"west"},{naam:"Webra",grond:"K1",grondDetail:"noord"},{naam:"Zuid-West-Vlaanderen",grond:"K1",grondDetail:"zuid"}]};return d}),L.Map.include({_defaultAccuratePositionOptions:{maxWait:1e4,desiredAccuracy:20},findAccuratePosition:function(a){if(!navigator.geolocation)return this._handleAccuratePositionError({code:0,message:"Geolocation not supported."}),this;this._accuratePositionEventCount=0,this._accuratePositionOptions=L.extend(this._defaultAccuratePositionOptions,a),this._accuratePositionOptions.enableHighAccuracy=!0,this._accuratePositionOptions.maximumAge=0,this._accuratePositionOptions.timeout||(this._accuratePositionOptions.timeout=this._accuratePositionOptions.maxWait);var b=L.bind(this._checkAccuratePosition,this),c=L.bind(this._handleAccuratePositionError,this),d=L.bind(this._handleAccuratePositionTimeout,this);this._accuratePositionWatchId=navigator.geolocation.watchPosition(b,c,this._accuratePositionOptions),this._accuratePositionTimerId=setTimeout(d,this._accuratePositionOptions.maxWait)},_handleAccuratePositionTimeout:function(){return navigator.geolocation.clearWatch(this._accuratePositionWatchId),"undefined"!=typeof this._lastCheckedAccuratePosition?this._handleAccuratePositionResponse(this._lastCheckedAccuratePosition):this._handleAccuratePositionError({code:3,message:"Timeout expired"}),this},_cleanUpAccuratePositioning:function(){clearTimeout(this._accuratePositionTimerId),navigator.geolocation.clearWatch(this._accuratePositionWatchId)},_checkAccuratePosition:function(a){var b=a.coords.accuracy<=this._accuratePositionOptions.desiredAccuracy;this._lastCheckedAccuratePosition=a,this._accuratePositionEventCount=this._accuratePositionEventCount+1,b&&this._accuratePositionEventCount>1?(this._cleanUpAccuratePositioning(),this._handleAccuratePositionResponse(a)):this._handleAccuratePositionProgress(a)},_prepareAccuratePositionData:function(a){var b=a.coords.latitude,c=a.coords.longitude,d=new L.LatLng(b,c),e=180*a.coords.accuracy/40075017,f=e/Math.cos(L.LatLng.DEG_TO_RAD*b),g=L.latLngBounds([b-e,c-f],[b+e,c+f]),h={latlng:d,bounds:g,timestamp:a.timestamp};for(var i in a.coords)"number"==typeof a.coords[i]&&(h[i]=a.coords[i]);return h},_handleAccuratePositionProgress:function(a){var b=this._prepareAccuratePositionData(a);this.fire("accuratepositionprogress",b)},_handleAccuratePositionResponse:function(a){var b=this._prepareAccuratePositionData(a);this.fire("accuratepositionfound",b)},_handleAccuratePositionError:function(a){var b=a.code,c=a.message||(1===b?"permission denied":2===b?"position unavailable":"timeout");this._cleanUpAccuratePositioning(),this.fire("accuratepositionerror",{code:b,message:"Geolocation error: "+c+"."})}}),angular.module("hoGidsApp").controller("InformatieCtrl",["$scope","$location",function(a,b){a.showOnMap=function(a){b.path("/kaart/"+a)}}]),angular.module("hoGidsApp").controller("LeefregelsCtrl",["$scope",function(){}]),angular.module("hoGidsApp").controller("InstellingenCtrl",["$scope","$rootScope","$location","localStorageService","Programma",function(a,b,c,d,e){a.gouw=d.get("gouw"),a.gouwen=e.gouwen,a.setGouw=function(a){console.debug("Zet gouw op: "+a),d.set("gouw",a)},a.showOnMap=function(a){c.path("/kaart/"+a)},a.enableLocation=function(b){return a.locationEnabled=b,d.set("locationEnabled",b),b},a.locationEnabled=d.get("locationEnabled")===!1?!1:a.enableLocation(!0)}]),angular.module("hoGidsApp").controller("OverCtrl",["$scope",function(a){var b="https://github.com/timvlaer/ho-gids";a.showGithubPage=function(a){"undefined"!=typeof cordova?cordova.InAppBrowser.open(b,"_system","location=yes"):window.open(b,"_system","location=yes"),a.preventDefault()}}]);