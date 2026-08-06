import { useRef, useState } from "react";
import { COLORS } from "../lib/theme.js";
import { CURRENCIES } from "../lib/format.js";
import { Card, SectionTitle, Button, Field, Select } from "./ui.jsx";
import { DownloadIcon, UploadIcon, ResetIcon, CoinIcon } from "../lib/icons.jsx";

export default function Settings({ state, actions }) {
  const fileRef = useRef(null);
  const [importError, setImportError] = useState("");

  function exportData() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `محفظتي-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function onImportFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportError("");
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        actions.replaceAll(parsed);
      } catch (err) {
        setImportError("تعذّرت قراءة الملف، تأكد أنه ملف نسخة احتياطية صحيح");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  function resetAll() {
    if (confirm("سيتم حذف جميع بياناتك (الحسابات، الذهب، الأهداف، الاستثمارات). هل أنت متأكد؟")) {
      actions.resetAll();
    }
  }

  return (
    <div>
      <SectionTitle>العملة</SectionTitle>
      <Card padding={14}>
        <Field label="عملة العرض">
          <Select
            value={state.currency}
            onChange={(e) => actions.setCurrency(e.target.value)}
            options={Object.entries(CURRENCIES).map(([code, c]) => ({ value: code, label: `${c.name} (${c.symbol})` }))}
          />
        </Field>
      </Card>

      <SectionTitle>البيانات</SectionTitle>
      <Card padding={14}>
        <div style={{ fontSize: 12.5, color: COLORS.textFaint, marginBottom: 14 }}>
          بياناتك محفوظة على جهازك فقط. يمكنك تصدير نسخة احتياطية أو استيرادها لاحقاً.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          <Button variant="outline" full icon={<DownloadIcon size={16} />} onClick={exportData}>
            تصدير نسخة احتياطية
          </Button>
          <Button variant="outline" full icon={<UploadIcon size={16} />} onClick={() => fileRef.current?.click()}>
            استيراد نسخة احتياطية
          </Button>
          <input ref={fileRef} type="file" accept="application/json" onChange={onImportFile} style={{ display: "none" }} />
          {importError && <div style={{ fontSize: 12, color: COLORS.red }}>{importError}</div>}
          <Button variant="danger" full icon={<ResetIcon size={16} />} onClick={resetAll}>
            حذف كل البيانات
          </Button>
        </div>
      </Card>

      <div style={{ textAlign: "center", marginTop: 26, opacity: 0.55 }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 8, color: COLORS.gold }}>
          <CoinIcon size={22} />
        </div>
        <div style={{ fontSize: 12, color: COLORS.textFaint }}>محفظتي · مالي وذهبي وادخاري</div>
      </div>
    </div>
  );
}
