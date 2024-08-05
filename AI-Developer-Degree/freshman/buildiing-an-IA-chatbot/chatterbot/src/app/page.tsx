"use client";
import { useState } from "react";

export default function Home() {
  // State to hold the user's input
  const [theInput, setTheInput] = useState("");

  // State to track loading status
  const [isLoading, setIsLoading] = useState(false);

  // State to store chat messages
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Yo, this is ChatterBot! How can I help you today?",
    },
  ]);

  // Function to handle API call and update messages
  const callGetResponse = async () => {
    if (theInput.trim() === "") return; // Prevent empty submissions

    // Set loading state to true
    setIsLoading(true);

    // Create a temporary copy of messages
    // Add user's message
    const newMessages = [
      ...messages,
      { role: "user", content: theInput.trim() },
    ];

    // Update messages state with the new array
    setMessages(newMessages);

    // Clear the input field
    setTheInput("");

    // Make API call to get response
    try {
      const response = await fetch("/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Parse the response
      const data = await response.json();

      if (!data.output || !data.output.role || !data.output.content) {
        throw new Error("Invalid response structure");
      }
      const { output } = data;

      // Add the assistant's response to the messages
      setMessages((prevMessages) => [...prevMessages, output]);
    } catch (error) {
      console.error("Error making API call:", error);
    } finally {
      // Set loading state back to false
      setIsLoading(false);
    }
  };

  // Function to handle the submission of the input when the Enter key is pressed
  const Submit = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Check if the pressed key is Enter
    if (event.key === "Enter" && !event.shiftKey) {
      // Prevent the default action of the Enter key (e.g., adding a new line)
      event.preventDefault();
      // Call the function to get the response from the API
      callGetResponse();
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24 py-5">
      <h1 className="text-5xl font-sans">ChatterBot</h1>

      <div className="flex  h-[35rem] w-[40rem] flex-col items-center bg-gray-600 rounded-xl">
        <div className=" h-full flex flex-col gap-2 overflow-y-auto py-8 px-3 w-full">
          <div className=" h-full flex flex-col gap-2 overflow-y-auto py-8 px-3 w-full">
            {messages.map((e) => {
              return (
                <div
                  key={e.content}
                  className={`w-max max-w-[18rem] rounded-md px-4 py-3 h-min ${
                    e.role === "assistant"
                      ? "self-start  bg-gray-200 text-gray-800"
                      : "self-end  bg-gray-800 text-gray-50"
                  } `}
                >
                  {e.content}
                </div>
              );
            })}

            {isLoading ? (
              <div className="self-start  bg-gray-200 text-gray-800 w-max max-w-[18rem] rounded-md px-4 py-3 h-min">
                *thinking*
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="relative  w-[80%] bottom-4 flex justify-center">
          <textarea
            value={theInput}
            onChange={(event) => setTheInput(event.target.value)}
            className="w-[85%] h-10 px-3 py-2
        resize-none overflow-y-auto text-black bg-gray-300 rounded-l outline-none"
            onKeyDown={Submit}
          />
          <button
            onClick={callGetResponse}
            className="w-[15%] bg-blue-500 px-4 py-2 rounded-r"
          >
            send
          </button>
        </div>
      </div>
      <div></div>
    </main>
  );
}
