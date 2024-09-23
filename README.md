# Attendance-EmailAutomation-V2

Attendance Email Notification Script
Overview
This script automates the process of sending personalized attendance update emails to students based on their attendance data and class performance scores. It retrieves data from Google Sheets, formats it into HTML emails, and sends it through Gmail.

Features
Sends attendance updates to students via email.
Retrieves attendance data from "Sheet1" and class performance data from "Sheet2".
Converts decimal attendance (e.g., 0.875) to percentage format (e.g., 88%).
Constructs dynamic HTML tables for attendance details and class performance.
Prerequisites
A Google account with access to Google Sheets and Gmail.
Two Google Sheets:
Sheet1: Contains student names, attendance (as decimals), and email addresses.
Sheet2: Contains class performance data, with student names in the first column and corresponding scores in subsequent columns.
Setup Instructions
Create Google Sheets:

Sheet1: Set up the following columns:
Column B: Student Names
Column C: Attendance (as decimals, e.g., 0.875 for 88%)
Column D: Email Addresses
Sheet2: Set up the following columns:
Column A: Student Names
Columns B to I: Class Scores (one column for each class)
Open Google Apps Script:

Open the Google Sheet where you want to add the script.
Click on Extensions > Apps Script.
Copy and Paste the Code:

Copy the provided script and paste it into the Apps Script editor.
Authorize the Script:

Click the save icon to save the script.
Run the function sendAttendanceEmails for the first time.
Follow the prompts to authorize the script to access your Google Sheets and Gmail.
Run the Script:

After authorization, you can run the sendAttendanceEmails function to send the emails.
Code Explanation
The script consists of the following key sections:

Data Retrieval: The script fetches attendance data from "Sheet1" and class performance data from "Sheet2".
Email Composition: It constructs an HTML email for each student, including attendance details and class performance scores.
Email Sending: The email is sent using the GmailApp service, with error handling for any issues that may arise.
Logging
The script logs important actions and errors in the Logger for troubleshooting purposes. You can view the logs in the Apps Script editor by clicking on View > Logs.

Notes
Ensure that you are within Gmail's daily sending limits to avoid any interruptions.
You may want to modify the script to customize the email content or style.
