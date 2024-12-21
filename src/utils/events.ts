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

export const sendDataToGA = async () => {
  try {
    const now = new Date();
    const date = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    await fetch(
      "https://script.google.com/macros/s/AKfycbwp43J1g2XdoZyOijAH041JBMaa5Wrqm1lZ3-8owmXyuBK_bxiAsqZwjt3QeRT5ZPO3Ew/exec",
      {
        redirect: "follow",
        method: "POST",
        body: JSON.stringify({ date, variant: "ghk_3999_5" }),
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      },
    );
  } catch (error) {
    console.error("Error!", error);
  }
};
