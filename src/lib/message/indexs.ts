import errorMsgs from "./errors";

const messages = {
  errors: errorMsgs,
};

type Messages = {
  [key: string]: {
    [key: string]: string;
  };
}

export default messages as Messages;
