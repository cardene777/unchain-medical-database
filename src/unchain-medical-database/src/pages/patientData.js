import React, { useContext } from 'react';

import { ContextData } from '../App';

function PatientData() {
    const {userMedicalData, iconArray, name, nameSet,
            bloodTypeSet, AddMedicalData} = useContext(ContextData);

    const iconLength = iconArray.length;

    return (
        <div className="">
            <div className="text-gray-600 body-font">
                {/* ユーザーの医療データ */}
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Your Medical Data</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Displays medical data for wallet addresses. Only the holder of the wallet address or a physician authorized to view it may view it.
                        Wallet address holders can also edit the data.</p>
                    </div>
                    {userMedicalData &&
                        userMedicalData.map((data, index) => {
                            return (
                                <div className="flex flex-wrap -m-4 text-center" key={index}>
                                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                                        <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                                            <h2>Icon</h2>
                                            <h2 className="title-font font-medium text-3xl text-gray-900">{data.name}</h2>
                                            <p className="leading-relaxed">Name</p>
                                        </div>
                                    </div>
                                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                                        <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                                            <h2>Icon</h2>
                                            <h2 className="title-font font-medium text-3xl text-gray-900">{data.bloodType}</h2>
                                            <p className="leading-relaxed">Blood Type</p>
                                        </div>
                                    </div>
                                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                                        <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                                            <h2>Icon</h2>
                                            <h2 className="title-font font-medium text-3xl text-gray-900">{data.registerDate.toDateString()} {data.registerDate.toLocaleTimeString()}</h2>
                                            <p className="leading-relaxed">Registration Date</p>
                                        </div>
                                    </div>
                                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                                        <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                                            <h2>Icon</h2>
                                            <h2 className="title-font font-medium text-3xl text-gray-900">{data.updateDate.toDateString()} {data.updateDate.toLocaleTimeString()}</h2>
                                            <p className="leading-relaxed">Update Date</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {!userMedicalData &&
                        <div className="flex flex-col text-center">
                            <div className="mb-6">
                                <p className="text-lg">No medical data has been registered yet.</p>
                            </div>
                            <div className="mb-6">
                                <input className="md:w-1/3 p-3 bg-transparent border border-gray-500 rounded-sm" placeholder="Name" value={name} onChange={nameSet} />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="blood-types" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select an Blood Type</label>
                                <select defaultValue={"default"} id="blood-types" onChange={bloodTypeSet}  className="bg-gray-50 md:w-1/6 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="default">Choose a blood type</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="O">O</option>
                                    <option value="AB">AB</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <button className="text-center h-10 px-3 text-lg lg:w-1/6 rounded-sm bg-gray-300 hover:bg-gray-400" onClick={AddMedicalData}>Register Data</button>
                            </div>
                        </div>
                    }
                </div>

                {/* 閲覧権限ある医師一覧 */}
                <div className="container px-5 py-5 mx-auto">
                    <div className="flex flex-wrap -m-2">
                        <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                            <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                            <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                                src={`${iconArray[Math.floor( Math.random() * iconLength )]}`} />
                            <div className="flex-grow">
                                <h2 className="text-gray-900 title-font font-medium">Address</h2>
                                <p className="text-gray-500">Doctor</p>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientData;
