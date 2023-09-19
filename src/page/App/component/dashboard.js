import React, { Children, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ExifReader from "exifreader";
import { getNowFormatDate } from "../../../utility/utilities";
import { toastSuccess } from "../../../utility/toast";
import ExifInput from "./exifInput";
import LogoSelector from "./logoSelector";
import SpringBtn from "../../common/springBtn";
import PopUp from "../../common/popUp";

function Dashboard({ path, setPath, exif, setExif, bolb }) {
  const selector = useRef(null);
  const [isLoveGPS, setLove] = useState(false);
  const [isCurrent, setCurrent] = useState(false);
  const [popup, setPopup] = useState(false);
  const [size, setSize] = useState(0);
  const [mode, setMode] = useState(false);
  const [slogan, setSlogan] = useState("");

  // GPS Convert
  function calcCoordinate(value) {
    // Value:[[31,1],[58,1],[5470,100]]
    let d = parseInt(value[0][0] / value[0][1]);
    let m = parseInt(value[1][0] / value[1][1]);
    let s = parseInt(value[2][0] / value[2][1]);
    return `${d}°${m}'${s}"`;
  }

  // Exif Reader
  async function exifHandler(e) {
    setPath(e.target.files[0]);
    const exifData = await ExifReader.load(e.target.files[0]);
    console.log(exifData);
    setExif({
      // 设备制造商
      ...(exifData.Make && { Make: exifData.Make.description }),
      // 设备型号
      ...(exifData.Model && { Model: exifData.Model.description }),
      // 拍摄日期
      DateTime: exifData.CreateDate
        ? getNowFormatDate(new Date(exifData.CreateDate.description))
        : getNowFormatDate(),
      // ISO
      ...(exifData.ISOSpeedRatings && {
        ISOSpeedRatings: exifData.ISOSpeedRatings.description.toString(),
      }),
      // 快门速度
      ...(exifData.ShutterSpeedValue && {
        ShutterSpeedValue: exifData.ShutterSpeedValue.description,
      }),
      // 光圈大小
      ...(exifData.FNumber && {
        FNumber: exifData.FNumber.description.split("/")[1],
      }),
      // 焦距
      ...(exifData.FocalLength && {
        FocalLength: exifData.FocalLength.description.split(" ")[0],
      }),
      // 经纬度
      GPS: exifData.GPSLatitude
        ? `${calcCoordinate(exifData.GPSLatitude.value)}${
            exifData.GPSLatitudeRef.value[0]
          } ${calcCoordinate(exifData.GPSLongitude.value)}${
            exifData.GPSLongitudeRef.value[0]
          }`
        : `52°13'14"N 124°41'31"E`,
      size,
      markMode: mode,
      slogan: exifData.Model
        ? `Shot on ${exifData.Model.description}`
        : "Photo with Life",
    });

    if (!exifData.GPSLatitude) {
      setLove(true);
    }

    if (!exifData.CreateDate) {
      setCurrent(true);
    }

    if (!exifData.ISOSpeedRatings) {
      setPopup(!popup);
    }
  }

  // Set Slogan
  function applySlogan(para) {
    if (exif.slogan !== para && para !== "") {
      let temp = exif;
      exif.slogan = para;
      setExif({ ...temp });
      toastSuccess("New slogan is now on");
    }
  }

  // Set Love GPS
  function setLoveGPS() {
    if (exif.GPS !== `52°13'14"N 124°41'31"E`) {
      let temp = exif;
      exif.GPS = `52°13'14"N 124°41'31"E`;
      setExif({ ...temp });
      setLove(true);
    }
    toastSuccess("Love GPS is now on");
  }

  // Set Current Time
  function setCurrentDateTime() {
    let temp = exif;
    exif.DateTime = getNowFormatDate();
    setExif({ ...temp });
    setCurrent(true);
    toastSuccess("Current time is now on");
  }

  // Set Size
  function reSize(para) {
    if (exif.size !== para) {
      let temp = exif;
      exif.size = para;
      setExif({ ...temp });
      setSize(para);
    }
  }

  // Set Text Mode
  function setMarkMode(para) {
    let temp = exif;
    exif.markMode = para;
    setExif({ ...temp });
    setMode(para);
  }

  // Download
  function download() {
    let elem = document.createElement("a");
    elem.setAttribute("href", bolb);
    elem.setAttribute("download", "MarkLab_" + path.name);
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
    toastSuccess("Download is now on");
  }

  function reset() {
    setExif({});
    setPath({});
    setSize(0);
    setMode(false);
    setSlogan("");
  }

  return (
    <div className="w-full p-6 md:p-0 md:w-1/2 lg:w-2/5 flex gap-8 flex-col justify-between">
      <div className="space-y-4 overflow-y-auto overflow-hidden">
        {/* File Selector */}
        <div className="px-6 py-4 gradient_1 rounded-2xl grid grid-cols-2">
          <div className="flex flex-col text-white justify-center">
            <h1>Choose Photo</h1>
            {path.name ? (
              <span className="text-xs w-4/5 font-light whitespace-nowrap text-ellipsis overflow-hidden">
                {path.name}
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="flex justify-end items-center">
            {/* Hide Input */}
            <input
              ref={selector}
              type="file"
              accept=".jpg,.jpeg,.heic,.heif,.tiff,.webp"
              className="hidden"
              onChange={(e) => exifHandler(e)}
            />
            <SpringBtn
              onClick={() => selector.current.click()}
              className="w-10 h-10 bg-white rounded-xl"
            >
              <FontAwesomeIcon
                className="text-sm text-gray-800"
                icon="fa-solid fa-folder-open"
              />
            </SpringBtn>
          </div>
        </div>

        {/* Exif */}
        <div className="space-y-1">
          {/* Camera Logo */}
          <div className="px-6 py-4 bg-gray-50 rounded-t-2xl flex justify-between items-center">
            <div className="flex flex-col">
              <h1>Device Brand</h1>
              {exif.Model ? (
                <span className="text-xs font-light text-gray-400">
                  {exif.slogan}
                </span>
              ) : (
                ""
              )}
            </div>
            <LogoSelector
              brand={exif.Make}
              onSelect={(e) => {
                let temp = exif;
                exif.Make = e;
                setExif({ ...temp });
                toastSuccess(
                  `${e.replace(e[0], e[0].toUpperCase())} logo is now on`
                );
              }}
            />
          </div>

          {/* Photo Data */}
          <div className="bg-gray-50 grid grid-cols-4 px-4 md:p-0">
            <ExifInput title="F" value={exif.FNumber || "-/-"} />
            <ExifInput title="S" value={exif.ShutterSpeedValue || "-/-"} />
            <ExifInput title="ISO" value={exif.ISOSpeedRatings || "-"} />
            <ExifInput title="FL" value={exif.FocalLength || "--"} />
          </div>

          {/* Date and Location */}
          <div className="px-6 py-4 bg-gray-50 rounded-b-2xl">
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <h1>Date</h1>
                <div className="flex items-center gap-4">
                  <div className="w-48 whitespace-nowrap bg-gray-100 p-2 rounded-xl text-sm text-center">
                    {exif.DateTime || "--"}
                  </div>
                  <SpringBtn
                    disabled={!path.name}
                    onClick={() => setCurrentDateTime()}
                    className="w-9 h-9 text-center bg-white rounded-xl"
                  >
                    <FontAwesomeIcon
                      className={`text-sm ${
                        isCurrent ? "text-rose-400" : "text-gray-300"
                      }`}
                      icon="fa-solid fa-clock"
                    />
                  </SpringBtn>
                </div>
              </li>
              <li className="flex justify-between items-center">
                <h1>Location</h1>
                <div className="flex items-center gap-4">
                  <div className="w-48 whitespace-nowrap bg-gray-100 p-2 rounded-xl text-sm text-center">
                    {exif.GPS || "--"}
                  </div>
                  <SpringBtn
                    disabled={!path.name}
                    onClick={() => setLoveGPS()}
                    className="w-9 h-9 text-center bg-white rounded-xl"
                  >
                    <FontAwesomeIcon
                      className={`text-sm ${
                        isLoveGPS ? "text-rose-400" : "text-gray-300"
                      }`}
                      icon="fa-solid fa-heart"
                    />
                  </SpringBtn>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Size and Text */}
        <div className="space-y-1">
          {/* Size */}
          <div className="px-6 py-4 bg-gray-50 rounded-t-2xl flex justify-between items-center">
            <h1>Resize</h1>
            <div className="space-x-2">
              {Children.toArray(
                ["no", "2:3", "3:4", "9:16"].map((i, index) => (
                  <SpringBtn
                    onClick={() => reSize(index)}
                    className={`w-11 h-9 text-center ${
                      size === index
                        ? "text-slate-800 border-[3px] border-slate-800 bg-white"
                        : "text-gray-300 bg-white"
                    }  rounded-xl`}
                  >
                    <span icon="fa-solid fa-heart">{i}</span>
                  </SpringBtn>
                ))
              )}
            </div>
          </div>
          {/* Text */}
          <div className="px-6 py-4 bg-gray-50 rounded-b-2xl flex justify-center md:justify-between items-center">
            <h1 className="hidden md:block">Slogan</h1>
            <div className="flex items-center gap-4">
              <input
                placeholder="Type new slogan"
                value={slogan}
                onChange={(e) => setSlogan(e.target.value)}
                className="w-auto whitespace-nowrap bg-gray-100 p-2 rounded-xl text-sm text-center"
              />
              <SpringBtn
                onClick={() => applySlogan(slogan)}
                className={`w-9 h-9 text-center rounded-xl text-sm text-slate-800 bg-white`}
              >
                <FontAwesomeIcon icon="fa-solid fa-paper-plane" />
              </SpringBtn>
              <SpringBtn
                onClick={() => setMarkMode(!mode)}
                className={`w-9 h-9 text-center rounded-xl text-sm ${
                  mode ? "text-white bg-slate-800" : "text-slate-800 bg-white"
                }`}
              >
                <FontAwesomeIcon icon="fa-solid fa-vr-cardboard" />
              </SpringBtn>
            </div>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="flex justify-end gap-4">
        {/* Reset */}
        <SpringBtn
          onClick={() => reset()}
          className="block group py-4 px-6 text-gray-800 hover:text-white leading-8 rounded-2xl overflow-hidden bg-gray-50 hover:bg-rose-500 transition"
        >
          <FontAwesomeIcon
            className="transition duration-700 group-hover:rotate-[-360deg]"
            icon="fa-solid fa-rotate-left"
          />
        </SpringBtn>
        {/* Download */}
        <SpringBtn
          disabled={!path.name}
          onClick={() => download()}
          className="block group py-4 px-8 bg-gray-800 text-white hover:text-white text-lg leading-8 rounded-2xl overflow-hidden transition"
        >
          <FontAwesomeIcon
            className={`${
              path.name ? "animate-[spin_6s_linear_infinite]" : ""
            } text-base mr-2`}
            icon="fa-solid fa-circle-nodes"
          />
          Complete
        </SpringBtn>
      </div>

      {/* PopUp */}
      <PopUp visibility={popup} onPopup={setPopup}>
        <div className="space-y-6">
          <div className="w-full text-2xl font-bold">
            <span>Exif Not Found</span>
            <div className="w-full text-gray-300 text-xs space-x-1">
              <FontAwesomeIcon
                className="text-xs"
                icon="fa-solid fa-flask-vial"
              />
              <span>该提醒不影响使用</span>
            </div>
          </div>
          <div className="space-y-2 pb-2">
            <p className="text-sm text-gray-600 leading-6 text-justify">
              MarkLab没有找到Exif相关的数据, 请注意,
              手机用户(尤其是iPhone用户)请尝试将相册内照片另存至文件夹,
              再从文件中选择
              <span className=" whitespace-nowrap">照片.</span>
              <br />
              轻点Continue, MarkLab会使用MarkLab标志及其他元素进行
              <span className=" whitespace-nowrap">填充.</span>
            </p>
          </div>
          <SpringBtn
            onClick={() => setPopup(!popup)}
            className="block w-full group py-3 px-6 bg-gray-800 text-white hover:text-white text-lg leading-8 rounded-2xl overflow-hidden transition"
          >
            Continue
          </SpringBtn>
        </div>
      </PopUp>
    </div>
  );
}

export default Dashboard;
