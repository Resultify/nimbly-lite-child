const { count } = require('console');
const { readFileSync } = require('fs');
const { writeFileSync } = require('fs');
const https = require('https');

const eventDateFileName = './.hubdb/event_date.hubdb.json';
const eventInformationFileName = './.hubdb/event_information.hubdb.json';

/**
 * Starts the process of generating sample event data.
 *
 * This function performs the following steps:
 * 1. Reads event date and event information files.
 * 2. Parses the JSON content of the files.
 * 3. Extracts column definitions and column names.
 * 4. Generates lists of languages, tags, and recurrence options.
 * 5. Fetches Lorem Ipsum data for event names, content, and descriptions.
 * 6. Creates sample event data for both event dates and event information.
 * 7. Writes the generated data to disk.
 *
 * @async
 * @function start
 * @returns {Promise<void>} A promise that resolves when the process is complete.
 */
async function start() {
  console.log('Generate Sample Event Data');

  console.log(`Read ${eventDateFileName} file.`);

  // Read the event date and event information files.
  const hubDbEventsStructure = readFileSync(eventDateFileName, 'utf8');
  const hubDbEventDateJson = JSON.parse(hubDbEventsStructure);
  const hubDbEventInformationStructure = readFileSync(eventInformationFileName, 'utf8');
  const hubDbEventInformationJson = JSON.parse(hubDbEventInformationStructure);

  // Create new objects to store column definitions.
  const eventDateColumns = hubDbEventDateJson['columns'];
  const eventInformationColumns = hubDbEventInformationJson['columns'];
  // console.log('Event Date Columns: ', eventDateColumns);
  // console.log('Event Information Columns: ', eventInformationColumns);

  const eventToCreate = 5;

  // Create list of column names for event date and event information.
  const eventDateColumnNames = eventDateColumns.map(option => option['name']);
  const eventInformationColumnNames = eventInformationColumns.map(option => option['name']);
  // console.log('Event Date Column Names: ', eventDateColumnNames);
  // console.log('Event Information Column Names: ', eventInformationColumnNames);

  // Create list of column values for event date and event information.
  const eventDateValueTemplate = {
    'name': '',
    'publish_date': '',
    'start_date': '',
    'end_date': '',
    'language': '',
    'tags': '',
    'event_information': '',
    'recurrence_frequency': '',
    'recurrence_days': '',
    'recurrence_interval': '',
    'recurrence_end_date': ''
  }

  const eventInformationValueTemplate = {
    'name': '',
    'description': '',
    'content': '',
    'open_graph_description': '',
    'open_graph_image': '',
    'featured_image': '',
    'card_image': ''
  }

  const optionValueTemplate = {
    "id": "1",
    "name": "sv",
    "label": "sv",
    "type": "option",
    "order": 0
  }

  // Generate language list from event date language column.
  let languageOptions = [];
  let languages = [];
  for (column of eventDateColumns) {
    if (column['name'] === 'language') {
      languages = column['options'].map(option => option['name']);
      languageOptions = column['options'];
    }
  }
  // console.log('Languages: ', languages);

  // Generate tags list from event date tags column per language.
  let tags = [];
  let recurrenceFrequencyOptions = [];
  let recurrenceDaysOptions = [];
  for (column of eventDateColumns) {
    if (column['name'] === 'tags') {
      for (language of languages) {
        tags[language] = column['options'].filter(option => option['name'].substring(0,2) === language);
      }
    }
    if (column['name'] === 'recurrence_frequency') {
      recurrenceFrequencyOptions = column['options'];
    }
    if (column['name'] === 'recurrence_days') {
      recurrenceDaysOptions = column['options'];
    }
  }
  // console.log('Tags: ', tags);
  // console.log('Recurrence Frequency Options: ', recurrenceFrequencyOptions);
  // console.log('Recurrence Days Options: ', recurrenceDaysOptions);

  /**
   * Generates a Date object based on the provided input date, with specified hours and optional additional days.
   *
   * @param {Date} inputDate - The input date from which to generate the new Date object.
   * @param {number} hours - The hour value to set in the new Date object.
   * @param {number} [addDays=0] - Optional number of days to add to the input date. Defaults to 0.
   * @returns {Date} A new Date object with the specified hours and additional days.
   */
  function getDateObjectWithTimeBasedOnInputDate(inputDate, hours, addDays = 0) {
    return new Date(
      inputDate.getUTCFullYear(),
      inputDate.getUTCMonth(),
      inputDate.getUTCDate() + addDays,
      hours,
      0,
      0,
      0
    );

  }

  /**
   * Generates an option value object.
   *
   * @param {number|string} id - The unique identifier for the option.
   * @param {string} name - The name of the option.
   * @param {string} label - The label of the option.
   * @param {number} order - The order of the option.
   * @returns {Object} The option value object.
   */
  function getOptionValue(id, name, label, order) {
    return {
      "id": id,
      "name": name,
      "label": label,
      "type": "option",
      "order": order
    }
  }

  /**
   * Generates a list of event tags with a random order.
   *
   * @param {Array} tags - An array of tag objects to select from.
   * @returns {Promise<Array>} A promise that resolves to an array of randomly ordered event tags.
   */
  const generateTags = async (tags) => {
    let eventTags = [];
    let addedIndexes = [];
    let numberOfTags = tags.length > 0 ? Math.floor(Math.random() * 3) + 1 : 0;


    if (numberOfTags > 0) {
      for (let index = 0; index < numberOfTags; index++) {
        addTagIndex = (Math.floor(Math.random() * tags.length));
        if (addedIndexes.indexOf(addTagIndex) < 0) {
          addedIndexes.push(addTagIndex);
          let newTag = [];
          newTag = tags[addTagIndex];
          newTag['order'] = addedIndexes.length;
          eventTags.push(newTag);
          // console.log('newTag', newTag);
        }
      }
    }

    return eventTags;
  }

  /**
   * Generates the recurrence frequency options based on the provided frequency name.
   *
   * @param {string} frequencyName - The name of the frequency to filter options by.
   * @returns {Object} The recurrence frequency option that matches the provided frequency name, or an empty object if no match is found.
   */
  function generateRecurrenceFrequencyOptions(frequencyName) {
    return recurrenceFrequencyOptions.filter(option => option['name'] === frequencyName)[0] ?? {};
  }
  // console.log('generateRecurrenceFrequency', generateRecurrenceFrequencyOptions('weekly'));

  /**
   * Generates an array of recurrence day options based on the provided frequency days.
   *
   * @param {Array<string>} frequencyDays - An array of day names to filter the recurrence options.
   * @returns {Array<Object>} An array of filtered recurrence day options.
   */
  function generateRecurrenceDaysOptions(frequencyDays) {
    let recurrenceDaysOptionValue = [];

    recurrenceDaysOptionValue.push(
      recurrenceDaysOptions.filter(option => frequencyDays.includes(option['name']))
    );
    return recurrenceDaysOptionValue[0] ?? [];
  }
  // console.log('generateRecurrenceDays', generateRecurrenceDaysOptions(['3','6']));

  /**
   * Fetches Lorem Ipsum data from the lipsum.com API.
   *
   * @param {number} [amount=3] - The amount of Lorem Ipsum data to fetch.
   * @param {string} [what='lists'] - The type of Lorem Ipsum data to fetch (e.g., 'lists', 'paras', 'words', 'bytes').
   * @returns {Promise<Object>} A promise that resolves to the fetched Lorem Ipsum data in JSON format.
   * @throws {Error} If there is an error with the HTTP request or parsing the JSON response.
   */
  async function getLipsumData(amount = 3, what = 'lists') {
    return new Promise((resolve, reject) => {
      const req = https.request(`https://lipsum.com/feed/json?amount=${amount}&what=${what}&start=no`, { method: 'GET' }, (res) => {
        let data = '';

        // A chunk of data has been received.
        res.on('data', (chunk) => {
          data += chunk;
        });

        // The whole response has been received.
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            try {
              const jsonData = JSON.parse(data);
              resolve(jsonData);
            } catch (error) {
              reject(new Error('Error parsing JSON response: ' + error.message));
            }
          } else {
            reject(new Error(`HTTP error! status: ${res.statusCode}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(new Error('Request error: ' + error.message));
      });

      // Write data to request body
      req.end();
    });
  }

  generateContentText = async (amount = 3, what = 'paragraph') => {
    let result = '';
    try {
      const data = await getLipsumData(amount, what);
      // Extract result
      result = data.feed.lipsum;
    } catch (error) {
      console.error('Error fetching Lipsum data:', error);
    }
    return result;
  }

  let result = '';

  // Generate event names.
  result = await generateContentText(eventToCreate * languages.length * 2, 'lists');
  const eventNames = result.replace(/(\r\n|\n|\r)/gm, "").split('. ');
  // console.log('eventNames: ', eventNames);
  // console.log('eventNames.length: ', eventNames.length);

  // Generate event content.
  result = await generateContentText(eventToCreate * languages.length * 2 * 3, 'paragraph');
  const eventContent = result.split('\n');
  // console.log('eventContent: ', eventContent);
  // console.log('eventContent.length: ', eventContent.length);

  // Generate event descriptions.
  result = await generateContentText(eventToCreate * languages.length * 2, 'lists');
  const eventDescriptions = result.split('\n');
  // console.log('eventDescriptions: ', eventDescriptions);
  // console.log('eventDescriptions.length: ', eventDescriptions.length);

  // let item = (Math.floor(Math.random() * teaser.length));

  let eventDateData = []
  let eventInformationData = []
  let addDays = 0;
  const items = 1000;
  const startIndex = 1;

  // Set the initial date to the current date.
  let initialDate = new Date();
  initialDate.setUTCHours(0);
  initialDate.setUTCMinutes(0);
  initialDate.setUTCSeconds(0);
  initialDate.setUTCMilliseconds(0);
  console.log('initialDate: ', initialDate);

  // Set the publish date to the first day of the previous month.
  let publishDate = new Date(initialDate);
  publishDate.setUTCMonth(initialDate.getUTCMonth() - 1);
  publishDate.setUTCDate(1)
  console.log('publishDate: ', publishDate);


  // Sample data for Event dates HubDB.

  // Set language multiplier to 1, increase after each language event date and information items have been created.
  let langageCount = 1;
  let eventDateItem = {};
  let eventInformationItem = {};
  let eventStartDate = 0;
  let eventEndDate = 0;
  let recurrenceEndDate = 0;

  for (language of languages) {
    for (let index = 0; index < eventToCreate; index++) {
      let picsumId = Math.floor(Math.random() * 200) + 1;
      eventInformationItem = {
        "path": "event-" + (index + langageCount) + "-" + language,
        "name": eventNames[(index + langageCount)] + ' ' + language,
        "values": {
         "name": `${language} - event - ${index}`,
         "description": eventDescriptions[(index + langageCount)] + ' ' + language,
         "content": `<p>${eventContent[(index + langageCount)]} ${language}</p><p>${eventContent[(index + langageCount) * 2] + ' ' + language}</p>`,
         "open_graph_description": eventDescriptions[(index + langageCount)],
         "open_graph_image": {
          "url": `https://picsum.photos/id/${picsumId}/1200/630`,
          "width": 1200,
          "height": 630,
          "type": "image"
         },
         "featured_image": {
          "url": `https://picsum.photos/id/${picsumId}/1600/620`,
          "width": 1600,
          "height": 620,
          "type": "image"
         },
         "card_image": {
          "url": `https://picsum.photos/id/${picsumId}/360/270`,
          "width": 360,
          "height": 270,
          "type": "image"
         }
        }
      }
      eventInformationData.push(eventInformationItem);
    }
    langageCount++;
  }

  // console.log('Event Information Data: ', eventInformationData);

  // Reset language multiplier to 1.
  langageCount = 1;
  let index = 0;

  for (language of languages) {
    // Create event without recurrence.
    eventStartDate = getDateObjectWithTimeBasedOnInputDate(initialDate, 19, 14);
    eventEndDate = getDateObjectWithTimeBasedOnInputDate(eventStartDate, 21, 0);
    eventDateItem = {
      "path": null,
      "name": null,
      "values": {
        "name": "Non recurring event " + language,
        "publish_date": publishDate.getTime(),
        "start_date": eventStartDate.getTime(),
        "end_date": eventEndDate.getTime(),
        "language": getOptionValue(langageCount, language, language, 0),
        "tags": await generateTags(tags[language]),
        // "event_information": "event-information-" + (index + langageCount),
        "recurrence_frequency": null,
        "recurrence_days": [],
        "recurrence_interval": 0,
        "recurrence_end_date": 0
      }
    }
    eventDateData.push(eventDateItem);

    // Create event with weekly recurrence.
    index++;
    eventStartDate = getDateObjectWithTimeBasedOnInputDate(initialDate, 18, -7);
    eventEndDate = getDateObjectWithTimeBasedOnInputDate(eventStartDate, 2, 1);
    recurrenceEndDate = getDateObjectWithTimeBasedOnInputDate(initialDate, 0, 120);
    eventDateItem = {
      "path": null,
      "name": null,
      "values": {
        "name": "Weekly recurring event " + language,
        "publish_date": publishDate.getTime(),
        "start_date": eventStartDate.getTime(),
        "end_date": eventEndDate.getTime(),
        "language": getOptionValue(langageCount, language, language, 0),
        "tags": await generateTags(tags[language]),
        // "event_information": "event-information-" + (index + langageCount),
        "recurrence_frequency": generateRecurrenceFrequencyOptions('weekly'),
        "recurrence_days": generateRecurrenceDaysOptions(['5','6']),
        "recurrence_interval": 0,
        "recurrence_end_date": recurrenceEndDate.getTime()
      }
    }
    eventDateData.push(eventDateItem);

    // Create event with daily recurrence.
    index++;
    eventStartDate = getDateObjectWithTimeBasedOnInputDate(initialDate, 14, -4);
    eventEndDate = getDateObjectWithTimeBasedOnInputDate(eventStartDate, 20, 0);
    recurrenceEndDate = getDateObjectWithTimeBasedOnInputDate(initialDate, 0, 180);
    eventDateItem = {
      "path": null,
      "name": null,
      "values": {
        "name": "Weekly recurring event " + language,
        "publish_date": publishDate.getTime(),
        "start_date": eventStartDate.getTime(),
        "end_date": eventEndDate.getTime(),
        "language": getOptionValue(langageCount, language, language, 0),
        "tags": await generateTags(tags[language]),
        // "event_information": "event-information-" + (index + langageCount),
        "recurrence_frequency": generateRecurrenceFrequencyOptions('daily'),
        "recurrence_days": [],
        "recurrence_interval": 14,
        "recurrence_end_date": recurrenceEndDate.getTime()
      }
    }
    eventDateData.push(eventDateItem);

    // Create event with monthly recurrence.
    index++;
    eventStartDate = getDateObjectWithTimeBasedOnInputDate(initialDate, 12, -4);
    eventEndDate = getDateObjectWithTimeBasedOnInputDate(eventStartDate, 15, 0);
    recurrenceEndDate = getDateObjectWithTimeBasedOnInputDate(initialDate, 0, 360);
    eventDateItem = {
      "path": null,
      "name": null,
      "values": {
        "name": "Weekly recurring event " + language,
        "publish_date": publishDate.getTime(),
        "start_date": eventStartDate.getTime(),
        "end_date": eventEndDate.getTime(),
        "language": getOptionValue(langageCount, language, language, 0),
        "tags": await generateTags(tags[language]),
        // "event_information": "event-information-" + (index + langageCount),
        "recurrence_frequency": generateRecurrenceFrequencyOptions('monthly'),
        "recurrence_days": [],
        "recurrence_interval": 1,
        "recurrence_end_date": recurrenceEndDate.getTime()
      }
    }
    eventDateData.push(eventDateItem);

    langageCount++;
  }

  // console.log('Event Date Data: ', eventDateData);

  // Sample data for Event information HubDB

  // Bulk create events.

  hubDbEventDateJson['rows'] = eventDateData;
  hubDbEventInformationJson['rows'] = eventInformationData;

  try {
    writeFileSync('./.hubdb/event_information_with_sample_data.hubdb.json', JSON.stringify(hubDbEventInformationJson, null, 2), 'utf8');
    writeFileSync('./.hubdb/event_date_with_sample_data.hubdb.json', JSON.stringify(hubDbEventDateJson, null, 2), 'utf8');
    console.log('Data successfully saved to disk');
  } catch (error) {
    console.log('An error has occurred ', error);
  }
}

start();
