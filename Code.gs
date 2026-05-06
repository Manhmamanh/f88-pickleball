// F88 Pickleball - Google Apps Script Web App
// Deploy as Web App -> Anyone with link can access

const SHEET_ID = '1bYzGiBg7iTSPX0r3CtgTDJwIGIVcXuTObUp-ODSTasE';
const SHEET_NAME = 'Trang tính1';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const now = new Date();
    const timeStr = Utilities.formatDate(now, 'Asia/Saigon', 'dd/MM/yyyy HH:mm');
    
    const row = [
      timeStr,
      data.team1Player1,
      data.team1Player2,
      data.team2Player1,
      data.team2Player2,
      data.betMultiplier,
      data.betAmount,
      data.note || '',
      'Đã đăng ký'
    ];
    
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    sheet.appendRow(row);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Đăng ký thành công!' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Pickleball F88 API running' }))
    .setMimeType(ContentService.MimeType.JSON);
}
