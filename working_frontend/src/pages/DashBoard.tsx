import React, { use } from "react";
import { FaBox, FaDollarSign, FaUsers, FaShoppingCart } from "react-icons/fa";
import {logout} from "../utils/auth";
import { useNavigate } from "react-router-dom";

const DashBoard: React.FC = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="container">
                <h1 className="text-3xl font-bold mb-3">Dashboard</h1>
                
                <button
                    onClick={logout}
                    className="bg-red-500 text-white px-4 py-2 rounded-pill mb-4"
                >
                    Logout
                </button>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Total Orders */}
                    <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
                        <FaShoppingCart className="text-blue-600 text-3xl mr-4" />
                        <div>
                            <h2 className="text-lg font-semibold">Total Orders</h2>
                            <p className="text-3xl font-bold text-blue-600">1,245</p>
                        </div>
                    </div>

                    {/* Total Revenue */}
                    <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
                        <FaDollarSign className="text-green-600 text-3xl mr-4" />
                        <div>
                            <h2 className="text-lg font-semibold">Total Revenue</h2>
                            <p className="text-3xl font-bold text-green-600">$45,678</p>
                        </div>
                    </div>

                    {/* New Customers */}
                    <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
                        <FaUsers className="text-purple-600 text-3xl mr-4" />
                        <div>
                            <h2 className="text-lg font-semibold">New Customers</h2>
                            <p className="text-3xl font-bold text-purple-600">320</p>
                        </div>
                    </div>

                    {/* Pending Orders */}
                    <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
                        <FaBox className="text-red-600 text-3xl mr-4" />
                        <div>
                            <h2 className="text-lg font-semibold">Pending Orders</h2>
                            <p className="text-3xl font-bold text-red-600">15</p>
                        </div>
                    </div>
                </div>

                {/* Popular Products */}
                <div className="mt-6 bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Popular Products</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-gray-700">Product A</span>
                            <span className="text-blue-600 font-bold">500 sales</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-gray-700">Product B</span>
                            <span className="text-blue-600 font-bold">450 sales</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700">Product C</span>
                            <span className="text-blue-600 font-bold">300 sales</span>
                        </div>
                    </div>
                    {/* See all Link to all /products using the use-navigate */}
                    <hr></hr>
                    <div className="mt-4 text-right">
                        <a href="/products" className="text-blue-600 text-decoration-none">
                            See all products
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
