import {
  Grid,
  Typography,
  CircularProgress,
  Box,
  Stack,
  Pagination,
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../services/api";
import MovieCard from "../../components/MovieCard/MovieCard";

const Lancamentos = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getMovies = (pageNumber = 1) => {
    api
      .get("/movie/upcoming", {
        params: { page: pageNumber },
      })
      .then((response) => {
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
        setLoading(false);
      })
      .catch(() => {
        setError("Ocorreu um erro ao buscar os filmes.");
        setLoading(false);
      });
  };

  useEffect(() => {
    getMovies(page);
  }, [page]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <Grid
        container
        spacing={2} // Espaçamento entre os itens
        sx={{
          p: 2, // padding: 16px
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 2, // gap: 16px
        }}
      >
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            image={movie.poster_path}
            vote={movie.vote_average}
            overview={movie.overview}
            release_date={movie.release_date}
            showButton={true}
          />
        ))}
      </Grid>

      <Stack direction="row" justifyContent="center" my={4} spacing={2}>
        <Pagination
          count={totalPages > 500 ? 500 : totalPages}
          color="primary"
          page={page}
          onChange={handleChangePage}
        />
      </Stack>
    </>
  );
};

export default Lancamentos;
