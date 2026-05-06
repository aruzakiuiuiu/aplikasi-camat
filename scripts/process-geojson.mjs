import fs from 'fs';
import dissolve from '@turf/dissolve';
import simplify from '@turf/simplify';
import centerOfMass from '@turf/center-of-mass';
import { featureCollection, polygon, multiPolygon } from '@turf/helpers';

const ID_BY_NAME = {
  "Bojonegoro":"bjn-01","Balen":"bjn-02","Malo":"bjn-03","Purwosari":"bjn-04",
  "Trucuk":"bjn-05","Dander":"bjn-06","Kalitidu":"bjn-07","Kanor":"bjn-08",
  "Kepohbaru":"bjn-09","Kedungadem":"bjn-10","Margomulyo":"bjn-11","Ngraho":"bjn-12",
  "Ngasem":"bjn-13","Padangan":"bjn-14","Sukosewu":"bjn-15","Baureno":"bjn-16",
  "Sugihwaras":"bjn-17","Temayang":"bjn-18","Sekar":"bjn-19","Bubulan":"bjn-20",
  "Gondang":"bjn-21","Ngambon":"bjn-22","Tambakrejo":"bjn-23","Sumberejo":"bjn-24",
  "Kapas":"bjn-25","Kasiman":"bjn-26","Kedewan":"bjn-27","Gayam":"bjn-28",
};

const slug = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');

const raw = JSON.parse(fs.readFileSync('/tmp/desa.geojson','utf8'));

// Convert MultiPolygon to multiple Polygons (turf dissolve needs Polygons)
const polyFeatures = [];
for (const f of raw.features) {
  const props = { KECAMATAN: f.properties.KECAMATAN, DESA: f.properties.DESA };
  if (f.geometry.type === 'Polygon') {
    polyFeatures.push(polygon(f.geometry.coordinates, props));
  } else if (f.geometry.type === 'MultiPolygon') {
    for (const coords of f.geometry.coordinates) {
      polyFeatures.push(polygon(coords, props));
    }
  }
}
console.log('polygons total:', polyFeatures.length);

// ---------- VILLAGES ----------
// Group polygons by DESA+KECAMATAN, combine to MultiPolygon per village
const villageMap = new Map();
for (const f of polyFeatures) {
  const key = f.properties.KECAMATAN + '|' + f.properties.DESA;
  if (!villageMap.has(key)) villageMap.set(key, []);
  villageMap.get(key).push(f.geometry.coordinates);
}

const villageFeatures = [];
for (const [key, coordsList] of villageMap) {
  const [kec, desa] = key.split('|');
  const districtId = ID_BY_NAME[kec];
  if (!districtId) { console.warn('NO MATCH:', kec); continue; }
  const villageId = `${districtId}-${slug(desa)}`;
  const geom = coordsList.length === 1
    ? polygon(coordsList[0])
    : multiPolygon(coordsList);
  geom.properties = {
    id: villageId,
    name: desa,
    kecamatan: kec,
    district_id: districtId,
  };
  villageFeatures.push(geom);
}
let villagesFC = featureCollection(villageFeatures);
villagesFC = simplify(villagesFC, { tolerance: 0.0006, highQuality: false, mutate: true });
console.log('villages:', villageFeatures.length);

// ---------- DISTRICTS (dissolve villages) ----------
// Use the polygon list for dissolve; tag with KECAMATAN
const polyForDissolve = featureCollection(polyFeatures.map(f => polygon(f.geometry.coordinates, { KECAMATAN: f.properties.KECAMATAN })));
console.log('dissolving...');
const dissolved = dissolve(polyForDissolve, { propertyName: 'KECAMATAN' });
console.log('dissolved features:', dissolved.features.length);

// Group dissolved polygons by KECAMATAN -> MultiPolygon
const kecGroups = new Map();
for (const f of dissolved.features) {
  const k = f.properties.KECAMATAN;
  if (!kecGroups.has(k)) kecGroups.set(k, []);
  kecGroups.get(k).push(f.geometry.coordinates);
}
const districtFeatures = [];
for (const [kec, coordsList] of kecGroups) {
  const districtId = ID_BY_NAME[kec];
  const geom = coordsList.length === 1 ? polygon(coordsList[0]) : multiPolygon(coordsList);
  geom.properties = { id: districtId, name: kec };
  districtFeatures.push(geom);
}
let districtsFC = featureCollection(districtFeatures);
districtsFC = simplify(districtsFC, { tolerance: 0.0008, highQuality: false, mutate: true });
console.log('districts:', districtFeatures.length);

// Add label coordinates (centroid)
for (const f of districtsFC.features) {
  const c = centerOfMass(f);
  f.properties.label = c.geometry.coordinates;
}
for (const f of villagesFC.features) {
  const c = centerOfMass(f);
  f.properties.label = c.geometry.coordinates;
}

fs.mkdirSync('/dev-server/src/data/geo', { recursive: true });
fs.writeFileSync('/dev-server/src/data/geo/districts.geo.json', JSON.stringify(districtsFC));
fs.writeFileSync('/dev-server/src/data/geo/villages.geo.json', JSON.stringify(villagesFC));

const dSize = fs.statSync('/dev-server/src/data/geo/districts.geo.json').size;
const vSize = fs.statSync('/dev-server/src/data/geo/villages.geo.json').size;
console.log('districts.geo.json:', (dSize/1024).toFixed(1), 'KB');
console.log('villages.geo.json:', (vSize/1024).toFixed(1), 'KB');
