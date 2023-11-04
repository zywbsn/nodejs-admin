import {v4 as uuidv4} from "uuid";

const LogMessage = () => {
  console.log("Loading...");
  // console.log("𝕤𝕚𝕝𝕖𝕟𝕔𝕖𝕝𝕒𝕞𝕓");
  console.log("        _   _                                _                       _     ");
  console.log("       (_) | |                              | |                     | |    ");
  console.log("  ___   _  | |   ___   _ __     ___    ___  | |   __ _   _ __ ___   | |__  ");
  console.log(" / __| | | | |  / _ \\ | '_ \\   / __|  / _ \\ | |  / _` | | '_ ` _ \\  | '_ \\");
  console.log(" \\__ \\ | | | | |  __/ | | | | | (__  |  __/ | | | (_| | | | | | | | | |_) |");
  console.log(" |___/ |_| |_|  \\___| |_| |_|  \\___|  \\___| |_|  \\__,_| |_| |_| |_| |_.__/");
  console.log("");
};
const GetUuid = () => {
  return uuidv4();
};

export {
  LogMessage,
  GetUuid
}
