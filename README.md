# stealth-tek-qa-take-home
SDET Technical Assessment – API TestAutomation Exercise

## Overview
### Brief description of the solution.

Some API tests, designed manually and extended by example with claude code

### Assumptions made.
- schema is considered to be unknown ( there is github PR to add openAPI schema) -- with this we should be able to get specs for data formats and would be able to use data validations libraries like zog, though it would take more time. but would also allow to generate type so it would allow type-safe way of handling response data
- we have to trust CRUD operations to work as we have no vay to validate them via independent route

## Scope of testing completed.
happy path mostly -- in depth tests would require to sacrifice other endpoints and in short time I'd prefer most important functionality: get/post/patch/delete to work

## Coverage Summary
### Routes/resources tested.
- happy CRUD paths for most of the endpoints
- specific GET filters and child items -- also happy path only
- potential duplicate post ( marked as test.fail due to noop nature of public env)

### Types of validations implemented.
- status validation
- for data manipulation calls used known data from get list response with post/patch data manipulated

### Areas intentionally omitted due to time constraints.
- most of the negative tests
- boundary conditions for data values for patch/post
- additional data validation ( only one data point for )
- data type validation
- complex filters ( more that one condition)
- verification that filtered response does not return what not should be returned
- filtered by invalid data -- where there is no result in response
- invalid data for dependent posts
- correct fake data generation for (e.g. get/make valid user for POST /posts)
- potential operations with illegal data manipulations such as change userId in PATCH /posts
- other actions except GET/POST/PATCH/DELETE
- tests organization by purpose/route: tags and folder structure: current amount of api tests is quick enough to be executed as is

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (bundled with Node.js)

## Setup

Install dependencies and Playwright browsers:

```bash
npm install
npx playwright install
```

## Running Tests

Run all tests:

```bash
npx playwright test
```

View the HTML report after a run:

```bash
npx playwright show-report
```
