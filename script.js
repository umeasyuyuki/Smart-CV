/************************************************************
 * 1) GAS連携用URL（ダミーURLを必要に応じて差し替えてください）
 ************************************************************/
const scriptURL =
  "https://script.google.com/macros/s/AKfycbyYmqbjwwkZlxWNfFVZi8ORT0mHw0sh9VlpYBcVsYz_UZSB63OM6LOya0UAZgZgCyhGpw/exec";

/************************************************************
 * 2) 履歴書HTMLテンプレート
 ************************************************************/
// 学歴・職歴12行、免許・資格6行をあらかじめテーブルに用意
const resumeTemplate = `
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
          <!-- 12行 -->
          ${[...Array(12)].map((_, i) => {
            const row = i + 1;
            return `
              <tr id="edu-row-${row}" class="education-value">
                <td class="education-year-value" id="edu-preview-year-${row}"></td>
                <td class="education-container-month-value" id="edu-preview-month-${row}"></td>
                <td class="education-history-value" id="edu-preview-work-${row}"></td>
              </tr>
            `;
          }).join("")}
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
          <!-- 6行 -->
          ${[...Array(6)].map((_, i) => {
            const row = i + 1;
            return `
              <tr id="skill-row-${row}" class="skill-value">
                <td class="skill-year-value" id="skill-preview-year-${row}"></td>
                <td class="skill-container-month-value" id="skill-preview-month-${row}"></td>
                <td class="skill-history-value" id="skill-preview-history-${row}"></td>
              </tr>
            `;
          }).join("")}
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


// コンテナ
const pagesContainer = document.getElementById("resume-pages");

/************************************************************
 * 3) 1ページ目を自動生成
 ************************************************************/
function createNewPageDOM() {
  const pageEl = document.createElement("div");
  pageEl.classList.add("resume-page");
  pageEl.innerHTML = resumeTemplate;
  pagesContainer.appendChild(pageEl);
  return pageEl;
}
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
  const todayDateEl = document.getElementById("preview-today-date");
  todayDateEl.textContent = `令和 ${reiwa} 年 ${m} 月 ${d} 日現在`;
}
setTodayDate();

/************************************************************
 * 5) フォーム入力とプレビューの同期
 ************************************************************/
// 汎用関数
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

// 名前・住所など
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

// 生年月日（年・月・日）
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
[birthYear, birthMonth, birthDay].forEach(el =>
  el.addEventListener("input", syncBirth)
);

// 年齢
bindTextSync("#age", "#preview-age");
// 性別
bindTextSync("#gender", "#preview-gender");

// 写真
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

// 生年月日selectに値を入れる
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

// 年月選択肢
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

document.getElementById("add-education-row").addEventListener("click", () => {
  if (currentEduRows >= maxEduRows) {
    alert("学歴・職歴は最大12行までです。");
    return;
  }
  currentEduRows++;
  const rowIndex = currentEduRows;

  // 左側に新しい行DOM
  const row = document.createElement("div");
  row.className = "row-container";
  row.innerHTML = `
    <div class="form-inline">
      <select class="edu-year"><option value="">--</option></select>
      <select class="edu-month"><option value="">--</option></select>
      <input type="text" class="edu-work" placeholder="" />
    </div>
  `;
  eduContainer.appendChild(row);

  // populate
  const newYear = row.querySelector(".edu-year");
  const newMonth = row.querySelector(".edu-month");
  const newWork = row.querySelector(".edu-work");
  populateYearMonth(newYear, newMonth);

  // 同期
  syncEduRow(newYear, newMonth, newWork, rowIndex);
});

document.getElementById("remove-education-last").addEventListener("click", () => {
  if (currentEduRows > 1) {
    const rows = eduContainer.querySelectorAll(".row-container");
    eduContainer.removeChild(rows[rows.length - 1]);

    // 右側の該当行を空に
    document.getElementById(`edu-preview-year-${currentEduRows}`).textContent = "";
    document.getElementById(`edu-preview-month-${currentEduRows}`).textContent = "";
    document.getElementById(`edu-preview-work-${currentEduRows}`).textContent = "";

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
  const previewMonth = document.getElementById(`skill-preview-month-${rowIndex}`);
  const previewHistory = document.getElementById(`skill-preview-history-${rowIndex}`);

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

// 年月選択肢
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

document.getElementById("add-skill-row").addEventListener("click", () => {
  if (currentSkillRows >= maxSkillRows) {
    alert("免許・資格は最大6行までです。");
    return;
  }
  currentSkillRows++;
  const rowIndex = currentSkillRows;

  // 左側に新しい行DOM
  const row = document.createElement("div");
  row.className = "row-container";
  row.innerHTML = `
    <div class="form-inline">
      <select class="license-year"><option value="">--</option></select>
      <select class="license-month"><option value="">--</option></select>
      <input type="text" class="skill-history" placeholder="" style="text-align: left;" />
    </div>
  `;
  skillContainer.appendChild(row);

  const yearEl = row.querySelector(".license-year");
  const monthEl = row.querySelector(".license-month");
  const histEl = row.querySelector(".skill-history");
  populateYearMonthSkill(yearEl, monthEl);

  syncSkillRow(yearEl, monthEl, histEl, rowIndex);
});

document.getElementById("remove-skill-last").addEventListener("click", () => {
  if (currentSkillRows > 1) {
    const rows = skillContainer.querySelectorAll(".row-container");
    skillContainer.removeChild(rows[rows.length - 1]);

    document.getElementById(`skill-preview-year-${currentSkillRows}`).textContent = "";
    document.getElementById(`skill-preview-month-${currentSkillRows}`).textContent = "";
    document.getElementById(`skill-preview-history-${currentSkillRows}`).textContent = "";

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
 * 9) PDF保存ボタン
 ************************************************************/
document.getElementById("pdf-save-btn").addEventListener("click", async () => {
  // ページ分割確定
  splitPagesIfOverflow();

  // 送信例データ
  const sendData = {
    createdDate: new Date().toLocaleString(),
    name: document.getElementById("input-name").value,
    phone: document.getElementById("input-phone").value,
    email: document.getElementById("input-email").value,
    gender: document.getElementById("gender").value,
    age: document.getElementById("age").value,
    address: document.getElementById("input-address").value
  };

  // GASへ送信
  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(sendData),
    });
    const resultText = await response.text();
    console.log("GAS送信結果:", resultText);
    alert("GAS送信が完了しました: " + resultText);
  } catch (e) {
    console.error("GAS送信エラー:", e);
    alert("GAS送信中にエラーが発生しました");
  }

  // PDF生成
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("portrait", "pt", "a4");
  const pageElems = document.querySelectorAll(".resume-page");

  for (let i = 0; i < pageElems.length; i++) {
    if (i > 0) pdf.addPage();
    const canvas = await html2canvas(pageElems[i], { scale: 2 });
    const imgData = canvas.toDataURL("image/jpeg", 1.0);

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidthPx = canvas.width;
    const imgHeightPx = canvas.height;
    const scale = pdfWidth / imgWidthPx;
    const imgHeightInPdf = imgHeightPx * scale;

    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, imgHeightInPdf);
  }

  pdf.save("履歴書.pdf");
});

/************************************************************
 * 10) 「一括生成する」ボタン
 ************************************************************/
document.getElementById("bulk-generate-btn").addEventListener("click", () => {
  const file = document.getElementById("resume-file").files[0];
  const additional = document.getElementById("additional-info").value;
  alert(
    "『一括生成する』が押されました。ファイル=" +
      file +
      ", 情報=" +
      additional
  );
});
