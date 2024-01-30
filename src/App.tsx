import {useEffect, useState} from "react";
import {ResponseFromServer} from "./type";
import "bootstrap/dist/css/bootstrap.min.css";
import SendNewMessageForm from "./components/SendNewMessageForm/SendNewMessageForm";
import dayjs from "dayjs";
import MessageAlert from "./components/MessageAlert/MessageAlert";
import Loader from "./components/Loder/Loader";

const url: string = "http://146.185.154.90:8000/messages";

function App() {
  const [messages, setMessages] = useState<ResponseFromServer[]>([]);
  const [newMessage, setNewMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      if (response.ok) {
        const processedRequest: ResponseFromServer[] = await response.json();
        setMessages(processedRequest.reverse());

        let newUrl = url + `?datetime=${processedRequest[0].datetime}`;

        const intervalRequest = setInterval(async () => {
          const newResponse = await fetch(newUrl);
          const newProcessedRequest: ResponseFromServer[] = await newResponse.json();

          if (newProcessedRequest.length) {
            newUrl = url + `?datetime=${newProcessedRequest[newProcessedRequest.length - 1].datetime}`;
            setNewMessage(prevState => !prevState);
            clearInterval(intervalRequest);
          }
        }, 2000);
      }
    };

    void fetchData();
  }, [newMessage]);


  return (
    <div className={"container mt-5 d-flex flex-column align-items-center"}>
      <div className={"border border-1 p-3"} style={{width: 500, height: 600}}>
        <div className={"h-100 overflow-auto "}>
          {messages.length
            ? messages.map((message) => {
              return <MessageAlert key={message._id} message={message}/>;
            })
            : <Loader/>
          }
        </div>
        <SendNewMessageForm/>
      </div>
    </div>
  );
}

export default App;
