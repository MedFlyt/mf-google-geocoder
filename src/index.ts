// tslint:disable-next-line:match-default-export-name
import Axios from "axios";
import { AddressComponent, AddressGeometry, AddressType, GeocodingAddressComponentType, PlaceType2, Status } from '@googlemaps/google-maps-services-js';
import { independentCities } from "./independentCities";

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
    address_components: AddressComponent[];
    formatted_address: string;
    types: AddressType[];
    place_id: string;
    geometry: AddressGeometry;
    status: Status;
}

export interface AddressDetails {
    /** geometry.location */
    location: Geo;
    /** address component with 'country' and 'political' types */
    country: string | null;
    /** address component with 'administrative_area_level_1' and 'political' types */
    state: string | null;
    /** address component with 'administrative_area_level_2' and 'political' types */
    county: string | null;
    /** address component with 'neighborhood \ sublocality \ locality' and 'political' types */
    city: string | null;
    /** address component with 'route' type */
    street: string | null;
    /** address component with 'street_number' type */
    streetNumber: string | null;
    /** address component with 'postal_code' type */
    zip: string | null;
    /** address component with 'postal_code_suffix' type */
    zipSuffix: string | null;
    /** formatted_address */
    fullAddress: string;
    /** address component with 'subpremise' type */
    address2: string | null;
    /** original google status */
    status: Status;
    /** original google API response */
    googleGeoCodeResponse: GoogleGeoCodeResponse;
}

export class MissingAddressDetailsError extends Error {
    constructor(public missingTypes: (AddressType | GeocodingAddressComponentType | PlaceType2)[], public message: string) {
        super(message);
        this.name = 'MissingAddressDetailsError';
        Object.setPrototypeOf(this, MissingAddressDetailsError.prototype);
    }
}

function extractCounty(addressComponents: AddressComponent[], state: string | undefined): string | undefined {
    let county: string | undefined = addressComponents.find(
        component => component.types.includes(AddressType.administrative_area_level_2) && component.types.includes(AddressType.political))?.short_name;

    if (county === undefined) {
        const locality = (addressComponents.find(
            component => component.types.includes(AddressType.locality) && component.types.includes(AddressType.political))?.short_name);
        if (locality !== undefined && state !== undefined && state in independentCities && independentCities[state].map(city => city.toLocaleLowerCase()).includes(locality.toLocaleLowerCase())) {
            county = locality;
        }
    }

    return county;
}

function extractCity(addressComponents: AddressComponent[], fullAddress: string): string | undefined {
    const parts = [
        addressComponents.find(component => component.types.includes(AddressType.locality) && component.types.includes(AddressType.political))?.short_name,
        addressComponents.find(component => component.types.includes(AddressType.sublocality) && component.types.includes(AddressType.political))?.short_name,
        addressComponents.find(component => component.types.includes(AddressType.neighborhood) && component.types.includes(AddressType.political))?.short_name,
        addressComponents.find(component => component.types.includes(AddressType.administrative_area_level_3) && component.types.includes(AddressType.political))?.short_name
    ].filter(a => a);

    const city = extractCityFromFullAddress(fullAddress);

    if (city !== null && parts.includes(city)) {
        return city;
    }

    return parts.length > 0 ? parts[0] : undefined;
}

function extractCityFromFullAddress(fullAddress: string): string | null {
    const parse: (string | undefined)[] = fullAddress.split(", ");

    if (parse.length > 1) {
        const [ , city, suffix ] = parse;

        if (suffix !== undefined) {
            const [ state ] = suffix.split(" ");

            if (state.length === 2 && state.toUpperCase() === state) {
                return city as string;
            }
        }
    }

    return null;
}

function parseGoogleGeoCodeToAddressDetails(googleGeoCode: GoogleGeoCodeResponse, requiredFields?: string[]): AddressDetails {
    const addressComponents = googleGeoCode.address_components;
    const country: string | undefined =
        addressComponents.find(
            component => component.types.includes(AddressType.country) && component.types.includes(AddressType.political))?.short_name;
    const state: string | undefined =
        addressComponents.find(
            component => component.types.includes(AddressType.administrative_area_level_1) && component.types.includes(AddressType.political))?.short_name;
    const county = extractCounty(addressComponents, state);
    const city = extractCity(addressComponents, googleGeoCode.formatted_address);
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

    if (country === undefined && requiredFields !== undefined && requiredFields.includes('country')) {
        throw new MissingAddressDetailsError([AddressType.country, AddressType.political], `Missing  ${AddressType.political} and ${AddressType.country} types in address components`)
    }
    if (state === undefined && requiredFields !== undefined && requiredFields.includes('state')) {
        throw new MissingAddressDetailsError([AddressType.administrative_area_level_1, AddressType.political], `Missing ${AddressType.political} and  ${AddressType.administrative_area_level_1} types in address components`)
    }
    if (county === undefined && requiredFields !== undefined && requiredFields.includes('county')) {
        throw new MissingAddressDetailsError([AddressType.administrative_area_level_2, AddressType.political], `Missing political ${AddressType.political} and  ${AddressType.administrative_area_level_2} types in address components`)
    }
    if (city === undefined && requiredFields !== undefined && requiredFields.includes('city')) {
        throw new MissingAddressDetailsError([AddressType.neighborhood, AddressType.political, AddressType.sublocality, AddressType.locality], `Missing ${AddressType.locality}, ${AddressType.sublocality}, ${AddressType.neighborhood} and ${AddressType.sublocality}types in address components`)
    }
    if (street === undefined && requiredFields !== undefined && requiredFields.includes('street')) {
        throw new MissingAddressDetailsError([AddressType.route], `Missing ${AddressType.route} type in address components`)
    }
    if (zip === undefined && requiredFields !== undefined && requiredFields.includes('zip')) {
        throw new MissingAddressDetailsError([AddressType.postal_code], `Missing ${AddressType.postal_code} type in address components`)
    }
    if (zipSuffix === undefined && requiredFields !== undefined && requiredFields.includes('zipSuffix')) {
        throw new MissingAddressDetailsError([PlaceType2.postal_code_suffix], `Missing ${PlaceType2.postal_code_suffix} type in address components`)
    }
    if (address2 === undefined && requiredFields !== undefined && requiredFields.includes('address2')) {
        throw new MissingAddressDetailsError([AddressType.subpremise], `Missing ${AddressType.subpremise} type in address components`)
    }


    return {
        streetNumber: streetNumber === undefined ? null : streetNumber,
        street: street === undefined ? null : street,
        city: city === undefined ? null : city,
        county: county === undefined ? null : county,
        state: state === undefined ? null : state,
        country: country === undefined ? null : country,
        zip: zip === undefined ? null : zip,
        zipSuffix: zipSuffix === undefined ? null : zipSuffix,
        address2: address2 !== undefined ? `#${address2}` : null,
        googleGeoCodeResponse: googleGeoCode,
        fullAddress: fullAddress,
        status: googleGeoCode.status,
        location: googleGeoCode.geometry.location
    }
}

export const fromGoogleGeoCode = async (googleGeoCodeResponse: GoogleGeoCodeResponse, options: Options, requiredFields?: string[]): Promise<AddressDetails> => {
    try {
        return parseGoogleGeoCodeToAddressDetails(googleGeoCodeResponse, requiredFields);
    }
    catch (e) {
        if (e instanceof MissingAddressDetailsError) {
            if ((e.missingTypes.includes(AddressType.administrative_area_level_2) || e.missingTypes.includes(AddressType.route)) && (options.mfAutoFix === undefined || options.mfAutoFix)) {
                const streetNumberRegex = /^[0-9]+\s|^[0-9]+-[0-9]+\s/;
                const modifiedAddressText = googleGeoCodeResponse.formatted_address.replace(streetNumberRegex, '');
                const newGoogleGeoCoderResponse = await getGoogleGeoCode(modifiedAddressText, options);
                return parseGoogleGeoCodeToAddressDetails(newGoogleGeoCoderResponse, requiredFields);
            } else {
                throw e;
            }
        } else {
            throw e;
        }
    }
}

export const fromAddressText = async (addressText: string, options: Options, requiredFields?: string[]): Promise<AddressDetails> => {
    let modifiedAddressText = addressText
    const streetNumbersRegex = /^([0-9]+)(\s)([0-9]+\s)/;
    if (options.mfAutoFix === undefined || options.mfAutoFix) {
        modifiedAddressText = addressText.replace(streetNumbersRegex, "$1-$3");
    }
    const googleResponse = await getGoogleGeoCode(modifiedAddressText, options);
    return fromGoogleGeoCode(googleResponse, options, requiredFields);
}

async function getGoogleGeoCode(addressText: string, options: Options): Promise<GoogleGeoCodeResponse> {
    const response = await Axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        encodeURIComponent(addressText) + '&key=' + options.apiKey)
    if (
        response.status < 200 ||
        response.status > 300
    ) {
        throw new Error(`Status code error: ${response.status}`);
    }
    const googleAddressComponents = response.data;
    if (googleAddressComponents.error_message !== undefined) {
        throw new Error(googleAddressComponents.error_message);
    }
    if (googleAddressComponents.results.length === 0) {
        throw new Error(Status.ZERO_RESULTS);
    }
    return {
        address_components: googleAddressComponents.results[0].address_components,
        formatted_address: googleAddressComponents.results[0].formatted_address,
        geometry: googleAddressComponents.results[0].geometry,
        place_id: googleAddressComponents.results[0].place_id,
        types: googleAddressComponents.results[0].types,
        status: googleAddressComponents.status
    }
}
