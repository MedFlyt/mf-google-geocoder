export const googleValidResponse = {
    "results": [
        {
            "address_components": [
                {
                    "long_name": "1FL",
                    "short_name": "1FL",
                    "types": [
                        "subpremise"
                    ]
                },
                {
                    "long_name": "672",
                    "short_name": "672",
                    "types": [
                        "street_number"
                    ]
                },
                {
                    "long_name": "Franklin Avenue",
                    "short_name": "Franklin Ave",
                    "types": [
                        "route"
                    ]
                },
                {
                    "long_name": "Crown Heights",
                    "short_name": "Crown Heights",
                    "types": [
                        "neighborhood",
                        "political"
                    ]
                },
                {
                    "long_name": "Brooklyn",
                    "short_name": "Brooklyn",
                    "types": [
                        "political",
                        "sublocality",
                        "sublocality_level_1"
                    ]
                },
                {
                    "long_name": "Kings County",
                    "short_name": "Kings County",
                    "types": [
                        "administrative_area_level_2",
                        "political"
                    ]
                },
                {
                    "long_name": "New York",
                    "short_name": "NY",
                    "types": [
                        "administrative_area_level_1",
                        "political"
                    ]
                },
                {
                    "long_name": "United States",
                    "short_name": "US",
                    "types": [
                        "country",
                        "political"
                    ]
                },
                {
                    "long_name": "11238",
                    "short_name": "11238",
                    "types": [
                        "postal_code"
                    ]
                },
                {
                    "long_name": "3880",
                    "short_name": "3880",
                    "types": [
                        "postal_code_suffix"
                    ]
                }
            ],
            "formatted_address": "672 Franklin Ave #1FL, Brooklyn, NY 11238, USA",
            "geometry": {
                "bounds": {
                    "northeast": {
                        "lat": 40.67554670000001,
                        "lng": -73.9563593
                    },
                    "southwest": {
                        "lat": 40.6754612,
                        "lng": -73.9565712
                    }
                },
                "location": {
                    "lat": 40.6754925,
                    "lng": -73.9564748
                },
                "location_type": "ROOFTOP",
                "viewport": {
                    "northeast": {
                        "lat": 40.6768529302915,
                        "lng": -73.9551162697085
                    },
                    "southwest": {
                        "lat": 40.6741549697085,
                        "lng": -73.9578142302915
                    }
                }
            },
            "place_id": "Ei42NzIgRnJhbmtsaW4gQXZlICMxRkwsIEJyb29rbHluLCBOWSAxMTIzOCwgVVNBIh8aHQoWChQKEgmT4r3inlvCiRH6mLpcCXRWkBIDMUZM",
            "types": [
                "subpremise"
            ]
        }
    ],
    "status": "OK"
};

export const nonValidStreet = {
    nonValid: {
        "results": [
            {
                "address_components": [
                    {
                        "long_name": "2811",
                        "short_name": "2811",
                        "types": [
                            "street_number"
                        ]
                    },
                    {
                        "long_name": "Exterior Street",
                        "short_name": "Exterior St",
                        "types": [
                            "route"
                        ]
                    },
                    {
                        "long_name": "The Bronx",
                        "short_name": "The Bronx",
                        "types": [
                            "political",
                            "sublocality",
                            "sublocality_level_1"
                        ]
                    },
                    {
                        "long_name": "New York",
                        "short_name": "NY",
                        "types": [
                            "administrative_area_level_1",
                            "political"
                        ]
                    },
                    {
                        "long_name": "United States",
                        "short_name": "US",
                        "types": [
                            "country",
                            "political"
                        ]
                    },
                    {
                        "long_name": "10463",
                        "short_name": "10463",
                        "types": [
                            "postal_code"
                        ]
                    }
                ],
                "formatted_address": "2811 Exterior St, The Bronx, NY 10463, USA",
                "geometry": {
                    "bounds": {
                        "northeast": {
                            "lat": 40.874225,
                            "lng": -73.9068285
                        },
                        "southwest": {
                            "lat": 40.8736913,
                            "lng": -73.907382
                        }
                    },
                    "location": {
                        "lat": 40.8739303,
                        "lng": -73.9069078
                    },
                    "location_type": "ROOFTOP",
                    "viewport": {
                        "northeast": {
                            "lat": 40.8753071302915,
                            "lng": -73.9057562697085
                        },
                        "southwest": {
                            "lat": 40.8726091697085,
                            "lng": -73.90845423029151
                        }
                    }
                },
                "place_id": "ChIJ2WywI5LzwokRO4jTD-dv0Wk",
                "types": [
                    "premise"
                ]
            }
        ],
        "status": "OK"
    }, valid: {
        "results": [
            {
                "address_components": [
                    {
                        "long_name": "Exterior Street",
                        "short_name": "Exterior St",
                        "types": [
                            "route"
                        ]
                    },
                    {
                        "long_name": "West Bronx",
                        "short_name": "West Bronx",
                        "types": [
                            "neighborhood",
                            "political"
                        ]
                    },
                    {
                        "long_name": "The Bronx",
                        "short_name": "The Bronx",
                        "types": [
                            "political",
                            "sublocality",
                            "sublocality_level_1"
                        ]
                    },
                    {
                        "long_name": "Bronx County",
                        "short_name": "Bronx County",
                        "types": [
                            "administrative_area_level_2",
                            "political"
                        ]
                    },
                    {
                        "long_name": "New York",
                        "short_name": "NY",
                        "types": [
                            "administrative_area_level_1",
                            "political"
                        ]
                    },
                    {
                        "long_name": "United States",
                        "short_name": "US",
                        "types": [
                            "country",
                            "political"
                        ]
                    },
                    {
                        "long_name": "10463",
                        "short_name": "10463",
                        "types": [
                            "postal_code"
                        ]
                    }
                ],
                "formatted_address": "Exterior St, The Bronx, NY 10463, USA",
                "geometry": {
                    "bounds": {
                        "northeast": {
                            "lat": 40.8768249,
                            "lng": -73.9058534
                        },
                        "southwest": {
                            "lat": 40.87328249999999,
                            "lng": -73.90695580000001
                        }
                    },
                    "location": {
                        "lat": 40.8751173,
                        "lng": -73.90615939999999
                    },
                    "location_type": "GEOMETRIC_CENTER",
                    "viewport": {
                        "northeast": {
                            "lat": 40.8768249,
                            "lng": -73.90505561970849
                        },
                        "southwest": {
                            "lat": 40.87328249999999,
                            "lng": -73.90775358029151
                        }
                    }
                },
                "place_id": "ChIJ7Wd-f5HzwokRxp1A59DjxAk",
                "types": [
                    "route"
                ]
            }
        ],
        "status": "OK"
    }
};

export const noNeighborhood = {
    "results": [
        {
            "address_components": [
                {
                    "long_name": "19",
                    "short_name": "19",
                    "types": [
                        "street_number"
                    ]
                },
                {
                    "long_name": "Court Street",
                    "short_name": "Court St",
                    "types": [
                        "route"
                    ]
                },
                {
                    "long_name": "White Plains",
                    "short_name": "White Plains",
                    "types": [
                        "locality",
                        "political"
                    ]
                },
                {
                    "long_name": "Westchester County",
                    "short_name": "Westchester County",
                    "types": [
                        "administrative_area_level_2",
                        "political"
                    ]
                },
                {
                    "long_name": "New York",
                    "short_name": "NY",
                    "types": [
                        "administrative_area_level_1",
                        "political"
                    ]
                },
                {
                    "long_name": "United States",
                    "short_name": "US",
                    "types": [
                        "country",
                        "political"
                    ]
                },
                {
                    "long_name": "10601",
                    "short_name": "10601",
                    "types": [
                        "postal_code"
                    ]
                },
                {
                    "long_name": "3310",
                    "short_name": "3310",
                    "types": [
                        "postal_code_suffix"
                    ]
                }
            ],
            "formatted_address": "19 Court St, White Plains, NY 10601, USA",
            "geometry": {
                "location": {
                    "lat": 41.0320206,
                    "lng": -73.76735309999999
                },
                "location_type": "ROOFTOP",
                "viewport": {
                    "northeast": {
                        "lat": 41.03336958029149,
                        "lng": -73.76600411970848
                    },
                    "southwest": {
                        "lat": 41.0306716197085,
                        "lng": -73.7687020802915
                    }
                }
            },
            "place_id": "ChIJeW7EHTeUwokRNrfkylvTpyc",
            "plus_code": {
                "compound_code": "26JM+R3 White Plains, NY, USA",
                "global_code": "87H826JM+R3"
            },
            "types": [
                "street_address"
            ]
        }
    ],
    "status": "OK"
};

export const concatedStreetNumbers = {
    "results": [
        {
            "address_components": [
                {
                    "long_name": "110-40",
                    "short_name": "110-40",
                    "types": [
                        "street_number"
                    ]
                },
                {
                    "long_name": "72nd Avenue",
                    "short_name": "72nd Ave",
                    "types": [
                        "route"
                    ]
                },
                {
                    "long_name": "Forest Hills",
                    "short_name": "Forest Hills",
                    "types": [
                        "neighborhood",
                        "political"
                    ]
                },
                {
                    "long_name": "Queens",
                    "short_name": "Queens",
                    "types": [
                        "political",
                        "sublocality",
                        "sublocality_level_1"
                    ]
                },
                {
                    "long_name": "Queens County",
                    "short_name": "Queens County",
                    "types": [
                        "administrative_area_level_2",
                        "political"
                    ]
                },
                {
                    "long_name": "New York",
                    "short_name": "NY",
                    "types": [
                        "administrative_area_level_1",
                        "political"
                    ]
                },
                {
                    "long_name": "United States",
                    "short_name": "US",
                    "types": [
                        "country",
                        "political"
                    ]
                },
                {
                    "long_name": "11375",
                    "short_name": "11375",
                    "types": [
                        "postal_code"
                    ]
                }
            ],
            "formatted_address": "110-40 72nd Ave, Forest Hills, NY 11375, USA",
            "geometry": {
                "location": {
                    "lat": 40.721096,
                    "lng": -73.83973189999999
                },
                "location_type": "ROOFTOP",
                "viewport": {
                    "northeast": {
                        "lat": 40.72244498029149,
                        "lng": -73.83838291970848
                    },
                    "southwest": {
                        "lat": 40.71974701970849,
                        "lng": -73.84108088029149
                    }
                }
            },
            "place_id": "ChIJS7w5uJ1gwokRQb1XacDkIDM",
            "plus_code": {
                "compound_code": "P5C6+C4 New York, NY, USA",
                "global_code": "87G8P5C6+C4"
            },
            "types": [
                "street_address"
            ]
        }
    ],
    "status": "OK"
};


export const independentCity = {
    "results": [
        {
            "address_components": [
                {
                    "long_name": "2350",
                    "short_name": "2350",
                    "types": [
                        "street_number"
                    ]
                },
                {
                    "long_name": "South Kenmore Road",
                    "short_name": "S Kenmore Rd",
                    "types": [
                        "route"
                    ]
                },
                {
                    "long_name": "Chippenham Village",
                    "short_name": "Chippenham Village",
                    "types": [
                        "neighborhood",
                        "political"
                    ]
                },
                {
                    "long_name": "Richmond",
                    "short_name": "Richmond",
                    "types": [
                        "locality",
                        "political"
                    ]
                },
                {
                    "long_name": "Virginia",
                    "short_name": "VA",
                    "types": [
                        "administrative_area_level_1",
                        "political"
                    ]
                },
                {
                    "long_name": "United States",
                    "short_name": "US",
                    "types": [
                        "country",
                        "political"
                    ]
                },
                {
                    "long_name": "23225",
                    "short_name": "23225",
                    "types": [
                        "postal_code"
                    ]
                },
                {
                    "long_name": "1939",
                    "short_name": "1939",
                    "types": [
                        "postal_code_suffix"
                    ]
                }
            ],
            "formatted_address": "2350 S Kenmore Rd, Richmond, VA 23225, USA",
            "geometry": {
                "location": {
                    "lat": 37.5329133,
                    "lng": -77.5368024
                },
                "location_type": "ROOFTOP",
                "viewport": {
                    "northeast": {
                        "lat": 37.5342622802915,
                        "lng": -77.5354534197085
                    },
                    "southwest": {
                        "lat": 37.5315643197085,
                        "lng": -77.53815138029151
                    }
                }
            },
            "place_id": "ChIJ88LjLR8TsYkRdGBnOaIAhdY",
            "plus_code": {
                "compound_code": "GFM7+57 Richmond, VA, USA",
                "global_code": "8794GFM7+57"
            },
            "types": [
                "street_address"
            ]
        }
    ],
    "status": "OK"
}


export const township = {
    "results": [
        {
            "address_components": [
                {
                    "long_name": "109",
                    "short_name": "109",
                    "types": [
                        "street_number"
                    ]
                },
                {
                    "long_name": "Tennis Court",
                    "short_name": "Tennis Ct",
                    "types": [
                        "route"
                    ]
                },
                {
                    "long_name": "Wall Township",
                    "short_name": "Wall Township",
                    "types": [
                        "administrative_area_level_3",
                        "political"
                    ]
                },
                {
                    "long_name": "Monmouth County",
                    "short_name": "Monmouth County",
                    "types": [
                        "administrative_area_level_2",
                        "political"
                    ]
                },
                {
                    "long_name": "New Jersey",
                    "short_name": "NJ",
                    "types": [
                        "administrative_area_level_1",
                        "political"
                    ]
                },
                {
                    "long_name": "United States",
                    "short_name": "US",
                    "types": [
                        "country",
                        "political"
                    ]
                },
                {
                    "long_name": "07719",
                    "short_name": "07719",
                    "types": [
                        "postal_code"
                    ]
                },
                {
                    "long_name": "9429",
                    "short_name": "9429",
                    "types": [
                        "postal_code_suffix"
                    ]
                }
            ],
            "formatted_address": "109 Tennis Ct, Wall Township, NJ 07719, USA",
            "geometry": {
                "location": {
                    "lat": 40.1669944,
                    "lng": -74.07811029999999
                },
                "location_type": "ROOFTOP",
                "viewport": {
                    "northeast": {
                        "lat": 40.1683433802915,
                        "lng": -74.0767613197085
                    },
                    "southwest": {
                        "lat": 40.1656454197085,
                        "lng": -74.0794592802915
                    }
                }
            },
            "place_id": "ChIJy1QnuniHwYkR8sSDZexYxSU",
            "plus_code": {
                "compound_code": "5W8C+QQ Algers Mills, Wall Township, NJ, USA",
                "global_code": "87G75W8C+QQ"
            },
            "types": [
                "street_address"
            ]
        }
    ],
    "status": "OK"
}