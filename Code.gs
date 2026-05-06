// F88 Pickleball - Đăng ký + Thông báo Telegram

const SHEET_ID = '1bYzGiBg7iTSPX0r3CtgTDJwIGIVcXuTObUp-ODSTasE';
const SHEET_NAME = 'Trang tính1';
const BOT_TOKEN = '8603898262:AAGJnzbvhHwgq4cePzYsJnNcl7fbH9cuBwM';
const CHANNEL_ID = '-1003988859676';
const OWNER_CHAT_ID = '1961589891';

// === DO GET - Kiểm tra API ===
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'F88 Pickleball API running' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// === DO POST - Nhận đăng ký + Ghi sheet + Thông báo ===
function doPost(e) {
  try {
    let data;
    if (e.postData && e.postData.type === 'application/json') {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameters) {
      data = {};
      for (const key in e.parameters) data[key] = e.parameters[key][0];
    } else {
      throw new Error('Unsupported format');
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

    // Gửi thông báo Telegram
    notifyPickleball(row);

    return HtmlService.createHtmlOutput(
      '<html><body><script>window.close()</script>Đã đăng ký thành công!</body></html>'
    );
  } catch (err) {
    return HtmlService.createHtmlOutput(
      '<html><body>Lỗi: ' + err.toString() + '</body></html>'
    );
  }
}

// === GỬI TELEGRAM ===
function sendTelegram(msg, chatId) {
  const url = 'https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage';
  UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({
      chat_id: chatId, text: msg, parse_mode: 'HTML',
      disable_web_page_preview: true
    })
  });
}

// === THÔNG BÁO ĐĂNG KÝ MỚI ===
function notifyPickleball(row) {
  const msg =
    '<b>🏓 ĐĂNG KÝ MỚI — F88 Pickleball</b>\n\n' +
    '<b>⏰</b> ' + (row[0] || '') + '\n\n' +
    '<b>🔵 ĐỘI 1:</b>\n  1. ' + row[1] + '\n  2. ' + row[2] + '\n\n' +
    '<b>🔴 ĐỘI 2:</b>\n  1. ' + row[3] + '\n  2. ' + row[4] + '\n\n' +
    '<b>💰 Cược:</b> ' + row[5] + ' (' + row[6] + 'đ)\n' +
    (row[7] ? '<b>📝 Ghi chú:</b> ' + row[7] + '\n' : '');

  try { sendTelegram(msg, OWNER_CHAT_ID); } catch(e) {}
}
