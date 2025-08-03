import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const MessageForm = () => {
  const [timeDelay, setTimeDelay] = useState<number>(0); //secs
  const [message, setMessage] = useState<string>(""); //message
  const [isSending, setIsSending] = useState<boolean>(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [sentMessage, setSentMessage] = useState<string>("");

  const setTime = (time: string) => {
    setTimeDelay(+time);
  };

  const setMessageText = (message: string) => {
    setMessage(message);
  };

  const sendMessage = () => {
    setIsSending(true);
    const id = setTimeout(() => {
      setSentMessage(message);
      setTimeDelay(0);
      setMessage("");
      setIsSending(false);
    }, timeDelay * 1000);

    setTimerId(id);
  };

  const cancelSend = () => {
    if (timerId) clearTimeout(timerId);
    setIsSending(false);
    setSentMessage("");
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-sm bg-white space-y-4 ">
      <h2 className="text-2xl font-bold text-gray-500">DM Delay Button</h2>
      <Textarea
        placeholder="Input your message here"
        value={message}
        onChange={(e) => setMessageText(e.target.value)}
        disabled={isSending}
      />
      <Input
        placeholder="05 secs"
        type="number"
        value={timeDelay}
        onChange={(e) => setTime(e.target.value)}
        disabled={isSending}
      />
      {!isSending ? (
        <Button className="w-full" onClick={sendMessage} disabled={isSending}>
          Send Message!
        </Button>
      ) : (
        <Button className="w-full" onClick={cancelSend} variant="destructive">
          Cancel Send
        </Button>
      )}

      <p>Sent Message:</p>
      {sentMessage && <p>{sentMessage}</p>}
    </div>
  );
};

export default MessageForm;
