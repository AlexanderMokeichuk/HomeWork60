import React, {useEffect, useState} from "react";
import {PostToServer} from "../../type";

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
    <form onSubmit={postToServer}>
      <input
        type={"text"}
        name={"author"}

        value={formState.author}
        onChange={changeEvent}/>
      <input
        type={"text"}
        name={"message"}

        value={formState.message}
        onChange={changeEvent}/>
      <button>Send</button>
    </form>
  );
});

export default SendNewMessageForm;