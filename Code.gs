// F88 Pickleball - Google Apps Script Web App v2
// Xử lý cả JSON và form-urlencoded

const SHEET_ID = '1bYzGiBg7iTSPX0r3CtgTDJwIGIVcXuTObUp-ODSTasE';
const SHEET_NAME = 'Trang tính1';

function doPost(e) {
  try {
    let data;
    
    // Xử lý cả JSON và form-urlencoded
    if (e.postData && e.postData.type === 'application/json') {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameters) {
      // form-urlencoded
      data = {};
      for (const key in e.parameters) {
        data[key] = e.parameters[key][0];
      }
    } else {
      throw new Error('Unsupported content type');
    }
    
    const now = new Date();
    const timeStr = Utilities.formatDate(now, 'Asia/Saigon', 'dd/MM/yyyy HH:mm');
    
    const row = [
      timeStr,
      data.team1Player1 || '',
      data.team1Player2 || '',
      data.team2Player1 || '',
      data.team2Player2 || '',
      data.betMultiplier || '',
      data.betAmount || '',
      data.note || '',
      'Đã đăng ký'
    ];
    
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    sheet.appendRow(row);
    
    // Trả về HTML để iframe/hidden form không báo lỗi
    return HtmlService.createHtmlOutput('<html><body><script>window.close()</script>Đã đăng ký thành công!</body></html>');
    
  } catch (err) {
    return HtmlService.createHtmlOutput('<html><body>Lỗi: ' + err.toString() + '</body></html>');
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Pickleball F88 API running' }))
    .setMimeType(ContentService.MimeType.JSON);
}
