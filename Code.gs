function sendAttendanceEmails() {
  var wb = SpreadsheetApp.getActiveSpreadsheet();
  var sheet1 = wb.getSheetByName('Sheet1'); // For attendance data
  var sheet2 = wb.getSheetByName('Sheet2'); // For class performance data

  // Get attendance data (columns B, C, D) from Sheet1
  var attendanceData = sheet1.getRange(2, 2, sheet1.getLastRow() - 1, 3).getValues(); // Names in B, Attendance in C, Emails in D
  // Get class performance data (assumed to be in Sheet2)
  var classData = sheet2.getDataRange().getValues(); // Assuming class data starts from row 1

  // Loop through each student
  for (var i = 0; i < attendanceData.length; i++) {
    var name = attendanceData[i][0];                    // Name in Column B
    var attendance = attendanceData[i][1];              // Attendance in Column C (as decimal)
    var email = attendanceData[i][2];                   // Email in Column D
    
    // Convert attendance to percentage
    var attendancePercentage = (attendance * 100).toFixed(2); // Format to 2 decimal places
    
    // Log the details
    Logger.log('Name: ' + name + ', Email: ' + email + ', Attendance: ' + attendancePercentage + '%');
    
    // Find corresponding class data
    var studentClassData = classData.find(row => row[0] === name); // Assuming names are in the first column of Sheet2

    // Send email (if email exists)
    if (email && attendance !== '') {
      var subject = 'Attendance Update for ' + name;

      // Create the HTML table for classes
      var classTableRows = '';
      if (studentClassData) {
        for (var j = 1; j <= 8; j++) { // Assuming class scores are in columns 2 to 9
          if (studentClassData[j] !== undefined) {
            classTableRows += `
              <tr>
                <td style="border: 1px solid #dddddd; padding: 8px;">Class ${j}</td>
                <td style="border: 1px solid #dddddd; padding: 8px;">${studentClassData[j]}</td>
              </tr>`;
          } else {
            classTableRows += `
              <tr>
                <td style="border: 1px solid #dddddd; padding: 8px;">Class ${j}</td>
                <td style="border: 1px solid #dddddd; padding: 8px;">N/A</td>
              </tr>`;
          }
        }
      } else {
        classTableRows = `
          <tr>
            <td colspan="2" style="border: 1px solid #dddddd; padding: 8px; text-align: center;">No class data available</td>
          </tr>`;
      }

      // Create the HTML message
      var htmlMessage = `
        <p>Dear ${name},</p>
        <p>Your attendance details are as follows:</p>
        <table style="border-collapse: collapse; width: 100%;">
          <tr>
          <tr>
            <td style="border: 1px solid #dddddd; padding: 8px;">Name</td>
            <td style="border: 1px solid #dddddd; padding: 8px;">${name}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #dddddd; padding: 8px;">Attendance</td>
            <td style="border: 1px solid #dddddd; padding: 8px;">${attendancePercentage}%</td>
          </tr>
        </table>
        <p>Your Individual Attendance Performance is as Follows:</p>
        <table style="border-collapse: collapse; width: 100%;">
          <tr>
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Class</th>
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Attendance</th>
          </tr>
          ${classTableRows}
        </table>
        <p>Best regards,<br>Your School</p>
      `;
      
      // Send the email
      try {
        GmailApp.sendEmail(email, subject, '', {
          htmlBody: htmlMessage
        });
        Logger.log('Email sent to: ' + email);
      } catch (e) {
        Logger.log('Error sending email to ' + email + ': ' + e.message);
      }
    } else {
      Logger.log('No email address or attendance data found for ' + name);
    }
  }
}

function sendClassPerformanceEmails() {
  var wb = SpreadsheetApp.getActiveSpreadsheet();
  var sheet2 = wb.getSheetByName('Sheet2'); // Class performance data
  var classData = sheet2.getDataRange().getValues(); // Get entire class data
  
  // List of recipient emails (you can update this list or fetch from a sheet)
  var recipientEmails = ['admin1@example.com', 'admin2@example.com'];

  Logger.log('Starting to send class performance data to admins.');

  // Create the HTML table for class data
  var tableRows = '';
  for (var i = 0; i < classData.length; i++) {
    var row = classData[i];
    tableRows += '<tr>';
    for (var j = 0; j < row.length; j++) {
      tableRows += `<td style="border: 1px solid #dddddd; padding: 8px;">${row[j]}</td>`;
    }
    tableRows += '</tr>';
  }

  var htmlMessage = `
    <p>Dear Admin,</p>
    <p>Here is the complete class performance data:</p>
    <table style="border-collapse: collapse; width: 100%;">
      ${tableRows}
    </table>
    <p>Best regards,<br>Your School</p>
  `;

  // Loop through all recipient emails and send them the table
  for (var i = 0; i < recipientEmails.length; i++) {
    var email = recipientEmails[i];
    var subject = 'Class Performance Data';
    
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
