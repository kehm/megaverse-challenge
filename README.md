# Megaverse Coding Challenge

## Getting Started

This Node.js (Express) application executes the necessary steps to complete Phase 1 and 2 of the Megaverse Coding Challenge.

In phase 1, we use pre-defined starting rows for each line and then traverse the array line by line in opposite directions (upwards vs. downwards) to create two intersecting lines. The values can be overridden with environment variables.  
In phase 2, we fetch the goal map from the API, then loop through the map matching each entry to an astral object.  
The implementation supports running the API calls in parallell, however, as the API is rate limited this is currently not an option.

Before running the application you must set the necessary environment variables.  
Rename `.env.example` to `.env` and set the correct `CANDIDATE_ID` and `API_URL`.

The application can be started as a REST API, or you can execute the necessary functions directly. See more information in the Production section below.

## Development
To start the application (REST API) in development mode, run the following commands:
1. `npm install`
2. `npm run dev`

## Production
The application can run natively or in a Docker container.

To start the REST API natively, run the following commands:
1. `npm ci`
2. `npm run build`
3. `npm run start`

To run the REST API as a Docker container, first set the necessary environment variables in `docker-compose.yaml`, then run the following commands:
1. `docker compose up -d`

If you wish to execute each phase directly without starting the REST API, first install and build the application and then execute either of the following scripts:
- `npm run start:phase1` - Creates a Polyanet cross for Phase 1.
- `npm run start:phase1reset` - Removes the Polyanet cross.
- `npm run start:phase2` - Creates the astral objects logo for Phase 2.
- `npm run start:phase2reset` - Removes the astral objects logo.

## Testing
To run the unit tests, run the following commands:
1. `npm install`
2. `npm run test`

## License

The source code is available under the Apache License, Version 2.0 (Apache-2.0).
