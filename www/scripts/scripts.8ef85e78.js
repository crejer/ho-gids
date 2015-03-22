L.RotatedMarker=L.Marker.extend({options:{angle:0},_setPos:function(a){if(L.Marker.prototype._setPos.call(this,a),L.DomUtil.TRANSFORM)this._icon.style[L.DomUtil.TRANSFORM]+=" rotate("+this.options.angle+"deg)";else if(L.Browser.ie){var b=this.options.angle*(Math.PI/180),c=Math.cos(b),d=Math.sin(b);this._icon.style.filter+=" progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', M11="+c+", M12="+-d+", M21="+d+", M22="+c+")"}}}),L.rotatedMarker=function(a,b){return new L.RotatedMarker(a,b)},angular.module("hoGidsApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","wu.masonry","leaflet-directive","snap"]).config(["$routeProvider","snapRemoteProvider",function(a,b){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/informatie",{templateUrl:"views/informatie.html",controller:"InformatieCtrl"}).when("/programma",{templateUrl:"views/programma.html",controller:"ProgrammaCtrl"}).when("/kaart",{templateUrl:"views/kaart.html",controller:"KaartCtrl"}).when("/kaart/:highlightPlaats",{templateUrl:"views/kaart.html",controller:"KaartCtrl"}).when("/nieuwsstroom",{templateUrl:"views/nieuwsstroom.html",controller:"NieuwsstroomCtrl"}).otherwise({redirectTo:"/"}),b.globalOptions={disable:"right",hyperextensible:!1}}]).run(function(){navigator.splashscreen&&navigator.splashscreen.hide()}),angular.module("hoGidsApp").controller("MainCtrl",["$scope",function(){}]),angular.module("hoGidsApp").controller("ProgrammaCtrl",["$scope","$location","Programma",function(a,b,c){a.programma=c.programma,a.toonOpKaart=function(a){a.plaats&&(a.selected=!0,b.path("/kaart/"+a.plaats))}}]);var labelClassName="map-label",iconClassName="map-icon",hogeRielenCenter=L.latLng(51.24230669704754,4.936895370483398),hogeRielenBounds=L.latLngBounds(L.latLng(51.23,4.909),L.latLng(51.253,4.957)),DEFAULT_ZOOM=14,styles={podiumgrond:{fillColor:"#c4d545",fillOpacity:1,stroke:!1},pavilioen:{fillColor:"#0e7594",fillOpacity:1,stroke:!1},loods:{fillColor:"#417493",fillOpacity:1,stroke:!1},kampeergrond:{fillColor:"#f38230",fillOpacity:1,stroke:!1,lineJoin:"round"},vijver:{fillColor:"#04D9D9",fillOpacity:1,stroke:!1},bos:{fillColor:"#07E668",fillOpacity:1,stroke:!1},"weg-hard":{weight:4,opacity:1,color:"white",lineCap:"square"},"weg-halfhard":{weight:4,opacity:1,color:"white",lineCap:"square"},"weg-zand":{weight:1,opacity:1,color:"#417493",dashArray:"5"},faciliteit:{stroke:!1,radius:4,fillColor:"#0e7594",fillOpacity:1},border:{fillColor:"#c1d7e4",weight:5,color:"#0e7594",fillOpacity:1,opacity:1},"default":{fillColor:"black",weight:1,opacity:1,color:"white",fillOpacity:.7}},icons={ehboIcon:L.icon({iconUrl:"images/kaart/ehbo.png",iconSize:[16,16],className:iconClassName}),infoIcon:L.icon({iconUrl:"images/kaart/info.png",iconSize:[16,16],className:iconClassName}),sisIcon:L.icon({iconUrl:"images/kaart/sis.png",iconSize:[16,16],className:iconClassName}),onthaalIcon:L.icon({iconUrl:"images/kaart/onthaal.png",iconSize:[16,16],className:iconClassName}),locationIcon:L.icon({iconUrl:"images/kaart/marker-location.png",iconRetinaUrl:"images/kaart/marker-location-2x.png",shadowUrl:"images/kaart/marker-shadow.png",shadowRetinaUrl:"images/kaart/marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],shadowSize:[41,41]})};angular.module("hoGidsApp").controller("KaartCtrl",["$scope","$http","leafletData","$routeParams","$log",function(a,b,c,d){function e(a){return styles[a.properties.style]||styles.default}function f(a,b){if(a.properties.name)switch(a.properties.name.toLowerCase()){case"ehbo":return L.marker(b,{icon:icons.ehboIcon});case"infopunt":return L.marker(b,{icon:icons.infoIcon});case"sis":return L.marker(b,{icon:icons.sisIcon});case"onthaal":return L.marker(b,{icon:icons.onthaalIcon})}return L.circle(b,7)}function g(a){return!(a.properties.show_on_map===!1)}function h(a,b){i(a,b),j(a,b)}function i(a,b){if(a.properties.name&&"Polygon"==a.geometry.type){var c=L.divIcon({className:labelClassName,html:a.properties.name}),d=L.polygon(b._latlngs);L.marker(d.getBounds().getCenter(),{icon:c}).addTo(u)}}function j(a,b){if(k(a)){var c=L.polygon(b._latlngs),d=c.getBounds().getCenter();t=L.marker(d).addTo(u)}}function k(a){if(d.highlightPlaats){var b=a.properties.name,c=a.properties.alias,e=d.highlightPlaats.toLowerCase();return b&&b.toLowerCase()==e||c&&c.toLowerCase().indexOf(e)>=0}return!1}function l(){var a=u.getZoom(),b={14:6,15:7,16:10,17:12,18:16};angular.element("."+labelClassName).css("fontSize",b[a]+"px");var c={14:6,15:8,16:16,17:24,18:32},d=c[a],e=-1*d/2;angular.element("."+iconClassName).css("width",d+"px").css("height",d+"px").css("margin-left",e+"px").css("margin-top",e+"px")}function m(){r&&t?u.panInsideBounds(L.latLngBounds(t.getLatLng()),r.getLatLng(),{animate:!0,duration:1}):(r||t)&&(u.setZoom(DEFAULT_ZOOM+2,{animate:!1}),l(),r?u.panTo(r.getLatLng(),{animate:!0,duration:1}):t&&u.panTo(t.getLatLng(),{animate:!0,duration:1}))}function n(a){o(a)}function o(a){if(console.log(a),hogeRielenBounds.contains(a.latlng)){var b=a.accuracy/2;r&&s?(r.setLatLng(a.latlng),s.setLatLng(a.latlng),s.setRadius(b)):(r=L.marker(a.latlng,{icon:icons.locationIcon}).addTo(u),s=L.circle(a.latlng,b,{fillOpacity:.3,fillColor:"#1d9c5a",stroke:!1}).addTo(u),m())}else r=void 0,s=void 0}function p(){r=void 0,s=void 0}function q(){u.on("accuratepositionprogress",n),u.on("accuratepositionfound",o),u.on("accuratepositionerror",p),u.findAccuratePosition({maxWait:8e3,desiredAccuracy:50})}var r,s,t,u=L.map("map",{center:hogeRielenCenter,zoom:DEFAULT_ZOOM,minZoom:14,maxBounds:hogeRielenBounds});u.whenReady(function(){u.on("layeradd",l),u.on("zoomend",l)});var v="http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png";L.tileLayer(v,{attribution:""}).addTo(u),L.Icon.Default.imagePath="images/kaart",b.get("data/map.geojson").success(function(a){L.geoJson(a,{style:e,pointToLayer:f,filter:g,onEachFeature:h}).addTo(u),q(),m()})}]),angular.module("hoGidsApp").controller("MenuCtrl",["$scope","$location",function(a,b){a.isActive=function(a){return 0===b.path().indexOf(a)}}]),angular.module("hoGidsApp").service("Programma",function(){var a=[{titel:"Kapoenen / Zeehondjes",plaats:"K10",beschrijving:"Kom op ontdekking en leer waar jij en je kapoenen goed in zijn! \nNieuwe spelen, moeilijke kapoenen, voorlezen, spelen in elkaar boksen, gescheiden ouders,... dit en méér kan je vinden in het kapoenenaanbod!"},{titel:"Kabouters / (Zee)welpen",plaats:"K7",beschrijving:"Of je nu nieuw bent in de horde, al wat lessen van Baloe onder de knie hebt, of een ervaren Akela bent, doet er niet zo toe. Bij ons vind je workshops om ervaringen uit te wisselen, om nieuwe spellen te leren, om je danskunsten bij te schaven,... Kortom, in onze jungle is er voor elk wat wils."},{titel:"Jonggidsen / Jongverkenner / Scheepsmakker",plaats:"KP14",beschrijving:"Alle leiding zijn helden maar alleen als team zijn ze ontoombaar. Als leiding ben je een held voor je leden omdat je ze vanalles kan leren, maar een held blijf je pas als je zelf steeds bijleert."},{titel:"(Zee)gidsen / (Zee)verkenner (+ SOLL)",plaats:"Vijver 1",beschrijving:"Klaar om een fantastisch jaar als giverleiding tegemoet te gaan? Na het volgen van een van onze werkwinkels zeker wel! Aan de vijver bieden wij jullie inspiratie om in het kader van het jaarthema met je givers van het buitenleven te genieten, tips en tricks om originele en uitdagende projecten op te bouwen, een kans om even stil te staan bij totemisatie en nog veel meer."},{titel:"Jins / Loodsen",plaats:"KP12",beschrijving:"Zin om je jinjaar zonder kleerscheuren te overleven? Op zoek naar een originele jinvergadering? Ideeën nodig voor het eerste jinweekend? Zin in een leuk project, maar weet je niet goed hoe eraan te beginnen? Inspiratie nodig? Meer weten over kampen, leefweek en kleurentotems? \nPrima, wees dan welkom op onze Jingrond. We bewijzen dat vorming allesbehalve saai hoeft te zijn door zowel inhoudelijke als praktische werkwinkels aan te bieden. Dit alles is natuurlijk, zoals het de jins betaamt, overgoten met een zotte en speelse saus."},{titel:"Groepsleiding, VGA, materiaalmeesters",plaats:"KKG",beschrijving:"Net groepsleiding geworden? Al veel ervaring, maar de groepsadministratie vlot niet? Waar en hoe vind ik nieuwe leiding? Hoe start ik een oudercomité op? Talloze vragen waar je hier een antwoord op vindt!"},{titel:"Akabeleiding",plaats:"K12",beschrijving:"Scouting... zonder beperking! \nEen handicap hoeft geen beperking te zijn. Ontdek hoe je het maximum kan halen uit je groep en echt iedereen meekrijgt bij scouting, of je nu een lid hebt met ADHD, autisme of downsyndroom. Rolstoelspelen, klauteren in de bossen, zwaardgevechten... we doen het gewoon bij Akabe!"}],b=[{titel:"Scouting da's spelen! ",plaats:"K12",beschrijving:"Wie anders dan het C.I.S. kan een massa mensen laten samenspelen? Speel mee met dit massaspel en laat je inspireren om in je eigen groep 'en masse' te spelen."},{titel:"Scouting, dat zijn rituelen voor jong en oud! Maar hoe?",plaats:"KP12",beschrijving:"Momenten bij uitstek waarop scouting in volle glorie wordt beleefd?! Juist ja,  een takovergang, totems geven, belofterituelen, maar ook een nieuw jaarlogo op je hemd of een stevige linker aka scoutsgroet! Maar hoe doe je in godsnaam belofte bij jonggidsen? Wat zijn geschikte totemproeven voor verkenners? Kan dat, een bezinning voor elke tak die toch 'modern' is? En is een scoutsdas echt belangrijk? Langs ons parcours met 4 tophaltes kom je er echt massa's over te weten!"},{titel:"Scouting, goed geregeld!",plaats:"KKG groot podium",beschrijving:"Scouting staat voor kwaliteit, maar ook voor veiligheid. Alleen durft dat laatste al eens ingewikkeld te worden. We loodsen je doorheen de regels van de vzw-wetgeving, Speel op Veilig en verzekeringen."},{titel:"Scouting ... ook voor armen, moslims, ADHD'ers ...? ",plaats:"K10",beschrijving:"Ook wij als scouts en gidsen lezen schrijnende armoedecijfers, horen moeilijke debatten over allochtonen, stellen vast dat we een middenklasse-beweging zijn... Toch bouwen we aan een jeugdbeweging voor iedereen met zin in scouting. Kom onze standpunten beluisteren, ontdek wat 'open kampen' zijn,hoe je als groep eigen drempels kan ontdekken en aanpakken, gezinnen met financiële moeilijkheden vooruit kan helpen ... en laat je eigen stem natuurlijk horen!"},{titel:"Grensverleggende scouting",plaats:"K7",beschrijving:"Sterker dan ooit zet internationaal in op praktische, haalbare tips en uitwisseling voor wie op scoutskamp gaat naar het buitenland: transport? slaapplaats? uitwisseling? budget? Ook als leiding van de jongste takken kan jij je ding vinden bij ons: spel en kampideeën van over de hele wereld!"},{titel:"Eerste Hulp voor Jeugdleiders",plaats:"KP14",beschrijving:"Het Jeugd Rode kruis komt jou de voornaamste toepassingen in de Eerste Hulp voor jeugdbeweging uitleggen. Denk hierbij aan schaafwonden verzorgen, omgaan met crisissituaties en 'mag ik nu medicatie geven of niet?'."},{titel:"Vorming van Ploeg Vorming en hun vrienden",plaats:"KP14",beschrijving:"Werkwinkels in alle vormen en maten: speels, groepsdynamisch, inhoudelijk, weinig inhoudelijk, communicatief, dans, koken,... Voor iedereen is er iets."},{titel:"Scouteske Technieken",plaats:"KKG markt",beschrijving:"Kom nieuwe technieken ontdekken op ons technieken-marktje of ga aan de slag met het buitenboek. Wie weet kom je bij ons nog een Smid of een Boswachter tegen en hoe zat dat nu weer met ons materiaalkot?"},{titel:"Scouting op het water",plaats:"Vijver 1",beschrijving:"Ontdek de meerwaarde van zeescouting of verdiep je in je nautische vaardigheden."},{titel:"Vorming, den boom in",plaats:"Touwenparcours",beschrijving:"Een voormiddag in de touwen hangen tussen de bomen van de Hoge Rielen, het kan!"},{titel:"Een eigen huis, een plek onder de zon",plaats:"LK10",beschrijving:"Lokaal verbouwen, verhuren en dit allemaal zelf? Last van inbrekers, te hoge energiefacturen, zwerfvuil? Is de omgeving van je lokaal wel veilig? Vind antwoord op je vragen in dit thema."},{titel:"Groepsadministratie",plaats:"Natuur & Avontuur",beschrijving:"Het adressenbestand van je scouts- of gidsengroep beheren en de aansluiting van je leden bij Scouts en Gidsen Vlaanderen gebeurt via de Groepsadministratie. Maar er zijn zoveel meer tools, leuke snufjes en manieren om de Groepsadministratie te gebruiken. Wilde je al lang een nieuwsbrief sturen naar je ouders of je oud-leidingsploeg organiseren of wil je de nieuwe snufjes ontdekken? Leer het allemaal in dit thema."}],c={programma:[{dag:"Vrijdag",items:[{start:"19:00",titel:"Aankomst",beschrijving:"Aankomst en inschrijving deelnemers"},{start:"20:00",stop:"22:30",titel:"Onthaal",beschrijving:"Onthaal en instapactiviteit bij je gouw",plaats:"Gouwgrond"},{start:"23:00",stop:"01:00",titel:"Onthaalshow",beschrijving:"Onthaalshow op het grote podium",plaats:"KKG"},{start:"01:00",stop:"02:30",titel:"Scouteske avond",beschrijving:"Scouteske avond met her en der animo, kampvuur + café",plaats:"KKG"},{start:"03:00",titel:"Slaapwel",beschrijving:"Tijd om je slaapzak op te zoeken en slaapwel",plaats:"Gouwgrond"}]},{dag:"Zaterdag",items:[{start:"08:00",stop:"09:00",titel:"Opstaan",beschrijving:"Wekken en ontbijt op je gouwgrond",plaats:"Gouwgrond"},{start:"09:15",stop:"09:50",titel:"Openingsshow",beschrijving:"Openingsshow op het hoofdpodium",plaats:"KKG"},{start:"10:00",stop:"12:30",titel:"Thema-aanbod",beschrijving:"Tijd voor thema’s (vorming) op de themagronden",plaats:"Themagronden",subitems:b},{start:"12:40",stop:"13:40",titel:"Picknick",beschrijving:"Massa-picknick met animo",plaats:"KKG"},{start:"13:50",stop:"16:20",titel:"Takaanbod",beschrijving:"Tijd voor takken (vorming) op de takgronden",plaats:"Takgronden",subitems:a},{start:"16:30",stop:"22:00",titel:"Gouw- en districtsmoment",beschrijving:"Gouw- en districtsmoment met warm avondmaal op je gouwgrond",plaats:"Gouwgrond"},{start:"22:15",stop:"22:45",titel:"Zin in HO",beschrijving:"ZIN in HO op het hoofdpodium",plaats:"KKG"},{start:"22:45",stop:"02:30",titel:"Avondaanbod",beschrijving:"Avondgebeuren met her en der animo, kampvuur + café",plaats:"KKG"},{start:"03:00",titel:"Slaapwel",beschrijving:"Tijd om je slaapzak op te zoeken en slaapwel",plaats:"Gouwgrond"}]},{dag:"Zondag",items:[{start:"08:00",stop:"09:00",titel:"Opstaan",beschrijving:"Wekken en ontbijt op je gouwgrond",plaats:"Gouwgrond"},{start:"09:30",stop:"11:30",titel:"Markt",beschrijving:"Een actief marktgebeuren met walking brunch",plaats:"KKG"},{start:"12:00",stop:"13:00",titel:"Slotshow",beschrijving:"Slotshow op het grote podium",plaats:"KKG"},{start:"13:00",stop:"14:00",titel:"Opruim",beschrijving:"Opruim en afbraak"},{start:"15:30",titel:"Vertrek naar huis"}]}]};return c}),L.Map.include({_defaultAccuratePositionOptions:{maxWait:1e4,desiredAccuracy:20},findAccuratePosition:function(a){if(!navigator.geolocation)return this._handleAccuratePositionError({code:0,message:"Geolocation not supported."}),this;this._accuratePositionEventCount=0,this._accuratePositionOptions=L.extend(this._defaultAccuratePositionOptions,a),this._accuratePositionOptions.enableHighAccuracy=!0,this._accuratePositionOptions.maximumAge=0,this._accuratePositionOptions.timeout||(this._accuratePositionOptions.timeout=this._accuratePositionOptions.maxWait);var b=L.bind(this._checkAccuratePosition,this),c=L.bind(this._handleAccuratePositionError,this),d=L.bind(this._handleAccuratePositionTimeout,this);this._accuratePositionWatchId=navigator.geolocation.watchPosition(b,c,this._accuratePositionOptions),this._accuratePositionTimerId=setTimeout(d,this._accuratePositionOptions.maxWait)},_handleAccuratePositionTimeout:function(){return navigator.geolocation.clearWatch(this._accuratePositionWatchId),"undefined"!=typeof this._lastCheckedAccuratePosition?this._handleAccuratePositionResponse(this._lastCheckedAccuratePosition):this._handleAccuratePositionError({code:3,message:"Timeout expired"}),this},_cleanUpAccuratePositioning:function(){clearTimeout(this._accuratePositionTimerId),navigator.geolocation.clearWatch(this._accuratePositionWatchId)},_checkAccuratePosition:function(a){var b=a.coords.accuracy<=this._accuratePositionOptions.desiredAccuracy;this._lastCheckedAccuratePosition=a,this._accuratePositionEventCount=this._accuratePositionEventCount+1,b&&this._accuratePositionEventCount>1?(this._cleanUpAccuratePositioning(),this._handleAccuratePositionResponse(a)):this._handleAccuratePositionProgress(a)},_prepareAccuratePositionData:function(a){var b=a.coords.latitude,c=a.coords.longitude,d=new L.LatLng(b,c),e=180*a.coords.accuracy/40075017,f=e/Math.cos(L.LatLng.DEG_TO_RAD*b),g=L.latLngBounds([b-e,c-f],[b+e,c+f]),h={latlng:d,bounds:g,timestamp:a.timestamp};for(var i in a.coords)"number"==typeof a.coords[i]&&(h[i]=a.coords[i]);return h},_handleAccuratePositionProgress:function(a){var b=this._prepareAccuratePositionData(a);this.fire("accuratepositionprogress",b)},_handleAccuratePositionResponse:function(a){var b=this._prepareAccuratePositionData(a);this.fire("accuratepositionfound",b)},_handleAccuratePositionError:function(a){var b=a.code,c=a.message||(1===b?"permission denied":2===b?"position unavailable":"timeout");this._cleanUpAccuratePositioning(),this.fire("accuratepositionerror",{code:b,message:"Geolocation error: "+c+"."})}}),angular.module("hoGidsApp").controller("InformatieCtrl",["$scope","$location",function(a){a.gaNaarRodeKruis=function(){}}]),angular.module("hoGidsApp").controller("NieuwsstroomCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]);