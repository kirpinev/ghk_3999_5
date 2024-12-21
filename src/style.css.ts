import { style, globalStyle } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

const container = style({
  display: "flex",
  padding: "1rem",
  flexDirection: "column",
});

const box = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const bottomBtn = style({
  width: "100%",
  padding: "12px",
});

const bottomBtnThx = style({
  position: "fixed",
  zIndex: 2,
  width: "100%",
  padding: "12px",
  bottom: 0,
});

const productsTitle = style({
  display: "flex",
  gap: "0.5rem",
  fontSize: "26px",
  lineHeight: "32px",
});

const products = style({
  display: "flex",
  gap: "1rem",
});

const product = style({
  borderRadius: "1rem",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  border: "1px solid #F2F3F5",
  boxSizing: "border-box",
});

const productTitle = style({
  lineHeight: "24px",
  fontSize: "17px",
  marginBottom: "0.3rem",
});

const bonus = style({
  flex: 1,
});

const gifts = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
});

const gift = style({
  border: "2px solid gray",
  borderRadius: "1rem",
  borderColor: "#F2F3F5",
  padding: "0.5rem",
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
  flexBasis: "30%",
  minHeight: "4rem",
  cursor: "pointer",
  position: "relative",
});

const checkMark = style({
  position: "absolute",
  right: -3,
  top: -9,
});

const benefits = style({
  display: "flex",
  flexDirection: "column",
});

const benefit = style({
  display: "flex",
  gap: "1rem",
  boxSizing: "border-box",
  padding: "1rem 0",
  alignItems: "center",
});

const swSlide = recipe({
  base: {
    minWidth: "58px",
    maxWidth: "max-content",
    height: "32px",
    backgroundColor: "#F8F8F8",
    padding: "4px 12px",
    borderRadius: "1rem",
    fontSize: "14px",
    lineHeight: "24px",
    textAlign: "center",
    color: "#6F6F6F",
    transition: "all .25s ease",
    display: "flex",
    alignItems: "center",
  },
  variants: {
    selected: {
      true: {
        backgroundColor: "#000",
        color: "#FFF",
      },
    },

    default: {
      true: {
        background: "#FFEFD9",
        color: "#FF6838",
      },
    },
  },
});

const reminder = style({
  boxSizing: "border-box",
  padding: "0.8rem",
  border: "1px solid #F2F3F5",
  borderRadius: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const detail = style({
  display: "flex",
  alignItems: "center",
  boxSizing: "border-box",
  padding: "1rem",
  borderRadius: "1rem",
  backgroundColor: "#f3f4f5",
  cursor: "pointer",
});

globalStyle(`${detail} > label`, {
  width: "1.5rem",
  marginRight: "1rem",
});

const expandedDetail = style({
  display: "flex",
  alignItems: "center",
  boxSizing: "border-box",
});

globalStyle(`${expandedDetail} > label`, {
  width: "1.5rem",
  marginRight: "1rem",
});

const spinner = style({
  color: "red",
  width: "56px",
  height: "56px",
});

const bar = style({
  width: "100%",
});

export const appSt = {
  bottomBtn,
  bottomBtnThx,
  container,
  box,
  productsTitle,
  products,
  productTitle,
  product,
  bonus,
  gifts,
  gift,
  checkMark,
  benefits,
  benefit,
  swSlide,
  reminder,
  detail,
  expandedDetail,
  spinner,
  bar,
};
