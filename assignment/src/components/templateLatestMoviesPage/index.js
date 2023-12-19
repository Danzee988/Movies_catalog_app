import { useQuery } from "react-query";
import Spinner from '../spinner'
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import { getMovieImages2 } from "../../api/tmdb-api";

function TemplateLatestMoviesPage({ movie, title, action,children }) {
  const { data: images, error: imagesError, isLoading, isError } = useQuery(
    ['movieImages', { id: movie?.id }],
    () => getMovieImages2({ id: movie?.id })
  );
  
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error fetching movie data</div>;
  }

  // Check if backdrops, logos, and posters arrays exist
  const hasBackdrops = Array.isArray(images.backdrops) && images.backdrops.length > 0;
  const hasLogos = Array.isArray(images.logos) && images.logos.length > 0;
  const hasPosters = Array.isArray(images.posters) && images.posters.length > 0;

  return (
    <div>
      <MovieHeader movie={movie} />

      <Grid container spacing={5} sx={{ padding: "15px" }}>
      <Grid item xs={9}>
          {children}
        </Grid>
        <Grid item xs={3}>
          <div sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}>

        <h2>Movie Images</h2>
            <ImageList 
            
                cols={1}>
                {hasBackdrops && (
                  <div>
                    <h3>Backdrops</h3>
                    {images.backdrops.map((backdrop, index) => (
                      <img
                        key={index}
                        src={`https://image.tmdb.org/t/p/w500/${backdrop.file_path}`}
                        alt={backdrop.file_path}
                      />
                    ))}
                  </div>
                )}

                {hasLogos && (
                  <div>
                    <h3>Logo</h3>
                    {images.logos.map((logo, index) => (
                      <img
                        key={index}
                        src={`https://image.tmdb.org/t/p/w500/${logo.file_path}`}
                        alt={logo.file_path}
                      />
                    ))}
                  </div>
                )}

                {hasPosters && (
                  <div>
                    <h3>Posters</h3>
                    {images.posters.map((poster, index) => (
                      <img
                        key={index}
                        src={`https://image.tmdb.org/t/p/w500/${poster.file_path}`}
                        alt={poster.file_path}
                      />
                    ))}
                  </div>
                )}
            </ImageList>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default TemplateLatestMoviesPage;
