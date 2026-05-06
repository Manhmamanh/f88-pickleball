// F88 Pickleball - Thông báo đăng ký mới qua Telegram

const SHEET_ID = '1bYzGiBg7iTSPX0r3CtgTDJwIGIVcXuTObUp-ODSTasE';
const SHEET_NAME = 'Trang tính1';
const BOT_TOKEN = '8713404626:AAFMq4dFLqSY3z7e3qI9JyrU-2ldSClRm0o';
const CHANNEL_ID = '-1003988859676'; // Kênh chung
const OWNER_CHAT_ID = '1961589891';

function sendTelegram(msg, chatId) {
  const url = 'https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage';
  const payload = {
    chat_id: chatId,
    text: msg,
    parse_mode: 'HTML',
    disable_web_page_preview: true
  };
  UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload)
  });
}

// Hàm này chạy khi có người đăng ký mới
function onNewRegistration(event) {
  // event là object từ trigger onFormSubmit hoặc onEdit
  try {
    let row, values;
    
    if (event && event.values) {
      // Google Form trigger
      values = event.values;
    } else if (event && event.range) {
      // onEdit trigger — lấy row vừa edit
      const sheet = event.source.getActiveSheet();
      if (sheet.getName() !== SHEET_NAME) return;
      const rowNum = event.range.getRow();
      if (rowNum <= 1) return;
      values = sheet.getRange(rowNum, 1, 1, 9).getValues()[0];
    } else {
      // Manual fallback: check row mới nhất
      const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
      const lastRow = sheet.getLastRow();
      if (lastRow <= 1) return;
      values = sheet.getRange(lastRow, 1, 1, 9).getValues()[0];
    }
    
    if (!values || values.length < 6) return;
    
    const time = values[0] || '';
    const t1p1 = values[1] || '';
    const t1p2 = values[2] || '';
    const t2p1 = values[3] || '';
    const t2p2 = values[4] || '';
    const bet = values[5] || '';
    const amount = values[6] || '';
    const note = values[7] || '';
    
    const msg = 
      '<b>🏓 ĐĂNG KÝ MỚI — F88 Pickleball</b>\n\n' +
      '<b>⏰</b> ' + time + '\n\n' +
      '<b>🔵 ĐỘI 1:</b>\n' +
      '  1. ' + t1p1 + '\n' +
      '  2. ' + t1p2 + '\n\n' +
      '<b>🔴 ĐỘI 2:</b>\n' +
      '  1. ' + t2p1 + '\n' +
      '  2. ' + t2p2 + '\n\n' +
      '<b>💰 Cược:</b> ' + bet + ' (' + amount + 'đ)\n' +
      (note ? '<b>📝 Ghi chú:</b> ' + note + '\n' : '') +
      '\n📲 https://manhmamanh.github.io/f88-pickleball/';

    // Gửi vào channel chung
    try {
      sendTelegram(msg, CHANNEL_ID);
    } catch(e) {}
    
    // Gửi riêng cho Mạnh Ca Ca
    try {
      sendTelegram(msg, OWNER_CHAT_ID);
    } catch(e) {}
    
  } catch(err) {
    // Log lỗi vào sheet
    try {
      const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('Trang tính1');
      sheet.getRange(sheet.getLastRow() + 1, 1).setValue('ERROR: ' + err.toString());
    } catch(e) {}
  }
}

// Trigger function — đặt tên dễ nhớ
function onFormSubmit(e) {
  onNewRegistration(e);
}

function onEditNotify(e) {
  onNewRegistration(e);
}
