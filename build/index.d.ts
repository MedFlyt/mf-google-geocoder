import { AddressComponent, AddressGeometry, AddressType, GeocodingAddressComponentType, PlaceType2, Status } from '@googlemaps/google-maps-services-js';
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
export declare class MissingAddressDetailsError extends Error {
    missingTypes: (AddressType | GeocodingAddressComponentType | PlaceType2)[];
    message: string;
    constructor(missingTypes: (AddressType | GeocodingAddressComponentType | PlaceType2)[], message: string);
}
export declare const fromGoogleGeoCode: (googleGeoCodeResponse: GoogleGeoCodeResponse, options: Options, requiredFields?: string[] | undefined) => Promise<AddressDetails>;
export declare const fromAddressText: (addressText: string, options: Options, requiredFields?: string[] | undefined) => Promise<AddressDetails>;
export {};
