import React from 'react';
import { Link } from 'react-router-dom';
import ProTypes from 'prop-types';


const Room = ({ room }) => {
    const { name, slug, images, price } = room;
    return (
        <article className="room">
            <div className="img-container">
                <img src={images[0]} alt="single room" />
                <div className="price-top">
                    <h6>Kr{price}</h6>
                    <p>per night</p>
                </div>
                <Link to={`/rooms/${slug}`} className="btn-primary room-link">Features</Link>
            </div>
            <p className="room-info">{name}</p>
        </article>
    )
}

export default Room;

Room.propTypes = {
    room: ProTypes.shape({
        name: ProTypes.string.isRequired,
        slug: ProTypes.string.isRequired,
        // images: ProTypes.arrayOf(PropTypes.string).isRequired,
        price: ProTypes.number.isRequired
    })
}

