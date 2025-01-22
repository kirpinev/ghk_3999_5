import { Typography } from "@alfalab/core-components/typography";
import moai from "../assets/moai.png";
import { thxSt } from "./style.css";
import { useEffect } from "react";
import { LS, LSKeys } from "../ls";

export const ThxLayout = () => {
  useEffect(() => {
    if (!LS.getItem(LSKeys.ShowThanks, false)) {
      window.gtag("event", "3999_end_page_view_var5", {
        variant_name: "ghk_3999_5",
      });

      LS.setItem(LSKeys.ShowThanks, true);
    }
  }, []);

  return (
    <>
      <div className={thxSt.container}>
        <img
          alt="Картинка ракеты"
          src={moai}
          width={135}
          className={thxSt.rocket}
        />
        <Typography.TitleResponsive
          font="system"
          tag="h1"
          view="large"
          defaultMargins
          weight="bold"
        >
          Только тссс
        </Typography.TitleResponsive>
        <Typography.Text tag="p" view="primary-medium">
          Вы поучаствовали в очень важном исследовании, которое поможет улучшить
          продукт. Вы – наш герой!
        </Typography.Text>
      </div>
    </>
  );
};
