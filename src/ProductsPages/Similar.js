import "./Similar.css";
export const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 6,
    slidesToSlide: 2,
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items:5,
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
export default function Product(props) {
  return (
    <div className="Scard">
      <img className="product--image" src={props.url} alt="product" />
      <h2>{props.name}</h2>
      <p className="Sprice">{props.price}</p>
    </div>
  );
};
