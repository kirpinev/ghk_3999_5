import combo from "./assets/combo.png";

import { LS, LSKeys } from "./ls";

import { ThxLayout } from "./thx/ThxLayout";
import { Gap } from "@alfalab/core-components/gap";
import { useRef, useState, useLayoutEffect, useEffect } from "react";
import { Input } from "@alfalab/core-components/input";
import { AmountInput } from "@alfalab/core-components/amount-input";
import { Checkbox } from "@alfalab/core-components/checkbox";
import { ChevronDownMIcon } from "@alfalab/icons-glyph/ChevronDownMIcon";
import { ChevronUpMIcon } from "@alfalab/icons-glyph/ChevronUpMIcon";
import { DocumentsLinesMIcon } from "@alfalab/icons-glyph/DocumentsLinesMIcon";
import { Collapse } from "@alfalab/core-components/collapse";
import { ButtonMobile } from "@alfalab/core-components/button/mobile";
import { Typography } from "@alfalab/core-components/typography";
import { HatchingProgressBar } from "@alfalab/core-components/hatching-progress-bar";

import { appSt } from "./style.css";
import { thxSt } from "./thx/style.css.ts";

export const App = () => {
  const [step, setStep] = useState(1);
  const [timerActive, setTimerActive] = useState(false);
  const [amount, setAmount] = useState(10000);
  const [checked, setChecked] = useState({
    checkbox_1: false,
    checkbox_2: false,
    checkbox_3: false,
    checkbox_4: false,
    checkbox_5: false,
  });
  const [error, setError] = useState(false);
  const [expandMore, setExpandMore] = useState(false);
  const [scrollToDocs, setScrollToDocs] = useState(false);
  const [bar, setBar] = useState(0);

  const divRef = useRef<HTMLDivElement>(null);

  const handleChange = (
    name:
      | "checkbox_1"
      | "checkbox_2"
      | "checkbox_3"
      | "checkbox_4"
      | "checkbox_5",
  ) => {
    setChecked((prevState) => ({
      ...prevState,
      [name]: !checked[name],
    }));
  };

  // const submit = () => {
  //   setLoading(true);
  //   Promise.resolve().then(() => {
  //     setLoading(false);
  //     LS.setItem(LSKeys.ShowThx, true);
  //   });
  // };

  useLayoutEffect(() => {
    if (scrollToDocs) {
      divRef.current?.scrollIntoView({ behavior: "instant" });
      setScrollToDocs(false);
    }
  }, [scrollToDocs]);

  useEffect(() => {
    let timer: number;
    const startTime = Date.now();

    if (timerActive) {
      timer = setInterval(() => {
        const elapsedMs = Date.now() - startTime;
        const newBarValue = Math.min((elapsedMs / 20000) * 100, 100);

        setBar(newBarValue);

        if (elapsedMs >= 20000) {
          setTimerActive(false);
          clearInterval(timer);
          LS.setItem(LSKeys.ShowThx, true);
        }
      }, 50);
    }

    return () => clearInterval(timer);
  }, [timerActive]);

  if (LS.getItem(LSKeys.ShowThx, false)) {
    return <ThxLayout />;
  }

  return (
    <>
      {step === 1 && (
        <div className={appSt.container}>
          <div className={appSt.box}>
            <img
              src={combo}
              alt="Карта для ребенка"
              style={{ width: "85%", borderRadius: "16px" }}
            />
          </div>

          <Gap size={24} />

          <Typography.TitleResponsive
            font="system"
            tag="h1"
            view="small"
            weight="medium"
            className={appSt.productsTitle}
            style={{ marginBottom: 0 }}
          >
            Удвойте возможности вашей Альфа-Карты
          </Typography.TitleResponsive>
          <Gap size={12} />
          <Typography.Text
            tag="p"
            view="primary-medium"
            style={{ marginBottom: 0 }}
          >
            Подключите кредитный лимит и пользуйтесь как кредиткой — без
            процентов на целый год
          </Typography.Text>

          <Gap size={32} />

          <Typography.TitleResponsive
            font="system"
            tag="h4"
            view="small"
            weight="medium"
          >
            Выберите кредитный лимит
          </Typography.TitleResponsive>

          <Gap size={24} />

          <AmountInput
            value={amount}
            onChange={(_, payload) => {
              setAmount(payload.value as number);
            }}
            placeholder="Введите сумму"
            labelView={"outer"}
            label="Кредитный лимит"
            minority={1}
            bold={false}
            block={true}
            size={48}
            max={140000}
            error={amount > 140000}
          />

          <Typography.Text
            tag="p"
            view="primary-small"
            color="secondary"
            style={{ marginBottom: 0, marginTop: "6px" }}
          >
            От 10 000 ₽ до 140 000 ₽
          </Typography.Text>

          <Gap size={32} />
        </div>
      )}

      {step === 4 && (
        <div className={appSt.container}>
          <Gap size={24} />

          <Typography.TitleResponsive
            font="system"
            tag="h4"
            view="small"
            weight="medium"
          >
            Согласие с условиями
          </Typography.TitleResponsive>

          <Gap size={12} />

          <Typography.Text
            tag="p"
            view="primary-medium"
            color="secondary"
            style={{ marginBottom: 0 }}
          >
            После подписания всё проверим и подключим кредитный лимит
          </Typography.Text>

          <Gap size={12} />

          <div
            className={appSt.detail}
            onClick={() => {
              for (const name in checked) {
                if (checked.checkbox_1) {
                  setChecked((prevState) => ({
                    ...prevState,
                    [name]: false,
                  }));
                } else {
                  setChecked((prevState) => ({
                    ...prevState,
                    [name]: true,
                  }));
                }
              }
            }}
          >
            <Checkbox
              block={true}
              size={24}
              onChange={(_, payload) => {
                for (const name in checked) {
                  if (payload.checked) {
                    setChecked((prevState) => ({
                      ...prevState,
                      [name]: false,
                    }));
                  } else {
                    setChecked((prevState) => ({
                      ...prevState,
                      [name]: true,
                    }));
                  }
                }
              }}
              checked={checked.checkbox_1}
              label=""
            />
            <div>
              <Typography.Text
                tag="p"
                view="primary-medium"
                style={{ marginBottom: 0, flexGrow: 1 }}
              >
                Подтверждаю своё ознакомление и согласие со всеми указанными
                далее условиями, а также с получением услуг
              </Typography.Text>
              {error &&
                !checked.checkbox_1 &&
                (!checked.checkbox_2 ||
                  !checked.checkbox_3 ||
                  !checked.checkbox_4) && (
                  <>
                    <Gap size={16} />
                    <Typography.Text
                      tag="p"
                      view="primary-medium"
                      color="negative"
                      style={{ marginBottom: 0, flexGrow: 1 }}
                    >
                      Согласие обязательно
                    </Typography.Text>
                  </>
                )}
            </div>
          </div>

          <Gap size={2} />

          <div
            className={appSt.detail}
            onClick={() => {
              if (!expandMore) {
                setExpandMore(!expandMore);
              }
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  animation: "3s infinite alternate slide-in",
                }}
                onClick={() => setExpandMore(false)}
              >
                {!expandMore && (
                  <ChevronDownMIcon
                    width="24"
                    style={{ marginRight: "1rem" }}
                    color="grey"
                  />
                )}

                {expandMore && (
                  <ChevronUpMIcon
                    width="24"
                    style={{ marginRight: "1rem" }}
                    color="grey"
                  />
                )}

                <Typography.Text
                  tag="p"
                  view="primary-medium"
                  style={{ marginBottom: 0 }}
                >
                  Подробнее
                </Typography.Text>
              </div>

              {expandMore && <Gap size={16} />}

              <Collapse expanded={expandMore}>
                <>
                  <div
                    className={appSt.expandedDetail}
                    onClick={() => {
                      handleChange("checkbox_2");
                    }}
                  >
                    <Checkbox
                      block={true}
                      size={24}
                      onChange={(_, payload) => {
                        setChecked((prevState) => ({
                          ...prevState,
                          checkbox_2: !payload.checked,
                        }));
                      }}
                      checked={checked.checkbox_2}
                      label=""
                    />
                    <div>
                      <Typography.Text
                        tag="p"
                        view="primary-medium"
                        style={{ marginBottom: 0, flexGrow: 1 }}
                      >
                        Согласие на обработку персональных данных
                      </Typography.Text>
                      {error && !checked.checkbox_2 && (
                        <>
                          <Gap size={16} />
                          <Typography.Text
                            tag="p"
                            view="primary-medium"
                            color="negative"
                            style={{ marginBottom: 0, flexGrow: 1 }}
                          >
                            Согласие обязательно
                          </Typography.Text>
                        </>
                      )}
                    </div>
                  </div>

                  <Gap size={32} />

                  <div
                    className={appSt.expandedDetail}
                    onClick={() => {
                      handleChange("checkbox_3");
                    }}
                  >
                    <Checkbox
                      block={true}
                      size={24}
                      onChange={(_, payload) => {
                        setChecked((prevState) => ({
                          ...prevState,
                          checkbox_3: !payload.checked,
                        }));
                      }}
                      checked={checked.checkbox_3}
                      label=""
                    />
                    <div>
                      <Typography.Text
                        tag="p"
                        view="primary-medium"
                        style={{ marginBottom: 0, flexGrow: 1 }}
                      >
                        Согласие на уступку прав по кредитному договору
                      </Typography.Text>
                      {error && !checked.checkbox_3 && (
                        <>
                          <Gap size={16} />
                          <Typography.Text
                            tag="p"
                            view="primary-medium"
                            color="negative"
                            style={{ marginBottom: 0, flexGrow: 1 }}
                          >
                            Согласие обязательно
                          </Typography.Text>
                        </>
                      )}
                    </div>
                  </div>

                  <Gap size={32} />

                  <div
                    className={appSt.expandedDetail}
                    onClick={() => {
                      handleChange("checkbox_4");
                    }}
                  >
                    <Checkbox
                      block={true}
                      size={24}
                      onChange={(_, payload) => {
                        setChecked((prevState) => ({
                          ...prevState,
                          checkbox_4: !payload.checked,
                        }));
                      }}
                      checked={checked.checkbox_4}
                      label=""
                    />
                    <div>
                      <Typography.Text
                        tag="p"
                        view="primary-medium"
                        style={{ marginBottom: 0, flexGrow: 1 }}
                      >
                        Согласие на получение рекламных рассылок
                      </Typography.Text>
                      {error && !checked.checkbox_4 && (
                        <>
                          <Gap size={16} />
                          <Typography.Text
                            tag="p"
                            view="primary-medium"
                            color="negative"
                            style={{ marginBottom: 0, flexGrow: 1 }}
                          >
                            Согласие обязательно
                          </Typography.Text>
                        </>
                      )}
                    </div>
                  </div>

                  <Gap size={32} />

                  <div
                    className={appSt.expandedDetail}
                    onClick={() => {
                      handleChange("checkbox_5");
                    }}
                  >
                    <Checkbox
                      block={true}
                      size={24}
                      onChange={(_, payload) => {
                        setChecked((prevState) => ({
                          ...prevState,
                          checkbox_5: !payload.checked,
                        }));
                      }}
                      checked={checked.checkbox_5}
                      label=""
                    />
                    <div>
                      <Typography.Text
                        tag="p"
                        view="primary-medium"
                        style={{ marginBottom: 0, flexGrow: 1 }}
                      >
                        Заявление о финансовой защите
                      </Typography.Text>
                    </div>
                  </div>
                </>
              </Collapse>
            </div>
          </div>

          <Gap size={32} />

          <Input
            placeholder="Введите email"
            block={true}
            label="Куда прислать документы"
            labelView={"outer"}
            size={48}
          />

          <Gap size={28} />

          <Typography.Text
            tag="p"
            view="primary-small"
            color="secondary"
            style={{ marginBottom: 0 }}
          >
            Нажимая "Подписать" и вводя код смс, вы подписываете договор кредита
            (раздел «Документы»), оформляете дополнительные услуги (если их
            получение было выбрано вами), подтверждаете иные сделанные вами
            волеизъявления.
          </Typography.Text>
        </div>
      )}

      {step === 3 && (
        <div className={appSt.container}>
          <Gap size={24} />

          <Typography.TitleResponsive
            font="system"
            tag="h4"
            view="small"
            weight="medium"
          >
            Документы
          </Typography.TitleResponsive>

          <Gap size={24} />

          <div className={appSt.benefits}>
            <div className={appSt.benefit}>
              <div>
                <DocumentsLinesMIcon height="32" width="32" color="gray" />
              </div>

              <Typography.Text
                tag="p"
                view="primary-medium"
                style={{ marginBottom: 0 }}
                onClick={() => {
                  window.open("https://alfabank.ru/");
                }}
              >
                Заявление заёмщика
              </Typography.Text>
            </div>

            <div className={appSt.benefit}>
              <div>
                <DocumentsLinesMIcon height="32" width="32" color="gray" />
              </div>

              <Typography.Text
                tag="p"
                view="primary-medium"
                style={{ marginBottom: 0 }}
                onClick={() => {
                  window.open("https://alfabank.ru/");
                }}
              >
                Согласие на обработку персональных данных
              </Typography.Text>
            </div>

            <div className={appSt.benefit}>
              <div>
                <DocumentsLinesMIcon height="32" width="32" color="gray" />
              </div>

              <Typography.Text
                tag="p"
                view="primary-medium"
                style={{ marginBottom: 0 }}
                onClick={() => {
                  window.open("https://alfabank.ru/");
                }}
              >
                Индивидуальные условия
              </Typography.Text>
            </div>

            <div className={appSt.benefit}>
              <div>
                <DocumentsLinesMIcon height="32" width="32" color="gray" />
              </div>

              <Typography.Text
                tag="p"
                view="primary-medium"
                style={{ marginBottom: 0 }}
                onClick={() => {
                  window.open("https://alfabank.ru/");
                }}
              >
                Заявление о присоединении к коллективному договору
              </Typography.Text>
            </div>

            <div className={appSt.benefit}>
              <div>
                <DocumentsLinesMIcon height="32" width="32" color="gray" />
              </div>

              <Typography.Text
                tag="p"
                view="primary-medium"
                style={{ marginBottom: 0 }}
                onClick={() => {
                  window.open("https://alfabank.ru/");
                }}
              >
                Заявление о предоставлении дополнительных услуг
              </Typography.Text>
            </div>
          </div>
        </div>
      )}

      {step === 5 && (
        <>
          <div className={thxSt.container}>
            <HatchingProgressBar
              value={bar}
              hatchValue={100}
              view="positive"
              className={appSt.bar}
            />
            <Gap size={64} />

            {bar <= 25 && (
              <Typography.TitleResponsive
                font="system"
                tag="h4"
                view="small"
                weight="medium"
              >
                Начинаем проверку данных
              </Typography.TitleResponsive>
            )}

            {bar > 25 && bar <= 50 && (
              <Typography.TitleResponsive
                font="system"
                tag="h4"
                view="small"
                weight="medium"
              >
                Проверяем кредитную историю
              </Typography.TitleResponsive>
            )}

            {bar > 50 && (
              <Typography.TitleResponsive
                font="system"
                tag="h4"
                view="small"
                weight="medium"
              >
                Подбираем лимит для комбо-счёта
              </Typography.TitleResponsive>
            )}

            <Gap size={12} />
            <Typography.Text tag="p" view="primary-medium" color="secondary">
              Займёт около 30 секунд. Не выходите из приложения, чтобы не
              оформлять всё с начала
            </Typography.Text>
            <Gap size={20} />
          </div>
        </>
      )}

      {(step === 1 || step === 4) && <Gap size={96} />}

      {step === 1 && (
        <div className={appSt.bottomBtnThx}>
          <ButtonMobile
            onClick={() => {
              setStep(4);
            }}
            block
            view="primary"
            href=""
          >
            Продолжить
          </ButtonMobile>
        </div>
      )}

      {step === 4 && (
        <div className={appSt.bottomBtnThx}>
          <ButtonMobile
            onClick={() => {
              if (
                !checked.checkbox_2 ||
                !checked.checkbox_3 ||
                !checked.checkbox_4
              ) {
                setError(true);

                return;
              }

              setStep(5);
              setTimerActive(true);
            }}
            block
            view="primary"
            href=""
          >
            Продолжить
          </ButtonMobile>
        </div>
      )}

      {step === 3 && (
        <div className={appSt.bottomBtnThx}>
          <ButtonMobile
            onClick={() => {
              setStep(1);
              setScrollToDocs(true);
            }}
            block
            view="primary"
            href=""
          >
            Назад к подписанию
          </ButtonMobile>
        </div>
      )}
    </>
  );
};
