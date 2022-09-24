// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract MedicalDatabase {
    struct PatientData {
        string name;  // 患者名
        string bloodType; // 患者の血液型
        uint registerDate; // 登録日時
        uint updateDate; // 更新日時
        address userAddress; // 患者のウォレットアドレス
        mapping(address => bool) doctorsCheck; //閲覧権限があるかチェックする配列
        address[] doctors; //閲覧権限ある医師のウォレットアドレスの配列
    }

    uint indexCounter = 0;

    PatientData[] public patientData;
    // 患者のアドレスと構造体の位置を紐け
    mapping(address => uint) public patientDataIndex;

    // 自分の医療データか確認
    modifier onlyOwner(address _patientAddress) {
        uint _patientIdIndex = patientDataIndex[_patientAddress];
        require(msg.sender == patientData[_patientIdIndex].userAddress, "You are not authorized to access medical data.");
        _;
    }

    function addMedicalData(string memory _name, string memory _bloodType) public {
        require(patientDataIndex[msg.sender] == 0, "Your medical data is already registered.");

        // 患者データの登録
        PatientData storage newPatientData = patientData.push();
        newPatientData.name = _name;
        newPatientData.bloodType = _bloodType;
        newPatientData.registerDate = block.timestamp;
        newPatientData.updateDate = block.timestamp;
        newPatientData.userAddress = msg.sender;

        // 患者のアドレスと構造体の位置を紐け
        patientDataIndex[msg.sender] = indexCounter;
        indexCounter++;
    }

    // 医療データの編集
    function editMedicalData(address _patientAddress, string memory _name, string memory _bloodType) public onlyOwner(_patientAddress) {
        uint _patientIdIndex = patientDataIndex[_patientAddress];

        // 値が既存のものと異なれば更新
        if (keccak256(abi.encodePacked(_name)) != keccak256(abi.encodePacked(patientData[_patientIdIndex].name))) {
            patientData[_patientIdIndex].name = _name;
        }
        if (keccak256(abi.encodePacked(_bloodType)) != keccak256(abi.encodePacked(patientData[_patientIdIndex].bloodType))) {
            patientData[_patientIdIndex].bloodType = _bloodType;
        }
    }

    // 医師の医療データの閲覧権限追加
    function addDoctor(address _patientAddress, address _doctorAddress) public onlyOwner(_patientAddress) {
        uint _patientIdIndex = patientDataIndex[_patientAddress];
        // 閲覧権限がなければ追加。
        require(patientData[_patientIdIndex].doctorsCheck[_doctorAddress] != true);
        patientData[_patientIdIndex].doctorsCheck[_doctorAddress] = true;
        patientData[_patientIdIndex].doctors.push(_doctorAddress);
    }

    // ユーザーの医療データを取得
    function getPatientData(address _patientAddress) public view returns(
        string memory, string memory, uint, uint, address, address[] memory) {
        uint _patientIdIndex = patientDataIndex[_patientAddress];

        require(msg.sender == patientData[_patientIdIndex].userAddress || patientData[_patientIdIndex].doctorsCheck[msg.sender] == true);
        return(patientData[_patientIdIndex].name, patientData[_patientIdIndex].bloodType,
                patientData[_patientIdIndex].registerDate, patientData[_patientIdIndex].updateDate,
                patientData[_patientIdIndex].userAddress, patientData[_patientIdIndex].doctors);
    }

}
