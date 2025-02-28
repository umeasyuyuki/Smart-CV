<script>
/***************************************************
 * (A) 連携先URLなどの設定
 *   → GAS用URLはオリジナルに戻し、それ以外はBase64のまま
 ***************************************************/
// ▼ 既存：スプレッドシート更新用のGAS (元に戻す)
const scriptURL =
  "https://script.google.com/macros/s/AKfycbzovpyw9ijTmD_YKLLCBYArxW8HVk1naH8Iln08EDOsxjq-4F5wz2jyQKEn47-iFAub/exec";

// ▼ 既存のDify直呼び用（残す）
const difyUploadURL = atob("aHR0cHM6Ly9hcGkuZGlmeS5haS92MQ==");
const difyAPIKey = atob("YXBwLW5lYzBOZEFESkRkcGVjUUtRWVZ0eHp6bUQ=");

// ▼ 追加：Difyを呼び出す別のGAS (元に戻す)
const difyGasURL =
  "https://script.google.com/macros/s/AKfycbywNHTcJy5AqH0nnE5T9QuNgtwHGzsfbt6pB_etEh_JdV2BVtG8Asmhwhe9ulEmukkm/exec";

/***************************************************
 * (B) グローバル変数
 ***************************************************/
let selectedFile = null;
let uploadedFileURL = null;

// 職歴・免許・語学の現在数
let careerCount = 1;
let licenseCount = 1;
let langCount = 1;

// ズーム用
let currentZoom = 1.0;
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2.0;
const ZOOM_STEP = 0.1;

/***************************************************
 * (C) 起動時
 ***************************************************/
document.addEventListener("DOMContentLoaded", () => {
  console.log("[DEBUG] DOMContentLoaded - setup...");

  setupBindings();
  updatePreviewPages();

  // ファイル選択 (例)
  const fileInput = document.getElementById("resume-file");
  if (fileInput) {
    fileInput.addEventListener("change", async (e) => {
      if (e.target.files && e.target.files.length > 0) {
        selectedFile = e.target.files[0];
        alert("ファイルが選択されました: " + selectedFile.name);

        try {
          const formData = new FormData();
          formData.append("file", selectedFile);

          // Dify用GASに送信
          const response = await fetch(difyGasURL, {
            method: "POST",
            body: formData,
          });
          if (!response.ok) {
            const errText = await response.text();
            throw new Error("Dify用GASに送信失敗: " + errText);
          }
          const result = await response.json();
          console.log("[DEBUG] difyGasURLからの結果 =", result);

          if (result.text) {
            const parsed = parseDifyText(result.text);
            fillForm(parsed);
          }

          alert("Dify解析結果をフォームに反映しました。");
          updatePreviewPages();
        } catch (err) {
          console.error(err);
          alert("解析エラー: " + err.message);
        }
      }
    });
  }

  // モーダル(自己PR)の開閉
  const openPrModalBtn = document.getElementById("open-pr-modal");
  const closePrModalBtn = document.getElementById("close-pr-modal");
  const prModalOverlay = document.getElementById("pr-modal-overlay");
  if (openPrModalBtn && closePrModalBtn && prModalOverlay) {
    openPrModalBtn.addEventListener("click", () => {
      prModalOverlay.style.display = "flex";
    });
    closePrModalBtn.addEventListener("click", () => {
      prModalOverlay.style.display = "none";
    });
  }

  // モーダル(職務要約例文)の開閉
  const openSummaryModalBtn = document.getElementById("open-summary-example-modal");
  const closeSummaryModalBtn = document.getElementById("close-summary-modal");
  const summaryModalOverlay = document.getElementById("summary-example-overlay");

  if (openSummaryModalBtn && closeSummaryModalBtn && summaryModalOverlay) {
    openSummaryModalBtn.addEventListener("click", () => {
      summaryModalOverlay.style.display = "flex";
    });
    closeSummaryModalBtn.addEventListener("click", () => {
      summaryModalOverlay.style.display = "none";
    });
  }

  // 例文を使用するボタン (職務要約)
  document.querySelectorAll(".use-summary-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const exNum = btn.getAttribute("data-example");
      fillSummaryExample(exNum);
      summaryModalOverlay.style.display = "none";
    });
  });

  // 「自己PRを自動生成」ボタン（モーダル内）
  document.getElementById("generate-pr").addEventListener("click", async () => {
    const bulletPoints = document
      .getElementById("pr-bullet-points")
      .value.trim();
    if (!bulletPoints) {
      alert("箇条書きの内容を入力してください。");
      return;
    }

    const generatePrBtn = document.getElementById("generate-pr");
    generatePrBtn.disabled = true;
    generatePrBtn.textContent = "生成中...";
    const spinner = document.createElement("span");
    spinner.classList.add("spinner");
    generatePrBtn.appendChild(spinner);

    // 自己PR生成用 (Base64のまま)
    const PR_WORKFLOW_ID = atob(
      "MGIyMTFjNzgtZDQ1My00NjQwLWJlMjctMzNlNzg4NGZmYzUx"
    );
    const PR_API_KEY = atob("QmVhcmVyIGFwcC1ETmVBVzNhalh5TzVURFRMZDJrUm9IeFk=");

    try {
      const requestBody = {
        workflow_id: PR_WORKFLOW_ID,
        inputs: {
          text: bulletPoints,
          other: "",
        },
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
      const generatedText = data?.data?.outputs?.text || "生成テキストなし";

      document.getElementById("input-pr").value = generatedText;
      updatePreviewPages();

      alert("自己PRを自動生成しました。");
    } catch (error) {
      console.error(error);
      alert("自己PR生成エラー: " + error.message);
    } finally {
      generatePrBtn.removeChild(spinner);
      generatePrBtn.disabled = false;
      generatePrBtn.textContent = "自己PRを自動生成";
    }
  });

  // 一括生成(例)
  const bulkBtn = document.getElementById("bulk-generate-btn");
  if (bulkBtn) {
    bulkBtn.addEventListener("click", async () => {
      if (!selectedFile) {
        alert("先にファイルを選択してください。");
        return;
      }
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        const response = await fetch(difyGasURL, {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          throw new Error("Dify用GASへの送信失敗: " + (await response.text()));
        }
        const result = await response.json();
        console.log("[DEBUG] 一括生成 - difyGasURLからの結果 =", result);

        if (result.text) {
          const parsed = parseDifyText(result.text);
          fillForm(parsed);
        }
        alert("解析結果をフォームに反映しました。");
        updatePreviewPages();
      } catch (err) {
        console.error(err);
        alert("一括生成エラー: " + err.message);
      }
    });
  }

  // ズームボタン
  const zoomOutBtn = document.getElementById("zoom-out");
  const zoomInBtn = document.getElementById("zoom-in");
  if (zoomOutBtn && zoomInBtn) {
    zoomOutBtn.addEventListener("click", () => {
      if (currentZoom > MIN_ZOOM) {
        currentZoom = Math.max(MIN_ZOOM, currentZoom - ZOOM_STEP);
        applyZoom(currentZoom);
      }
    });
    zoomInBtn.addEventListener("click", () => {
      if (currentZoom < MAX_ZOOM) {
        currentZoom = Math.min(MAX_ZOOM, currentZoom + ZOOM_STEP);
        applyZoom(currentZoom);
      }
    });
  }

  // PDFダウンロードボタン & 同意チェック
  const pdfBtn = document.getElementById("download-pdf");
  const agreeCheckbox = document.getElementById("agree-terms");

  // 最初はチェックされていない→PDFボタンを無効化
  if (pdfBtn && agreeCheckbox) {
    pdfBtn.disabled = true;

    agreeCheckbox.addEventListener("change", () => {
      pdfBtn.disabled = !agreeCheckbox.checked;
    });

    pdfBtn.addEventListener("click", async () => {
      if (!agreeCheckbox.checked) {
        alert("利用規約に同意する必要があります。");
        return;
      }
      // ▼▼▼▼ ここから必須項目の未入力チェックを追加 ▼▼▼▼
      // 必須項目のIDを配列に
      const requiredFields = [
        "input-name",
        "input-tel",
        "input-mail",
        "input-summary",
        "input-skill",
        "input-pr",
      ];
      for (const fieldId of requiredFields) {
        const value = document.getElementById(fieldId).value.trim();
        if (!value) {
          alert("必須項目が未入力です。すべての項目を入力してください。");
          return;
        }
      }
      // ▲▲▲▲ ここまで追加 ▲▲▲▲

      // ダウンロード中の見た目変更
      pdfBtn.disabled = true;
      const originalText = pdfBtn.textContent;
      pdfBtn.textContent = "ダウンロード中...";
      const spinner = document.createElement("span");
      spinner.classList.add("spinner");
      pdfBtn.appendChild(spinner);

      try {
        await handleDownloadPDF();
      } catch (e) {
        console.error("PDFダウンロードエラー:", e);
        alert("PDFダウンロードエラー: " + e.message);
      } finally {
        pdfBtn.removeChild(spinner);
        pdfBtn.textContent = originalText;
        pdfBtn.disabled = false;
      }
    });
  }

  console.log("[DEBUG] init done.");
});

/***************************************************
 * 職務要約の例文を入力するヘルパー関数
 ***************************************************/
function fillSummaryExample(exNum) {
  let text = "";
  // exNumに応じて例文をセット
  if (exNum === "1") {
    text =
      "○○業界で○○年間働き、新規顧客の開拓や既存顧客対応を一貫して担当しました。売上の安定化に加え、お客様の満足度向上に努め、リピート率向上を実現。社内外の打ち合わせで積極的に意見をまとめ、スムーズな連携を図りました。また、課題を洗い出して業務手順を見直し、生産性を高める取り組みを主導。今後はこの経験を基に、新たな提案力やチーム連携を強化し、企業の成長に貢献していきたいと考えています。";
  } else if (exNum === "2") {
    text =
      "○○業界で○○年間、販売促進や顧客サポートに携わり、より分かりやすい商品説明や素早い問い合わせ対応を実施しました。お客様の要望を拾い上げることで満足度向上を図ると同時に、定期的な情報発信によってリピート購入を促進。社内ではスタッフ教育にも注力し、サービスの質とチーム力の向上を目指しました。今後は培ったコミュニケーション力をさらに活かし、より幅広い役割に貢献していきたいと思っています。";
  } else if (exNum === "3") {
    text =
      "○○企業にて事務サポートや社内調整を行い、円滑な業務運営のための環境づくりを担当しました。各部門からの問い合わせに素早く対応し、必要な資料作成やスケジュール管理を実施。効率的なファイリング方法を提案するなど、日々の作業改善にも取り組みました。会議やミーティングでは意見をまとめ、関係者間の情報共有を推進。今後も身につけた調整力を活かし、より一層の組織サポートに貢献していきたいです。";
  } else if (exNum === "4") {
    text =
      "○○企業の経理部門で月次・年次決算を担当し、正確な数値管理とスピーディなレポート提出を行いました。経費の削減策を提案し、適切なコスト管理の仕組みを整備したことで、部門全体の予算達成に寄与。さらに、社内システムのアップデートにあわせた手順書の整備やトラブル対応を担い、業務の滞りを防止しました。今後は培った数値分析力と改善意識を活かし、○○企業のさらなる発展を支えていきたいと考えています。";
  } else if (exNum === "5") {
    text =
      "○○事業所で人事・総務に携わり、採用計画の立案からスタッフの勤務状況の把握まで幅広く担当しました。応募者とのやり取りや面接調整を丁寧に行い、適正な人材確保とスムーズな入社手続きを実現。新入社員の研修プログラムを整備し、早期戦力化にも貢献しました。併せて職場環境の整備や福利厚生の見直しを進め、社員が働きやすい仕組みを検討。これらの経験を通じ、企業と人材の成長を後押ししていきたいと考えています。";
  }

  const summaryEl = document.getElementById("input-summary");
  if (summaryEl) {
    summaryEl.value = text;
    updatePreviewPages();
  }
}

/***************************************************
 * ズーム
 ***************************************************/
function applyZoom(scale) {
  const wrap = document.getElementById("resumePages");
  wrap.style.transform = `scale(${scale})`;
}

/***************************************************
 * parseDifyText(text)
 * ここで**1本のテキスト**を正規表現などで解析
 ***************************************************/
function parseDifyText(allText) {
  const data = {
    name: "",
    tel: "",
    mail: "",
    summary: "",
    careers: [],
    licenses: [],
    languages: [],
    skill: "",
    pr: "",
  };
  const text = allText.trim();

  // 以下はサンプルのパース例
  const nameMatch = text.match(/【氏名】:\s*(.+)/);
  if (nameMatch) data.name = nameMatch[1].trim();

  const telMatch = text.match(/【電話】:\s*(.+)/);
  if (telMatch) data.tel = telMatch[1].trim();

  const mailMatch = text.match(/【メール】:\s*(.+)/);
  if (mailMatch) data.mail = mailMatch[1].trim();

  const summaryMatch = text.match(/\*\*職務要約\*\*([\s\S]*?)(?=\*\*|$)/);
  if (summaryMatch) {
    data.summary = summaryMatch[1].trim().replace(/^(\r?\n)+/, "");
  }

  const skillMatch = text.match(
    /\*\*活かせる経験・知識・技術\*\*([\s\S]*?)(?=\*\*|$)/
  );
  if (skillMatch) {
    data.skill = skillMatch[1].trim();
  }

  const prMatch = text.match(/\*\*自己PR\*\*([\s\S]*?$)/);
  if (prMatch) {
    const lines = prMatch[1].split("\n").map((s) => s.trim());
    let prText = "";
    lines.forEach((line) => {
      const pm = line.match(/【自己PR】:\s*(.*)/);
      if (pm) {
        prText = pm[1].trim();
      }
    });
    if (!prText) prText = prMatch[1].trim();
    data.pr = prText;
  }

  const careersSection = text.match(/\*\*職務経歴\*\*([\s\S]*?)(?=\n\*\*|$)/);
  if (careersSection) {
    const cSec = careersSection[1].trim();
    let parts = cSec.split(/【会社名】:/);
    parts.shift();
    parts.forEach((cp) => {
      const lines = cp.split("\n").map((s) => s.trim());
      const company = lines[0] || "";
      let period = "";
      let employment = "";
      let position = "";
      let business = "";
      let achievement = "";
      let empcount = "";
      let capital = "";
      let market = "";
      let duty = "";

      lines.forEach((line) => {
        const pm = line.match(/【期間】:\s*(.*)/);
        if (pm) period = pm[1].trim();
        const em = line.match(/【雇用形態】:\s*(.*)/);
        if (em) employment = em[1].trim();
        const posm = line.match(/【役職】:\s*(.*)/);
        if (posm) position = posm[1].trim();
        const bm = line.match(/【事業内容】:\s*(.*)/);
        if (bm) business = bm[1].trim();
        const am = line.match(/【実績】:\s*(.*)/);
        if (am) achievement = am[1].trim();
        const ec = line.match(/【従業員数】:\s*(.*)/);
        if (ec) empcount = ec[1].trim();
        const cm = line.match(/【資本金】:\s*(.*)/);
        if (cm) capital = cm[1].trim();
        const mm = line.match(/【株式会社】:\s*(.*)/);
        if (mm) market = mm[1].trim();
        const dm = line.match(/【業務内容】:\s*(.*)/);
        if (dm) duty = dm[1].trim();
      });

      data.careers.push({
        period,
        company,
        employment,
        position,
        business,
        duty,
        achievement,
        empcount,
        capital,
        market,
      });
    });
  }

  const licenseSection = text.match(/\*\*免許・資格\*\*([\s\S]*?)(?=\n\*\*|$)/);
  if (licenseSection) {
    const block = licenseSection[1].trim();
    let parts = block.split(/【取得年】:/);
    parts.shift();
    parts.forEach((lp) => {
      const lines = lp.split("\n").map((s) => s.trim());
      let year = lines[0] || "";
      let month = "";
      let name = "";
      lines.forEach((line) => {
        const mo = line.match(/【取得月】：\s*(.*)/);
        if (mo) month = mo[1].trim();
        const nm = line.match(/【免許・資格名】:\s*(.*)/);
        if (nm) name = nm[1].trim();
      });
      data.licenses.push({ year, month, name });
    });
  }

  const langSection = text.match(/\*\*語学\*\*([\s\S]*?)(?=\n\*\*|$)/);
  if (langSection) {
    const lines = langSection[1].split("\n").map((s) => s.trim());
    let langVal = "";
    let levelVal = "";
    lines.forEach((line) => {
      const lm = line.match(/【語学名】:\s*(.*)/);
      if (lm) langVal = lm[1].trim();
      const lv = line.match(/【語学レベル】:\s*(.*)/);
      if (lv) levelVal = lv[1].trim();
    });
    data.languages.push({ lang: langVal, level: levelVal });
  }

  console.log("[DEBUG] parseDifyText =>", data);
  return data;
}

/***************************************************
 * fillForm(parsed)
 ***************************************************/
function fillForm(parsed) {
  if (parsed.name) document.getElementById("input-name").value = parsed.name;
  if (parsed.tel) document.getElementById("input-tel").value = parsed.tel;
  if (parsed.mail) document.getElementById("input-mail").value = parsed.mail;

  if (parsed.summary) {
    document.getElementById("input-summary").value = parsed.summary;
  }
  if (parsed.skill) {
    document.getElementById("input-skill").value = parsed.skill;
  }
  if (parsed.pr) {
    document.getElementById("input-pr").value = parsed.pr;
  }

  clearCareerForm();
  if (parsed.careers && Array.isArray(parsed.careers)) {
    parsed.careers.forEach((c, idx) => {
      if (idx === 0) {
        fillCareerRow(1, c);
      } else {
        addCareerRow();
        fillCareerRow(careerCount, c);
      }
    });
  }

  clearLicenseForm();
  if (parsed.licenses && Array.isArray(parsed.licenses)) {
    parsed.licenses.forEach((lic, idx) => {
      if (idx === 0) {
        fillLicenseRow(1, lic);
      } else {
        addLicenseRow();
        fillLicenseRow(licenseCount, lic);
      }
    });
  }

  clearLangForm();
  if (parsed.languages && Array.isArray(parsed.languages)) {
    parsed.languages.forEach((lg, idx) => {
      if (idx === 0) {
        fillLangRow(1, lg);
      } else {
        addLangRow();
        fillLangRow(langCount, lg);
      }
    });
  }
}

function clearCareerForm() {
  careerCount = 1;
  const container = document.getElementById("career-container");
  while (container.children.length > 1) {
    container.removeChild(container.lastElementChild);
  }
  fillCareerRow(1, {
    period: "",
    company: "",
    employment: "",
    position: "",
    business: "",
    duty: "",
    achievement: "",
    empcount: "",
    capital: "",
    market: "",
  });
}
function fillCareerRow(idx, c) {
  document.getElementById(`career${idx}-period`).value = c.period || "";
  document.getElementById(`career${idx}-company`).value = c.company || "";
  document.getElementById(`career${idx}-employment`).value = c.employment || "";
  document.getElementById(`career${idx}-position`).value = c.position || "";
  document.getElementById(`career${idx}-business`).value = c.business || "";
  document.getElementById(`career${idx}-duty`).value = c.duty || "";
  document.getElementById(`career${idx}-achievement`).value =
    c.achievement || "";
  document.getElementById(`career${idx}-empcount`).value = c.empcount || "";
  document.getElementById(`career${idx}-capital`).value = c.capital || "";
  document.getElementById(`career${idx}-market`).value = c.market || "";
}
function addCareerRow() {
  const addBtn = document.getElementById("add-career-row");
  addBtn.click();
}

function clearLicenseForm() {
  licenseCount = 1;
  const container = document.getElementById("license-container");
  while (container.children.length > 1) {
    container.removeChild(container.lastElementChild);
  }
  fillLicenseRow(1, { year: "", month: "", name: "" });
}
function fillLicenseRow(idx, lic) {
  document.getElementById(`license${idx}-year`).value = lic.year || "";
  document.getElementById(`license${idx}-month`).value = lic.month || "";
  document.getElementById(`license${idx}-name`).value = lic.name || "";
}
function addLicenseRow() {
  const addBtn = document.getElementById("add-license-row");
  addBtn.click();
}

function clearLangForm() {
  langCount = 1;
  const container = document.getElementById("lang-container");
  while (container.children.length > 1) {
    container.removeChild(container.lastElementChild);
  }
  fillLangRow(1, { lang: "", level: "" });
}
function fillLangRow(idx, l) {
  document.getElementById(`lang${idx}-lang`).value = l.lang || "";
  document.getElementById(`lang${idx}-level`).value = l.level || "";
}
function addLangRow() {
  const addBtn = document.getElementById("add-lang-row");
  addBtn.click();
}

/***************************************************
 * (D) フォームとプレビューのバインディング
 ***************************************************/
function setupBindings() {
  function bindText(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("input", updatePreviewPages);
  }

  bindText("input-name");
  bindText("input-tel");
  bindText("input-mail");

  bindText("input-summary");
  bindText("input-skill");
  bindText("input-pr");

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

  bindText("license1-year");
  bindText("license1-month");
  bindText("license1-name");

  bindText("lang1-lang");
  bindText("lang1-level");

  setupAddRemoveCareer();
  setupAddRemoveLicense();
  setupAddRemoveLang();

  const summaryEl = document.getElementById("input-summary");
  if (summaryEl) {
    summaryEl.addEventListener("input", () => {
      const len = summaryEl.value.length;
      document.getElementById("char-counter").textContent = len + " / 300字";
    });
  }
}

function setupAddRemoveCareer() {
  const addBtn = document.getElementById("add-career-row");
  const removeBtn = document.getElementById("remove-career-row");
  const container = document.getElementById("career-container");
  const firstBlock = document.getElementById("career-first");

  if (addBtn) {
    addBtn.addEventListener("click", () => {
      careerCount++;
      const clone = firstBlock.cloneNode(true);
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

function setupAddRemoveLicense() {
  const addBtn = document.getElementById("add-license-row");
  const removeBtn = document.getElementById("remove-license-row");
  const licenseContainer = document.getElementById("license-container");
  const firstLicense = document.getElementById("license-first");

  if (addBtn) {
    addBtn.addEventListener("click", () => {
      licenseCount++;
      const clone = firstLicense.cloneNode(true);
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

function setupAddRemoveLang() {
  const addBtn = document.getElementById("add-lang-row");
  const removeBtn = document.getElementById("remove-lang-row");
  const langContainer = document.getElementById("lang-container");
  const firstLang = document.getElementById("lang-first");

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

function removeTableTopLine(wrapperElem) {
  const tables = wrapperElem.querySelectorAll("table");
  tables.forEach((table) => {
    table.style.borderTop = "none";
  });
}

/***************************************************
 * (E) プレビュー更新
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
      currentPage.appendChild(makeSectionTitle("活かせる経験・知識・技術"));
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

function makeTitleBlock() {
  const nameVal = esc(docVal("input-name"));
  const telVal = esc(docVal("input-tel"));
  const mailVal = esc(docVal("input-mail"));
  const dateStr = new Date().toLocaleDateString("ja-JP");

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

  const infoDiv = document.createElement("div");
  infoDiv.style.marginBottom = "0px";
  infoDiv.innerHTML = `
          会社名： ${esc(company)}<br>
          事業内容： ${esc(business)}<br>
          資本金： ${esc(capital)}　従業員数： ${esc(
    empcount
  )}　株式市場： ${esc(market)}
        `;
  wrapper.appendChild(infoDiv);

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
            <td colspan="3">${esc(nm)}</td>
          </tr>
        `;
  return table;
}
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
function docVal(id) {
  const el = document.getElementById(id);
  return el ? el.value : "";
}
function esc(str) {
  return (str || "").replace(/[&<>"']/g, (s) => {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    }[s];
  });
}
function isOverflowAfterAppend(pageElem, blockElem) {
  pageElem.appendChild(blockElem);
  const isOverflow = pageElem.scrollHeight > pageElem.clientHeight;
  pageElem.removeChild(blockElem);
  return isOverflow;
}

/***************************************************
 * (F) PDFダウンロード
 ***************************************************/
async function handleDownloadPDF() {
  try {
    // ▼ 既存コード：スプレッドシート更新用GASに送信
    const sendData = {
      createdDate: new Date().toLocaleString(),
      name: document.getElementById("input-name").value,
      tel: document.getElementById("input-tel").value,
      mail: document.getElementById("input-mail").value,
    };
    const response = await fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(sendData),
    });
    if (!response.ok) {
      console.error("GAS送信エラー: status =", response.status);
    } else {
      const resultText = await response.text();
      console.log("GAS応答 =", resultText);
    }

    // PDF作成
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
    alert("PDFダウンロードが開始されました！");
    console.log("[DEBUG] PDF download complete.");
  } catch (e) {
    console.error("PDF生成またはGAS送信エラー:", e);
    alert("エラー: " + e.message);
  }
}
</script>
