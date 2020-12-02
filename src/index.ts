import * as googlemaps from '@googlemaps/google-maps-services-js';
import { AddressType, GeocodingAddressComponentType, PlaceType2 } from '@googlemaps/google-maps-services-js';
import * as https from "https";

interface Geo {
    lat: number;
    lng: number;
}

export interface Options {
    /** google API key */
    apiKey: string,
    /** indicates if to change the original address if fields are missing */
    mfAutoFix?: boolean;
}

export interface GoogleGeoCodeResponse {
    address_components: googlemaps.AddressComponent[];
    formatted_address: string;
    types: googlemaps.AddressType[];
    place_id: string;
    geometry: googlemaps.AddressGeometry;
}

export interface AddressDetails {
    /** geometry.location */
    location: Geo;
    /** address component with 'country' and 'political' types */
    country: string;
    /** address component with 'administrative_area_level_1' and 'political' types */
    state: string;
    /** address component with 'administrative_area_level_2' and 'political' types */
    county: string;
    /** address component with 'neighborhood \ sublocality \ locality' and 'political' types */
    city: string;
    /** address component with 'route' type */
    street: string;
    /** address component with 'street_number' type */
    streetNumber: string | null;
    /** address component with 'postal_code' type */
    zip: string;
    /** address component with 'postal_code_suffix' type */
    zipSuffix: string | null;
    /** formatted_address */
    fullAddress: string;
    /** address component with 'subpremise' type */
    address2: string | null;
    /** original google API response */
    googleGeoCodeResponse: GoogleGeoCodeResponse;
}

export class MissingAddressDetailsError extends Error {
    constructor(public missingTypes: (AddressType | GeocodingAddressComponentType)[], public message: string) {
        super(message);
        this.name = 'MissingAddressDetailsError';
    }
}

function parseGoogleGeoCodeToAddressDetails(googleGeoCode: GoogleGeoCodeResponse): AddressDetails {
    const addressComponents = googleGeoCode.address_components;
    const country: string | undefined =
        addressComponents.find(
            component => component.types.includes(AddressType.country) && component.types.includes(AddressType.political))?.short_name;
    const state: string | undefined =
        addressComponents.find(
            component => component.types.includes(AddressType.administrative_area_level_1) && component.types.includes(AddressType.political))?.short_name;
    const county: string | undefined = addressComponents.find(
        component => component.types.includes(AddressType.administrative_area_level_2) && component.types.includes(AddressType.political))?.short_name;
    const city: string | undefined =
        (addressComponents.find(
            component => component.types.includes(AddressType.neighborhood) && component.types.includes(AddressType.political))?.short_name)
        ?? (addressComponents.find(
            component => component.types.includes(AddressType.sublocality) && component.types.includes(AddressType.political))?.short_name)
        ?? (addressComponents.find(
            component => component.types.includes(AddressType.locality) && component.types.includes(AddressType.political))?.short_name);
    const street: string | undefined = addressComponents.find(
        component => component.types.includes(AddressType.route))?.short_name;
    const streetNumber: string | undefined = addressComponents.find(
        component => component.types.includes(GeocodingAddressComponentType.street_number))?.short_name;
    const zip: string | undefined = addressComponents.find(
        component => component.types.includes(AddressType.postal_code))?.short_name;
    const zipSuffix: string | undefined = addressComponents.find(
        component => component.types.includes(PlaceType2.postal_code_suffix as any))?.short_name;
    const address2: string | undefined = addressComponents.find(
        component => component.types.includes(AddressType.subpremise))?.short_name;
    const fullAddress: string = googleGeoCode.formatted_address;

    if (country === undefined) {
        throw new MissingAddressDetailsError([AddressType.country, AddressType.political], `Missing  ${AddressType.political} and ${AddressType.country} types in address components`)
    }
    if (state === undefined) {
        throw new MissingAddressDetailsError([AddressType.administrative_area_level_1, AddressType.political], `Missing ${AddressType.political} and  ${AddressType.administrative_area_level_1} types in address components`)
    }
    if (county === undefined) {
        throw new MissingAddressDetailsError([AddressType.administrative_area_level_2, AddressType.political], `Missing political ${AddressType.political} and  ${AddressType.administrative_area_level_2} types in address components`)
    }
    if (city === undefined) {
        throw new MissingAddressDetailsError([AddressType.neighborhood, AddressType.political, AddressType.sublocality, AddressType.locality], `Missing ${AddressType.locality}, ${AddressType.sublocality}, ${AddressType.neighborhood} and ${AddressType.sublocality}types in address components`)
    }
    if (street === undefined) {
        throw new MissingAddressDetailsError([AddressType.route], `Missing ${AddressType.route} type in address components`)
    }
    if (zip === undefined) {
        throw new MissingAddressDetailsError([AddressType.postal_code], `Missing ${AddressType.postal_code} type in address components`)
    }

    return {
        streetNumber: streetNumber === undefined ? null : streetNumber,
        street: street,
        city: city,
        county: county,
        state: state,
        country: country,
        zip: zip,
        zipSuffix: zipSuffix === undefined ? null : zipSuffix,
        fullAddress: fullAddress,
        address2: address2 !== undefined ? `#${address2}` : null,
        googleGeoCodeResponse: googleGeoCode,
        location: googleGeoCode.geometry.location
    }
}

export async function fromGoogleGeoCode(googleGeoCodeResponse: GoogleGeoCodeResponse, options: Options): Promise<AddressDetails> {
    try {
        return parseGoogleGeoCodeToAddressDetails(googleGeoCodeResponse);
    }
    catch (e) {
        if (e.name === 'MissingAddressDetailsError') {
            if (e.missingTypes.includes(AddressType.administrative_area_level_2) && (options.mfAutoFix === undefined || options.mfAutoFix)) {
                const streetNumberRegex = /^[0-9]+\s|^[0-9]+-[0-9]+\s/;
                const modifiedAddressText = googleGeoCodeResponse.formatted_address.replace(streetNumberRegex, '');
                const newGoogleGeoCoderResponse = await getGoogleGeoCode(modifiedAddressText, options);
                return parseGoogleGeoCodeToAddressDetails(newGoogleGeoCoderResponse);
            } else {
                throw e;
            }
        } else {
            throw e;
        }
    }
}

export async function fromAddressText(addressText: string, options: Options): Promise<AddressDetails> {
    let modifiedAddressText = addressText
    const streetNumbersRegex = /^([0-9]+)(\s)([0-9]+\s)/;
    if (options.mfAutoFix === undefined || options.mfAutoFix) {
        modifiedAddressText = addressText.replace(streetNumbersRegex, "$1-$3");
    }
    const googleResponse = await getGoogleGeoCode(modifiedAddressText, options);
    return fromGoogleGeoCode(googleResponse, options);
}

function getGoogleGeoCode(addressText: string, options: Options): Promise<GoogleGeoCodeResponse> {
    return new Promise<GoogleGeoCodeResponse>((resolve, reject) => {
        const req = https.request(
            {
                host: "maps.googleapis.com",
                hostname: "maps.googleapis.com",
                port: 443,
                method: "GET",
                path:
                    "/maps/api/geocode/json?address=" +
                    encodeURIComponent(addressText) + '&key=' +
                    options.apiKey
            },
            (response) => {
                if (
                    response.statusCode === undefined ||
                    response.statusCode < 200 ||
                    response.statusCode > 300
                ) {
                    reject(new Error(`Status code error: ${response.statusCode}`));
                }
                let body = "";
                response.on("data", (d) => {
                    body += d;
                });
                response.on("end", () => {
                    const googleAddressComponents = JSON.parse(body);
                    if (googleAddressComponents.error_message !== undefined) {
                        throw new Error(googleAddressComponents.error_message);
                    }
                    if (googleAddressComponents.results.length === 0) {
                        throw new Error("Address not found, check validity of address");
                    }
                    const result: GoogleGeoCodeResponse = {
                        address_components: googleAddressComponents.results[0].address_components,
                        formatted_address: googleAddressComponents.results[0].formatted_address,
                        geometry: googleAddressComponents.results[0].geometry,
                        place_id: googleAddressComponents.results[0].place_id,
                        types: googleAddressComponents.results[0].types
                    }
                    resolve(result);
                });
            }
        );
        req.on("error", (err) => {
            reject(err);
        });
        req.end("", "utf8");
    });
}