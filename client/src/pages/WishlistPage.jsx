import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppContext';

export default function WishlistPage() {
    const { user } = useContext(AppContext)
    const [wishlist, setWishlist] = useState([])

    useEffect(() => {
        if (user) {
            fetch('/favourites')
                .then(resp => resp.json())
                .then(data => setWishlist(data.favourites))
        }
    }, [user]);

    if (!user) return <p>Please log in to view your wishlist.</p>;

    return (
        <div>
            <h2>Your Wishlist</h2>
            {wishlist.length === 0 ? (
                <p>Your wishlist is empty.</p>
            ) : (
                <ul>
                    {wishlist.map(game => (
                        <li key={game.id}>{game.title}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}