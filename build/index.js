"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromAddressText = exports.fromGoogleGeoCode = exports.MissingAddressDetailsError = void 0;
// tslint:disable-next-line:match-default-export-name
const axios_1 = __importDefault(require("axios"));
const google_maps_services_js_1 = require("@googlemaps/google-maps-services-js");
const independentCities_1 = require("./independentCities");
class MissingAddressDetailsError extends Error {
    constructor(missingTypes, message) {
        super(message);
        this.missingTypes = missingTypes;
        this.message = message;
        this.name = 'MissingAddressDetailsError';
        Object.setPrototypeOf(this, MissingAddressDetailsError.prototype);
    }
}
exports.MissingAddressDetailsError = MissingAddressDetailsError;
function extractCounty(addressComponents, state) {
    var _a, _b;
    let county = (_a = addressComponents.find(component => component.types.includes(google_maps_services_js_1.AddressType.administrative_area_level_2) && component.types.includes(google_maps_services_js_1.AddressType.political))) === null || _a === void 0 ? void 0 : _a.short_name;
    if (county === undefined) {
        const locality = ((_b = addressComponents.find(component => component.types.includes(google_maps_services_js_1.AddressType.locality) && component.types.includes(google_maps_services_js_1.AddressType.political))) === null || _b === void 0 ? void 0 : _b.short_name);
        if (locality !== undefined && state !== undefined && state in independentCities_1.independentCities && independentCities_1.independentCities[state].map(city => city.toLocaleLowerCase()).includes(locality.toLocaleLowerCase())) {
            county = locality;
        }
    }
    return county;
}
function extractCity(addressComponents, fullAddress) {
    var _a, _b, _c, _d;
    const parts = [
        (_a = addressComponents.find(component => component.types.includes(google_maps_services_js_1.AddressType.locality) && component.types.includes(google_maps_services_js_1.AddressType.political))) === null || _a === void 0 ? void 0 : _a.short_name,
        (_b = addressComponents.find(component => component.types.includes(google_maps_services_js_1.AddressType.sublocality) && component.types.includes(google_maps_services_js_1.AddressType.political))) === null || _b === void 0 ? void 0 : _b.short_name,
        (_c = addressComponents.find(component => component.types.includes(google_maps_services_js_1.AddressType.neighborhood) && component.types.includes(google_maps_services_js_1.AddressType.political))) === null || _c === void 0 ? void 0 : _c.short_name,
        (_d = addressComponents.find(component => component.types.includes(google_maps_services_js_1.AddressType.administrative_area_level_3) && component.types.includes(google_maps_services_js_1.AddressType.political))) === null || _d === void 0 ? void 0 : _d.short_name,
    ].filter(a => a);
    const city = extractCityFromFullAddress(fullAddress);
    if (city !== null && parts.includes(city)) {
        return city;
    }
    return parts.length > 0 ? parts[0] : undefined;
}
function extractCityFromFullAddress(fullAddress) {
    const parse = fullAddress.split(", ");
    if (parse.length > 1) {
        const [, city, suffix] = parse;
        if (suffix !== undefined) {
            const [state] = suffix.split(" ");
            if (state.length === 2 && state.toUpperCase() === state) {
                return city;
            }
        }
    }
    return null;
}
function parseGoogleGeoCodeToAddressDetails(googleGeoCode, requiredFields) {
    var _a, _b, _c, _d, _e, _f, _g;
    const addressComponents = googleGeoCode.address_components;
    const country = (_a = addressComponents.find(component => component.types.includes(google_maps_services_js_1.AddressType.country) && component.types.includes(google_maps_services_js_1.AddressType.political))) === null || _a === void 0 ? void 0 : _a.short_name;
    const state = (_b = addressComponents.find(component => component.types.includes(google_maps_services_js_1.AddressType.administrative_area_level_1) && component.types.includes(google_maps_services_js_1.AddressType.political))) === null || _b === void 0 ? void 0 : _b.short_name;
    const county = extractCounty(addressComponents, state);
    const city = extractCity(addressComponents, googleGeoCode.formatted_address);
    const street = (_c = addressComponents.find(component => component.types.includes(google_maps_services_js_1.AddressType.route))) === null || _c === void 0 ? void 0 : _c.short_name;
    const streetNumber = (_d = addressComponents.find(component => component.types.includes(google_maps_services_js_1.GeocodingAddressComponentType.street_number))) === null || _d === void 0 ? void 0 : _d.short_name;
    const zip = (_e = addressComponents.find(component => component.types.includes(google_maps_services_js_1.AddressType.postal_code))) === null || _e === void 0 ? void 0 : _e.short_name;
    const zipSuffix = (_f = addressComponents.find(component => component.types.includes(google_maps_services_js_1.PlaceType2.postal_code_suffix))) === null || _f === void 0 ? void 0 : _f.short_name;
    const address2 = (_g = addressComponents.find(component => component.types.includes(google_maps_services_js_1.AddressType.subpremise))) === null || _g === void 0 ? void 0 : _g.short_name;
    const fullAddress = googleGeoCode.formatted_address;
    if (country === undefined && requiredFields !== undefined && requiredFields.includes('country')) {
        throw new MissingAddressDetailsError([google_maps_services_js_1.AddressType.country, google_maps_services_js_1.AddressType.political], `Missing  ${google_maps_services_js_1.AddressType.political} and ${google_maps_services_js_1.AddressType.country} types in address components`);
    }
    if (state === undefined && requiredFields !== undefined && requiredFields.includes('state')) {
        throw new MissingAddressDetailsError([google_maps_services_js_1.AddressType.administrative_area_level_1, google_maps_services_js_1.AddressType.political], `Missing ${google_maps_services_js_1.AddressType.political} and  ${google_maps_services_js_1.AddressType.administrative_area_level_1} types in address components`);
    }
    if (county === undefined && requiredFields !== undefined && requiredFields.includes('county')) {
        throw new MissingAddressDetailsError([google_maps_services_js_1.AddressType.administrative_area_level_2, google_maps_services_js_1.AddressType.political], `Missing political ${google_maps_services_js_1.AddressType.political} and  ${google_maps_services_js_1.AddressType.administrative_area_level_2} types in address components`);
    }
    if (city === undefined && requiredFields !== undefined && requiredFields.includes('city')) {
        throw new MissingAddressDetailsError([google_maps_services_js_1.AddressType.neighborhood, google_maps_services_js_1.AddressType.political, google_maps_services_js_1.AddressType.sublocality, google_maps_services_js_1.AddressType.locality], `Missing ${google_maps_services_js_1.AddressType.locality}, ${google_maps_services_js_1.AddressType.sublocality}, ${google_maps_services_js_1.AddressType.neighborhood} and ${google_maps_services_js_1.AddressType.sublocality}types in address components`);
    }
    if (street === undefined && requiredFields !== undefined && requiredFields.includes('street')) {
        throw new MissingAddressDetailsError([google_maps_services_js_1.AddressType.route], `Missing ${google_maps_services_js_1.AddressType.route} type in address components`);
    }
    if (zip === undefined && requiredFields !== undefined && requiredFields.includes('zip')) {
        throw new MissingAddressDetailsError([google_maps_services_js_1.AddressType.postal_code], `Missing ${google_maps_services_js_1.AddressType.postal_code} type in address components`);
    }
    if (zipSuffix === undefined && requiredFields !== undefined && requiredFields.includes('zipSuffix')) {
        throw new MissingAddressDetailsError([google_maps_services_js_1.PlaceType2.postal_code_suffix], `Missing ${google_maps_services_js_1.PlaceType2.postal_code_suffix} type in address components`);
    }
    if (address2 === undefined && requiredFields !== undefined && requiredFields.includes('address2')) {
        throw new MissingAddressDetailsError([google_maps_services_js_1.AddressType.subpremise], `Missing ${google_maps_services_js_1.AddressType.subpremise} type in address components`);
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
    };
}
const fromGoogleGeoCode = (googleGeoCodeResponse, options, requiredFields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return parseGoogleGeoCodeToAddressDetails(googleGeoCodeResponse, requiredFields);
    }
    catch (e) {
        if (e instanceof MissingAddressDetailsError) {
            if ((e.missingTypes.includes(google_maps_services_js_1.AddressType.administrative_area_level_2) || e.missingTypes.includes(google_maps_services_js_1.AddressType.route)) && (options.mfAutoFix === undefined || options.mfAutoFix)) {
                const streetNumberRegex = /^[0-9]+\s|^[0-9]+-[0-9]+\s/;
                const modifiedAddressText = googleGeoCodeResponse.formatted_address.replace(streetNumberRegex, '');
                const newGoogleGeoCoderResponse = yield getGoogleGeoCode(modifiedAddressText, options);
                return parseGoogleGeoCodeToAddressDetails(newGoogleGeoCoderResponse, requiredFields);
            }
            else {
                throw e;
            }
        }
        else {
            throw e;
        }
    }
});
exports.fromGoogleGeoCode = fromGoogleGeoCode;
const fromAddressText = (addressText, options, requiredFields) => __awaiter(void 0, void 0, void 0, function* () {
    let modifiedAddressText = addressText;
    const streetNumbersRegex = /^([0-9]+)(\s)([0-9]+\s)/;
    if (options.mfAutoFix === undefined || options.mfAutoFix) {
        modifiedAddressText = addressText.replace(streetNumbersRegex, "$1-$3");
    }
    const googleResponse = yield getGoogleGeoCode(modifiedAddressText, options);
    return exports.fromGoogleGeoCode(googleResponse, options, requiredFields);
});
exports.fromAddressText = fromAddressText;
function getGoogleGeoCode(addressText, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get("https://maps.googleapis.com/maps/api/geocode/json?address=" +
            encodeURIComponent(addressText) + '&key=' + options.apiKey);
        if (response.status < 200 ||
            response.status > 300) {
            throw new Error(`Status code error: ${response.status}`);
        }
        const googleAddressComponents = response.data;
        if (googleAddressComponents.error_message !== undefined) {
            throw new Error(googleAddressComponents.error_message);
        }
        if (googleAddressComponents.results.length === 0) {
            throw new Error(google_maps_services_js_1.Status.ZERO_RESULTS);
        }
        return {
            address_components: googleAddressComponents.results[0].address_components,
            formatted_address: googleAddressComponents.results[0].formatted_address,
            geometry: googleAddressComponents.results[0].geometry,
            place_id: googleAddressComponents.results[0].place_id,
            types: googleAddressComponents.results[0].types,
            status: googleAddressComponents.status
        };
    });
}
