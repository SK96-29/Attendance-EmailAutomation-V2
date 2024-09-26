function sendClassPerformanceEmails() {
  var wb = SpreadsheetApp.getActiveSpreadsheet();
  var sheet2 = wb.getSheetByName('Sheet2'); // Class performance data
  var classData = sheet2.getDataRange().getValues(); // Get entire class data
  
  // List of recipient emails (you can update this list or fetch from a sheet)
  var recipientEmails = ['shiv83565@gmail.com'];

  Logger.log('Starting to send class performance data to admins.');

  // Create the HTML table for class data with enhanced styling
  var tableRows = '';
  for (var i = 0; i < classData.length; i++) {
    var row = classData[i];
    
    // Apply alternating background color for rows (zebra-striping)
    var rowColor = (i % 2 === 0) ? '#f2f2f2' : '#ffffff'; // Light gray for even rows, white for odd rows
    
    tableRows += `<tr style="background-color: ${rowColor};">`;
    for (var j = 0; j < row.length; j++) {
      tableRows += `<td style="border: 1px solid #dddddd; padding: 12px;">${row[j]}</td>`;
    }
    tableRows += '</tr>';
  }

  // HTML message with improved table styling
  var htmlMessage = `
    <p>Dear Sir/Mam,</p>
    <p>Here is the complete class attendance sheet:</p>
    <table style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif;">
      <thead>
        <tr style="background-color: #4CAF50; color: white;">
          ${classData[0].map(header => `<th style="border: 1px solid #dddddd; padding: 12px;">${header}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
    <p>Best regards,<br>Your School</p>
  `;

  // Loop through all recipient emails and send them the table
  for (var i = 0; i < recipientEmails.length; i++) {
    var email = recipientEmails[i];
    var subject = 'Class Attendance';
    
    try {
      // Send the email
      GmailApp.sendEmail(email, subject, '', {
        htmlBody: htmlMessage
      });
      
      // Log success
      Logger.log('Class performance data successfully sent to: ' + email);
    } catch (e) {
      // Log error
      Logger.log('Error sending class data to ' + email + ': ' + e.message);
    }
  }

  Logger.log('Finished sending class performance data to admins.');
}
