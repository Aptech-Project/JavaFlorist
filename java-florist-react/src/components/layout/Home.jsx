import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Project 3 - Java Florist</h1>
            <img src="https://www.superprof.co.uk/blog/wp-content/uploads/2019/12/drawing-plants-and-flowers-1060x707.jpg" width='1000px'  alt=''/>
            <p><Link to="products">&gt;&gt; Manage Products</Link></p>
        </div>
    );
}

export { Home };