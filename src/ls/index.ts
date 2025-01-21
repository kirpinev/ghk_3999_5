export const enum LSKeys {
  ShowThx = "ab_show_thx_ghk_3999_5",
  ShowThanks = "ab_show_thanks_ghk_3999_5",
  ClickFirstStep = "ab_click_first_step_ghk_3999_5",
  ClickSecondStep = "ab_click_second_step_ghk_3999_5",
}

export interface LSData {
  [LSKeys.ShowThx]: boolean | null;
  [LSKeys.ShowThanks]: boolean | null;
  [LSKeys.ClickFirstStep]: boolean | null;
  [LSKeys.ClickSecondStep]: boolean | null;
}

const getItem = <K extends LSKeys>(
  key: K,
  defaultValue: LSData[K],
): LSData[K] => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : defaultValue;
  } catch {
    return defaultValue;
  }
};
const setItem = <K extends LSKeys>(key: K, value: LSData[K]) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};
const deleteItem = <K extends LSKeys>(key: K) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};

export const LS = {
  getItem,
  setItem,
  deleteItem,
};
