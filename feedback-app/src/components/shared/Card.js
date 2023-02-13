import PropTypes from 'prop-types';

// The Card componenet contains two props. children is a React porop
// that allows Card to render any child component or HTML element
// that are passed into it.
// reverse is a prop that will let you determine what color the Card
// is going to be. You can set it to true or false and the CSS will
// render accordingly
function Card({children, reverse}) {

    return (
        <div className="card" style={{
            backgroundColor: reverse ? 'rgba(0,0,0,0.4)' : '#fff',
            color: reverse ? '#fff' : '#000'
        }}>
            {children}
        </div>
    );
}

Card.defaultProps = {
    reverse: true,
};

Card.propTypes = {
    children: PropTypes.node.isRequired,
    reverse: PropTypes.bool,
}

export default Card;
