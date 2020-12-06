import { fromGoogleGeoCode, MissingAddressDetailsError } from "../src/index";
import { AddressComponent, AddressGeometry, AddressType, Status } from '@googlemaps/google-maps-services-js';
import { googleValidResponse, noNeighborhood, nonValidStreet } from "./addresses";
import * as dotenv from 'dotenv';
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

  const result = await fromGoogleGeoCode(googleGeoCode, { apiKey, mfAutoFix: true });
  expect(result).toStrictEqual({
    location: { lat: 40.6754925, lng: -73.9564748 },
    country: 'US',
    state: 'NY',
    county: 'Kings County',
    city: 'Crown Heights',
    street: 'Franklin Ave',
    streetNumber: '672',
    zip: '11238',
    zipSuffix: '3880',
    fullAddress: '672 Franklin Ave #1FL, Brooklyn, NY 11238, USA',
    address2: '#1FL',
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

  const result = await fromGoogleGeoCode(nonValidGoogleGeoCode, { apiKey, mfAutoFix: true });
  expect(result).toStrictEqual({
    location: { lat: 40.8751173, lng: -73.90615939999999 },
    country: 'US',
    state: 'NY',
    county: 'Bronx County',
    city: 'West Bronx',
    street: 'Exterior St',
    streetNumber: null,
    zip: '10463',
    zipSuffix: null,
    fullAddress: 'Exterior St, The Bronx, NY 10463, USA',
    address2: null,
    status: 'OK',
    googleGeoCodeResponse: validGoogleGeoCode
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

  const result = await fromGoogleGeoCode(googleGeoCode, { apiKey, mfAutoFix: true });
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

  try { await fromGoogleGeoCode(googleGeoCode, { apiKey, mfAutoFix: true }); }
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

  try { await fromGoogleGeoCode(nonValidGoogleGeoCode, { apiKey, mfAutoFix: true }); }
  catch (e) {
    if (e.name === 'MissingAddressDetailsError') {
      expect((e as MissingAddressDetailsError).missingTypes.includes(AddressType.administrative_area_level_2)).toBe(true);
    }
  }
});