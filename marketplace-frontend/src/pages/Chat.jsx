import Typography from "@mui/material/Typography";
import PrimarySearchAppBar from "../components/AppBar";
import PrimarySearchAppBarSimple from "../components/AppBarSimple";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { TextField } from "@mui/material";
import Card from "@mui/material/Card";

import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState("");
  const [conversations, setConversations] = useState([]);
  const [userId, setUserId] = useState();

  const [currentConversationImage, setCurrentConversationImage] =
    useState(null);

  const [currentConversationName, setCurrentConversationName] = useState(null);

  const token = localStorage.getItem("token");

  function getIdOfBuyerFromConversationId(conversationId) {
    const parts = conversationId.split("-");
    if (parts.length >= 1 && parts[0].startsWith("user")) {
      return parts[0].substring(4); // Remove 'user' prefix
    }
    return null; // or throw error if format is invalid
  }

  useEffect(() => {
    console.log("Effect that fetches user data: ");
    const fetchCurrentUser = async () => {
      const response = await fetch("http://localhost:8080/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const userData = await response.json();
        console.log("Response after fetching user data: ", userData);
        setUserId(userData.id);
      } else {
        // handle error
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchAllConversations = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/api/chat/conversation",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        //setar num state
        console.log("All conversations fetched:");
        console.log(data);

        const retrievedConversations = [];

        for (var i = 0; i < data.length; i++) {
          retrievedConversations.push({
            receiverId: data[i]["receiverId"],
            receiverName: data[i]["receiverName"],
            productId: data[i]["productId"],
            productName: data[i]["productName"],
            productImage: data[i]["productImage"],
            conversationId: data[i]["conversationId"],
            senderName: data[i]["senderName"],
          });
        }

        console.log("Conversations to be render:");
        console.log(retrievedConversations);
        setConversations(retrievedConversations);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllConversations();
  }, []);

  useEffect(() => {
    console.log(
      "Effect to get all of messages of conversation Id: ",
      conversationId
    );
    const fetchAllMessages = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/api/chat/" + conversationId,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        //setar num state
        console.log("All messages fetched:");
        console.log(data);

        const retrievedMessages = [];

        for (var i = 0; i < data.length; i++) {
          retrievedMessages.push({
            sender: data[i]["sender"],
            content: data[i]["content"],
            timestamp: data[i]["timestamp"],
            conversationId: data[i]["conversationId"],
          });
        }

        console.log("Data to be render:");
        console.log(retrievedMessages);
        setMessages(retrievedMessages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllMessages();
  }, [conversationId]);

  useEffect(() => {
    if (conversationId !== "") {
      const socket = new SockJS("http://localhost:8081/ws/chat");
      const client = new Client({
        webSocketFactory: () => socket,
        connectHeaders: {
          Authorization: `Bearer ${token}`,
        },
        onConnect: () => {
          client.subscribe(`/topic/private.${conversationId}`, (message) => {
            const body = JSON.parse(message.body);
            console.log("Message Received: ", message);
            setMessages((prev) => [...prev, body]);
          });
        },
      });
      client.activate();
      setStompClient(client);
      return () => client.deactivate(); // Cleanup
    }
  }, [conversationId]);

  const sendMessage = () => {
    if (stompClient && input.trim() !== "") {
      const msg = {
        sender: userId,
        content: input,
        timestamp: new Date().toISOString(),
        conversationId: conversationId,
      };
      stompClient.publish({
        destination: `/app/chat.${conversationId}`,
        body: JSON.stringify(msg),
      });
      setInput("");
    }
  };

  return (
    <>
      <PrimarySearchAppBarSimple></PrimarySearchAppBarSimple>
      <Box sx={{ display: "flex", mt: 10, height: "100vh" }}>
        <Box sx={{ maxWidth: 600 }}></Box>
        <Box
          sx={{
            width: "25%",
            height: "100%",
            //backgroundColor: "lightblue",
            //mr: 2, // margin
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "80px",
              border: "0.5px solid transparent",
            }}
          >
            <Typography sx={{ fontSize: 35, ml: 18 }}>Messages</Typography>
          </Box>

          {conversations.map((conversation, index) =>
            index >= 0 ? (
              <Button
                onClick={() => {
                  setCurrentConversationImage(conversation.productImage);
                  console.log(userId, conversation.receiverId);

                  const buyerId = getIdOfBuyerFromConversationId(
                    conversation.conversationId
                  );

                  let prefix = "";

                  if (userId === buyerId) {
                    prefix = "Seller: ";
                  } else {
                    prefix = "Buyer: ";
                  }

                  if (conversation.receiverId !== userId) {
                    setCurrentConversationName(
                      prefix + conversation.receiverName
                    );
                  } else {
                    console.log(conversation.senderName);
                    setCurrentConversationName(
                      prefix + conversation.senderName
                    );
                  }

                  setConversationId(conversation.conversationId);
                }}
                sx={{
                  height: "100px",
                  width: "100%",
                  backgroundColor: "transparent",
                  color: "black",
                  borderBottom: "0.5px solid grey",
                  borderTop: "0.5px solid grey",
                  borderRadius: 0,
                  textTransform: "none",
                }}
              >
                <Card
                  sx={{
                    height: "100%",
                    width: "100%",
                    boxShadow: 0,
                  }}
                >
                  <Grid container spacing={2} sx={{ width: 1000 }}>
                    <Grid>
                      <Box sx={{ m: 1 }}>
                        <CardMedia
                          component="img"
                          height="70px"
                          image={
                            "http://localhost:8080" + conversation.productImage
                          }
                          sx={{ objectFit: "contain" }}
                        />
                      </Box>
                    </Grid>
                    <Grid sx={{ textAlign: "left" }}>
                      <Typography
                        gutterBottom
                        component="div"
                        sx={{ fontSize: 20, color: "black", mt: 1 }}
                      >
                        {conversation.productName}
                      </Typography>
                      <Typography sx={{ fontsize: 10, color: "black", mt: 1 }}>
                        Hello ...
                      </Typography>
                    </Grid>
                  </Grid>
                </Card>
              </Button>
            ) : (
              <Button
                sx={{
                  height: "100px",
                  width: "100%",
                  backgroundColor: "transparent",
                  color: "black",
                  borderBottom: "0.5px solid",
                  borderRadius: 0,
                }}
              >
                {conversation}
              </Button>
            )
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "80%",
            //backgroundColor: "lightgreen",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              height: "100px",
              width: "100%",
              border: 1,
              backgroundColor: "#f5f5f5",
            }}
          >
            {conversationId !== "" && (
              <>
                <Button
                  sx={{
                    width: "300px",
                    height: "100%",
                    textTransform: "none",
                    justifyContent: "flex-start", // aligns children (image + text) left horizontally
                    alignItems: "center", // vertically center image + text
                    p: 1, // some padding so content isn’t cramped
                  }}
                >
                  <Typography sx={{ color: "black", fontSize: 20, ml: 3 }}>
                    {currentConversationName}
                  </Typography>
                </Button>

                <Button sx={{ ml: "auto", width: "100px", height: "80px" }}>
                  <CardMedia
                    component="img"
                    height="70px"
                    image={"http://localhost:8080" + currentConversationImage}
                    sx={{ objectFit: "contain" }}
                  />
                </Button>
              </>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              overflowY: "auto",
              border: "1px solid #ccc",
              borderRadius: 1,
              height: "100%",
              mb: 2,
              p: 1,
              fontFamily: "monospace",
              fontSize: 14,
            }}
          >
            {messages.map((msg, idx) => (
              <Box
                sx={{
                  display: "flex",
                  justifyContent:
                    msg.sender == userId ? "flex-end" : "flex-start",
                  ml: msg.sender == userId ? 5 : 0,
                  mr: msg.sender == userId ? 5 : 0,
                  mt: 1,
                }}
              >
                <Box
                  key={idx}
                  sx={{
                    display: "inline-block",
                    border: 1,
                    borderRadius: 1,
                    backgroundColor: msg.sender == userId ? "lightBlue" : "",
                  }}
                >
                  <Typography sx={{ fontSize: 14, p: 1 }}>
                    {msg.content}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          <Box
            display="flex"
            sx={{ mt: "auto", height: "100px", width: "100%" }}
          >
            <TextField
              sx={{ width: "100%" }}
              size="small"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message"
            />
            <Button
              sx={{ ml: 1, height: "50%" }}
              variant="contained"
              onClick={sendMessage}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Chat;
