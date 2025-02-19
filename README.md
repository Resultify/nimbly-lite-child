# Nimbly Lite Child
A child theme for the **Nimbly Lite** theme that can be used as a base for any new Nimbly dependent project.
***

## General requirements
1. Create a HubSpot development sandbox for testing and development purposes. [Link](https://app.hubspot.com/signup-hubspot/cms-developers)
2. Create a personal CMS access key to enable authenticated access to your account. [Link](https://app.hubspot.com/l/personal-access-key)
3. Install rh CLI `npm -g install @resultify/rh-cli`

## Create a new project based on the Nimbly Lite Child
`rh init`

## Commands for working with a new project based on Nimbly Lite Child
- `rh` - list of possible commands to run based on current working directory
- `rh upload` - uploads all files to the HubSpot portal
- `rh fetch` - fetches all files from the HubSpot portal
- `rh watch` - watches the project for changes and uploads them to the HubSpot portal
- `rh build` - builds the project
- `rh uploadDb` - uploads HubDb database to the HubSpot portal
- `rh fetchDb` - fetches HubDb database from the HubSpot portal
- `rh browsers` - list of supported browsers for the project

***

## Authentication

### One-project access key
*Access key for use with one project only*
1. Add `.env` file to root folder of your project
2. Add a name of your project Hubspot portal prefixed by `hub_` with associated personal access key to it
```bash
hub_projectname=personal-access-key-for-this-portalname
```
### Common multi-project access keys
*Access keys that can be used with different projects*
- Add access keys to `~/.rh/.env.root` file
```bash
hub_sandbox=personal-access-key-for-this-sandbox-portal
hub_sandbox2=personal-access-key-for-this-sandbox2-portal
hub_resultifydemo=personal-access-key-for-this-hub_resultifydemo-portal
GITHUB_TOKEN=GitHub Classic Personal access token with full repo scope is required
```
***

## Events

There are two ways to set up events in HubSpot. You can either upload the predefined HubDb tables with random events data or generate random data for them with updated dates information.
**First option is easier, but the placeholder events will be out of date.**

### Upload events HubDb data tables random data.
__*\*Events will be out of date, if necessary update them manually in the HubDb tables.*__

1. Upload `event_information` table (pick `event_information.json` file in CLI select box)
```bash
hs uploadDb
```
2. Copy tabele ID from just uploaded 'event_information' table and paste it to `event_date.json` file in `foreignTableId` field.
3. Upload `event_date` table (pick `event_date.json` file in CLI select box)
```bash
hs uploadDb
```

### Upload events HubDb tables without sample event date and event

1. Create HubDB table Event information.

```bash
hs hubdb create ./.hubdb/event_information.hubdb.json
```

2. Check result, should be something like : `[SUCCESS] The table <TABLE_ID> was created in <HUB_ID> with 0 rows`.
Edit file `.hubdb/event_date.hubdb.json` and temporary change "foreignTableId" value in "event_information" field to <TABLE_ID>.

3. Create HubDB table Event date.

```bash
hs hubdb create ./.hubdb/event_date.hubdb.json
```

4. Edit file `.hubdb/event_date.hubdb.json` and restore "foreignTableId" value in "event_information" field.


### Upload events HubDb tables and generate random data for them with updated date information.


1. Generate hubdb json files that includes example data.

```bash
node .hubdb/generateEventData.cjs
```

Will create two new files in `.hubdb` folder, `event_information_with_sample_data.hubdb.json` and `event_date_with_sample_data.hubdb.json`.

2. Create HubDB table Event information with sample data.

```bash
hs hubdb create .hubdb/event_information_with_sample_data.hubdb.json
```

Check result, should be something like : `[SUCCESS] The table <TABLE_ID> was created in <HUB_ID> with 10 rows`.
Edit file `.hubdb/event_date_with_sample_data.hubdb.json` and temporary change "foreignTableId" value in "event_information" field to <TABLE_ID>.

3. Create HubDB table Event date with sample data.

```bash
hs hubdb create .hubdb/event_date_with_sample_data.hubdb.json
```

4. Edit file `.hubdb/event_date_with_sample_data.hubdb.json` and restore "foreignTableId" value in "event_information" field.


If a page displaying events already exists in HubSpot, remember to set "Dynamic pages" -> "Data source" to "Event information" in page advanced settings.

You also need to select "Event information" on each "Event date" since it isn't set in example data.

The sample events are in sv and en, so page language needs to be selected.


### Display events on page

1. **Create a Page**:
   - Select "Events template" as the page template.
   - Edit the page settings.

2. **Enable Featured Image**:
   - Ensure the featured image is enabled for the page.

3. **Set Template**:
   - The template used on this page should be "event-view.html".

4. **Set Page Language**:
   - If multiple languages are used, set the page language.
   - The page language should match the "Language" column in the Event date to be displayed on the page.
   - In Events list view, all tags from tags in list are collected and used in the Tag filter.
   - Create one tag per language in Tags column, and select tags in correct language per Event date language.

5. **Configure Dynamic Pages**:
   - Set the "Data source" to "Event information".

