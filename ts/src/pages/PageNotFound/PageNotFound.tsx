import { Link } from "react-router-dom";
import paths from "../../routers/paths/paths";
import "./style.css";

const PageNotFound = (): React.ReactElement => {
  return (
    <>
      <section className="section">
        <h2 className="section__title">Page not found</h2>
        <img
          className="section__img"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/110.png"
          alt="weezing pokemon about to launch a poisonous attack"
        />
        <p className="section__message">
          Oops, looks like Weezing is about to throw poison at you, run back !
        </p>
        <Link className="section__link" to={paths.home}>
          Go back
        </Link>
      </section>
    </>
  );
};

export default PageNotFound;
