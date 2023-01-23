# CPX-NEWSDESK

## PURPOSE

The `newsdesk` is meant to forward communication between various events and an event-driven data layer for analytics. 

## Installation

* `npm install @chapeaux/cpx-newsdesk` or consume from a CDN via `@chapeaux/cpx-newsdesk`
* include the `newsdesk.js` file on a page prior to any event tracking that should occur

## Usage
* `<script type="module" src="path/to/@chapeaux/cpx-newsdesk/newsdesk.js"></script>`
* `import { Newsdesk } from "path/to/@chapeaux/cpx-newsdesk/newsdesk.js";`
* `<script type="module" src="/cpx-newsdesk/newsdesk.js" data-event="cpx-report"></script>`

## Testing

* `deno test` runner and assertions: https://deno.land/manual/testing/assertions


## Contributing
1. Provide feedback on usage
2. Submit an issue or PR
3. Feature requests flow through [CPCORE Jira Project](https://issues.redhat.com/projects/CPCORE/)
    * Use "chapeaux" component
    * Priority will be reviewed against all other requests
    * No timeframe promised upon submission

## To-Do
* Nothing at this time

## EDDL Events

- Page Load Start
- Page Load Complete
- Click Events (using `data-analytics-*` attributes)
    - Navigation Links
    - Download Links
    - Footer Links
    - Social Links
    - Tab Links
    - Internal Campaign Links
- Form Viewed
- Form Submission Succeeded
- Form Submission Failed
- User Signed In
- User Detected
- Content Listing Displayed
- Content Listing Item Clicked
- Internal Campaign Clicked
- Internal Campaigns Displayed
- CTA Link Clicked
- Download Complete
- Video Started
- Video Milestone Reached
- Video Completed

# CPX-REPORTER

## Goals

Allow developers and content creators a consolidated mechanism to interact with the Event-Driven Data Layer (EDDL). The `ReporterEvent` is used to attach meaningful data to the event and forward it on to the Newsdesk listening for event reports. The `CPXReporter` component is used as a declarative means to listen for specific events or to fire off specific EDDL events automatically.

## Installation

* `npm install @chapeaux/cpx-reporter`
* {FUTURE CDN URL}

## Usage

### ReporterEvent
* `<script type="module" src="path/to/@chapeaux/cpx-reporter/reporter.js"></script>`
* `import { ReporterEvent } from "path/to/@chapeaux/cpx-reporter/reporter.js";`
* `<script type="module" data-emit="cpx-report" data-event="Page Load Started" src="path/to/@chapeaux/cpx-reporter/reporter.js"></script>`

### cpx-reporter
* `<script type="module" src="path/to/@chapeaux/cpx-reporter/cpx-reporter.js></script>`
* `import {CPXReporter} from "path/to/@chapeaux/cpx-reporter/cpx-reporter.js;`
* `<cpx-reporter debug auto event="Page Load Completed"></cpx-reporter>`
*  `<cpx-reporter event="User Signed In" beat="kc-token-ready">...</cpx-reporter>`

## Contributing
1. Provide feedback on usage
2. Submit an issue or PR
3. Feature requests flow through [CPCORE Jira Project](https://issues.redhat.com/projects/CPCORE/)
    * Use "chapeaux" component
    * Priority will be reviewed against all other requests
    * No timeframe promised upon submission

## To-Do
* Sync all data structures with formal EDDL declarations


## Events

- Page Load Start
- Page Load Complete
- Click Events (using `data-analytics-*` attributes)
    - Navigation Links
    - Download Links
    - Footer Links
    - Social Links
    - Tab Links
    - Internal Campaign Links
- Form Viewed
- Form Submission Succeeded
- Form Submission Failed
- User Signed In
- User Detected
- Content Listing Displayed
- Content Listing Item Clicked
- Internal Campaign Clicked
- Internal Campaigns Displayed
- CTA Link Clicked
- Download Complete
- Video Started
- Video Milestone Reached
- Video Completed
