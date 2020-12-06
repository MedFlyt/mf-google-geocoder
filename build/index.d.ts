import * as googlemaps from '@googlemaps/google-maps-services-js';
interface Geo {
    lat: number;
    lng: number;
}
export interface Options {
    /** google API key */
    apiKey: string;
    /** indicates if to change the original address if fields are missing */
    mfAutoFix?: boolean;
}
export interface GoogleGeoCodeResponse {
    address_components: googlemaps.AddressComponent[];
    formatted_address: string;
    types: googlemaps.AddressType[];
    place_id: string;
    geometry: googlemaps.AddressGeometry;
    status: googlemaps.Status;
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
    /** original google status */
    status: googlemaps.Status;
    /** original google API response */
    googleGeoCodeResponse: GoogleGeoCodeResponse;
}
export declare class MissingAddressDetailsError extends Error {
    missingTypes: (googlemaps.AddressType | googlemaps.GeocodingAddressComponentType)[];
    message: string;
    constructor(missingTypes: (googlemaps.AddressType | googlemaps.GeocodingAddressComponentType)[], message: string);
}
export declare const fromGoogleGeoCode: (googleGeoCodeResponse: GoogleGeoCodeResponse, options: Options) => Promise<AddressDetails>;
export declare const fromAddressText: (addressText: string, options: Options) => Promise<AddressDetails>;
export {};
