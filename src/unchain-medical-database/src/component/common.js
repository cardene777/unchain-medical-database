import React, { Suspense, useState } from 'react';
import { Outlet } from "react-router-dom";
import { Link } from 'react-router-dom'

function Common() {
    const [sideMenu, setSideMenu] = useState("patientData")

    return (
        <div className="flex">
            <div className="flex flex-col h-screen w-64 px-4 py-8 bg-white border-r dark:bg-gray-900 dark:border-gray-700">
                <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">Medical DB</h2>

                <div className="flex flex-col flex-1 mt-6">
                    <nav>
                        <Link className={`flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700 ${sideMenu === "patientData" ? "dark:bg-gray-700" : ""}`}
                            to="/" onClick={() => setSideMenu("patientData")}>
                            <span className="mx-4 font-medium">Patient Data</span>
                        </Link>

                        <Link className={`flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" ${sideMenu === "notice" ? "dark:bg-gray-700" : ""}`}
                            to="/notice" onClick={() => setSideMenu("notice")}>
                            <span className="mx-4 font-medium">Notice</span>
                        </Link>

                        <Link className={`flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" ${sideMenu === "doctor" ? "dark:bg-gray-700" : ""}`}
                            to="/doctor" onClick={() => setSideMenu("doctor")}>
                            <span className="mx-4 font-medium">Doctor</span>
                        </Link>

                    </nav>

                    <hr class="my-6 border-gray-200 dark:border-gray-600" />

                    <div className="flex items-center px-4 py-4 -mx-2">
                        <img className="object-cover mx-2 rounded-full h-9 w-9"
                        src="https://gateway.pinata.cloud/ipfs/QmPWcx1CvQ9MmjzsgcAbPtdyMxJNnjQKmL75oYUbWKDZtp" alt="avatar" />
                        <h4 className="mx-2 font-medium text-gray-800 dark:text-gray-200 hover:underline">Cardene</h4>
                    </div>
                </div>
            </div>
            <div>
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet />
                </Suspense>
            </div>
        </div>
    );
}

export default Common;
