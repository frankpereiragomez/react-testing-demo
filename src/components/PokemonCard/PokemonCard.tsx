import { Link } from "react-router-dom";
import "./style.css";

interface PokemonProps {
  img: string;
  name: string;
  id: number;
}

const PokemonCard = ({ img, name, id }: PokemonProps): React.ReactElement => {
  return (
    <>
      <article className="pokemon-card">
        <Link to={`pokemon/${id}`}>
          <img src={img} alt={name} />
        </Link>
        <h2>{name}</h2>
      </article>
    </>
  );
};

export default PokemonCard;
