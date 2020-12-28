import { fromAddressText } from "../src/index";
import { AddressComponent, AddressGeometry, AddressType, Status } from '@googlemaps/google-maps-services-js';
import { concatedStreetNumbers, googleValidResponse } from "./addresses";
import * as dotenv from 'dotenv';
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

    const address = '672 Franklin Ave #1FL, Brooklyn, NY 11238, USA';
    const result = await fromAddressText(address, { apiKey, mfAutoFix: true }, ['county', 'state', 'city', 'street', 'zip']);
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
    expect(result).toStrictEqual({
        location: { lat: 40.721096, lng: -73.83973189999999 },
        country: 'US',
        state: 'NY',
        county: 'Queens County',
        city: 'Forest Hills',
        street: '72nd Ave',
        streetNumber: '110-40',
        zip: '11375',
        zipSuffix: null,
        fullAddress: '110-40 72nd Ave, Forest Hills, NY 11375, USA',
        address2: null,
        status: 'OK',
        googleGeoCodeResponse: googleGeoCode
    });
});