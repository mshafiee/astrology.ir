var map = L.map('map', {
    center: [20.0, 5.0],
    minZoom: 2,
    zoom: 2,
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '<div dir="ltr">&copy; <a href="https://astrology.ir/">astrology.ir</a></div>',
    subdomains: ['a', 'b', 'c'],
}).addTo(map);

map.attributionControl.setPrefix(false);

var myIcon = L.icon({
    iconUrl: '/images/pin24.png',
    iconRetinaUrl: '/images/pin48.png',
    iconSize: [29, 24],
    iconAnchor: [9, 21],
    popupAnchor: [0, -14],
});

var zoomLevel = 1;
map.on('click', function(e) {
    if (e.originalEvent.button === 0) {
        // left-click: zoom in
        map.setView(e.latlng, map.getZoom() + zoomLevel);
    }
});

map.on('mousedown', function(e) {
    if (e.originalEvent.button === 2) {
        // right-click: zoom out
        map.setView(e.latlng, map.getZoom() - (zoomLevel * 2));
    }
});

map.on('contextmenu', function(e) {
    // Prevent the context menu from showing up
    L.DomEvent.preventDefault(e);
});

for (var i = 0; i < markers.length; ++i) {
    var marker = L.marker([markers[i].lat, markers[i].lng], { icon: myIcon })
        .bindPopup(markers[i].name)
        .addTo(map);

    marker.on('mouseover', function (e) {
        this.openPopup();
    });

    marker.on('mouseout', function (e) {
        this.closePopup();
    });

    marker.on('click', function(e) {
        window.open(e.target.options.url, '_self');
    });

    marker.options.title = markers[i].name;
    marker.options.url = markers[i].url;
}