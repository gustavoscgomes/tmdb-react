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

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  release_date: string;
}

interface MoviesResponse {
  results: Movie[];
  total_pages: number;
}

const Lancamentos = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const getMovies = (pageNumber: number = 1): void => {
    api
      .get<MoviesResponse>("/movie/upcoming", {
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

  const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number): void => {
    setPage(value);
  };

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

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          p: 2,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 2,
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
