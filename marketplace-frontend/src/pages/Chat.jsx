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
import { useLocation } from "react-router-dom";

const chats = ["Conversa1", "Conversa2", "Conversa3", "Conversa4", "Conversa5"];
const chats2 = [
  {
    conversationId: "user1-user2-product2",
    productId: 2,
    productName: "",
    productImage: null,
    sellerId: 2,
    sellerName: "João",
  },
  {
    conversationId: "user1-user3-product3",
    productId: 3,
    productName: "",
    productImage: null,
    sellerId: 3,
    sellerName: "Marcos",
  },
];

const userId = 1;

function Chat() {
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState("");
  const [conversations, setConversations] = useState([]);

  const [conversationAdded, setConversationAdded] = useState(false);

  const location = useLocation();
  const state = location.state;

  console.log(
    "Chat initialized with given state: " + state.createNewConversation
  );

  useEffect(() => {
    console.log(
      "Use effect to add new conversation, add conversation ?",
      conversationAdded
    );

    if (conversationAdded) {
      return;
    }

    setConversationAdded(true);
    console.log("Need to add new conversation to messages tab !");

    const newConversationData = {
      sellerId: state.sellerId,
      sellerName: state.sellerName,
      productId: state.productId,
      productName: state.productName,
      productImage: state.productImage,
      userId: 1,
      conversationId: `user${userId}-user${state.sellerId}-product${state.productId}`,
    };

    console.log("Conversation data: ", newConversationData);

    const createNewConversation = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/chat/conversation",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newConversationData),
          }
        );
        if (response.ok) {
          console.log("New Conversation saved successfully!");
        } else {
          console.error("Failed to save new conversation");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    createNewConversation();
  }, []);

  useEffect(() => {
    const fetchAllConversations = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/chat/conversation/1"
        );
        const data = await response.json();
        //setar num state
        console.log("All conversations fetched:");
        console.log(data);

        const retrievedConversations = [];

        for (var i = 0; i < data.length; i++) {
          retrievedConversations.push({
            userId: data[i]["userId"],
            sellerId: data[i]["sellerId"],
            sellerName: data[i]["sellerName"],
            productId: data[i]["productId"],
            productName: data[i]["productName"],
            productImage: data[i]["productImage"],
            conversationId: data[i]["conversationId"],
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
          "http://localhost:8080/api/chat/" + conversationId
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
      const socket = new SockJS("http://localhost:8080/ws/chat");
      const client = new Client({
        webSocketFactory: () => socket,
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
        sender: "user1",
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
                onClick={() => setConversationId(conversation.conversationId)}
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
                        Olá, tudo bem ? gostaria de fazer uma oferta ...
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
                    width: "200px",
                    height: "100%",
                    textTransform: "none",
                    justifyContent: "flex-start", // aligns children (image + text) left horizontally
                    alignItems: "center", // vertically center image + text
                    //border: 1,
                    p: 1, // some padding so content isn’t cramped
                  }}
                >
                  <Box
                    component="img"
                    src="http://localhost:8080/uploads/images/product10.png"
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <Typography sx={{ color: "black", fontSize: 20, ml: 3 }}>
                    Tiago
                  </Typography>
                </Button>

                <Button sx={{ ml: "auto", width: "100px", height: "80px" }}>
                  <CardMedia
                    component="img"
                    height="70px"
                    image={"http://localhost:8080/uploads/images/product1.png"}
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
                    msg.sender == "user1" ? "flex-end" : "flex-start",
                  ml: msg.sender == "user1" ? 5 : 0,
                  mr: msg.sender == "user1" ? 5 : 0,
                  mt: 1,
                }}
              >
                <Box
                  key={idx}
                  sx={{ display: "inline-block", border: 1, borderRadius: 1 }}
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
