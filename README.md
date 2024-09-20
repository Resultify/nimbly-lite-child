# Nimbly Lite Child
***

[Compatible browsers](https://browsersl.ist/?results#q=last+2+Chrome+major+versions+and+%3E+0.5%25%0Alast+2+Edge+major+versions+and+%3E+0.5%25%0Alast+2+Firefox+major+versions+and+%3E+0.5%25%0Alast+2+iOS+major+versions+and+%3E+0.5%25%0Alast+2+Safari+major+versions+and+%3E+0.5%25%0A%3E1.3%25&region=alt-eu)

## Requirements

1. Create a HubSpot development sandbox for testing and development purposes. [Link](https://app.hubspot.com/signup-hubspot/cms-developers)

2. Create a personal CMS access key to enable authenticated access to your account. [Link](https://app.hubspot.com/l/personal-access-key)

## Quick start

1. `npm install` - install all development dependencies
2. Add to `.env` file your portal name and `PERSONAL_ACCESS_KEY` [Read more](https://github.com/Resultify/hubspot-cms-lib?tab=readme-ov-file#custom-multi-account-authentication)
3. `npm run upload` - upload all local changes to remote HubSpot portal [check more commands](https://github.com/Resultify/hubspot-cms-lib?tab=readme-ov-file#whats-inside)


## Events

### Set up HubDB:s in HubDb.

Create HubDB table Event information.

```
hs hubdb create ./.hubdb/event_information.hubdb.json
```

Check result, should be something like : `[SUCCESS] The table <TABLE_ID> was created in <HUB_ID> with 0 rows`.
Edit file `.hubdb/event_date.hubdb.json` and temporary change "foreignTableId" value in "event_information" field to <TABLE_ID>.

Create HubDB table Event date.

```
hs hubdb create ./.hubdb/event_date.hubdb.json
```

Edit file `.hubdb/event_date.hubdb.json` and restore "foreignTableId" value in "event_information" field.


### Set up HubDB:s in HubDb with example data.

Generate hubdb json files that includes example data.

```
node .hubdb/generateEventData.cjs
```

Will create two new files in `.hubdb` folder, `event_information_with_sample_data.hubdb.json` and `event_date_with_sample_data.hubdb.json`.

Create HubDB table Event information with sample data.

```
hs hubdb create .hubdb/event_information_with_sample_data.hubdb.json
```

Check result, should be something like : `[SUCCESS] The table <TABLE_ID> was created in <HUB_ID> with 10 rows`.
Edit file `.hubdb/event_date_with_sample_data.hubdb.json` and temporary change "foreignTableId" value in "event_information" field to <TABLE_ID>.

Create HubDB table Event date with sample data.

```
hs hubdb create .hubdb/event_date_with_sample_data.hubdb.json
```

Edit file `.hubdb/event_date_with_sample_data.hubdb.json` and restore "foreignTableId" value in "event_information" field.

If a page displaying events already exists in HubSpot, remember to set "Dynamic pages" -> "Data source" to "Event information" in page advanced settings.

You also need to select "Event information" on each "Event date" since it isn't set in example data.

The sample events are in sv and en, so page language needs to be selected.
