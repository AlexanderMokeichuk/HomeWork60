import React, {useState} from "react";
import {PostToServer} from "../../type";
import {Send} from "react-bootstrap-icons";

const defaultState:PostToServer = {
  author: "",
  message: "",
};

const url: string = "http://146.185.154.90:8000/messages";

const SendNewMessageForm: React.FC = React.memo(() => {
  const [formState, setFormState] = useState<PostToServer>(defaultState);

  const changeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const postToServer = async (e: React.FormEvent) => {
    e.preventDefault();
    const post = new URLSearchParams();
    post.set("message", formState.message);
    post.set("author", formState.author);

    const response = await fetch(url, {
      method: "post",
      body: post,
    });

    defaultState.author = formState.author;
    setFormState(defaultState);
  };

  return (
    <form onSubmit={postToServer} className={"d-flex gap-1"}>
      <i className="bi bi-send"></i>
      <input
        type={"text"}
        name={"author"}
        placeholder={"Your name"}
        className={"form-control w-25"}

        value={formState.author}
        onChange={changeEvent}/>
      <input
        type={"text"}
        name={"message"}
        placeholder={"Message"}
        className={"form-control"}

        value={formState.message}
        onChange={changeEvent}/>
      <button className={"btn btn-info"}><Send/></button>
    </form>
  );
});

export default SendNewMessageForm;