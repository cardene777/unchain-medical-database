

import { Link } from 'react-router-dom'

function Doctor() {
    return (
        <div className="flex">
            <div className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex mb-20 flex-col items-center text-center">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Medical Data available to physicians</h1>
                        <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">A list of medical data that can be viewed by wallet address is shown.
                        You can view the details by clicking on the "Detail" button.</p>
                    </div>
                    <div className="flex flex-wrap -m-4">
                        <div className="xl:w-1/3 md:w-1/2 p-4">
                            <div className="border border-gray-200 p-6 rounded-lg">
                                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                                    <h1>Icon</h1>
                                </div>
                                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Shooting Stars</h2>
                                <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
                                <Link>Detail</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Doctor;
