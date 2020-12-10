# mf-google-geocoder
JS library that uses Google Geocoding API (https only) and parses the response into a flat, readable and minimal object.

## Usage Example
 ```javascript
 const address = '672 Franklin Ave #1FL, Brooklyn, NY 11238, USA';
    try {
        const result = await fromAddressText(address, { apiKey, mfAutoFix: true });
        console.log(result.city)
        console.log(result.location)
        console.log(result.zip)
    } catch (e) {
        if (e.name === 'MissingAddressDetailsError')  { // or check if instanceof
            console.log(e.missingTypes);
        }
    }
```
## Returned Value
```javascript
interface AddressDetails {
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
```
### From address text
Gets text and returns ```AddressDetails``` interface and returns ```AddressDetails``` interface
via
```javascript
function fromAddressText(addressText: string, options: Options)
```

### From Google Geocoder response
Gets ```GoogleGeoCodeResponse``` and returns ```AddressDetails``` interface
via
```javascript
function fromGoogleGeoCode(googleGeoCodeResponse: GoogleGeoCodeResponse, options: Options)
```

##### ```GoogleGeoCodeResponse```:

```javascript
interface GoogleGeoCodeResponse {
    address_components: googlemaps.AddressComponent[];
    formatted_address: string;
    types: googlemaps.AddressType[];
    place_id: string;
    geometry: googlemaps.AddressGeometry;
}
```

##### ```MissingAddressDetailsError```:
Throws ```MissingAddressDetailsError``` with ```missingTypes: (AddressType | GeocodingAddressComponentType)[]```
if one of the required fields are missing.


### options
```json
interface Options {
    /** google API key */
    apiKey: string,
    /** indicates if to change the original address if fields are missing. Default is true */
    mfAutoFix?: boolean;
}
```