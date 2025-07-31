import React from 'react'

const Navbar = () => {
    return (
        <nav className="flex justify-between bg-[#1d3354] text-white py-3">
            <div className="logo mx-9 font-bold text-xs sm:text-2xl">
                <span>Tick-Task</span>
            </div>
            <ul className="flex gap-8 mx-9 items-center">
                <li className="cursor-pointer hover:font-bold transistion-all text-xs sm:text-2xl">Home</li>
                <li className="cursor-pointer hover:font-bold transistion-all text-xs sm:text-2xl">Your Tasks</li>
            </ul>
        </nav>
    )
}

export default Navbar
