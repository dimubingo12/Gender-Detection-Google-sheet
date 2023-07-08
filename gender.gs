// Define which columns in the sheet the data is in. Assuming name in column 4 (D), and gender in column 51 (AY).
var NAME_COLUMN = 4;
var GENDER_COLUMN = 51;
// Define the starting row
var START_ROW_GENDER = 1921;
// Define the name of the property used to store the last processed row for gender.
var LAST_ROW_PROPERTY_GENDER = 'lastRowGender';

function createTriggerGender() {
  // Create a new trigger that runs processNewRowsGender every 4 hours.
  ScriptApp.newTrigger('processNewRowsGender')
    .timeBased()
    .everyHours(2)
    .create();
}

function processNewRowsGender() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName('ORDER RAW DATA');
  var lastRowgg = sheet.getLastRow();

  // Get the last processed row from the properties.
  var propertiesgg = PropertiesService.getScriptProperties();
  var lastProcessedRowgg = propertiesgg.getProperty(LAST_ROW_PROPERTY_GENDER);
  if (lastProcessedRowgg == null) {
    // If there is no last processed row, start from the start row.
    lastProcessedRowgg = START_ROW_GENDER;
  } else {
    // If there is a last processed row, convert it to a number.
    lastProcessedRowgg = Number(lastProcessedRowgg);
  }

  // Process all rows from the last processed row to the last row.
  for (var row = lastProcessedRowgg; row <= lastRowgg; row++) {
    // If the gender cell is already filled out, don't do anything.
    if (sheet.getRange(row, GENDER_COLUMN).getValue()) continue;

    // Get the first name from the name column.
    var nameCell = sheet.getRange(row, NAME_COLUMN).getValue();

    // If the name cell is empty, stop the execution and save the last processed row.
    if (nameCell === '') {
      propertiesgg.setProperty(LAST_ROW_PROPERTY_GENDER, String(row - 1));
      break;
    }

    // Split the name to get the first name.
    var name = nameCell.split(' ')[0];

    // Use the Genderize.io API to get the gender.
    var gendergg = getGender(name);

    // Set the gender in the gender column.
    sheet.getRange(row, GENDER_COLUMN).setValue(gendergg);
  }

  // If we've processed all rows, save the last row as the last processed row.
  if (row > lastRowgg) {
    propertiesgg.setProperty(LAST_ROW_PROPERTY_GENDER, String(lastRowgg));
  }
}

// Use the Genderize.io API to get the gender associated with a name.
function getGender(name) {
  var url = 'https://api.genderize.io/?name=' + name;
  var response = UrlFetchApp.fetch(url);
  var json = JSON.parse(response.getContentText());
  // If the API returns a gender, return it. Otherwise, return 'unknown'.
  if (json.gendergg) {
    return json.gendergg;
  } else {
    return 'female';
  }
}
