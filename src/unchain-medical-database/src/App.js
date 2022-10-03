import './App.css';
import React, { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Common from "./component/common";

import abi from "./utils/MedicalDatabase.json";

import { lazy } from "react";

// アイコン画像読み込み
import Anger from "./static/img/anger.png";
import Factom from "./static/img/factom.png";
import Monero from "./static/img/monero.png";
import StellarLumens from "./static/img/stellar-lumens.png";
import Tether from "./static/img/tether.png";
import Bat from "./static/img/bat.png";
import Lisk from "./static/img/lisk.png";
import Qtum from "./static/img/qtum.png";

const PatientData = lazy(() => import("./pages/patientData"));
const Notice = lazy(() => import("./pages/notice"));
const Doctor = lazy(() => import("./pages/doctor"));

export const ContextData = createContext();

function App() {

  const contractAddress = "0x02169e8Cb69030d5348244FD4500D5064105d9cf";

  // ABIを参照
  const contractABI = abi.abi;

  // ユーザーのパブリックウォレットを保存するために使用する状態変数を定義
  const [currentAccount, setCurrentAccount] = useState("");

  // ユーザーの医療データの状態変数
  const [userMedicalData, setUserMedicalData] = useState("")

  // 入力した名前を保存
  const [name, setName] = React.useState("")

  // 入力された患者名を保存する関数
  const nameSet = e => setName(e.target.value);

   // 入力した血液型を保存
   const [bloodType, setBloodType] = React.useState("")

   // 入力された患者の血液型を保存する関数
   const bloodTypeSet = e => setBloodType(e.target.value);

  // connectWalletメソッドを実装
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const AddMedicalData = async () => {
    try {
        const { ethereum } = window;
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();

            const UnchainSnsContract = new ethers.Contract(
                contractAddress,
                contractABI,
                signer
            );

            await UnchainSnsContract.addMedicalData(name, bloodType);

            setName("")
        } else {
            console.log("Ethereum object doesn't exist!");
        }
    } catch (error) {
        console.log(error);
    }
  };


  const iconArray = [
    Anger,
    Factom,
    Monero,
    StellarLumens,
    Tether,
    Bat,
    Lisk,
    Qtum
  ]

  // 他ページ・コンポーネント共通データ
  const value = {
    connectWallet,
    currentAccount,
    setCurrentAccount,
    userMedicalData,
    setUserMedicalData,
    iconArray,
    name,
    nameSet,
    bloodType,
    bloodTypeSet,
    AddMedicalData
  };

  // ユーザーの医療データを取得
  const getPatientData = async () => {
    const { ethereum } = window;

    try {
      if (ethereum && currentAccount) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const MedicalDatabaseContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        // コントラクトからgetPatientDataメソッドを呼び出す
        const patientMedicalData = await MedicalDatabaseContract.getPatientData(currentAccount);
        console.log("medicalData:" + patientMedicalData)
        const medicalDataCleaned = patientMedicalData.map((onePatientMedicalData) => {
            return {
              name: patientMedicalData.name,
              bloodType: patientMedicalData.bloodType,
              registerDate: new Date(patientMedicalData.registerDate * 1000),
              updateDate: new Date(patientMedicalData.updateDate * 1000),
              userAddress: patientMedicalData.userAddress,
              doctorsCheck: patientMedicalData.doctorsCheck,
              doctors: patientMedicalData.doctors.map(doctor => doctor.toLowerCase()),
            };
        });
          // React Stateにデータを格納
          setUserMedicalData(medicalDataCleaned);
        } else {
          console.log("Ethereum object doesn't exist!");
        }
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      let MedicalData;

      const onNewPatientMedicalData = (name, bloodType, registerDate, updateDate, userAddress, doctorsCheck, doctor) => {
        console.log("NewMedicalData", name, bloodType, registerDate, updateDate, userAddress, doctorsCheck, doctor);
        setUserMedicalData((prevState) => [
          ...prevState,
          {
            name: name,
            bloodType: bloodType,
            registerDate:new Date(registerDate * 1000),
            updateDate: new Date(updateDate * 1000),
            userAddress: userAddress,
            doctorsCheck: doctorsCheck,
            doctor: doctor
          },
        ]);
      };

      // NewPostイベントがコントラクトから発信されたときに、情報を受け取る
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        MedicalData = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        MedicalData.on("NewMedicalData", onNewPatientMedicalData);
      }
        // メモリリークを防ぐために、NewPostのイベントを解除
      return () => {
        if (MedicalData) {
          MedicalData.off("NewMedicalData", onNewPatientMedicalData);
        }
      };
    }, []);

  // window.ethereumにアクセスできることを確認
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Get your Metamask ready!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }
      // ユーザーのウォレットへのアクセスが許可されているかどうかを確認
      // アカウントがあれば一番目のアドレスを表示。
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
        getPatientData()
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // WEBページロード時に実行。
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ContextData.Provider value={value}>
              <Common />
            </ContextData.Provider>
          }>
            <Route index element={
              <ContextData.Provider value={value}>
                <PatientData />
              </ContextData.Provider>
            } />{/* 患者データ */}
            <Route path="/notice" element={
              <ContextData.Provider value={value}>
                <Notice />
              </ContextData.Provider>
            } /> {/* 通知一覧 */}
            <Route path="/doctor" element={
              <ContextData.Provider value={value}>
                <Doctor />
              </ContextData.Provider>
            } /> {/* 医師の閲覧 */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
