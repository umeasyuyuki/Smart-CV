<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8"/>
  <title>職務経歴書ジェネレータ</title>
  <style>
    /* ページ全体レイアウトや枠線、印刷用の設定など */
    body {
      margin: 0;
      padding: 0;
      font-family: sans-serif;
    }
    .container {
      display: flex;
      gap: 20px;
      margin: 20px;
    }
    .left-column {
      width: 300px;
      flex-shrink: 0;
    }
    .right-column {
      flex: 1;
    }

    .resume-page {
      width: 595px;  /* A4 幅 210mm (約595pt相当) */
      height: 842px; /* A4 高さ 297mm (約842pt相当) */
      margin: 0 auto 20px auto; 
      padding: 40px; 
      box-sizing: border-box;
      border: 1px solid #ccc;
      position: relative;
      overflow: hidden; /* 溢れチェック用 */
      page-break-after: always; /* 印刷時ページ区切り */
    }
    .preview-title {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
      text-align: center;
    }
    .top-right {
      position: absolute;
      top: 20px;
      right: 20px;
      text-align: right;
      font-size: 14px;
    }
    .preview-section-title {
      font-size: 16px;
      font-weight: bold;
      margin-top: 20px;
      margin-bottom: 10px;
      border-bottom: 1px solid #000;
      padding-bottom: 4px;
    }

    /* 職務要約のブロック */
    .summary-block {
      white-space: pre-wrap;
      margin-bottom: 10px;
    }

    /* 職歴テーブルなど */
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 10px;
      border: 1px solid #000; /* 表全体の枠線 */
    }
    th, td {
      border: 1px solid #000;
      padding: 4px 6px;
      vertical-align: top;
    }
    .career-format-table th {
      background-color: #f0f0f0;
    }

    /* ボタン */
    button {
      margin-top: 10px;
    }

    .sub-section {
      margin-bottom: 15px;
    }
  </style>
</head>
<body>

<div class="container">
  <!-- (A) 左カラム (入力フォーム) -->
  <div class="left-column">
    <h2>職務経歴書ジェネレータ</h2>
    <div>
      <label>名前</label><br>
      <input type="text" id="input-name" placeholder="例：山田 太郎">
    </div>
    <div>
      <label>電話番号</label><br>
      <input type="text" id="input-tel" placeholder="例：090-XXXX-XXXX">
    </div>
    <div>
      <label>メールアドレス</label><br>
      <input type="text" id="input-mail" placeholder="例：mail@example.com">
    </div>
    <div>
      <label>職務要約</label><br>
      <textarea id="input-summary" rows="4" placeholder="最大300字"></textarea>
      <div id="char-counter">0 / 300字</div>
    </div>

    <div>
      <label>活かせる経験・知識・技術</label><br>
      <textarea id="input-skill" rows="3"></textarea>
    </div>
    <div>
      <label>自己PR</label><br>
      <textarea id="input-pr" rows="3"></textarea>
    </div>

    <hr>

    <h3>職歴</h3>
    <div id="career-container">
      <div class="sub-section" id="career-first" style="margin-bottom:10px;">
        <label>期間</label>
        <input type="text" id="career1-period"><br>
        <label>会社名</label>
        <input type="text" id="career1-company"><br>
        <label>雇用形態</label>
        <input type="text" id="career1-employment"><br>
        <label>役職</label>
        <input type="text" id="career1-position"><br>
        <label>事業内容</label>
        <textarea id="career1-business"></textarea><br>
        <label>業務内容</label>
        <textarea id="career1-duty"></textarea><br>
        <label>実績</label>
        <textarea id="career1-achievement"></textarea><br>
        <label>従業員数</label>
        <input type="text" id="career1-empcount"><br>
        <label>資本金</label>
        <input type="text" id="career1-capital"><br>
        <label>株式市場</label>
        <input type="text" id="career1-market">
      </div>
    </div>
    <button id="add-career-row">職歴を追加</button>
    <button id="remove-career-row">削除</button>

    <hr>

    <h3>免許・資格</h3>
    <div id="license-container">
      <div class="sub-section" id="license-first" style="margin-bottom:10px;">
        <label>年</label>
        <input type="text" id="license1-year" placeholder="例：2025"><br>
        <label>月</label>
        <input type="text" id="license1-month" placeholder="例：01"><br>
        <label>免許・資格名</label>
        <input type="text" id="license1-name" placeholder="例：普通自動車免許">
      </div>
    </div>
    <button id="add-license-row">資格を追加</button>
    <button id="remove-license-row">削除</button>

    <hr>

    <h3>語学</h3>
    <div id="lang-container">
      <div class="sub-section" id="lang-first" style="margin-bottom:10px;">
        <label>語学</label>
        <input type="text" id="lang1-lang" placeholder="例：英語"><br>
        <label>レベル</label>
        <input type="text" id="lang1-level" placeholder="例：ビジネス会話レベル">
      </div>
    </div>
    <button id="add-lang-row">語学を追加</button>
    <button id="remove-lang-row">削除</button>

    <hr>

    <div>
      <label>添付ファイル（例: PDF）</label><br>
      <input type="file" id="resume-file">
      <button id="download-uploaded-file">アップロード済みファイル ダウンロード</button>
    </div>
    <hr>

    <button id="bulk-generate-btn">一括生成（例：API解析）</button>
    <br><br>
    <button id="download-pdf">PDFダウンロード</button>
  </div><!-- /.left-column -->

  <!-- (B) 右カラム (プレビュー) -->
  <div class="right-column">
    <div id="resumePages"></div>
  </div>
</div>

<!-- (C) スクリプト -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>


```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<script>
/***************************************************
 * (A) 連携先URLなどの設定 (例：実際には適宜修正)
 ***************************************************/
const scriptURL =
  "https://script.google.com/macros/u/2/s/AKfycbzJCzE2eCpXSnKWU0Q3papybktyrrQV3h74tD0yZyHwTPwmkFZPwXJvGCzHhoXaH3dNOg/exec"; // Google Apps Scriptなど
const difyUploadURL = "https://api.dify.ai/v1/files/upload"; // 例
const difyAPIKey = "app-nec0NdADJDdpecQKQYvtxzmD"; // ダミーキー

/***************************************************
 * (B) グローバル変数
 ***************************************************/
let selectedFile = null; // ユーザーがアップロード選択したファイル
let uploadedFileURL = null; // 解析APIなどで生成されたファイルURLを格納

/***************************************************
 * (C) ページ初期化
 ***************************************************/
document.addEventListener("DOMContentLoaded", () => {
  console.log("[DEBUG] DOMContentLoaded: setting up...");

  const today = new Date();
  window.currentDateString = `${today.getFullYear()}年${String(
    today.getMonth() + 1
  ).padStart(2, "0")}月${String(today.getDate()).padStart(2, "0")}日`;

  // イベントバインド等セットアップ
  setupBindings();
  updatePreviewPages();

  // PDFダウンロード
  const pdfBtn = document.getElementById("download-pdf");
  if (pdfBtn) {
    pdfBtn.addEventListener("click", handleDownloadPDF);
  }

  // ファイルアップロード
  const fileInput = document.getElementById("resume-file");
  if (fileInput) {
    fileInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files.length > 0) {
        selectedFile = e.target.files[0];
        alert("ファイルが選択されました: " + selectedFile.name);
      }
    });
  }

  // ダウンロードボタン（アップロード済みファイル）
  const downloadBtn = document.getElementById("download-uploaded-file");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", handleDownloadUploadedFile);
  }

  // 一括生成ボタン
  const bulkBtn = document.getElementById("bulk-generate-btn");
  if (bulkBtn) {
    bulkBtn.addEventListener("click", handleBulkGenerate);
  }

  // 職務要約の文字数カウント
  const summaryInput = document.getElementById("input-summary");
  const charCounter = document.getElementById("char-counter");
  if (summaryInput && charCounter) {
    summaryInput.addEventListener("input", () => {
      const currentLength = summaryInput.value.length;
      charCounter.textContent = `${currentLength} / 300字`;
    });
  }

  console.log("[DEBUG] Initialization complete.");
});

/***************************************************
 * (D) 一括生成する (例：API解析)
 *     ※ Dify API側がCORS許可していない場合はエラーになる可能性があります
 ***************************************************/
async function handleBulkGenerate() {
  if (!selectedFile) {
    alert("ファイルが選択されていません。");
    return;
  }
  try {
    const formData = new FormData();
    formData.append("file", selectedFile);

    // 例：Dify APIに送る場合（CORS対応していないとブラウザでブロックされるかも）
    const response = await fetch(difyUploadURL, {
      method: "POST",
      // mode: "cors", // ← DifyがCORS許可ならこれ
      // もしCORS未対応なら "no-cors" にするが、結果を受け取れなくなるので注意
      headers: { "x-api-key": difyAPIKey },
      body: formData,
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error("Difyへの送信に失敗: " + errText);
    }

    const result = await response.json();
    console.log("[DEBUG] Dify解析結果:", result);

    // APIの応答をフォームに反映（例）
    if (result.fileURL) {
      uploadedFileURL = result.fileURL;
    }
    if (result.name) {
      document.getElementById("input-name").value = result.name;
    }
    if (result.tel) {
      document.getElementById("input-tel").value = result.tel;
    }
    if (result.mail) {
      document.getElementById("input-mail").value = result.mail;
    }
    if (result.summary) {
      document.getElementById("input-summary").value = result.summary;
    }

    updatePreviewPages();
    alert("Dify解析結果をフォームに反映しました。");
  } catch (error) {
    console.error("[DEBUG] handleBulkGenerate error:", error);
    alert("エラーが発生しました: " + error.message);
  }
}

/***************************************************
 * (E) アップロード済みファイルのダウンロード (例)
 ***************************************************/
function handleDownloadUploadedFile() {
  if (!uploadedFileURL) {
    alert("まだファイルがアップロードされていません。");
    return;
  }
  const a = document.createElement("a");
  a.href = uploadedFileURL;
  a.download = "";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/***************************************************
 * (F) 入力フォームとプレビュー更新バインド
 ***************************************************/
function setupBindings() {
  function bindText(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("input", updatePreviewPages);
  }

  // 基本情報
  bindText("input-name");
  bindText("input-tel");
  bindText("input-mail");

  // 職務要約
  bindText("input-summary");

  // 活かせる経験・知識・技術, 自己PR
  bindText("input-skill");
  bindText("input-pr");

  // 職歴（1つ目）
  bindText("career1-period");
  bindText("career1-company");
  bindText("career1-employment");
  bindText("career1-position");
  bindText("career1-business");
  bindText("career1-duty");
  bindText("career1-achievement");
  bindText("career1-empcount");
  bindText("career1-capital");
  bindText("career1-market");

  // ★ 免許・資格（初期表示分）★
  bindText("license1-year");
  bindText("license1-month");
  bindText("license1-name");

  // ★ 語学（初期表示分）★
  bindText("lang1-lang");
  bindText("lang1-level");

  // 職歴・免許・語学の追加/削除
  setupAddRemoveCareer();
  setupAddRemoveLicense();
  setupAddRemoveLang();
}

/***************************************************
 * (F+) ★ テーブルの上線だけ消す関数を追加 ★
 ***************************************************/
function removeTableTopLine(wrapperElem) {
  const tables = wrapperElem.querySelectorAll("table");
  tables.forEach((table) => {
    table.style.borderTop = "none";
  });
}

/***************************************************
 * (G) 職歴・免許・語学の 追加/削除
 ***************************************************/
// ▼ 職歴
let careerCount = 1;
function setupAddRemoveCareer() {
  const addBtn = document.getElementById("add-career-row");
  const removeBtn = document.getElementById("remove-career-row");
  const container = document.getElementById("career-container");
  const firstBlock = document.getElementById("career-first");

  removeTableTopLine(firstBlock);

  if (addBtn) {
    addBtn.addEventListener("click", () => {
      careerCount++;
      const clone = firstBlock.cloneNode(true);
      // ID再採番 + イベントリスナー
      clone.querySelectorAll('[id^="career1-"]').forEach((elem) => {
        const newId = elem.id.replace("career1-", `career${careerCount}-`);
        elem.id = newId;
        elem.value = "";
        elem.addEventListener("input", updatePreviewPages);
      });

      let wrapper = document.createElement("div");
      wrapper.className = "sub-section";
      wrapper.style.borderTop = "1px solid #000";
      wrapper.style.marginTop = "10px";
      wrapper.style.paddingTop = "10px";
      wrapper.style.marginBottom = "10px";

      wrapper.appendChild(clone);
      container.appendChild(wrapper);
      removeTableTopLine(wrapper);

      updatePreviewPages();
    });
  }

  if (removeBtn) {
    removeBtn.addEventListener("click", () => {
      if (container.children.length > 1) {
        container.removeChild(container.lastElementChild);
        careerCount--;
      } else {
        firstBlock.querySelectorAll('[id^="career1-"]').forEach((elem) => {
          elem.value = "";
        });
      }
      updatePreviewPages();
    });
  }
}

// ▼ 免許・資格
let licenseCount = 1;
function setupAddRemoveLicense() {
  const addBtn = document.getElementById("add-license-row");
  const removeBtn = document.getElementById("remove-license-row");
  const licenseContainer = document.getElementById("license-container");
  const firstLicense = document.getElementById("license-first");

  removeTableTopLine(firstLicense);

  if (addBtn) {
    addBtn.addEventListener("click", () => {
      licenseCount++;
      let clone = firstLicense.cloneNode(true);
      clone.querySelectorAll('[id^="license1-"]').forEach((elem) => {
        let newId = elem.id.replace("license1-", `license${licenseCount}-`);
        elem.id = newId;
        elem.value = "";
        elem.addEventListener("input", updatePreviewPages);
      });
      let wrapper = document.createElement("div");
      wrapper.className = "sub-section";
      wrapper.style.borderTop = "1px solid #000";
      wrapper.style.marginTop = "10px";
      wrapper.style.paddingTop = "10px";
      wrapper.style.marginBottom = "10px";

      wrapper.appendChild(clone);
      licenseContainer.appendChild(wrapper);
      removeTableTopLine(wrapper);

      updatePreviewPages();
    });
  }
  if (removeBtn) {
    removeBtn.addEventListener("click", () => {
      if (licenseContainer.children.length > 1) {
        licenseContainer.removeChild(licenseContainer.lastElementChild);
        licenseCount--;
      } else {
        firstLicense.querySelectorAll('[id^="license1-"]').forEach((elem) => {
          elem.value = "";
        });
      }
      updatePreviewPages();
    });
  }
}

// ▼ 語学
let langCount = 1;
function setupAddRemoveLang() {
  const addBtn = document.getElementById("add-lang-row");
  const removeBtn = document.getElementById("remove-lang-row");
  const langContainer = document.getElementById("lang-container");
  const firstLang = document.getElementById("lang-first");

  removeTableTopLine(firstLang);

  if (!addBtn || !removeBtn || !langContainer || !firstLang) return;

  addBtn.addEventListener("click", () => {
    langCount++;
    let clone = firstLang.cloneNode(true);
    clone.querySelectorAll('[id^="lang1-"]').forEach((elem) => {
      let newId = elem.id.replace("lang1-", `lang${langCount}-`);
      elem.id = newId;
      elem.value = "";
      elem.addEventListener("input", updatePreviewPages);
    });
    let wrapper = document.createElement("div");
    wrapper.className = "sub-section";
    wrapper.style.borderTop = "1px solid #000";
    wrapper.style.marginTop = "10px";
    wrapper.style.paddingTop = "10px";
    wrapper.style.marginBottom = "10px";

    wrapper.appendChild(clone);
    langContainer.appendChild(wrapper);
    removeTableTopLine(wrapper);

    updatePreviewPages();
  });

  removeBtn.addEventListener("click", () => {
    if (langContainer.children.length > 1) {
      langContainer.removeChild(langContainer.lastElementChild);
      langCount--;
    } else {
      firstLang.querySelectorAll('[id^="lang1-"]').forEach((elem) => {
        elem.value = "";
      });
    }
    updatePreviewPages();
  });
}

/***************************************************
 * (H) 右カラムのプレビュー生成
 ***************************************************/
function updatePreviewPages() {
  const wrap = document.getElementById("resumePages");
  if (!wrap) return;
  wrap.innerHTML = "";

  function createNewPage() {
    const page = document.createElement("div");
    page.className = "resume-page";
    wrap.appendChild(page);
    return page;
  }

  let currentPage = createNewPage();

  // タイトル & 基本情報
  currentPage.appendChild(makeTitleBlock());

  // 職務要約
  currentPage.appendChild(makeSectionTitle("職務要約"));
  {
    const text = docVal("input-summary");
    const summaryBlock = document.createElement("div");
    summaryBlock.classList.add("summary-block");
    summaryBlock.textContent = text;
    if (isOverflowAfterAppend(currentPage, summaryBlock)) {
      currentPage = createNewPage();
      currentPage.appendChild(makeSectionTitle("職務要約"));
    }
    currentPage.appendChild(summaryBlock);
  }

  // 職歴
  currentPage.appendChild(makeSectionTitle("職歴"));
  for (let i = 1; i <= careerCount; i++) {
    const block = makeCareerBlock(i);
    if (isOverflowAfterAppend(currentPage, block)) {
      currentPage = createNewPage();
      currentPage.appendChild(makeSectionTitle("職歴"));
    }
    currentPage.appendChild(block);
  }

  // 免許・資格
  currentPage.appendChild(makeSectionTitle("免許・資格"));
  for (let i = 1; i <= licenseCount; i++) {
    const table = makeLicenseTable(i);
    table.classList.add("license-table");
    if (isOverflowAfterAppend(currentPage, table)) {
      currentPage = createNewPage();
      currentPage.appendChild(makeSectionTitle("免許・資格"));
    }
    currentPage.appendChild(table);
  }

  // 語学
  currentPage.appendChild(makeSectionTitle("語学"));
  for (let i = 1; i <= langCount; i++) {
    const table = makeLangTable(i);
    table.classList.add("lang-table");
    if (isOverflowAfterAppend(currentPage, table)) {
      currentPage = createNewPage();
      currentPage.appendChild(makeSectionTitle("語学"));
    }
    currentPage.appendChild(table);
  }

  // 活かせる経験・知識・技術
  currentPage.appendChild(makeSectionTitle("活かせる経験・知識・技術"));
  {
    const text = docVal("input-skill");
    const block = document.createElement("div");
    block.style.whiteSpace = "pre-wrap";
    block.style.wordWrap = "break-word";
    block.textContent = text;
    if (isOverflowAfterAppend(currentPage, block)) {
      currentPage = createNewPage();
      currentPage.appendChild(
        makeSectionTitle("活かせる経験・知識・技術")
      );
    }
    currentPage.appendChild(block);
  }

  // 自己PR
  currentPage.appendChild(makeSectionTitle("自己PR"));
  {
    const text = docVal("input-pr");
    const block = document.createElement("div");
    block.style.whiteSpace = "pre-wrap";
    block.style.wordWrap = "break-word";
    block.textContent = text;
    if (isOverflowAfterAppend(currentPage, block)) {
      currentPage = createNewPage();
      currentPage.appendChild(makeSectionTitle("自己PR"));
    }
    currentPage.appendChild(block);
  }
}

/***************************************************
 * (I) タイトルブロック
 ***************************************************/
function makeTitleBlock() {
  const nameVal = esc(docVal("input-name"));
  const telVal = esc(docVal("input-tel"));
  const mailVal = esc(docVal("input-mail"));
  const dateStr = window.currentDateString || "";

  const container = document.createElement("div");
  const titleEl = document.createElement("div");
  titleEl.classList.add("preview-title");
  titleEl.textContent = "職務経歴書";
  container.appendChild(titleEl);

  const infoEl = document.createElement("div");
  infoEl.classList.add("top-right");
  infoEl.innerHTML = `
    <div>作成日: ${dateStr}</div>
    <div>名前: ${nameVal}</div>
    <div>Tel: ${telVal}</div>
    <div>Mail: ${mailVal}</div>
  `;
  container.appendChild(infoEl);

  return container;
}

function makeSectionTitle(txt) {
  const d = document.createElement("div");
  d.className = "preview-section-title";
  d.textContent = txt;
  return d;
}

/***************************************************
 * (J) 職歴ブロック
 ***************************************************/
function makeCareerBlock(i) {
  const period = docVal(`career${i}-period`);
  const company = docVal(`career${i}-company`);
  const employment = docVal(`career${i}-employment`);
  const position = docVal(`career${i}-position`);
  const business = docVal(`career${i}-business`);
  const duty = docVal(`career${i}-duty`);
  const achievement = docVal(`career${i}-achievement`);
  const empcount = docVal(`career${i}-empcount`);
  const capital = docVal(`career${i}-capital`);
  const market = docVal(`career${i}-market`);

  const wrapper = document.createElement("div");
  wrapper.style.marginBottom = "16px";

  // 会社情報
  const infoDiv = document.createElement("div");
  infoDiv.style.marginBottom = "0px";
  infoDiv.innerHTML = `
    会社名： ${esc(company)}<br>
    事業内容： ${esc(business)}<br>
    資本金： ${esc(capital)}　従業員数： ${esc(empcount)}　株式市場： ${esc(market)}
  `;
  wrapper.appendChild(infoDiv);

  // 期間／業務内容テーブル
  const table = document.createElement("table");
  table.classList.add("career-format-table");
  table.innerHTML = `
    <thead>
      <tr>
        <th style="width:25%">期間</th>
        <th style="width:75%">業務内容</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          ${esc(period)}
        </td>
        <td>
          雇用形態： ${esc(employment)}<br>
          役職： ${esc(position)}<br>
          実績： ${esc(achievement)}<br>
          業務内容： ${esc(duty)}
        </td>
      </tr>
    </tbody>
  `;
  wrapper.appendChild(table);

  return wrapper;
}

/***************************************************
 * (K) 免許・資格テーブル
 ***************************************************/
function makeLicenseTable(i) {
  const y = docVal(`license${i}-year`);
  const mo = docVal(`license${i}-month`);
  const nm = docVal(`license${i}-name`);
  const table = document.createElement("table");
  table.innerHTML = `
    <tr>
      <th>年</th>
      <td style="width:25mm;">${esc(y)}</td>
      <th>月</th>
      <td style="width:25mm;">${esc(mo)}</td>
      <th colspan="2" style="text-align:center;">免許・資格名</th>
      <td colspan="3" style="height:auto;">${esc(nm)}</td>
    </tr>
  `;
  return table;
}

/***************************************************
 * (L) 語学テーブル
 ***************************************************/
function makeLangTable(i) {
  const l = docVal(`lang${i}-lang`);
  const lv = docVal(`lang${i}-level`);
  const table = document.createElement("table");
  table.innerHTML = `
    <tr>
      <th>語学</th>
      <td>${esc(l)}</td>
      <th>レベル</th>
      <td>${esc(lv)}</td>
    </tr>
  `;
  return table;
}

/***************************************************
 * (M) 補助関数
 ***************************************************/
function docVal(id) {
  const el = document.getElementById(id);
  return el ? el.value : "";
}
function esc(str) {
  return (str || "").replace(/[&<>"']/g, (s) =>
    ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    }[s])
  );
}
function isOverflowAfterAppend(pageElem, blockElem) {
  pageElem.appendChild(blockElem);
  const isOverflow = pageElem.scrollHeight > pageElem.clientHeight;
  pageElem.removeChild(blockElem);
  return isOverflow;
}

/***************************************************
 * (N) PDFダウンロード処理
 ***************************************************/
async function handleDownloadPDF() {
  console.log("[DEBUG] handleDownloadPDF: start...");

  // ▼ ここで送信するデータは、GAS 側 doPost(e) が期待しているキーに合わせる
  //    (ここでは「tel」「mail」など)
  const sendData = {
    createdDate: window.currentDateString || "",
    name: docVal("input-name"),
    tel: docVal("input-tel"),    // GAS側で data.tel として受け取る
    mail: docVal("input-mail"),  // GAS側で data.mail として受け取る
    gender: "",
    age: "",
    address: ""
  };

  try {
    // 通常の fetch（CORSエラーになる場合はサーバー側のCORS設定が必要）
    const response = await fetch(scriptURL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(sendData)
    });
    const resultText = await response.text();
    console.log("スプレッドシート送信結果:", resultText);
  } catch (e) {
    console.error("[DEBUG] 送信エラー:", e);
  }

  // html2canvas + jsPDF でPDF生成
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("portrait", "pt", "a4");
  const pages = document.querySelectorAll(".resume-page");
  for (let i = 0; i < pages.length; i++) {
    if (i > 0) pdf.addPage();
    const canvas = await html2canvas(pages[i], { scale: 2 });
    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidthPx = canvas.width;
    const imgHeightPx = canvas.height;
    const scale = pdfWidth / imgWidthPx;
    const imgHeightInPdf = imgHeightPx * scale;
    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, imgHeightInPdf);
  }
  pdf.save("職務経歴書.pdf");
  alert("PDFダウンロードが開始されました！（GAS の応答がCORS非対応の場合はブラウザエラーの可能性あり）");
  console.log("[DEBUG] PDF download complete.");
}
</script>
