import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { Box, Stack, Pagination } from "@mui/material";
import MovieCard from "../../components/MovieCard/MovieCard";
import LoadingBox from "../../components/ui/LoadingBox";
import ErrorBox from "../../components/ui/ErrorBox";

const MAX_PAGES = 500;

const SearchPage = () => {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getMovies = (pageNumber = 1) => {
    api
      .get(`/search/movie?query=${query}`, {
        params: {
          page: pageNumber,
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
    setLoading(true);
    getMovies(page);
  }, [query, page]);

  console.log(movies);
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
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        gap={2}
        p={2} // padding
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

export default SearchPage;
