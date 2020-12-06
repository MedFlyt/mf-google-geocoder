var mfGeoCoder = (function (exports, googleMapsServicesJs, https) {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var MissingAddressDetailsError = /** @class */ (function (_super) {
        __extends(MissingAddressDetailsError, _super);
        function MissingAddressDetailsError(missingTypes, message) {
            var _this = _super.call(this, message) || this;
            _this.missingTypes = missingTypes;
            _this.message = message;
            _this.name = 'MissingAddressDetailsError';
            return _this;
        }
        return MissingAddressDetailsError;
    }(Error));
    function parseGoogleGeoCodeToAddressDetails(googleGeoCode) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        var addressComponents = googleGeoCode.address_components;
        var country = (_a = addressComponents.find(function (component) { return component.types.includes(googleMapsServicesJs.AddressType.country) && component.types.includes(googleMapsServicesJs.AddressType.political); })) === null || _a === void 0 ? void 0 : _a.short_name;
        var state = (_b = addressComponents.find(function (component) { return component.types.includes(googleMapsServicesJs.AddressType.administrative_area_level_1) && component.types.includes(googleMapsServicesJs.AddressType.political); })) === null || _b === void 0 ? void 0 : _b.short_name;
        var county = (_c = addressComponents.find(function (component) { return component.types.includes(googleMapsServicesJs.AddressType.administrative_area_level_2) && component.types.includes(googleMapsServicesJs.AddressType.political); })) === null || _c === void 0 ? void 0 : _c.short_name;
        var city = (_g = (_e = ((_d = addressComponents.find(function (component) { return component.types.includes(googleMapsServicesJs.AddressType.neighborhood) && component.types.includes(googleMapsServicesJs.AddressType.political); })) === null || _d === void 0 ? void 0 : _d.short_name)) !== null && _e !== void 0 ? _e : ((_f = addressComponents.find(function (component) { return component.types.includes(googleMapsServicesJs.AddressType.sublocality) && component.types.includes(googleMapsServicesJs.AddressType.political); })) === null || _f === void 0 ? void 0 : _f.short_name)) !== null && _g !== void 0 ? _g : ((_h = addressComponents.find(function (component) { return component.types.includes(googleMapsServicesJs.AddressType.locality) && component.types.includes(googleMapsServicesJs.AddressType.political); })) === null || _h === void 0 ? void 0 : _h.short_name);
        var street = (_j = addressComponents.find(function (component) { return component.types.includes(googleMapsServicesJs.AddressType.route); })) === null || _j === void 0 ? void 0 : _j.short_name;
        var streetNumber = (_k = addressComponents.find(function (component) { return component.types.includes(googleMapsServicesJs.GeocodingAddressComponentType.street_number); })) === null || _k === void 0 ? void 0 : _k.short_name;
        var zip = (_l = addressComponents.find(function (component) { return component.types.includes(googleMapsServicesJs.AddressType.postal_code); })) === null || _l === void 0 ? void 0 : _l.short_name;
        var zipSuffix = (_m = addressComponents.find(function (component) { return component.types.includes(googleMapsServicesJs.PlaceType2.postal_code_suffix); })) === null || _m === void 0 ? void 0 : _m.short_name;
        var address2 = (_o = addressComponents.find(function (component) { return component.types.includes(googleMapsServicesJs.AddressType.subpremise); })) === null || _o === void 0 ? void 0 : _o.short_name;
        var fullAddress = googleGeoCode.formatted_address;
        if (country === undefined) {
            throw new MissingAddressDetailsError([googleMapsServicesJs.AddressType.country, googleMapsServicesJs.AddressType.political], "Missing  " + googleMapsServicesJs.AddressType.political + " and " + googleMapsServicesJs.AddressType.country + " types in address components");
        }
        if (state === undefined) {
            throw new MissingAddressDetailsError([googleMapsServicesJs.AddressType.administrative_area_level_1, googleMapsServicesJs.AddressType.political], "Missing " + googleMapsServicesJs.AddressType.political + " and  " + googleMapsServicesJs.AddressType.administrative_area_level_1 + " types in address components");
        }
        if (county === undefined) {
            throw new MissingAddressDetailsError([googleMapsServicesJs.AddressType.administrative_area_level_2, googleMapsServicesJs.AddressType.political], "Missing political " + googleMapsServicesJs.AddressType.political + " and  " + googleMapsServicesJs.AddressType.administrative_area_level_2 + " types in address components");
        }
        if (city === undefined) {
            throw new MissingAddressDetailsError([googleMapsServicesJs.AddressType.neighborhood, googleMapsServicesJs.AddressType.political, googleMapsServicesJs.AddressType.sublocality, googleMapsServicesJs.AddressType.locality], "Missing " + googleMapsServicesJs.AddressType.locality + ", " + googleMapsServicesJs.AddressType.sublocality + ", " + googleMapsServicesJs.AddressType.neighborhood + " and " + googleMapsServicesJs.AddressType.sublocality + "types in address components");
        }
        if (street === undefined) {
            throw new MissingAddressDetailsError([googleMapsServicesJs.AddressType.route], "Missing " + googleMapsServicesJs.AddressType.route + " type in address components");
        }
        if (zip === undefined) {
            throw new MissingAddressDetailsError([googleMapsServicesJs.AddressType.postal_code], "Missing " + googleMapsServicesJs.AddressType.postal_code + " type in address components");
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
            address2: address2 !== undefined ? "#" + address2 : null,
            googleGeoCodeResponse: googleGeoCode,
            status: googleGeoCode.status,
            location: googleGeoCode.geometry.location
        };
    }
    var fromGoogleGeoCode = function (googleGeoCodeResponse, options) { return __awaiter(void 0, void 0, void 0, function () {
        var e_1, streetNumberRegex, modifiedAddressText, newGoogleGeoCoderResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 1, , 7]);
                    return [2 /*return*/, parseGoogleGeoCodeToAddressDetails(googleGeoCodeResponse)];
                case 1:
                    e_1 = _a.sent();
                    if (!(e_1.name === 'MissingAddressDetailsError')) return [3 /*break*/, 5];
                    if (!(e_1.missingTypes.includes(googleMapsServicesJs.AddressType.administrative_area_level_2) && (options.mfAutoFix === undefined || options.mfAutoFix))) return [3 /*break*/, 3];
                    streetNumberRegex = /^[0-9]+\s|^[0-9]+-[0-9]+\s/;
                    modifiedAddressText = googleGeoCodeResponse.formatted_address.replace(streetNumberRegex, '');
                    return [4 /*yield*/, getGoogleGeoCode(modifiedAddressText, options)];
                case 2:
                    newGoogleGeoCoderResponse = _a.sent();
                    return [2 /*return*/, parseGoogleGeoCodeToAddressDetails(newGoogleGeoCoderResponse)];
                case 3: throw e_1;
                case 4: return [3 /*break*/, 6];
                case 5: throw e_1;
                case 6: return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    var fromAddressText = function (addressText, options) { return __awaiter(void 0, void 0, void 0, function () {
        var modifiedAddressText, streetNumbersRegex, googleResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    modifiedAddressText = addressText;
                    streetNumbersRegex = /^([0-9]+)(\s)([0-9]+\s)/;
                    if (options.mfAutoFix === undefined || options.mfAutoFix) {
                        modifiedAddressText = addressText.replace(streetNumbersRegex, "$1-$3");
                    }
                    return [4 /*yield*/, getGoogleGeoCode(modifiedAddressText, options)];
                case 1:
                    googleResponse = _a.sent();
                    return [2 /*return*/, fromGoogleGeoCode(googleResponse, options)];
            }
        });
    }); };
    function getGoogleGeoCode(addressText, options) {
        return new Promise(function (resolve, reject) {
            var req = https.request({
                host: "maps.googleapis.com",
                hostname: "maps.googleapis.com",
                port: 443,
                method: "GET",
                path: "/maps/api/geocode/json?address=" +
                    encodeURIComponent(addressText) + '&key=' +
                    options.apiKey
            }, function (response) {
                if (response.statusCode === undefined ||
                    response.statusCode < 200 ||
                    response.statusCode > 300) {
                    reject(new Error("Status code error: " + response.statusCode));
                }
                var body = "";
                response.on("data", function (d) {
                    body += d;
                });
                response.on("end", function () {
                    var googleAddressComponents = JSON.parse(body);
                    if (googleAddressComponents.error_message !== undefined) {
                        throw new Error(googleAddressComponents.error_message);
                    }
                    if (googleAddressComponents.results.length === 0) {
                        throw new Error(googleMapsServicesJs.Status.ZERO_RESULTS);
                    }
                    var result = {
                        address_components: googleAddressComponents.results[0].address_components,
                        formatted_address: googleAddressComponents.results[0].formatted_address,
                        geometry: googleAddressComponents.results[0].geometry,
                        place_id: googleAddressComponents.results[0].place_id,
                        types: googleAddressComponents.results[0].types,
                        status: googleAddressComponents.status
                    };
                    resolve(result);
                });
            });
            req.on("error", function (err) {
                reject(err);
            });
            req.end("", "utf8");
        });
    }

    exports.MissingAddressDetailsError = MissingAddressDetailsError;
    exports.fromAddressText = fromAddressText;
    exports.fromGoogleGeoCode = fromGoogleGeoCode;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}, googleMapsServicesJs, https));
