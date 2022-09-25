
function PatientData() {
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
                    <div className="flex flex-wrap -m-4 text-center">
                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                                <h2>Icon</h2>
                                <h2 className="title-font font-medium text-3xl text-gray-900">2.7K</h2>
                                <p className="leading-relaxed">Name</p>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                                <h2>Icon</h2>
                                <h2 className="title-font font-medium text-3xl text-gray-900">1.3K</h2>
                                <p className="leading-relaxed">Blood Type</p>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                                <h2>Icon</h2>
                                <h2 className="title-font font-medium text-3xl text-gray-900">74</h2>
                                <p className="leading-relaxed">Registration Date</p>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                                <h2>Icon</h2>
                                <h2 className="title-font font-medium text-3xl text-gray-900">46</h2>
                                <p className="leading-relaxed">Update Date</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 閲覧権限ある医師一覧 */}
                <div className="container px-5 py-5 mx-auto">
                    <div className="flex flex-wrap -m-2">
                        <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                            <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                            <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/80x80" />
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
