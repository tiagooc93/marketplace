import { TextField, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const handleOnSubmitRegister = async () => {
    console.log("Sending login request");
    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) throw new Error("Register failed");

      const data = await response.json();
      console.log("response: ", data);

      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <Box
        sx={{
          p: 2,
          fontWeight: "bold",
          flexGrow: 1,
        }}
        display="flex"
        width="400px"
      >
        <Typography sx={{ fontSize: 40, fontWeight: "medium" }}>
          MarketPlace
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        minHeight="80vh"
        justifyContent="center"
        gap={2}
      >
        <Typography sx={{ fontSize: 40, fontWeight: "medium" }}>
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={handleOnSubmitRegister}
          display="flex"
          flexDirection="column"
          gap={2}
          maxWidth="400px"
          width="100%"
          sx={{ boxShadow: 3, p: 6 }}
        >
          <>
            <FormControl fullWidth margin="normal">
              <TextField
                type="text"
                placeholder="username"
                label="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                type="email"
                placeholder="e-mail"
                label="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                type="password"
                placeholder="******"
                label="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                type="password"
                placeholder="******"
                label="Repeat Password"
                required
                value={repeatedPassword}
                onChange={(e) => setRepeatedPassword(e.target.value)}
              />
            </FormControl>

            <Button
              variant="contained"
              sx={{ border: 1, mt: 2 }}
              onClick={handleOnSubmitRegister}
            >
              Register !
            </Button>
          </>
        </Box>
      </Box>
    </>
  );
}

export default Register;
