function CombineEventData(payload, target, data) {
    let combination = Object.assign(payload(target), data ?? {});
    return combination;
}
const eventMap = new Map([
    ['Page Load Started', {
            payload: 'page',
            data: {
                page: (tgt, data) => {
                    const subsections = (new URL(location.href)).pathname.split('/').slice(2);
                    const pageNameData = [data['siteName'], data['pageCategory']].concat(subsections);
                    return Object.assign({
                        "analyticsTitle": "",
                        "blogAuthor": "",
                        "contentID": "",
                        "contentType": "",
                        "dataObject": "",
                        "destinationURL": "",
                        "errorType": "",
                        "gated": "",
                        "pageCategory": "",
                        pageName: data ? pageNameData.filter(v => (typeof v !== 'undefined' && v !== null && v !== '')).join('|') : '',
                        "siteName": "",
                        "pageTitle": "",
                        "pageType": "",
                        "pageSubType": "",
                        "pageStatus": "published",
                        previousPage: ((r) => {
                            if (r) {
                                let a = document.createElement("a");
                                a.href = r;
                                return a.href;
                            }
                        })(document.referrer),
                        queryParameters: ((url) => Object.fromEntries(url.searchParams))(new URL(window.location.href)),
                        siteExperience: ((w) => (w > 992) ? 'desktop' : ((w > 768) ? 'tablet' : 'mobile'))(window.innerWidth),
                        "siteLanguage": "",
                        "subsection": subsections[0] || "",
                        "subsection2": subsections[1] || "",
                        "subsection3": subsections[2] || ""
                    }, data);
                }
            }
        }],
    ['Page Load Completed', {}],
    ['User Signed In', {
            payload: 'user',
            data: {
                user: (tgt, data) => {
                    return Object.assign({
                        "custKey": ""
                    }, data);
                }
            }
        }],
    ['User Detected', { payload: 'user', data: {
                user: (tgt, data) => {
                    return Object.assign({
                        "custKey": "",
                        "ebsAccountNumber": "",
                        "accountIDType": "",
                        "userID": "",
                        "lastLoginDate": "",
                        "loggedIn": "false",
                        "socialAccountsLinked": "",
                        "subscriptionFrequency": "",
                        "subscriptionLevel": "",
                        "hashedEmail": ""
                    }, data);
                }
            }
        }],
    ['Onsite Search Performed', {
            payload: 'onsiteSearch',
            data: {
                onsiteSearch: (tgt, data) => {
                    const kw = { searchType: '', searchTerm: '', searchMethod: '' };
                    if (data['keyword']) {
                        data['keyword'] = Object.assign(kw, data['keyword'] ?? {});
                    }
                    else {
                        data = Object.assign({
                            "keyword": kw
                        }, data);
                    }
                    return data;
                }
            }
        }],
    ['Onsite Search Failed', {
            payload: 'onsiteSearch',
            data: {
                onsiteSearch: (tgt, data) => {
                    return Object.assign({
                        "keyword": {
                            "searchType": "",
                            "searchTerm": ""
                        }
                    }, data);
                }
            }
        }],
    ['Content Listing Displayed', {
            payload: 'listingDisplayed',
            data: {
                listingDisplayed: (tgt, data) => {
                    return Object.assign({
                        "displayCount": "",
                        "listingDriver": "",
                        "filterList": "",
                        "resultsCount": ""
                    }, data);
                }
            }
        }],
    ['Content Listing Item Clicked', {
            payload: 'listingClicked',
            data: {
                listingClicked: (tgt, data) => {
                    return Object.assign({
                        "displayPosition": "",
                        "linkType": "",
                        "contentTitle": ""
                    }, data);
                }
            }
        }],
    ['Form Viewed', { payload: 'form', data: { form: (tgt, data) => { return {}; } } }],
    ['Form Submission Succeeded', { payload: 'form', data: { form: (tgt, data) => { return {}; } } }],
    ['Form Submission Failed', { payload: 'form', data: { form: (tgt, data) => { return {}; } } }],
    ['Error Message Presented', {
            payload: 'error',
            data: {
                error: (tgt, data) => {
                    return Object.assign({
                        errorCode: '',
                        errorType: ''
                    }, data);
                }
            }
        }],
    ['Download Started', {
            payload: 'linkInfo',
            data: {
                linkInfo: (tgt, data) => {
                    return Object.assign({
                        "fileName": "",
                        "fileType": "",
                        "product": []
                    }, data);
                }
            }
        }],
    ['default', {
            payload: 'default',
            data: {
                default: (tgt, data) => {
                    return Object.assign({}, data);
                }
            }
        }]
]);
export class ReporterEvent extends Event {
    constructor(name, data, emitName = 'cpx-report') {
        super(emitName, { bubbles: true, composed: true });
        this.toJSON = () => Object.assign({ event: this.name }, this.data);
        this.name = name;
        this.obj = eventMap.has(name) ? eventMap.get(name) : eventMap.get('default');
        if (this.obj && this.obj.payload && this.obj.data) {
            const objEntries = new Map([[
                    this.obj.payload,
                    this.obj.data[this.obj.payload](this.currentTarget, data ?? {})
                ]]);
            this.data = Object.fromEntries(objEntries);
        }
    }
}
if (import.meta.url) {
    const reporter = document.querySelector(`script[src*='${(new URL(import.meta.url)).pathname}']:not([reported])`);
    if (reporter instanceof HTMLElement) {
        if (reporter.getAttribute('reported') == null) {
            const txt = reporter.textContent;
            if (txt !== null && txt.length > 0) {
                const data = JSON.parse(reporter.textContent ?? '');
                const emitName = reporter.getAttribute('data-emit') ?? 'cpx-report';
                globalThis.dispatchEvent(new ReporterEvent(reporter.dataset.event, data, emitName));
                reporter.setAttribute('reported', '');
            }
        }
    }
}
globalThis['ReporterEvent'] = ReporterEvent;
