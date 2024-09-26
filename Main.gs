function triggerEmailScripts() {
  // Log the start of the email scripts
  Logger.log('Starting to run both email scripts.');

  try {
    // Call the function to send attendance emails
    sendAttendanceEmails();
    Logger.log('sendAttendanceEmails() completed successfully.');
  } catch (error) {
    Logger.log('Error in sendAttendanceEmails(): ' + error.message);
  }

  try {
    // Call the function to send class performance emails
    sendClassPerformanceEmails();
    Logger.log('sendClassPerformanceEmails() completed successfully.');
  } catch (error) {
    Logger.log('Error in sendClassPerformanceEmails(): ' + error.message);
  }

  // Log the completion of both email scripts
  Logger.log('Both email scripts have completed.');
}
