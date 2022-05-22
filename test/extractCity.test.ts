import { AddressComponent, AddressGeometry, AddressType, Status } from '@googlemaps/google-maps-services-js';
import * as dotenv from 'dotenv';
import { test, expect } from "vitest";
import { fromGoogleGeoCode } from "../src/index";
import { addressCityNotInComponents, addressCityWithoutStateAfterwards, googleValidResponse } from "./addresses";
dotenv.config();
const apiKey = process.env.GOOGLE_API_TEST_KEY;


test('city that exists in the components', async () => {
    const googleGeoCode = {
      address_components: googleValidResponse.results[0].address_components as AddressComponent[],
      formatted_address: googleValidResponse.results[0].formatted_address,
      geometry: googleValidResponse.results[0].geometry as AddressGeometry,
      place_id: googleValidResponse.results[0].place_id,
      types: googleValidResponse.results[0].types as AddressType[],
      status: googleValidResponse.status as Status
    };

    const result = await fromGoogleGeoCode(googleGeoCode, { apiKey, mfAutoFix: true }, ['county', 'state', 'city', 'street', 'zip']);

    expect(result.city).toStrictEqual('Brooklyn');
});

test('city that does not exist in the components', async () => {
    const googleGeoCode = {
      address_components: addressCityNotInComponents.results[0].address_components as AddressComponent[],
      formatted_address: addressCityNotInComponents.results[0].formatted_address,
      geometry: addressCityNotInComponents.results[0].geometry as AddressGeometry,
      place_id: addressCityNotInComponents.results[0].place_id,
      types: addressCityNotInComponents.results[0].types as AddressType[],
      status: addressCityNotInComponents.status as Status
    };

    const result = await fromGoogleGeoCode(googleGeoCode, { apiKey, mfAutoFix: true }, ['county', 'state', 'city', 'street', 'zip']);

    expect(result.city).toStrictEqual('Brooklyn2');
});

test('city without state afterwards', async () => {
    const googleGeoCode = {
      address_components: addressCityWithoutStateAfterwards.results[0].address_components as AddressComponent[],
      formatted_address: addressCityWithoutStateAfterwards.results[0].formatted_address,
      geometry: addressCityWithoutStateAfterwards.results[0].geometry as AddressGeometry,
      place_id: addressCityWithoutStateAfterwards.results[0].place_id,
      types: addressCityWithoutStateAfterwards.results[0].types as AddressType[],
      status: addressCityWithoutStateAfterwards.status as Status
    };

    const result = await fromGoogleGeoCode(googleGeoCode, { apiKey, mfAutoFix: true }, ['county', 'state', 'city', 'street', 'zip']);

    expect(result.city).toStrictEqual('Brooklyn2');
});
