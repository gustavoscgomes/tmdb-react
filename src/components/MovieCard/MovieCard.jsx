import {
  Button,
  Rating,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ id, title, image, vote, release_date, showButton }) => {
  const navigate = useNavigate();

  const handleDetalhes = () => {
    navigate(`/filme/${id}`);
  };

  return (
    <Card
      sx={{
        maxWidth: 320,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={`https://image.tmdb.org/t/p/original/${image}`}
          alt={title}
          sx={{
            objectFit: "fill",
          }}
        />
        <CardContent sx={{ minHeight: 150 }}>
          <Typography gutterBottom variant="h6">
            {title}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            sx={{ color: "text.secondary" }}
          >
            {new Date(release_date).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </Typography>
          <Typography className="rat-card">
            <Rating
              name="read-only"
              value={vote / 2}
              readOnly
              precision={0.5}
              sx={{ color: "#ffb400" }}
            />
          </Typography>
        </CardContent>
      </CardActionArea>

      {/* Só renderiza o botão se showButton for true */}
      {showButton && (
        <CardActions sx={{ mt: "auto", display: "flex", justifyContent: "center" }}>
          <Button variant="contained" onClick={handleDetalhes}>Detalhes</Button>
        </CardActions>
      )}
    </Card>
  );
};

export default MovieCard;
