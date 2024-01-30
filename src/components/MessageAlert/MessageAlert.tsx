import React from "react";
import dayjs from "dayjs";
import {ResponseFromServer} from "../../type";

interface Props {
  message:ResponseFromServer;
}
const MessageAlert:React.FC<Props> = React.memo(({message}) => {
  return (
    <div className={"alert alert-primary"} style={{width: 400}}>
      <div className={"d-flex flex-row justify-content-between"}>
        <div className={"mb-1"}><strong className={"fs-5"}>{message.author}</strong></div>
        <div className={"text-light fs-6"}>{dayjs(message.datetime).format("DD/MM/YYYY")}</div>
      </div>
      <div className={"text-break"}>
        {message.message}
      </div>
    </div>
  );
});

export default MessageAlert;