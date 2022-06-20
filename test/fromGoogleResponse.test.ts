import { AddressComponent, AddressGeometry, AddressType, Status } from '@googlemaps/google-maps-services-js';
import * as dotenv from 'dotenv';
import { expect, test } from "vitest";
import { fromGoogleGeoCode, MissingAddressDetailsError } from "../src/index";
import { googleValidResponse, noNeighborhood, nonValidStreet } from "./addresses";

dotenv.config();
const apiKey = process.env.GOOGLE_API_TEST_KEY;

test('valid google response', async () => {
  const googleGeoCode = {
    address_components: googleValidResponse.results[0].address_components as AddressComponent[],
    formatted_address: googleValidResponse.results[0].formatted_address,
    geometry: googleValidResponse.results[0].geometry as AddressGeometry,
    place_id: googleValidResponse.results[0].place_id,
    types: googleValidResponse.results[0].types as AddressType[],
    status: googleValidResponse.status as Status
  };

  const result = await fromGoogleGeoCode(googleGeoCode, { apiKey, mfAutoFix: true }, ['county', 'state', 'city', 'street', 'zip']);
  expect(result).toStrictEqual({
    location: { lat: 40.6754925, lng: -73.9564748 },
    country: 'US',
    state: 'NY',
    county: 'Kings County',
    city: 'Brooklyn',
    street: 'Franklin Ave',
    streetNumber: '672',
    zip: '11238',
    zipSuffix: '3880',
    fullAddress: '672 Franklin Ave #1fl, Brooklyn, NY 11238, USA',
    address2: '#1fl',
    status: 'OK',
    googleGeoCodeResponse: googleGeoCode
  });
});

test('non valid street', async () => {
  const nonValidGoogleGeoCode = {
    address_components: nonValidStreet.nonValid.results[0].address_components as AddressComponent[],
    formatted_address: nonValidStreet.nonValid.results[0].formatted_address,
    geometry: nonValidStreet.nonValid.results[0].geometry as AddressGeometry,
    place_id: nonValidStreet.nonValid.results[0].place_id,
    types: nonValidStreet.nonValid.results[0].types as AddressType[],
    status: googleValidResponse.status as Status
  };

  const validGoogleGeoCode = {
    address_components: nonValidStreet.valid.results[0].address_components as AddressComponent[],
    formatted_address: nonValidStreet.valid.results[0].formatted_address,
    geometry: nonValidStreet.valid.results[0].geometry as AddressGeometry,
    place_id: nonValidStreet.valid.results[0].place_id,
    types: nonValidStreet.valid.results[0].types as AddressType[],
    status: googleValidResponse.status as Status
  };

  const result = await fromGoogleGeoCode(nonValidGoogleGeoCode, { apiKey, mfAutoFix: true }, ['county', 'state', 'city', 'street', 'zip']);
  expect(result).toMatchInlineSnapshot(`
    {
      "address2": null,
      "city": "The Bronx",
      "country": "US",
      "county": "Bronx County",
      "fullAddress": "Exterior St,The Bronx, NY 10463, USA",
      "googleGeoCodeResponse": {
        "address_components": [
          {
            "long_name": "Exterior Street",
            "short_name": "Exterior St",
            "types": [
              "route",
            ],
          },
          {
            "long_name": "West Bronx",
            "short_name": "West Bronx",
            "types": [
              "neighborhood",
              "political",
            ],
          },
          {
            "long_name": "Bronx",
            "short_name": "Bronx",
            "types": [
              "political",
              "sublocality",
              "sublocality_level_1",
            ],
          },
          {
            "long_name": "Bronx County",
            "short_name": "Bronx County",
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
            "long_name": "10463",
            "short_name": "10463",
            "types": [
              "postal_code",
            ],
          },
        ],
        "formatted_address": "Exterior St, Bronx, NY 10463, USA",
        "geometry": {
          "bounds": {
            "northeast": {
              "lat": 40.87674880000003,
              "lng": -73.9061478,
            },
            "southwest": {
              "lat": 40.87336999999997,
              "lng": -73.90672579999999,
            },
          },
          "location": {
            "lat": 40.8749487,
            "lng": -73.9061478,
          },
          "location_type": "GEOMETRIC_CENTER",
          "viewport": {
            "northeast": {
              "lat": 40.87674880000003,
              "lng": -73.90508781970848,
            },
            "southwest": {
              "lat": 40.87336999999997,
              "lng": -73.9077857802915,
            },
          },
        },
        "place_id": "EiFFeHRlcmlvciBTdCwgQnJvbngsIE5ZIDEwNDYzLCBVU0EiLiosChQKEgntZ35_kfPCiRHGnUDn0OPECRIUChIJEZFB7ZTzwokRAJGpM3WCFRw",
        "status": "OK",
        "types": [
          "route",
        ],
      },
      "location": {
        "lat": 40.8749487,
        "lng": -73.9061478,
      },
      "state": "NY",
      "status": "OK",
      "street": "Exterior St",
      "streetNumber": null,
      "zip": "10463",
      "zipSuffix": null,
    }
  `);
});

test('non valid street with nullable fields', async () => {
  const nonValidGoogleGeoCode = {
    address_components: nonValidStreet.nonValid.results[0].address_components as AddressComponent[],
    formatted_address: nonValidStreet.nonValid.results[0].formatted_address,
    geometry: nonValidStreet.nonValid.results[0].geometry as AddressGeometry,
    place_id: nonValidStreet.nonValid.results[0].place_id,
    types: nonValidStreet.nonValid.results[0].types as AddressType[],
    status: googleValidResponse.status as Status
  };

  const result = await fromGoogleGeoCode(nonValidGoogleGeoCode, { apiKey, mfAutoFix: true }, []);
  expect(result).toStrictEqual({
    location: { lat: 40.8739303, lng: -73.9069078 },
    country: 'US',
    state: 'NY',
    county: null,
    city: 'Bronx',
    street: 'Exterior St',
    streetNumber: "2811",
    zip: '10463',
    zipSuffix: null,
    fullAddress: '2811 Exterior St, Bronx, NY 10463, USA',
    address2: null,
    status: 'OK',
    googleGeoCodeResponse: nonValidGoogleGeoCode
  });
});

test('no neighborhood and sublocality google response', async () => {
  const googleGeoCode = {
    address_components: noNeighborhood.results[0].address_components as AddressComponent[],
    formatted_address: noNeighborhood.results[0].formatted_address,
    geometry: noNeighborhood.results[0].geometry as AddressGeometry,
    place_id: noNeighborhood.results[0].place_id,
    types: noNeighborhood.results[0].types as AddressType[],
    status: googleValidResponse.status as Status
  };

  const result = await fromGoogleGeoCode(googleGeoCode, { apiKey, mfAutoFix: true }, ['county', 'state', 'city', 'street', 'zip']);
  expect(result).toStrictEqual({
    location: { lat: 41.0320206, lng: -73.76735309999999 },
    country: 'US',
    state: 'NY',
    county: 'Westchester County',
    city: 'White Plains',
    street: 'Court St',
    streetNumber: '19',
    zip: '10601',
    zipSuffix: '3310',
    fullAddress: '19 Court St, White Plains, NY 10601, USA',
    address2: null,
    status: 'OK',
    googleGeoCodeResponse: googleGeoCode
  });
});

test('missing required field', async () => {
  const googleGeoCode = {
    address_components: googleValidResponse.results[0].address_components as AddressComponent[],
    formatted_address: googleValidResponse.results[0].formatted_address,
    geometry: googleValidResponse.results[0].geometry as AddressGeometry,
    place_id: googleValidResponse.results[0].place_id,
    types: googleValidResponse.results[0].types as AddressType[],
    status: googleValidResponse.status as Status
  };
  const countryIdx = googleGeoCode.address_components.findIndex(component => component.types.includes(AddressType.country));
  googleGeoCode.address_components.splice(countryIdx, 1);

  try { await fromGoogleGeoCode(googleGeoCode, { apiKey, mfAutoFix: true }, ['county', 'state', 'city', 'street', 'zip']); }
  catch (e) {
    if (e.name === 'MissingAddressDetailsError') {
      expect((e as MissingAddressDetailsError).missingTypes.includes(AddressType.country)).toBe(true);
    }
  }
});

test('no mf auto fix', async () => {
  const nonValidGoogleGeoCode = {
    address_components: nonValidStreet.nonValid.results[0].address_components as AddressComponent[],
    formatted_address: nonValidStreet.nonValid.results[0].formatted_address,
    geometry: nonValidStreet.nonValid.results[0].geometry as AddressGeometry,
    place_id: nonValidStreet.nonValid.results[0].place_id,
    types: nonValidStreet.nonValid.results[0].types as AddressType[],
    status: googleValidResponse.status as Status
  };

  try { await fromGoogleGeoCode(nonValidGoogleGeoCode, { apiKey, mfAutoFix: true }, ['county', 'state', 'city', 'street', 'zip']); }
  catch (e) {
    if (e.name === 'MissingAddressDetailsError') {
      expect((e as MissingAddressDetailsError).missingTypes.includes(AddressType.administrative_area_level_2)).toBe(true);
    }
  }
});
