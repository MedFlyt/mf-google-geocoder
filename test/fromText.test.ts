import { AddressComponent, AddressGeometry, AddressType, Status } from '@googlemaps/google-maps-services-js';
import * as dotenv from 'dotenv';
import { expect, test } from "vitest";
import { fromAddressText } from "../src/index";
import { concatedStreetNumbers, googleValidResponse, independentCity, township } from "./addresses";

dotenv.config();
const apiKey = process.env.GOOGLE_API_TEST_KEY;

test('valid address', async () => {
    const googleGeoCode = {
        address_components: googleValidResponse.results[0].address_components as AddressComponent[],
        formatted_address: googleValidResponse.results[0].formatted_address,
        geometry: googleValidResponse.results[0].geometry as AddressGeometry,
        place_id: googleValidResponse.results[0].place_id,
        types: googleValidResponse.results[0].types as AddressType[],
        status: googleValidResponse.status as Status
    };

    const address = '672 Franklin Ave #1fl, Brooklyn, NY 11238, USA';
    const result = await fromAddressText(address, { apiKey, mfAutoFix: true }, ['county', 'state', 'city', 'street', 'zip']);
    expect(result).toMatchInlineSnapshot(`
      {
        "address2": null,
        "city": "Brooklyn",
        "country": "US",
        "county": "Kings County",
        "fullAddress": "672 Franklin Ave, Brooklyn, NY 11238, USA",
        "googleGeoCodeResponse": {
          "address_components": [
            {
              "long_name": "672",
              "short_name": "672",
              "types": [
                "street_number",
              ],
            },
            {
              "long_name": "Franklin Avenue",
              "short_name": "Franklin Ave",
              "types": [
                "route",
              ],
            },
            {
              "long_name": "Crown Heights",
              "short_name": "Crown Heights",
              "types": [
                "neighborhood",
                "political",
              ],
            },
            {
              "long_name": "Brooklyn",
              "short_name": "Brooklyn",
              "types": [
                "political",
                "sublocality",
                "sublocality_level_1",
              ],
            },
            {
              "long_name": "Kings County",
              "short_name": "Kings County",
              "types": [
                "administrative_area_level_2",
                "political",
              ],
            },
            {
              "long_name": "New York",
              "short_name": "NY",
              "types": [
                "administrative_area_level_1",
                "political",
              ],
            },
            {
              "long_name": "United States",
              "short_name": "US",
              "types": [
                "country",
                "political",
              ],
            },
            {
              "long_name": "11238",
              "short_name": "11238",
              "types": [
                "postal_code",
              ],
            },
            {
              "long_name": "3880",
              "short_name": "3880",
              "types": [
                "postal_code_suffix",
              ],
            },
          ],
          "formatted_address": "672 Franklin Ave, Brooklyn, NY 11238, USA",
          "geometry": {
            "bounds": {
              "northeast": {
                "lat": 40.67554670000001,
                "lng": -73.9563593,
              },
              "southwest": {
                "lat": 40.6754612,
                "lng": -73.9565712,
              },
            },
            "location": {
              "lat": 40.6754925,
              "lng": -73.9564748,
            },
            "location_type": "ROOFTOP",
            "viewport": {
              "northeast": {
                "lat": 40.6768446802915,
                "lng": -73.9550612697085,
              },
              "southwest": {
                "lat": 40.6741467197085,
                "lng": -73.95775923029151,
              },
            },
          },
          "place_id": "ChIJk-K94p5bwokR-pi6XAl0VpA",
          "status": "OK",
          "types": [
            "premise",
          ],
        },
        "location": {
          "lat": 40.6754925,
          "lng": -73.9564748,
        },
        "state": "NY",
        "status": "OK",
        "street": "Franklin Ave",
        "streetNumber": "672",
        "zip": "11238",
        "zipSuffix": "3880",
      }
    `);
});

test('concat street numbers', async () => {
    const googleGeoCode = {
        address_components: concatedStreetNumbers.results[0].address_components as AddressComponent[],
        formatted_address: concatedStreetNumbers.results[0].formatted_address,
        geometry: concatedStreetNumbers.results[0].geometry as AddressGeometry,
        place_id: concatedStreetNumbers.results[0].place_id,
        types: concatedStreetNumbers.results[0].types as AddressType[],
        status: googleValidResponse.status as Status
    };

    const address = '110 40 72ND AVE, Forest Hills, NY 11375, USA';
    const result = await fromAddressText(address, { apiKey, mfAutoFix: true }, ['county', 'state', 'city', 'street', 'zip']);
    expect(result).toMatchInlineSnapshot(`
      {
        "address2": null,
        "city": "Forest Hills",
        "country": "US",
        "county": "Queens County",
        "fullAddress": "110-40 72nd Ave, Forest Hills, NY 11375, USA",
        "googleGeoCodeResponse": {
          "address_components": [
            {
              "long_name": "110-40",
              "short_name": "110-40",
              "types": [
                "street_number",
              ],
            },
            {
              "long_name": "72nd Avenue",
              "short_name": "72nd Ave",
              "types": [
                "route",
              ],
            },
            {
              "long_name": "Forest Hills",
              "short_name": "Forest Hills",
              "types": [
                "neighborhood",
                "political",
              ],
            },
            {
              "long_name": "Queens",
              "short_name": "Queens",
              "types": [
                "political",
                "sublocality",
                "sublocality_level_1",
              ],
            },
            {
              "long_name": "Queens County",
              "short_name": "Queens County",
              "types": [
                "administrative_area_level_2",
                "political",
              ],
            },
            {
              "long_name": "New York",
              "short_name": "NY",
              "types": [
                "administrative_area_level_1",
                "political",
              ],
            },
            {
              "long_name": "United States",
              "short_name": "US",
              "types": [
                "country",
                "political",
              ],
            },
            {
              "long_name": "11375",
              "short_name": "11375",
              "types": [
                "postal_code",
              ],
            },
          ],
          "formatted_address": "110-40 72nd Ave, Forest Hills, NY 11375, USA",
          "geometry": {
            "location": {
              "lat": 40.721096,
              "lng": -73.83973189999999,
            },
            "location_type": "ROOFTOP",
            "viewport": {
              "northeast": {
                "lat": 40.72255043029149,
                "lng": -73.83843081970848,
              },
              "southwest": {
                "lat": 40.71985246970849,
                "lng": -73.8411287802915,
              },
            },
          },
          "place_id": "ChIJS7w5uJ1gwokRQb1XacDkIDM",
          "status": "OK",
          "types": [
            "street_address",
          ],
        },
        "location": {
          "lat": 40.721096,
          "lng": -73.83973189999999,
        },
        "state": "NY",
        "status": "OK",
        "street": "72nd Ave",
        "streetNumber": "110-40",
        "zip": "11375",
        "zipSuffix": null,
      }
    `)
});


test('independent city', async () => {
    const googleGeoCode = {
        address_components: independentCity.results[0].address_components as AddressComponent[],
        formatted_address: independentCity.results[0].formatted_address,
        geometry: independentCity.results[0].geometry as AddressGeometry,
        place_id: independentCity.results[0].place_id,
        types: independentCity.results[0].types as AddressType[],
        status: independentCity.status as Status
    };

    const address = '2350 S. Kenmore Rd Richmond VA 23225, USA';
    const result = await fromAddressText(address, { apiKey, mfAutoFix: true }, ['county', 'state', 'city', 'street', 'zip']);
    expect(result).toMatchInlineSnapshot(`
      {
        "address2": null,
        "city": "Richmond",
        "country": "US",
        "county": "Richmond",
        "fullAddress": "2350 S Kenmore Rd, Richmond, VA 23225, USA",
        "googleGeoCodeResponse": {
          "address_components": [
            {
              "long_name": "2350",
              "short_name": "2350",
              "types": [
                "street_number",
              ],
            },
            {
              "long_name": "South Kenmore Road",
              "short_name": "S Kenmore Rd",
              "types": [
                "route",
              ],
            },
            {
              "long_name": "Chippenham Village",
              "short_name": "Chippenham Village",
              "types": [
                "neighborhood",
                "political",
              ],
            },
            {
              "long_name": "Richmond",
              "short_name": "Richmond",
              "types": [
                "locality",
                "political",
              ],
            },
            {
              "long_name": "Virginia",
              "short_name": "VA",
              "types": [
                "administrative_area_level_1",
                "political",
              ],
            },
            {
              "long_name": "United States",
              "short_name": "US",
              "types": [
                "country",
                "political",
              ],
            },
            {
              "long_name": "23225",
              "short_name": "23225",
              "types": [
                "postal_code",
              ],
            },
            {
              "long_name": "1939",
              "short_name": "1939",
              "types": [
                "postal_code_suffix",
              ],
            },
          ],
          "formatted_address": "2350 S Kenmore Rd, Richmond, VA 23225, USA",
          "geometry": {
            "location": {
              "lat": 37.5329297,
              "lng": -77.53668499999999,
            },
            "location_type": "ROOFTOP",
            "viewport": {
              "northeast": {
                "lat": 37.5342653302915,
                "lng": -77.5354383697085,
              },
              "southwest": {
                "lat": 37.5315673697085,
                "lng": -77.53813633029151,
              },
            },
          },
          "place_id": "ChIJ88LjLR8TsYkRdGBnOaIAhdY",
          "status": "OK",
          "types": [
            "street_address",
          ],
        },
        "location": {
          "lat": 37.5329297,
          "lng": -77.53668499999999,
        },
        "state": "VA",
        "status": "OK",
        "street": "S Kenmore Rd",
        "streetNumber": "2350",
        "zip": "23225",
        "zipSuffix": "1939",
      }
    `)
});

test('cant find county', async () => {
    const address = '513 Mundy Ln, Mt Vernon, NY 10550, USA';
    try {
        await fromAddressText(address, { apiKey, mfAutoFix: true }, ['county', 'state', 'city', 'street', 'zip']);
    }
    catch (e) {
        expect(e.name).toBe('MissingAddressDetailsError');
    }
});

test('township (administrative_level_3)', async () => {
    const googleGeoCode = {
        address_components: township.results[0].address_components as AddressComponent[],
        formatted_address: township.results[0].formatted_address,
        geometry: township.results[0].geometry as AddressGeometry,
        place_id: township.results[0].place_id,
        types: township.results[0].types as AddressType[],
        status: township.status as Status
    };

    const address = '109 Tennis Ct, Wall Township, NJ 07719, USA';
    const result = await fromAddressText(address, { apiKey, mfAutoFix: true }, ['county', 'state', 'city', 'street', 'zip']);
    expect(result).toMatchInlineSnapshot(`
      {
        "address2": null,
        "city": "Wall Township",
        "country": "US",
        "county": "Monmouth County",
        "fullAddress": "109 Tennis Ct, Wall Township, NJ 07719, USA",
        "googleGeoCodeResponse": {
          "address_components": [
            {
              "long_name": "109",
              "short_name": "109",
              "types": [
                "street_number",
              ],
            },
            {
              "long_name": "Tennis Court",
              "short_name": "Tennis Ct",
              "types": [
                "route",
              ],
            },
            {
              "long_name": "Wall Township",
              "short_name": "Wall Township",
              "types": [
                "locality",
                "political",
              ],
            },
            {
              "long_name": "Monmouth County",
              "short_name": "Monmouth County",
              "types": [
                "administrative_area_level_2",
                "political",
              ],
            },
            {
              "long_name": "New Jersey",
              "short_name": "NJ",
              "types": [
                "administrative_area_level_1",
                "political",
              ],
            },
            {
              "long_name": "United States",
              "short_name": "US",
              "types": [
                "country",
                "political",
              ],
            },
            {
              "long_name": "07719",
              "short_name": "07719",
              "types": [
                "postal_code",
              ],
            },
            {
              "long_name": "9429",
              "short_name": "9429",
              "types": [
                "postal_code_suffix",
              ],
            },
          ],
          "formatted_address": "109 Tennis Ct, Wall Township, NJ 07719, USA",
          "geometry": {
            "location": {
              "lat": 40.1669944,
              "lng": -74.07811029999999,
            },
            "location_type": "ROOFTOP",
            "viewport": {
              "northeast": {
                "lat": 40.1684514302915,
                "lng": -74.0767691197085,
              },
              "southwest": {
                "lat": 40.16575346970851,
                "lng": -74.07946708029151,
              },
            },
          },
          "place_id": "ChIJy1QnuniHwYkR8sSDZexYxSU",
          "status": "OK",
          "types": [
            "street_address",
          ],
        },
        "location": {
          "lat": 40.1669944,
          "lng": -74.07811029999999,
        },
        "state": "NJ",
        "status": "OK",
        "street": "Tennis Ct",
        "streetNumber": "109",
        "zip": "07719",
        "zipSuffix": "9429",
      }
    `)
});