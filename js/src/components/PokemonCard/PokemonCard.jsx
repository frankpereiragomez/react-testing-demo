import { Link } from "react-router-dom";
import "./style.css";

const PokemonCard = ({ image, name, id }) => {
  return (
    <>
      <article className="pokemon-card">
        <Link to={`/pokemon/${id}`}>
          <img src={image} alt={name} />
        </Link>
        <h2>{name}</h2>
      </article>
    </>
  );
};

export default PokemonCard;
