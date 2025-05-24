import { Box, Stack, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../services/api";
import MovieCard from "../../components/MovieCard/MovieCard";
import LoadingBox from "../../components/ui/LoadingBox";
import ErrorBox from "../../components/ui/ErrorBox";

const hoje = new Date();
const daquiUmMes = new Date();
daquiUmMes.setMonth(hoje.getMonth() + 1);

// Função para formatar a data para yyyy-mm-dd
const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};

// Variáveis para filtrar os filmes mais recentes
const dataMin = formatDate(hoje);
const dataMax = formatDate(daquiUmMes);
const MAX_PAGES = 500;

const UpcomingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getMovies = (pageNumber = 1, dateMin, dateMax) => {
    api
      .get("/discover/movie", {
        params: {
          page: pageNumber,
          "release_date.gte": dateMin, // Data mínima
          "release_date.lte": dateMax, // Data máxima
          sort_by: "popularity.desc",
        },
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
    getMovies(page, dataMin, dataMax);
  }, [page, dataMin, dataMax]);

  if (loading) {
    return <LoadingBox />;
  }

  if (error) {
    return <ErrorBox message={error} />;
  }

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 2,
          p: 2,
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
      </Box>

      <Stack direction="row" justifyContent="center" my={4} spacing={2}>
        <Pagination
          count={Math.min(totalPages, MAX_PAGES)}
          color="primary"
          page={page}
          onChange={handleChangePage}
        />
      </Stack>
    </>
  );
};

export default UpcomingMovies;
