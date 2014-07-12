"use strict";angular.module("hoGidsApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","wu.masonry","leaflet-directive"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/programma",{templateUrl:"views/programma.html",controller:"ProgrammaCtrl"}).when("/kaart",{templateUrl:"views/kaart.html",controller:"KaartCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("hoGidsApp").controller("MainCtrl",["$scope",function(){}]),angular.module("hoGidsApp").controller("ProgrammaCtrl",["$scope","Programma",function(a,b){a.programma=b.programma}]);var labelClassName="map-label",hogeRielenCenter={lat:51.24230669704754,lng:4.936895370483398,zoom:13},hogeRielenBounds={northEast:{lat:51.250734,lng:4.955134},southWest:{lat:51.235,lng:4.91645}};angular.module("hoGidsApp").controller("KaartCtrl",["$scope","$http","leafletData",function(a,b,c){function d(a){var b=i[a.properties.style];return b||i.default}function e(a,b){if(a.properties.name)switch(a.properties.name.toLowerCase()){case"ehbo":return L.marker(b,{icon:j.ehboIcon});case"infopunt":return L.marker(b,{icon:j.infoIcon});case"sis":return L.marker(b,{icon:j.sisIcon})}return L.circle(b,7)}function f(a){return!(a.properties.show_on_map===!1)}function g(a,b){if(a.properties.name&&"Polygon"==a.geometry.type){var d=L.divIcon({className:labelClassName,html:a.properties.name}),e=L.polygon(b._latlngs);c.getMap().then(function(a){L.marker(e.getBounds().getCenter(),{icon:d}).addTo(a)})}}function h(){c.getMap().then(function(a){var b=a.getZoom();angular.element("."+labelClassName).css("fontSize",b-4+"px");var c=15>=b?16-2*(18-b):16;angular.element(".leaflet-marker-icon").css("width",c+"px").css("height",c+"px")})}angular.extend(a,{center:hogeRielenCenter,maxbounds:hogeRielenBounds,events:{map:{enable:["layeradd","zoomend"],logic:"emit"}}});var i={podiumgrond:{fillColor:"#BF244E",fillOpacity:1,stroke:!1},pavilioen:{fillColor:"#A64E1B",fillOpacity:1,stroke:!1},loods:{fillColor:"#733613",fillOpacity:1,stroke:!1},kampeergrond:{fillColor:"#D9A443",fillOpacity:1,stroke:!1},vijver:{fillColor:"#04D9D9",fillOpacity:1,stroke:!1},"weg-hard":{weight:4,opacity:1,color:"white"},"weg-halfhard":{weight:4,opacity:1,dashArray:"5",color:"white"},"weg-zand":{weight:2,opacity:1,color:"white",dashArray:"3"},faciliteit:{stroke:!1,radius:4,fillColor:"#04C4D9",fillOpacity:1},"default":{fillColor:"black",weight:1,opacity:1,color:"white",fillOpacity:.7}},j={ehboIcon:L.icon({iconUrl:"images/kaart/ehbo.png",iconSize:[16,16]}),infoIcon:L.icon({iconUrl:"images/kaart/info.png",iconSize:[16,16]}),sisIcon:L.icon({iconUrl:"images/kaart/sis.png",iconSize:[16,16]})};b.get("data/map.geojson").success(function(b){angular.extend(a,{geojson:{data:b,style:d,pointToLayer:e,filter:f,onEachFeature:g}})}),a.$on("leafletDirectiveMap.layeradd",h),a.$on("leafletDirectiveMap.zoomend",h)}]),angular.module("hoGidsApp").controller("MenuCtrl",["$scope","$location",function(a,b){a.isActive=function(a){return a===b.path()}}]),angular.module("hoGidsApp").service("Programma",function(){var a=[{titel:"Kapoenen / Zeehondjes",plaats:"K10",beschrijving:"Kom op ontdekking en leer waar jij en je kapoenen goed in zijn! \nNieuwe spelen, moeilijke kapoenen, voorlezen, spelen in elkaar boksen, gescheiden ouders,... dit en méér kan je vinden in het kapoenenaanbod!"},{titel:"Kabouters / (Zee)welpen",plaats:"K7",beschrijving:"Of je nu nieuw bent in de horde, al wat lessen van Baloe onder de knie hebt, of een ervaren Akela bent, doet er niet zo toe. Bij ons vind je workshops om ervaringen uit te wisselen, om nieuwe spellen te leren, om je danskunsten bij te schaven,... Kortom, in onze jungle is er voor elk wat wils."},{titel:"Jonggidsen / Jongverkenner / Scheepsmakker",plaats:"KP14",beschrijving:"Alle leiding zijn helden maar alleen als team zijn ze ontoombaar. Als leiding ben je een held voor je leden omdat je ze vanalles kan leren, maar een held blijf je pas als je zelf steeds bijleert."},{titel:"(Zee)gidsen / (Zee)verkenner (+ SOLL)",plaats:"Vijver 1",beschrijving:"Klaar om een fantastisch jaar als giverleiding tegemoet te gaan? Na het volgen van een van onze werkwinkels zeker wel! Aan de vijver bieden wij jullie inspiratie om in het kader van het jaarthema met je givers van het buitenleven te genieten, tips en tricks om originele en uitdagende projecten op te bouwen, een kans om even stil te staan bij totemisatie en nog veel meer."},{titel:"Jins / Loodsen",plaats:"KP12",beschrijving:"Zin om je jinjaar zonder kleerscheuren te overleven? Op zoek naar een originele jinvergadering? Ideeën nodig voor het eerste jinweekend? Zin in een leuk project, maar weet je niet goed hoe eraan te beginnen? Inspiratie nodig? Meer weten over kampen, leefweek en kleurentotems? \nPrima, wees dan welkom op onze Jingrond. We bewijzen dat vorming allesbehalve saai hoeft te zijn door zowel inhoudelijke als praktische werkwinkels aan te bieden. Dit alles is natuurlijk, zoals het de jins betaamt, overgoten met een zotte en speelse saus."},{titel:"Groepsleiding, VGA, materiaalmeesters",plaats:"KKG",beschrijving:"Net groepsleiding geworden? Al veel ervaring, maar de groepsadministratie vlot niet? Waar en hoe vind ik nieuwe leiding? Hoe start ik een oudercomité op? Talloze vragen waar je hier een antwoord op vindt!"},{titel:"Akabeleiding",plaats:"K12",beschrijving:"Scouting... zonder beperking! \nEen handicap hoeft geen beperking te zijn. Ontdek hoe je het maximum kan halen uit je groep en echt iedereen meekrijgt bij scouting, of je nu een lid hebt met ADHD, autisme of downsyndroom. Rolstoelspelen, klauteren in de bossen, zwaardgevechten... we doen het gewoon bij Akabe!"}],b=[{titel:"Scouting da's spelen! ",plaats:"K12",beschrijving:"Wie anders dan het C.I.S. kan een massa mensen laten samenspelen? Speel mee met dit massaspel en laat je inspireren om in je eigen groep 'en masse' te spelen."},{titel:"Scouting, dat zijn rituelen voor jong en oud! Maar hoe?",plaats:"KP12",beschrijving:"Momenten bij uitstek waarop scouting in volle glorie wordt beleefd?! Juist ja,  een takovergang, totems geven, belofterituelen, maar ook een nieuw jaarlogo op je hemd of een stevige linker aka scoutsgroet! Maar hoe doe je in godsnaam belofte bij jonggidsen? Wat zijn geschikte totemproeven voor verkenners? Kan dat, een bezinning voor elke tak die toch 'modern' is? En is een scoutsdas echt belangrijk? Langs ons parcours met 4 tophaltes kom je er echt massa's over te weten!"},{titel:"Scouting, goed geregeld!",plaats:"KKG groot podium",beschrijving:"Scouting staat voor kwaliteit, maar ook voor veiligheid. Alleen durft dat laatste al eens ingewikkeld te worden. We loodsen je doorheen de regels van de vzw-wetgeving, Speel op Veilig en verzekeringen."},{titel:"Scouting ... ook voor armen, moslims, ADHD'ers ...? ",plaats:"K10",beschrijving:"Ook wij als scouts en gidsen lezen schrijnende armoedecijfers, horen moeilijke debatten over allochtonen, stellen vast dat we een middenklasse-beweging zijn... Toch bouwen we aan een jeugdbeweging voor iedereen met zin in scouting. Kom onze standpunten beluisteren, ontdek wat 'open kampen' zijn,hoe je als groep eigen drempels kan ontdekken en aanpakken, gezinnen met financiële moeilijkheden vooruit kan helpen ... en laat je eigen stem natuurlijk horen!"},{titel:"Grensverleggende scouting",plaats:"K7",beschrijving:"Sterker dan ooit zet internationaal in op praktische, haalbare tips en uitwisseling voor wie op scoutskamp gaat naar het buitenland: transport? slaapplaats? uitwisseling? budget? Ook als leiding van de jongste takken kan jij je ding vinden bij ons: spel en kampideeën van over de hele wereld!"},{titel:"Eerste Hulp voor Jeugdleiders",plaats:"KP14",beschrijving:"Het Jeugd Rode kruis komt jou de voornaamste toepassingen in de Eerste Hulp voor jeugdbeweging uitleggen. Denk hierbij aan schaafwonden verzorgen, omgaan met crisissituaties en 'mag ik nu medicatie geven of niet?'."},{titel:"Vorming van Ploeg Vorming en hun vrienden",plaats:"KP14",beschrijving:"Werkwinkels in alle vormen en maten: speels, groepsdynamisch, inhoudelijk, weinig inhoudelijk, communicatief, dans, koken,... Voor iedereen is er iets."},{titel:"Scouteske Technieken",plaats:"KKG markt",beschrijving:"Kom nieuwe technieken ontdekken op ons technieken-marktje of ga aan de slag met het buitenboek. Wie weet kom je bij ons nog een Smid of een Boswachter tegen en hoe zat dat nu weer met ons materiaalkot?"},{titel:"Scouting op het water",plaats:"Vijver 1",beschrijving:"Ontdek de meerwaarde van zeescouting of verdiep je in je nautische vaardigheden."},{titel:"Vorming, den boom in",plaats:"Touwenparcours",beschrijving:"Een voormiddag in de touwen hangen tussen de bomen van de Hoge Rielen, het kan!"},{titel:"Een eigen huis, een plek onder de zon",plaats:"LK10",beschrijving:"Lokaal verbouwen, verhuren en dit allemaal zelf? Last van inbrekers, te hoge energiefacturen, zwerfvuil? Is de omgeving van je lokaal wel veilig? Vind antwoord op je vragen in dit thema."},{titel:"Groepsadministratie",plaats:"Natuur en Avontuur",beschrijving:"Het adressenbestand van je scouts- of gidsengroep beheren en de aansluiting van je leden bij Scouts en Gidsen Vlaanderen gebeurt via de Groepsadministratie. Maar er zijn zoveel meer tools, leuke snufjes en manieren om de Groepsadministratie te gebruiken. Wilde je al lang een nieuwsbrief sturen naar je ouders of je oud-leidingsploeg organiseren of wil je de nieuwe snufjes ontdekken? Leer het allemaal in dit thema."}],c={programma:[{dag:"Vrijdag",items:[{start:"19:00",titel:"Aankomst",beschrijving:"Aankomst en inschrijving deelnemers"},{start:"20:00",stop:"22:30",titel:"Onthaal",beschrijving:"Onthaal en instapactiviteit bij je gouw",plaats:"Gouwgrond"},{start:"23:00",stop:"01:00",titel:"Onthaalshow",beschrijving:"Onthaalshow op het grote podium",plaats:"KKG"},{start:"01:00",stop:"02:30",titel:"Scouteske avond",beschrijving:"Scouteske avond met her en der animo, kampvuur + café",plaats:"KKG"},{start:"03:00",titel:"Slaapwel",beschrijving:"Tijd om je slaapzak op te zoeken en slaapwel",plaats:"Gouwgrond"}]},{dag:"Zaterdag",items:[{start:"08:00",stop:"09:00",titel:"Opstaan",beschrijving:"Wekken en ontbijt op je gouwgrond",plaats:"Gouwgrond"},{start:"09:15",stop:"09:50",titel:"Openingsshow",beschrijving:"Openingsshow op het hoofdpodium",plaats:"KKG"},{start:"10:00",stop:"12:30",titel:"Thema-aanbod",beschrijving:"Tijd voor thema’s (vorming) op de themagronden",plaats:"Themagronden",subitems:b},{start:"12:40",stop:"13:40",titel:"Picknick",beschrijving:"Massa-picknick met animo",plaats:"KKG"},{start:"13:50",stop:"16:20",titel:"Takaanbod",beschrijving:"Tijd voor takken (vorming) op de takgronden",plaats:"Takgronden",subitems:a},{start:"16:30",stop:"22:00",titel:"Gouw- en districtsmoment",beschrijving:"Gouw- en districtsmoment met warm avondmaal op je gouwgrond",plaats:"Gouwgrond"},{start:"22:15",stop:"22:45",titel:"Zin in HO",beschrijving:"ZIN in HO op het hoofdpodium",plaats:"KKG"},{start:"22:45",stop:"02:30",titel:"Avondaanbod",beschrijving:"Avondgebeuren met her en der animo, kampvuur + café",plaats:"KKG"},{start:"03:00",titel:"Slaapwel",beschrijving:"Tijd om je slaapzak op te zoeken en slaapwel",plaats:"Gouwgrond"}]},{dag:"Zondag",items:[{start:"08:00",stop:"09:00",titel:"Opstaan",beschrijving:"Wekken en ontbijt op je gouwgrond",plaats:"Gouwgrond"},{start:"09:30",stop:"11:30",titel:"Markt",beschrijving:"Een actief marktgebeuren met walking brunch",plaats:"KKG"},{start:"12:00",stop:"13:00",titel:"Slotshow",beschrijving:"Slotshow op het grote podium",plaats:"KKG"},{start:"13:00",stop:"14:00",titel:"Opruim",beschrijving:"Opruim en afbraak"},{start:"15:30",titel:"Vertrek naar huis"}]}]};return c});