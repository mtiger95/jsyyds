import normal from "./normal";
import download from "./download";
import regExp from "./regExp";
import special from "./special";

export * from "./normal";
export * from "./download";
export * from "./regExp";
export * from "./special";

export default {
  ...normal,
  ...download,
  ...regExp,
  ...special,
};
