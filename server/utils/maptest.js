const StaticMaps = require('staticmaps');

const path = require('path');
const fs = require('fs');
const marker = path.join(__dirname, '../../client/public/images/marker.png');
const imagePath = './image.png';

const coords = [
[ -71.8987469, 40.9312099 ],
[ -71.8987469, 40.9312099 ],
[ -71.8987469, 40.9312099 ],
[ -74.0566735, 40.7899291 ],
[ -93.2654692, 44.9772995 ]
];

const mapOptions = {
  width: 600,
  height: 400,
};
const map = new StaticMaps(mapOptions);

if (coords.length > 1) { // Only add a line if there are at least two points
            const line = {
              coords: coords,
              color: '#0000FFBB',
              width: 3
            };
             map.addMarker({
                coord: coords[0],
                img: marker,
                width: 48,
                height: 48
        });
            map.addLine(line); // Add the polyline to the map
          }

map.render()
.then(() => map.image.buffer('image/png', {quality: 90}))
.then((buffer) => {
    const base64Image = `data:image/png;base64,${buffer.toString('base64')}`;
    console.log(base64Image); // Log or use the base64 image as needed

    // Optionally, save the buffer to a file for inspection
    fs.writeFileSync('output.png', buffer);
  })
  .catch((err) => {
    console.error('Failed to render map or create buffer:', err);
  });