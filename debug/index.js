const border = 10;
map.on('styleimagemissing', function(e) {
    var id = e.id; // id of the missing image

    // check if this missing icon is one this function can generate
    var prefix = 'square-rgb-';
    if (id.indexOf(prefix) !== 0) return;

    // extract the color from the id
    var rgb1 = id.replace(prefix, '').split(',').map(Number);

    var width = 64; // The image will be 64 pixels square
    var bytesPerPixel = 4; // Each pixel is represented by 4 bytes: red, green, blue, and alpha.
    var data = new Uint8Array(width * width * bytesPerPixel);

    const rgb2 = [rgb1[2], rgb1[1], rgb1[0]];

    for (var x = 0; x < width; x++) {
        for (var y = 0; y < width; y++) {
            var offset = (y * width + x) * bytesPerPixel;

            const rgb =
                x < border || x + border > width - 1 ||
                y < border || y + border > width - 1 ?
                rgb2 :
                rgb1;

            data[offset + 0] = rgb[0]; // red
            data[offset + 1] = rgb[1]; // green
            data[offset + 2] = rgb[2]; // blue
            data[offset + 3] = 255;    // alpha
        }
    }

    map.addImage(id, {width: width, height: width, data: data}, {
        stretchX: [[border, width - border]],
        stretchY: [[border, width - border]]
    });
});

map.on('load', function () {
    map.addLayer({
"id": "points",
"type": "symbol",
"source": {
"type": "geojson",
"data": {
"type": "FeatureCollection",
"features": [{
"type": "Feature",
"geometry": {
"type": "Point",
"coordinates": [0, 0]
},
"properties": {
    "text": "ASDF",
    "size": 36,
"color": "255,0,0"
}
}, {
"type": "Feature",
"geometry": {
"type": "Point",
"coordinates": [50, 0]
},
"properties": {
    "text": "ASDF \n - \nqwer",
    "size": 24,
"color": "255,209,28"
}
}, {
"type": "Feature",
"geometry": {
"type": "Point",
"coordinates": [-50, 0]
},
"properties": {
    "text": "ASDF",
    "size": 18,
"color": "242,127,32"
}
}]
}
},
"layout": {
"text-field": ["get", "text"],
"icon-text-fit": "both",
"text-size": ["get", "size"],
"icon-text-fit-padding": [border, border, border, border],
"icon-image": ["concat", "square-rgb-", ["get", "color"]]
}
});
});
