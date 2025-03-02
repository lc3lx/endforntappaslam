import React, { useState } from "react";
import axios from "axios";

const AdminPage = () => {
  const [account, setAccount] = useState(""); // اسم الحساب
  const [resultValue, setResultValue] = useState(""); // القيمة الفعلية (رمز أو رابط)
  const [copied, setCopied] = useState(false); // حالة النسخ

  // دالة لإرسال الطلب إلى الخادم
  const sendRequest = async (endpoint, messageKey) => {
    if (!account.trim()) {
      setResultValue("يرجى إدخال اسم الحساب");
      return;
    }

    try {
      setResultValue("جارٍ معالجة الطلب...");
      const response = await axios.post(
        `https://backbot-r2h0.onrender.com${endpoint}`,
        { account: account.trim() },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        const responseData = response.data;
        setResultValue(responseData[messageKey]); // عرض القيمة الفعلية فقط
      } else {
        setResultValue(`حدث خطأ: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
      setResultValue("خطأ في الاتصال بالخادم");
    }
  };

  // دالة لنسخ النص إلى الحافظة
  const copyToClipboard = () => {
    if (resultValue) {
      navigator.clipboard.writeText(resultValue).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // إخفاء رسالة النسخ بعد 2 ثانية
      });
    } else {
      alert("لا يوجد نص للنسخ");
    }
  };

  return (
    <div style={styles.container}>
      <h1>صفحة الإدارة</h1>
      <p style={styles.instruction}>الرجاء إدخال اسم الحساب</p>

      {/* حقل إدخال اسم الحساب */}
      <input
        type="text"
        placeholder="اسم الحساب"
        value={account}
        onChange={(e) => setAccount(e.target.value)}
        style={styles.input}
      />

      {/* الأزرار */}
      <button onClick={() => sendRequest("/api/fetch-residence-code", "code")} style={styles.button}>
        طلب رمز السكن
      </button>

      <button onClick={() => sendRequest("/api/fetch-residence-update-link", "link")} style={styles.button}>
        طلب رابط تحديث السكن
      </button>

      <button onClick={() => sendRequest("/api/fetch-password-reset-link", "link")} style={styles.button}>
        استعادة كلمة المرور
      </button>

      <button onClick={() => sendRequest("/api/fetch-suspended-account-link", "link")} style={styles.button}>
        طلب رابط عضويتك معلقة
      </button>

      <button onClick={() => sendRequest("/api/fetch-login-code", "code")} style={styles.button}>
        طلب رمز تسجيل الدخول
      </button>

      {/* عرض الناتج */}
      <div style={styles.resultContainer}>
        <p style={styles.resultText}>{resultValue}</p>
        {resultValue && (
          <button onClick={copyToClipboard} style={styles.copyButton}>
            {copied ? "تم النسخ!" : "نسخ إلى الحافظة"}
          </button>
        )}
      </div>
    </div>
  );
};

// الأنماط
const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  instruction: {
    marginBottom: "20px",
    fontSize: "16px",
  },
  input: {
    padding: "10px",
    width: "90%", // تصميم متجاوب
    fontSize: "16px",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    margin: "10px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    width: "90%", // تصميم متجاوب
    display: "block",
    margin: "auto",
  },
  resultContainer: {
    marginTop: "20px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    textAlign: "left", // لجعل الرابط يظهر بشكل متعدد الأسطر
    maxWidth: "90%", // تصميم متجاوب
    margin: "auto",
  },
  resultText: {
    fontSize: "16px",
    color: "#333",
    wordBreak: "break-all", // لعرض الروابط الطويلة فوق بعضها
  },
  copyButton: {
    padding: "5px 10px",
    fontSize: "14px",
    cursor: "pointer",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    marginTop: "10px",
    display: "block",
    margin: "auto",
  },
};

export default AdminPage;
