"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromAddressText = exports.fromGoogleGeoCode = exports.MissingAddressDetailsError = void 0;
const google_maps_services_js_1 = require("@googlemaps/google-maps-services-js");
const https = __importStar(require("https"));
class MissingAddressDetailsError extends Error {
    constructor(missingTypes, message) {
        super(message);
        this.missingTypes = missingTypes;
        this.message = message;
        this.name = 'MissingAddressDetailsError';
    }
}
exports.MissingAddressDetailsError = MissingAddressDetailsError;
function parseGoogleGeoCodeToAddressDetails(googleGeoCode) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    const addressComponents = googleGeoCode.address_components;
    const country = (_a = addressComponents.find(component => component.types.includes(google_maps_services_js_1.AddressType.country) && component.types.includes(google_maps_services_js_1.AddressType.political))) === null || _a === void 0 ? void 0 : _a.short_name;
    const state = (_b = addressComponents.find(component => component.types.includes(google_maps_services_js_1.AddressType.administrative_area_level_1) && component.types.includes(google_maps_services_js_1.AddressType.political))) === null || _b === void 0 ? void 0 : _b.short_name;
    const county = (_c = addressComponents.find(component => component.types.includes(google_maps_services_js_1.AddressType.administrative_area_level_2) && component.types.includes(google_maps_services_js_1.AddressType.political))) === null || _c === void 0 ? void 0 : _c.short_name;
    const city = (_g = (_e = ((_d = addressComponents.find(component => component.types.includes(google_maps_services_js_1.AddressType.neighborhood) && component.types.includes(google_maps_services_js_1.AddressType.political))) === null || _d === void 0 ? void 0 : _d.short_name)) !== null && _e !== void 0 ? _e : ((_f = addressComponents.find(component => component.types.includes(google_maps_services_js_1.AddressType.sublocality) && component.types.includes(google_maps_services_js_1.AddressType.political))) === null || _f === void 0 ? void 0 : _f.short_name)) !== null && _g !== void 0 ? _g : ((_h = addressComponents.find(component => component.types.includes(google_maps_services_js_1.AddressType.locality) && component.types.includes(google_maps_services_js_1.AddressType.political))) === null || _h === void 0 ? void 0 : _h.short_name);
    const street = (_j = addressComponents.find(component => component.types.includes(google_maps_services_js_1.AddressType.route))) === null || _j === void 0 ? void 0 : _j.short_name;
    const streetNumber = (_k = addressComponents.find(component => component.types.includes(google_maps_services_js_1.GeocodingAddressComponentType.street_number))) === null || _k === void 0 ? void 0 : _k.short_name;
    const zip = (_l = addressComponents.find(component => component.types.includes(google_maps_services_js_1.AddressType.postal_code))) === null || _l === void 0 ? void 0 : _l.short_name;
    const zipSuffix = (_m = addressComponents.find(component => component.types.includes(google_maps_services_js_1.PlaceType2.postal_code_suffix))) === null || _m === void 0 ? void 0 : _m.short_name;
    const address2 = (_o = addressComponents.find(component => component.types.includes(google_maps_services_js_1.AddressType.subpremise))) === null || _o === void 0 ? void 0 : _o.short_name;
    const fullAddress = googleGeoCode.formatted_address;
    if (country === undefined) {
        throw new MissingAddressDetailsError([google_maps_services_js_1.AddressType.country, google_maps_services_js_1.AddressType.political], `Missing  ${google_maps_services_js_1.AddressType.political} and ${google_maps_services_js_1.AddressType.country} types in address components`);
    }
    if (state === undefined) {
        throw new MissingAddressDetailsError([google_maps_services_js_1.AddressType.administrative_area_level_1, google_maps_services_js_1.AddressType.political], `Missing ${google_maps_services_js_1.AddressType.political} and  ${google_maps_services_js_1.AddressType.administrative_area_level_1} types in address components`);
    }
    if (county === undefined) {
        throw new MissingAddressDetailsError([google_maps_services_js_1.AddressType.administrative_area_level_2, google_maps_services_js_1.AddressType.political], `Missing political ${google_maps_services_js_1.AddressType.political} and  ${google_maps_services_js_1.AddressType.administrative_area_level_2} types in address components`);
    }
    if (city === undefined) {
        throw new MissingAddressDetailsError([google_maps_services_js_1.AddressType.neighborhood, google_maps_services_js_1.AddressType.political, google_maps_services_js_1.AddressType.sublocality, google_maps_services_js_1.AddressType.locality], `Missing ${google_maps_services_js_1.AddressType.locality}, ${google_maps_services_js_1.AddressType.sublocality}, ${google_maps_services_js_1.AddressType.neighborhood} and ${google_maps_services_js_1.AddressType.sublocality}types in address components`);
    }
    if (street === undefined) {
        throw new MissingAddressDetailsError([google_maps_services_js_1.AddressType.route], `Missing ${google_maps_services_js_1.AddressType.route} type in address components`);
    }
    if (zip === undefined) {
        throw new MissingAddressDetailsError([google_maps_services_js_1.AddressType.postal_code], `Missing ${google_maps_services_js_1.AddressType.postal_code} type in address components`);
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
    };
}
const fromGoogleGeoCode = (googleGeoCodeResponse, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return parseGoogleGeoCodeToAddressDetails(googleGeoCodeResponse);
    }
    catch (e) {
        if (e.name === 'MissingAddressDetailsError') {
            if (e.missingTypes.includes(google_maps_services_js_1.AddressType.administrative_area_level_2) && (options.mfAutoFix === undefined || options.mfAutoFix)) {
                const streetNumberRegex = /^[0-9]+\s|^[0-9]+-[0-9]+\s/;
                const modifiedAddressText = googleGeoCodeResponse.formatted_address.replace(streetNumberRegex, '');
                const newGoogleGeoCoderResponse = yield getGoogleGeoCode(modifiedAddressText, options);
                return parseGoogleGeoCodeToAddressDetails(newGoogleGeoCoderResponse);
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
const fromAddressText = (addressText, options) => __awaiter(void 0, void 0, void 0, function* () {
    let modifiedAddressText = addressText;
    const streetNumbersRegex = /^([0-9]+)(\s)([0-9]+\s)/;
    if (options.mfAutoFix === undefined || options.mfAutoFix) {
        modifiedAddressText = addressText.replace(streetNumbersRegex, "$1-$3");
    }
    const googleResponse = yield getGoogleGeoCode(modifiedAddressText, options);
    return exports.fromGoogleGeoCode(googleResponse, options);
});
exports.fromAddressText = fromAddressText;
function getGoogleGeoCode(addressText, options) {
    return new Promise((resolve, reject) => {
        const req = https.request({
            host: "maps.googleapis.com",
            hostname: "maps.googleapis.com",
            port: 443,
            method: "GET",
            path: "/maps/api/geocode/json?address=" +
                encodeURIComponent(addressText) + '&key=' +
                options.apiKey
        }, (response) => {
            if (response.statusCode === undefined ||
                response.statusCode < 200 ||
                response.statusCode > 300) {
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
                const result = {
                    address_components: googleAddressComponents.results[0].address_components,
                    formatted_address: googleAddressComponents.results[0].formatted_address,
                    geometry: googleAddressComponents.results[0].geometry,
                    place_id: googleAddressComponents.results[0].place_id,
                    types: googleAddressComponents.results[0].types
                };
                resolve(result);
            });
        });
        req.on("error", (err) => {
            reject(err);
        });
        req.end("", "utf8");
    });
}
