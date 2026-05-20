// =====================================================
// NOTEZO — Google Apps Script Backend
// File: Code.gs
// =====================================================
// SETUP INSTRUCTIONS:
// 1. Go to script.google.com → New Project
// 2. Paste this entire code into Code.gs
// 3. Click "Deploy" → "New deployment" → "Web App"
// 4. Set "Execute as" → Me
//    Set "Who has access" → Anyone
// 5. Click "Deploy" and copy the Web App URL
// 6. Paste that URL into script.js as GOOGLE_SCRIPT_URL
// =====================================================

const SHEET_NAME = "Orders"; // Name of the sheet tab

function doPost(e) {
  try {
    // Parse incoming JSON
    const data = JSON.parse(e.postData.contents);
    
    // Open the active spreadsheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      // Add headers
      const headers = [
        "Order ID", "Date & Time", "Customer Name", "Phone Number",
        "Email", "Service", "Quantity", "Total Amount",
        "Additional Notes", "Status"
      ];
      sheet.appendRow(headers);
      // Style header row
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#0a0f2c");
      headerRange.setFontColor("#ec4899");
      headerRange.setFontWeight("bold");
      headerRange.setFontSize(11);
    }
    
    // Append the new order row
    sheet.appendRow([
      data.orderId     || "",
      data.timestamp   || new Date().toLocaleString("en-IN"),
      data.name        || "",
      data.phone       || "",
      data.email       || "",
      data.service     || "",
      data.quantity    || "",
      data.total       || "",
      data.notes       || "",
      data.status      || "Pending"
    ]);
    
    // Auto-resize columns for readability
    sheet.autoResizeColumns(1, 10);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, orderId: data.orderId }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (optional health check)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "NOTEZO API is running", version: "1.0" }))
    .setMimeType(ContentService.MimeType.JSON);
}
