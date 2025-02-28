/************************************************************
 * 1) GAS連携用URL（ダミーURLを必要に応じて差し替えてください）
 ************************************************************/
const scriptURL =
  "https://script.google.com/macros/s/AKfycbyYmqbjwwkZlxWNfFVZi8ORT0mHw0sh9VlpYBcVsYz_UZSB63OM6LOya0UAZgZgCyhGpw/exec";

/************************************************************
 * 2) 履歴書HTMLテンプレート（文字列として書く）
 ************************************************************/
function generateResumeTemplate() {
  // 学歴・職歴テーブル 12行ぶんを文字列として組み立て
  let eduRowsHTML = "";
  for (let i = 1; i <= 12; i++) {
    eduRowsHTML += `
      <tr id="edu-row-${i}" class="education-value">
        <td class="education-year-value" id="edu-preview-year-${i}"></td>
        <td class="education-container-month-value" id="edu-preview-month-${i}"></td>
        <td class="education-history-value" id="edu-preview-work-${i}"></td>
      </tr>
    `;
  }

  // 免許・資格テーブル 6行ぶんを文字列として組み立て
  let skillRowsHTML = "";
  for (let i = 1; i <= 6; i++) {
    skillRowsHTML += `
      <tr id="skill-row-${i}" class="skill-value">
        <td class="skill-year-value" id="skill-preview-year-${i}"></td>
        <td class="skill-container-month-value" id="skill-preview-month-${i}"></td>
        <td class="skill-history-value" id="skill-preview-history-${i}"></td>
      </tr>
    `;
  }

  // テンプレート全体をバッククォートで囲み、上記テーブル行を埋め込む
  return `
  <div class="resume-preview">
    <div class="resume-content" id="resume-content-whole">
      <div style="display: flex; justify-content: space-between; margin-bottom: 5mm;">
        <div class="title">履歴書</div>
        <div class="date-right" id="preview-today-date"></div>
      </div>

      <!-- (1) 名前・ふりがな + 写真 -->
      <div class="block">
        <div class="top-section">
          <table class="name-furigana-table">
            <tr class="furigana-box">
              <td class="furigana-label">ふりがな</td>
              <td class="furigana-value">
                <span id="preview-furigana"></span>
              </td>
            </tr>
            <tr class="name-table">
              <td class="name-label">氏名</td>
              <td class="name-value-left">
                <span id="preview-name" style="font-weight: bold"></span>
              </td>
            </tr>
          </table>
          <div class="photo-box">
            <img id="preview-photo-img" />
          </div>
        </div>
      </div>

      <!-- (2) 生年月日・性別 -->
      <div class="block">
        <table class="birthday-gender-table">
          <tr class="birthday-box">
            <td class="birthday-label">生年月日</td>
            <td class="birthday-value">
              <span id="preview-birth-year"></span>年
              <span id="preview-birth-month"></span>月
              <span id="preview-birth-day"></span>日（
              <span id="preview-age"></span>歳）
            </td>
            <td class="gender-value">
              <span id="preview-gender"></span>
            </td>
          </tr>
        </table>
      </div>

      <!-- (3) 電話番号・Email・現住所 -->
      <div class="block">
        <table class="contact-info-table">
          <tr class="contact-info">
            <th class="address-furigana-label">ふりがな</th>
            <td class="address-furigana-value">
              <span id="preview-address-furigana"></span>
            </td>
            <th class="tel-label">電話</th>
            <td class="tel-value">
              <span id="preview-phone"></span>
            </td>
          </tr>
          <tr>
            <th class="address-label">現住所</th>
            <td class="address-value">
              〒<span id="preview-postal-code"></span><br />
              <span id="preview-address"></span>
            </td>
            <th class="email-label">Email</th>
            <td class="email-value">
              <span id="preview-email"></span>
            </td>
          </tr>
        </table>
      </div>

      <!-- (4) 連絡先（現住所以外） -->
      <div class="block">
        <table class="alt-contact-table">
          <tr class="alt-contact-info">
            <th class="alt-address-furigana-label">ふりがな</th>
            <td class="alt-address-furigana-value">
              <span id="preview-alt-address-furigana"></span>
            </td>
            <th class="alt-tel-label">電話</th>
            <td class="alt-tel-value">
              <span id="preview-alt-phone"></span>
            </td>
          </tr>
          <tr>
            <th class="alt-address-label">現住所</th>
            <td class="alt-address-value">
              〒<span id="preview-alt-postal-code"></span><br />
              <span id="preview-alt-address"></span>
            </td>
            <th class="alt-email-label">Email</th>
            <td class="email-value">
              <span id="preview-alt-email"></span>
            </td>
          </tr>
        </table>
      </div>

      <!-- (5) 学歴・職歴：合計12行 -->
      <div class="block">
        <table class="education-table">
          <tr class="education-info">
            <th class="education-year">年</th>
            <th class="education-container-month">月</th>
            <th class="education-history">学歴・職歴</th>
          </tr>
          ${eduRowsHTML}
        </table>
      </div>

      <!-- (6) 免許・資格：合計6行 -->
      <div class="block">
        <table class="skill-table">
          <tr class="skill-info">
            <th class="skill-year">年</th>
            <th class="skill-container-month">月</th>
            <th class="skill-history">免許・資格</th>
          </tr>
          ${skillRowsHTML}
        </table>
      </div>

      <!-- (7) 志望動機 -->
      <div class="block">
        <table class="motivation-table">
          <tr>
            <th class="motivation-label">志望動機など</th>
          </tr>
          <tr>
            <td class="motivation-value">
              <span id="preview-motivation"></span>
            </td>
          </tr>
        </table>
      </div>

      <!-- (8) 自己PR -->
      <div class="block">
        <table class="pr-table">
          <tr>
            <th class="pr-label">自己PRなど</th>
          </tr>
          <tr>
            <td class="pr-value">
              <span id="preview-pr"></span>
            </td>
          </tr>
        </table>
      </div>

      <!-- (9) 本人希望 -->
      <div class="block">
        <table class="request-table">
          <tr>
            <th class="request-label">
              本人希望（給与・職種・勤務時間・勤務地 等）
            </th>
          </tr>
          <tr>
            <td class="request-value">
              <span id="preview-request"></span>
            </td>
          </tr>
        </table>
      </div>

    </div>
  </div>
  `;
}

/************************************************************
 * 3) ページDOMを追加して表示
 ************************************************************/
const pagesContainer = document.getElementById("resume-pages");

/** 1ページ目を自動生成 */
function createNewPageDOM() {
  const pageEl = document.createElement("div");
  pageEl.classList.add("resume-page");
  pageEl.innerHTML = generateResumeTemplate(); // 文字列としてHTMLを流し込む
  pagesContainer.appendChild(pageEl);
  return pageEl;
}

// 最初の1ページ作成
let currentPage = createNewPageDOM();

/************************************************************
 * 4) 「本日の令和◯年」表示
 ************************************************************/
function setTodayDate() {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth() + 1;
  const d = now.getDate();
  const reiwa = y - 2018; // 2019年=令和元年

  // テンプレートリテラルで文字列を作成
  const todayStr = `令和 ${reiwa} 年 ${m} 月 ${d} 日現在`;

  const todayDateEl = document.getElementById("preview-today-date");
  if (todayDateEl) {
    todayDateEl.textContent = todayStr;
  }
}
setTodayDate();

/************************************************************
 * 5) フォーム入力とプレビューの同期
 ************************************************************/
function bindTextSync(inputSel, previewSel) {
  const inputEl = document.querySelector(inputSel);
  const prevEl = document.querySelector(previewSel);
  if (!inputEl || !prevEl) return;

  function sync() {
    prevEl.textContent = inputEl.value;
    splitPagesIfOverflow();
  }
  inputEl.addEventListener("input", sync);
  sync(); // 初期反映
}

// ---- 各テキスト欄をプレビューに同期 ----
bindTextSync("#input-name", "#preview-name");
bindTextSync("#input-furigana", "#preview-furigana");
bindTextSync("#input-postal-code", "#preview-postal-code");
bindTextSync("#input-address-furigana", "#preview-address-furigana");
bindTextSync("#input-address", "#preview-address");
bindTextSync("#input-phone", "#preview-phone");
bindTextSync("#input-email", "#preview-email");
bindTextSync("#input-alt-postal-code", "#preview-alt-postal-code");
bindTextSync("#input-alt-address-furigana", "#preview-alt-address-furigana");
bindTextSync("#input-alt-address", "#preview-alt-address");
bindTextSync("#input-alt-phone", "#preview-alt-phone");
bindTextSync("#input-alt-email", "#preview-alt-email");
bindTextSync("#input-motivation", "#preview-motivation");
bindTextSync("#input-pr", "#preview-pr");
bindTextSync("#input-request", "#preview-request");

// ---- 生年月日（年・月・日）を同期 ----
const birthYear = document.getElementById("birth-year");
const birthMonth = document.getElementById("birth-month");
const birthDay = document.getElementById("birth-day");
const prevBirthYear = document.getElementById("preview-birth-year");
const prevBirthMonth = document.getElementById("preview-birth-month");
const prevBirthDay = document.getElementById("preview-birth-day");

function syncBirth() {
  prevBirthYear.textContent = birthYear.value;
  prevBirthMonth.textContent = birthMonth.value;
  prevBirthDay.textContent = birthDay.value;
  splitPagesIfOverflow();
}
[birthYear, birthMonth, birthDay].forEach((el) =>
  el.addEventListener("input", syncBirth)
);

// ---- 年齢を同期 ----
bindTextSync("#age", "#preview-age");

// ---- 性別を同期 ----
bindTextSync("#gender", "#preview-gender");

// ---- 写真を同期 ----
const photoInput = document.getElementById("input-photo");
const previewPhoto = document.getElementById("preview-photo-img");
photoInput.addEventListener("change", () => {
  const file = photoInput.files[0];
  if (!file) {
    previewPhoto.src = "";
    splitPagesIfOverflow();
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    previewPhoto.src = e.target.result;
    splitPagesIfOverflow();
  };
  reader.readAsDataURL(file);
});

// ---- 生年月日selectに値を入れる（初期化）----
const yearNow = new Date().getFullYear();
function populateYears(select) {
  for (let y = 1900; y <= yearNow; y++) {
    const opt = document.createElement("option");
    opt.value = y;
    opt.textContent = y;
    select.appendChild(opt);
  }
}
function populateMonths(select) {
  for (let i = 1; i <= 12; i++) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = i;
    select.appendChild(opt);
  }
}
populateYears(birthYear);
populateMonths(birthMonth);

for (let i = 1; i <= 31; i++) {
  const opt = document.createElement("option");
  opt.value = i;
  opt.textContent = i;
  birthDay.appendChild(opt);
}
const ageSelect = document.getElementById("age");
for (let i = 0; i <= 100; i++) {
  const opt = document.createElement("option");
  opt.value = i;
  opt.textContent = i;
  ageSelect.appendChild(opt);
}

/************************************************************
 * 6) 学歴・職歴 (最大12行)
 ************************************************************/
const eduContainer = document.getElementById("education-container");
let currentEduRows = 1;
const maxEduRows = 12;

// 初期行(1行目)のDOM
const defEduYear = eduContainer.querySelector(".edu-year");
const defEduMonth = eduContainer.querySelector(".edu-month");
const defEduWork = eduContainer.querySelector(".edu-work");

// 行同期用関数
function syncEduRow(leftYearEl, leftMonthEl, leftWorkEl, rowIndex) {
  const previewYear = document.getElementById(`edu-preview-year-${rowIndex}`);
  const previewMonth = document.getElementById(`edu-preview-month-${rowIndex}`);
  const previewWork = document.getElementById(`edu-preview-work-${rowIndex}`);

  function doSync() {
    previewYear.textContent = leftYearEl.value;
    previewMonth.textContent = leftMonthEl.value;
    previewWork.textContent = leftWorkEl.value;
    splitPagesIfOverflow();
  }
  leftYearEl.addEventListener("input", doSync);
  leftMonthEl.addEventListener("input", doSync);
  leftWorkEl.addEventListener("input", doSync);

  doSync();
}
syncEduRow(defEduYear, defEduMonth, defEduWork, 1);

// 学歴・職歴の年・月セレクトに値を入れる
function populateYearMonth(selectYear, selectMonth) {
  for (let y = 1900; y <= yearNow; y++) {
    const opt = document.createElement("option");
    opt.value = y;
    opt.textContent = y;
    selectYear.appendChild(opt);
  }
  for (let i = 1; i <= 12; i++) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = i;
    selectMonth.appendChild(opt);
  }
}
populateYearMonth(defEduYear, defEduMonth);

// 「＋ 追加する」ボタン（学歴・職歴）
document.getElementById("add-education-row").addEventListener("click", () => {
  if (currentEduRows >= maxEduRows) {
    alert("学歴・職歴は最大12行までです。");
    return;
  }
  currentEduRows++;
  const rowIndex = currentEduRows;

  // 左側フォームに新しい行DOM
  const row = document.createElement("div");
  row.className = "row-container";
  row.innerHTML = `
    <div class="form-inline">
      <select class="edu-year"><option value="">--</option></select>
      <select class="edu-month"><option value="">--</option></select>
      <input type="text" class="edu-work" placeholder="例：〇〇大学 卒業" />
    </div>
  `;
  eduContainer.appendChild(row);

  const newYear = row.querySelector(".edu-year");
  const newMonth = row.querySelector(".edu-month");
  const newWork = row.querySelector(".edu-work");
  populateYearMonth(newYear, newMonth);

  syncEduRow(newYear, newMonth, newWork, rowIndex);
});

// 「－ 削除」ボタン（学歴・職歴）
document
  .getElementById("remove-education-last")
  .addEventListener("click", () => {
    if (currentEduRows > 1) {
      const rows = eduContainer.querySelectorAll(".row-container");
      eduContainer.removeChild(rows[rows.length - 1]);

      // 右側プレビューの該当行を空に
      document.getElementById(
        `edu-preview-year-${currentEduRows}`
      ).textContent = "";
      document.getElementById(
        `edu-preview-month-${currentEduRows}`
      ).textContent = "";
      document.getElementById(
        `edu-preview-work-${currentEduRows}`
      ).textContent = "";

      currentEduRows--;
      splitPagesIfOverflow();
    }
  });

/************************************************************
 * 7) 免許・資格 (最大6行)
 ************************************************************/
const skillContainer = document.getElementById("skill-container");
let currentSkillRows = 1;
const maxSkillRows = 6;

// 初期1行目
const defLicenseYear = skillContainer.querySelector(".license-year");
const defLicenseMonth = skillContainer.querySelector(".license-month");
const defSkillHistory = skillContainer.querySelector(".skill-history");

function syncSkillRow(yearEl, monthEl, histEl, rowIndex) {
  const previewYear = document.getElementById(`skill-preview-year-${rowIndex}`);
  const previewMonth = document.getElementById(
    `skill-preview-month-${rowIndex}`
  );
  const previewHistory = document.getElementById(
    `skill-preview-history-${rowIndex}`
  );

  function doSync() {
    previewYear.textContent = yearEl.value;
    previewMonth.textContent = monthEl.value;
    previewHistory.textContent = histEl.value;
    splitPagesIfOverflow();
  }
  yearEl.addEventListener("input", doSync);
  monthEl.addEventListener("input", doSync);
  histEl.addEventListener("input", doSync);
  doSync();
}
syncSkillRow(defLicenseYear, defLicenseMonth, defSkillHistory, 1);

// 年・月セレクトに値を入れる（免許・資格）
function populateYearMonthSkill(selectYear, selectMonth) {
  for (let y = 1900; y <= yearNow; y++) {
    const opt = document.createElement("option");
    opt.value = y;
    opt.textContent = y;
    selectYear.appendChild(opt);
  }
  for (let i = 1; i <= 12; i++) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = i;
    selectMonth.appendChild(opt);
  }
}
populateYearMonthSkill(defLicenseYear, defLicenseMonth);

// 「＋ 追加する」ボタン（免許・資格）
document.getElementById("add-skill-row").addEventListener("click", () => {
  if (currentSkillRows >= maxSkillRows) {
    alert("免許・資格は最大6行までです。");
    return;
  }
  currentSkillRows++;
  const rowIndex = currentSkillRows;

  // 左側フォームに新しい行DOM
  const row = document.createElement("div");
  row.className = "row-container";
  row.innerHTML = `
    <div class="form-inline">
      <select class="license-year"><option value="">--</option></select>
      <select class="license-month"><option value="">--</option></select>
      <input
        type="text"
        class="skill-history"
        placeholder="例：英語検定2級"
        style="text-align: left;"
      />
    </div>
  `;
  skillContainer.appendChild(row);

  const yearEl = row.querySelector(".license-year");
  const monthEl = row.querySelector(".license-month");
  const histEl = row.querySelector(".skill-history");
  populateYearMonthSkill(yearEl, monthEl);

  syncSkillRow(yearEl, monthEl, histEl, rowIndex);
});

// 「－ 削除」ボタン（免許・資格）
document.getElementById("remove-skill-last").addEventListener("click", () => {
  if (currentSkillRows > 1) {
    const rows = skillContainer.querySelectorAll(".row-container");
    skillContainer.removeChild(rows[rows.length - 1]);

    // 右側プレビュー該当行を空に
    document.getElementById(
      `skill-preview-year-${currentSkillRows}`
    ).textContent = "";
    document.getElementById(
      `skill-preview-month-${currentSkillRows}`
    ).textContent = "";
    document.getElementById(
      `skill-preview-history-${currentSkillRows}`
    ).textContent = "";

    currentSkillRows--;
    splitPagesIfOverflow();
  }
});

/************************************************************
 * 8) ページ溢れチェック → 溢れたら次ページへ
 ************************************************************/
function splitPagesIfOverflow() {
  let pages = pagesContainer.querySelectorAll(".resume-page");
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const content = page.querySelector(".resume-content");
    if (!content) continue;

    // オーバーフローしていれば末尾の .block を次ページへ
    while (checkOverflow(page, content)) {
      let nextPage = pages[i + 1];
      if (!nextPage) {
        nextPage = createBlankPage();
        pages = pagesContainer.querySelectorAll(".resume-page");
      }
      const nextContent = nextPage.querySelector(".resume-content");
      const blocks = content.querySelectorAll(".block");
      if (!blocks.length) break;
      const lastBlock = blocks[blocks.length - 1];
      nextContent.insertBefore(lastBlock, nextContent.firstChild);
    }
  }
}

function createBlankPage() {
  const pageEl = document.createElement("div");
  pageEl.classList.add("resume-page");
  pageEl.innerHTML = `
    <div class="resume-preview">
      <div class="resume-content"></div>
    </div>
  `;
  pagesContainer.appendChild(pageEl);
  return pageEl;
}

function checkOverflow(pageEl, contentEl) {
  return contentEl.scrollHeight > pageEl.clientHeight;
}

/************************************************************
 * チェックボックスでPDF保存ボタンの状態を切り替える
 ************************************************************/
const pdfSaveBtn = document.getElementById("pdf-save-btn");
const agreeTerms = document.getElementById("agree-terms");

// チェック時/非チェック時にボタンのdisableと色を切り替える関数
function updatePdfButtonState() {
  if (agreeTerms.checked) {
    pdfSaveBtn.disabled = false;
    pdfSaveBtn.style.background = "#2ecc71"; // 通常の緑色
    pdfSaveBtn.style.cursor = "pointer";
  } else {
    pdfSaveBtn.disabled = true;
    pdfSaveBtn.style.background = "#ccc";
    pdfSaveBtn.style.cursor = "not-allowed";
  }
}
agreeTerms.addEventListener("change", updatePdfButtonState);
updatePdfButtonState();

/************************************************************
 * 9) PDF保存ボタン
 ************************************************************/
pdfSaveBtn.addEventListener("click", async () => {
  if (!agreeTerms.checked) {
    alert("利用規約に同意する必要があります。");
    return;
  }

  // ▼ ボタンを押したことを視覚的に示すための処理
  // 1) ボタン無効化
  pdfSaveBtn.disabled = true;
  // 2) 元のテキストを保存し、"生成中..."に変更
  const originalText = pdfSaveBtn.textContent;
  pdfSaveBtn.textContent = "生成中...";

  // 3) スピナー要素を作成してボタン内に挿入
  const spinnerEl = document.createElement("span");
  spinnerEl.classList.add("spinner"); // 既存CSSの.spinnerを利用
  pdfSaveBtn.appendChild(spinnerEl);

  // ページ溢れチェック
  splitPagesIfOverflow();

  // 送信例データ
  const sendData = {
    createdDate: new Date().toLocaleString(),
    name: document.getElementById("input-name").value,
    phone: document.getElementById("input-phone").value,
    email: document.getElementById("input-email").value,
    gender: document.getElementById("gender").value,
    age: document.getElementById("age").value,
    address: document.getElementById("input-address").value,
  };

  // GASへ送信（不要なら削除OK）
  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(sendData),
    });
    const resultText = await response.text();
    console.log("GAS送信結果:", resultText);
    alert("履歴書が完成しました: " + resultText);
  } catch (e) {
    console.error("GAS送信エラー:", e);
    alert("エラーが発生しました");
  }

  // PDF作成
  try {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("portrait", "pt", "a4");
    const pageElems = document.querySelectorAll(".resume-page");

    for (let i = 0; i < pageElems.length; i++) {
      if (i > 0) pdf.addPage();

      // html2canvasでページ全体を画像化
      const canvas = await html2canvas(pageElems[i], { scale: 2 });
      const imgData = canvas.toDataURL("image/jpeg", 1.0);

      // PDF内部の寸法に合わせて画像を描画
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidthPx = canvas.width;
      const imgHeightPx = canvas.height;
      const scale = pdfWidth / imgWidthPx;
      const imgHeightInPdf = imgHeightPx * scale;

      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, imgHeightInPdf);
    }

    pdf.save("履歴書.pdf");
  } catch (error) {
    console.error("PDF生成エラー:", error);
    alert("PDF生成中にエラーが発生しました");
  } finally {
    // ▼ 処理が終わったらボタンを元に戻す
    pdfSaveBtn.removeChild(spinnerEl);
    pdfSaveBtn.textContent = originalText;
    pdfSaveBtn.disabled = false;
  }

  // ▼ PDF保存後にモーダルを表示する（追加部分）
  const postPdfModal = document.getElementById("post-pdf-modal-overlay");
  if (postPdfModal) {
    postPdfModal.style.display = "flex"; // モーダルを表示
  }
});

/************************************************************
 * PDFダウンロード後のモーダル「はい/いいえ」ボタン
 ************************************************************/
// 「はい」→ syokumu.html へ遷移
const postPdfYesBtn = document.getElementById("post-pdf-yes-btn");
if (postPdfYesBtn) {
  postPdfYesBtn.addEventListener("click", () => {
    window.location.href = "syokumu.html";
  });
}

// 「いいえ」→ モーダル閉じる
const postPdfNoBtn = document.getElementById("post-pdf-no-btn");
if (postPdfNoBtn) {
  postPdfNoBtn.addEventListener("click", () => {
    const postPdfModal = document.getElementById("post-pdf-modal-overlay");
    if (postPdfModal) {
      postPdfModal.style.display = "none";
    }
  });
}

/************************************************************
 * 志望動機 (モーダル) の自動生成ロジック
 ************************************************************/
const openMotivationModalBtn = document.getElementById("open-motivation-modal");
const closeMotivationModalBtn = document.getElementById(
  "close-motivation-modal"
);
const motivationModalOverlay = document.getElementById(
  "motivation-modal-overlay"
);
const bulletPointsInput = document.getElementById("motivation-bullet-points");
const generateButton = document.getElementById("generate-motivation");
const motivationInput = document.getElementById("input-motivation");

// モーダル開閉
openMotivationModalBtn.addEventListener("click", () => {
  motivationModalOverlay.style.display = "flex";
});
closeMotivationModalBtn.addEventListener("click", () => {
  motivationModalOverlay.style.display = "none";
});

// 志望動機用ワークフローID・APIキー（例）
const MOTIVATION_WORKFLOW_ID = "07d33ea3-4e66-4924-9953-aa333df723f5";
const MOTIVATION_API_KEY = "Bearer app-9RoCGLstEdkBeg591WYtlLu3";

generateButton.addEventListener("click", async () => {
  const bulletPoints = bulletPointsInput.value.trim();
  if (!bulletPoints) {
    alert("箇条書きの内容を入力してください。");
    return;
  }

  // スピナーを付けて生成中状態に
  generateButton.disabled = true;
  generateButton.textContent = "生成中...";
  const spinner = document.createElement("span");
  spinner.classList.add("spinner");
  generateButton.appendChild(spinner);

  try {
    const requestBody = {
      workflow_id: MOTIVATION_WORKFLOW_ID,
      inputs: { text: bulletPoints },
      user: "guest_user",
    };

    const response = await fetch("https://api.dify.ai/v1/workflows/run", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: MOTIVATION_API_KEY,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Dify APIエラー: ${response.status} ${
          response.statusText
        } - ${JSON.stringify(errorData)}`
      );
    }

    const data = await response.json();
    console.log("志望動機レスポンス:", data);
    const generatedText = data?.data?.outputs?.text || "生成テキストなし";

    // テキストエリアに反映
    motivationInput.value = generatedText;
    // プレビュー更新
    motivationInput.dispatchEvent(new Event("input"));

    alert("志望動機を自動生成しました。");
  } catch (error) {
    console.error(error);
    alert("エラーが発生しました(志望動機): " + error.message);
  } finally {
    // スピナー解除
    generateButton.removeChild(spinner);
    generateButton.disabled = false;
    generateButton.textContent = "志望動機を自動生成";
  }
});

/************************************************************
 * 自己PR (モーダル) の自動生成ロジック
 ************************************************************/
const openPrModalBtn = document.getElementById("open-pr-modal");
const closePrModalBtn = document.getElementById("close-pr-modal");
const prModalOverlay = document.getElementById("pr-modal-overlay");
const prBulletPointsInput = document.getElementById("pr-bullet-points");
const generatePrButton = document.getElementById("generate-pr");
const prInput = document.getElementById("input-pr");

// モーダル開閉
openPrModalBtn.addEventListener("click", () => {
  prModalOverlay.style.display = "flex";
});
closePrModalBtn.addEventListener("click", () => {
  prModalOverlay.style.display = "none";
});

// 自己PR用ワークフローID・APIキー（例）
const PR_WORKFLOW_ID = "7a85b2a7-f6ea-4e9a-a314-d1cd429dd5dd";
const PR_API_KEY = "Bearer app-VLBnOuNkP29lZj7ge6yVA5I6";

generatePrButton.addEventListener("click", async () => {
  const bulletPoints = prBulletPointsInput.value.trim();
  if (!bulletPoints) {
    alert("箇条書きの内容を入力してください。");
    return;
  }

  // スピナーを付けて生成中状態に
  generatePrButton.disabled = true;
  generatePrButton.textContent = "生成中...";
  const spinner = document.createElement("span");
  spinner.classList.add("spinner");
  generatePrButton.appendChild(spinner);

  try {
    const requestBody = {
      workflow_id: PR_WORKFLOW_ID,
      inputs: { text: bulletPoints },
      user: "guest_user",
    };

    const response = await fetch("https://api.dify.ai/v1/workflows/run", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: PR_API_KEY,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Dify APIエラー: ${response.status} ${
          response.statusText
        } - ${JSON.stringify(errorData)}`
      );
    }

    const data = await response.json();
    console.log("自己PRレスポンス:", data);
    const generatedText = data?.data?.outputs?.text || "生成テキストなし";

    // テキストエリアに反映
    prInput.value = generatedText;
    // プレビュー更新
    prInput.dispatchEvent(new Event("input"));

    alert("自己PRを自動生成しました。");
  } catch (error) {
    console.error(error);
    alert("エラーが発生しました(自己PR): " + error.message);
  } finally {
    // スピナー解除
    generatePrButton.removeChild(spinner);
    generatePrButton.disabled = false;
    generatePrButton.textContent = "自己PRを自動生成";
  }
});

/************************************************************
 * 10) ズーム機能の実装
 ************************************************************/
const zoomInBtn = document.getElementById("zoom-in");
const zoomOutBtn = document.getElementById("zoom-out");
const zoomLevelEl = document.getElementById("zoom-level");
let currentZoom = 1.0; // 初期倍率

zoomInBtn.addEventListener("click", () => {
  currentZoom += 0.1;
  if (currentZoom > 2.0) currentZoom = 2.0; // 200%上限
  applyZoom();
});

zoomOutBtn.addEventListener("click", () => {
  currentZoom -= 0.1;
  if (currentZoom < 0.5) currentZoom = 0.5; // 50%下限
  applyZoom();
});

function applyZoom() {
  const pages = document.querySelector(".resume-pages");
  pages.style.transform = `scale(${currentZoom})`;
  pages.style.transformOrigin = `top center`;
  zoomLevelEl.textContent = Math.round(currentZoom * 100) + "%";
}
