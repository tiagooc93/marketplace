import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";

const pages = ["Kitchen", "Electronics", "Sports", "Clothes"];

const images = [
  "/images/kitchen.jpg",
  "/images/electronics.jpg",
  "/images/sports.jpg",
  "/images/clothes.jpg",
];

function GroupsCircles() {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          justifyContent: "center",
          mt: 5,
        }}
      >
        {pages.map((page, index) => (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <IconButton
                sx={{
                  width: 260,
                  height: 260,
                  borderRadius: "50%",
                  padding: 0,
                  overflow: "hidden",
                  boxShadow: 2,
                  backgroundColor: "#fff", // optional
                  "&:hover": {
                    backgroundColor: "#e0e0e0", // noticeable gray
                    border: "2px solid #1976d2", // adds blue border
                  },

                  "&:hover img": {
                    transform: "scale(1.1)",
                  },
                }}
                onClick={
                  () => navigate(`/search?query=${encodeURIComponent(page)}`)
                  /*navigate("/search", {
                    state: { searchString: page },
                    replace: true,
                  }) */
                }
              >
                <img
                  src={images[index]}
                  alt="icon"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </IconButton>
              <Typography>{page}</Typography>
            </Box>
          </>
        ))}
      </Box>
    </>
  );
}
export default GroupsCircles;
