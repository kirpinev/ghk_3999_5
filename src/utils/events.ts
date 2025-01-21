declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (
      e: "event",
      action: string,
      variant_name: Record<string, string>,
    ) => void;
  }
}

interface Payload {
  credit_limit: string;
  agreement: string;
  email: string;
}

export const sendDataToGA = async (payload: Payload) => {
  try {
    const now = new Date();
    const date = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    await fetch(
      "https://script.google.com/macros/s/AKfycbz4Vj_anYBCVoq4AmG-fJenv6l2tasX6VBY4Umfci5_P4C_dDubVM47d5oLh5A30cwy/exec",
      {
        redirect: "follow",
        method: "POST",
        body: JSON.stringify({ date, variant: "ghk_3999_5", ...payload }),
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      },
    );
  } catch (error) {
    console.error("Error!", error);
  }
};
