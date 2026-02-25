import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Path = () => {
    
    // State to manage the current page view
    const [currentPage, setCurrentPage] = useState('home');

    // Function to handle button clicks and change the view
    // const handleNavigation = (path) => {
    //     setCurrentPage(path);
    // };
    const navigate=useNavigate()
    function handleAdmin(e){
        navigate("/verify-email")
    }
    function handleUser(e){
        navigate("/resident-login")
    }
    

    const renderContent = () => {
        switch (currentPage) {
            case 'home':
                return (
                    <div className="button-container">
                        <button className="btn-custom" onClick={() => handleAdmin()}>
                            Admin
                        </button>
                        <button className="btn-custom" onClick={() => handleUser()}>
                            User
                        </button>
                    </div>
                );
        }
    };

    return (
        <div className="path-page">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
                
                body {
                    font-family: 'Poppins', sans-serif;
                    background-color: #ffffff;
                    position: relative;
                }
                .path-page {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem;
                    box-sizing: border-box;
                    color: #2C3E50;
                    text-align: center;
                    background-color: transparent; /* Changed to transparent */
                }
                .background-squares {
                    position: fixed;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    overflow: hidden;
                    z-index: -1;
                }
                .square {
                    position: absolute;
                    background-color: rgba(44, 62, 80, 0.05);
                    border-radius: 10px;
                    animation: moveSquare 20s infinite ease-in-out;
                }

                @keyframes moveSquare {
                    0% { transform: translate(0, 0) rotate(0deg); opacity: 0.8; }
                    20% { transform: translate(200px, 100px) rotate(45deg); opacity: 0.6; }
                    40% { transform: translate(50px, 300px) rotate(90deg); opacity: 0.9; }
                    60% { transform: translate(-100px, -50px) rotate(135deg); opacity: 0.7; }
                    80% { transform: translate(-200px, 200px) rotate(180deg); opacity: 0.5; }
                    100% { transform: translate(0, 0) rotate(0deg); opacity: 0.8; }
                }
                .square:nth-child(1) { top: 10%; left: 20%; width: 100px; height: 100px; animation-duration: 18s; }
                .square:nth-child(2) { bottom: 5%; right: 15%; width: 80px; height: 80px; animation-duration: 22s; animation-delay: 2s; }
                .square:nth-child(3) { top: 50%; left: 5%; width: 120px; height: 120px; animation-duration: 25s; animation-delay: 4s; }
                .square:nth-child(4) { bottom: 30%; left: 40%; width: 90px; height: 90px; animation-duration: 20s; animation-delay: 6s; }
                .square:nth-child(5) { top: 70%; left: 60%; width: 70px; height: 70px; animation-duration: 19s; animation-delay: 3s; }
                .square:nth-child(6) { bottom: 10%; left: 70%; width: 110px; height: 110px; animation-duration: 23s; animation-delay: 5s; }

                .button-container {
                    z-index: 10;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1.5rem;
                }

                .btn-custom {
                    background-color: #2C3E50;
                    border: 2px solid #2C3E50;
                    color: white;
                    transition: all 0.3s ease;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                    font-weight: 600;
                    letter-spacing: 1px;
                    border-radius: 9999px;
                    padding: 1.5rem 3rem;
                    text-decoration: none;
                    display: inline-block;
                }
                .btn-custom:hover {
                    background-color: #34495E;
                    border-color: #34495E;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
                }
                .btn-custom-back {
                    background-color: #ECF0F1;
                    color: #2C3E50;
                    padding: 0.75rem 2rem;
                    border: none;
                    border-radius: 9999px;
                    font-weight: 600;
                    transition: transform 0.2s ease-in-out;
                }
                .btn-custom-back:hover {
                    transform: translateY(-2px);
                }
                .content-page {
                    z-index: 10;
                    background-color: #ffffff;
                    color: #2C3E50;
                    padding: 2rem;
                    border-radius: 1.5rem;
                    max-width: 600px;
                    text-align: center;
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
                }
                @media (min-width: 768px) {
                    .button-container {
                        flex-direction: row;
                    }
                }
                `}
            </style>
            
            <div className="background-squares">
                {[...Array(6)].map((_, i) => <div key={i} className="square"></div>)}
            </div>

            {renderContent()}
        </div>
    );
};

export default Path;


