# Gender.gs

## Overview
`Gender.gs` is a Google Apps Script that uses the Genderize.io API to infer the gender associated with a given name in a Google Sheets document. The script processes names in a specific column and populates another column with the inferred gender based on the first name.

## Getting Started
To use the `Gender.gs` script, follow these steps:

1. Open your Google Sheets document.
2. Click on `Extensions` in the menu.
3. Select `Apps Script`.
4. Replace the default code with the content of the `Gender.gs` script file.
5. Save the script and give it an appropriate name.
6. Close the Apps Script editor.

## Configuration
The script requires the following configuration:

- `NAME_COLUMN`: The column number (starting from 1) where the names are stored. Modify the value of `NAME_COLUMN` to match your specific column.
- `GENDER_COLUMN`: The column number (starting from 1) where the inferred genders will be populated. Modify the value of `GENDER_COLUMN` to match your desired column.
- `START_ROW_GENDER`: The row number from which to start processing the names. Modify the value of `START_ROW_GENDER` to match your desired starting row.
- `LAST_ROW_PROPERTY_GENDER`: The name of the property used to store the last processed row for gender. Modify the value of `LAST_ROW_PROPERTY_GENDER` if desired.

## Usage
Once the script is set up and configured, you can trigger the processing of new rows by creating a time-based trigger. The provided code includes a `createTriggerGender` function that sets up a trigger to run the `processNewRowsGender` function every 2 hours. You can modify the trigger settings according to your requirements.

## Notes
- The script uses the Genderize.io API to determine the inferred gender based on the first name. Ensure you have a stable internet connection and check the API documentation for any rate limits or restrictions.
- The script checks if the gender cell is already filled out before processing a row. This prevents overwriting existing gender values.

Feel free to modify and adapt the script to suit your needs. Contributions are welcome!
