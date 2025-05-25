import { Box, Stack, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../services/api";
import MovieCard from "../../components/MovieCard/MovieCard";
import LoadingBox from "../../components/ui/LoadingBox";
import ErrorBox from "../../components/ui/ErrorBox";

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

const MAX_PAGES = 500;

const UpcomingMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const hoje = new Date();
  const daquiUmMes = new Date();
  daquiUmMes.setMonth(hoje.getMonth() + 1);

  const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  const dataMin = formatDate(hoje);
  const dataMax = formatDate(daquiUmMes);

  const getMovies = (pageNumber: number = 1): void => {
    api
      .get<MoviesResponse>("/discover/movie", {
        params: {
          page: pageNumber,
          "release_date.gte": dataMin,
          "release_date.lte": dataMax,
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
    getMovies(page);
  }, [page]);

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ): void => {
    setPage(value);
  };

  if (loading) return <LoadingBox />;
  if (error) return <ErrorBox message={error} />;

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        gap={2}
        p={2}
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
