'use strict';

const earnedTrophiesObject = {
    type: 'object',
    properties: {
        platinum: {
            type: 'number'
        },
        gold: {
            type: 'number'
        },
        silver: {
            type: 'number'
        },
        bronze: {
            type: 'number'
        },
    },
    additionalProperties: false
};

//game object for profile use
const gameObject = {
    type: 'object',
    require: [],
    properties: {
        npCommunicationId: { type: 'string' },
        progress: { type: 'number' },
        earnedTrophies: earnedTrophiesObject,
        lastUpdateDate: { type: 'string' }
    },
    additionalProperties: false
};


//objects for psn store serach use
const mediaListObject = {
    type: 'object',
    properties: {
        preview: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    url: { type: 'string' }
                }
            }
        },
        screenshots: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    url: { type: 'string' }
                }
            }
        },
        promo: {
            type: 'object',
            properties: {
                images: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            url: { type: 'string' }
                        }
                    }
                },
                videos: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            url: { type: 'string' }
                        }
                    }
                }
            }
        }
    }
};

const priceObject = {
    type: 'object',
    nullable: true,
    properties: {
        noPlus: {
            type: 'object',
            properties: {
                originalPrice: { type: 'number' },
                price: { type: 'number' },
                discount: { type: 'number' },
                startDate: { type: 'string' },
                endDate: { type: 'string' },
            }
        },
        plus: {
            type: 'object',
            properties: {
                originalPrice: { type: 'number' },
                price: { type: 'number' },
                discount: { type: 'number' },
                startDate: { type: 'string' },
                endDate: { type: 'string' },
            },
        }
    }

};

const storeGameObject = {
    type: 'object',
    require: [],
    properties: {
        id: { type: 'string' },
        type: { type: 'string' },
        'badge-info': {
            nullable: true,
            type: 'object',
            properties: {
                'non-plus-user': {
                    nullable: true,
                    type: 'object',
                    properties: {
                        "discount-percentage": { type: 'number' },
                        "is-plus": { type: 'boolean' },
                        "type": { type: 'string' }
                    }
                },
                'plus-user': {
                    nullable: true,
                    type: 'object',
                    properties: {
                        "discount-percentage": { type: 'number' },
                        "is-plus": { type: 'boolean' },
                        "type": { type: 'string' }
                    }
                }
            }
        },
        fileSize: {
            nullable: true,
            type: 'object',
            properties: {
                unit: { nullable: true, type: 'string' },
                value: { nullable: true, type: 'number' },
            }
        },
        gameContentType: { type: 'string' },
        genres: { type: 'array', items: { type: 'string' } },
        name: { type: 'string' },
        'game-content-type': { type: 'string' },
        description: { type: 'string' },
        platforms: { type: 'array', items: { type: 'string' } },
        provider: { type: 'string' },
        releaseDate: { nullable: true, type: 'string' },
        starRating: {
            nullable: true,
            type: 'object',
            properties: {
                score: { nullable: true, type: 'number' },
                total: { nullable: true, type: 'number' }
            }
        },
        subTitles: { type: 'array', items: { type: 'string' } },
        thumbNail: { type: 'string' },
        history: priceObject,
        mediaList: mediaListObject,
        prices: priceObject,
    },
    additionalProperties: false
};

const profileObject = {
    type: 'object',
    require: [],
    properties: {
        trophyList: {
            type: 'array',
            items: gameObject
        },
        onlineId: {
            type: 'string'
        },
        npId: {
            type: 'string'
        },
        region: {
            type: 'string'
        },
        avatarUrl: {
            type: 'string'
        },
        aboutMe: {
            type: 'string'
        },
        languagesUsed: {
            type: 'array',
            items: {
                type: 'string'
            }
        },
        lastUpdateTime: {
            type: 'string'
        },
        plus: {
            type: 'number'
        },
        trophySummary: {
            type: 'object',
            properties: {
                level: {
                    type: 'number'
                },
                progress: {
                    type: 'number'
                },
                earnedTrophies: earnedTrophiesObject
            }
        }
    },
    additionalProperties: false
};

const adminLogin = {
    body: {
        type: 'object',
        require: ['uuid', 'tfa', 'password'],
        properties: {
            uuid: {
                type: 'string'
            },
            tfa: {
                type: 'string'
            },
            password: {
                type: 'string'
            }
        },
        additionalProperties: false
    },
    response: 200
};

const getProfile = {
    body: {
        type: 'object',
        properties: {
            onlineId: {
                type: 'string',
            },
            npId: {
                type: 'string',
            }
        }
    },
    response: {
        200: profileObject
    }
};

const getGame = {
    params: {
        type: 'object',
        required: ['gameName', 'language', 'region', 'ageLimit'],
        properties: {
            gameName: {
                type: 'string',
                // pattern: '^[0-9a-fA-F]{24}'
            },
            language: {
                type: 'string',
            },
            region: {
                type: 'string',
            },
            ageLimit: {
                type: 'string',
            }
        }
    },
    response: {
        200: {
            type: 'array',
            items: storeGameObject
        }
    }
};

const getMessage = {
    params: {
        type: 'object',
        required: ['onlineId'],
        properties: {
            onlineId: {
                type: 'string'
            }
        }
    },
    response: {
        200: {
            type: 'object',
            nullable: true,
            properties: {
                threadMembers: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            accountId: {
                                type: 'string'
                            },
                            onlineId: {
                                type: 'string'
                            }
                        }
                    }
                },
                threadNameDetail: {
                    type: 'object',
                    properties: {
                        status: { type: 'number' },
                        threadName: { type: 'string' },
                    }
                },
                threadThumbnailDetail: {
                    type: 'object',
                    properties: {
                        status: { type: 'number' },
                    }
                },
                threadProperty: {
                    type: 'object',
                    properties: {
                        favoriteDetail: {
                            type: 'object',
                            properties: {
                                favoriteFlag: { type: 'boolean' }
                            }
                        },
                        favoriteDetail: {
                            type: 'object',
                            properties: {
                                pushNotificationFlag: { type: 'boolean' }
                            }
                        },
                        favoriteDetail: {
                            type: 'object',
                            properties: {
                                kickoutFlag: { type: 'boolean' }
                            }
                        },
                        favoriteDetail: {
                            type: 'object',
                            properties: {
                                threadJoinDate: { type: 'string' }
                            }
                        }
                    }
                },
                newArrivalEventDetail: {
                    type: 'object',
                    properties: {
                        newArrivalEventFlag: { type: 'string' }
                    }
                },
                threadEvents: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            messageEventDetail: {
                                type: 'object',
                                properties: {
                                    eventIndex: { type: 'string' },
                                    postDate: { type: 'string' },
                                    eventCategoryCode: { type: 'number' },
                                    altEventCategoryCode: { type: 'number' },
                                    sender: {
                                        type: 'object',
                                        properties: {
                                            accountId: { type: 'number' },
                                            onlineId: { type: 'string' },
                                        }
                                    },
                                    messageDetail: {
                                        type: 'object',
                                        properties: {
                                            body: { type: 'string' },
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                threadId: { type: 'string' },
                threadType: { type: 'number' },
                threadModifiedDate: { type: 'string' },
                resultsCount: { type: 'number' },
                maxEventIndexCursor: { type: 'string' },
                sinceEventIndexCursor: { type: 'string' },
                latestEventIndex: { type: 'string' },
                endOfThreadEvent: { type: 'boolean' },
            }
        }
    }
};

module.exports = {
    adminLogin,
    getProfile,
    getGame,
    getMessage
};