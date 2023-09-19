import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import heic2any from "heic2any";
import { getLogo, getNowFormatDate } from "../../../utility/utilities";
import PopUp from "../../common/popUp";

function Preview({ path, exif, setBolb }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initCanvas(path, exif);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exif]);

  const canvas = useRef(null);

  function clearCanvas() {
    const c = canvas.current;
    const cxt = c.getContext("2d");
    cxt.clearRect(0, 0, c.width, c.height);
    cxt.fillStyle = "#fff";
    cxt.fill();
  }

  function initCanvas(path, exif) {
    clearCanvas();
    const color = {
      background: exif.markMode ? "#000000" : "#ffffff",
      title: exif.markMode ? "#ffffff" : "#000000",
      text: exif.markMode ? "#ffffff" : "#999999",
    };
    const slogan = exif.slogan ? exif.slogan : "Photo with Life";
    const date = exif.DateTime ? exif.DateTime : getNowFormatDate();
    const cameraData =
      exif.ShutterSpeedValue &&
      exif.FNumber &&
      exif.FocalLength &&
      exif.ISOSpeedRatings
        ? `${exif.FocalLength}mm f/${exif.FNumber} ${exif.ShutterSpeedValue} ISO${exif.ISOSpeedRatings}`
        : "With Photo MarkLab";
    const gpsData = exif.GPS ? exif.GPS : `52°13'14"N 124°41'31"E`;

    let photo = new Image();
    if (path.name) {
      if (path.name.toLowerCase().endsWith(`.heic`)) {
        // toBuffer
        const fileReaderBuffer = new FileReader();
        fileReaderBuffer.readAsArrayBuffer(path);
        fileReaderBuffer.addEventListener("load", () => {
          setLoading(true);
          heic2any({
            blob: path,
            toType: "image/jpg",
          }).then((bolb) => {
            photo.src = URL.createObjectURL(bolb);
            setLoading(false);
          });
        });
      } else {
        photo.src = URL.createObjectURL(path);
      }
    } else {
      photo.src = require("../../../asset/img/example_canvas.jpeg");
    }

    // Create canvas
    photo.onload = function () {
      const c = canvas.current;
      const ctx = c.getContext("2d");

      switch (exif.size) {
        // 2:3 2048*3072
        case 1:
          if (photo.width < photo.height) {
            c.width = 2048;
            c.height = 3072;
          } else {
            c.width = 3072;
            c.height = 2048;
          }
          break;
        // 4：3 2048*1536
        case 2:
          if (photo.width < photo.height) {
            c.width = 1536;
            c.height = 2048;
          } else {
            c.width = 2048;
            c.height = 1536;
          }
          break;
        // 16:9 3840*2160
        case 3:
          if (photo.width < photo.height) {
            c.width = 2160;
            c.height = 3840;
          } else {
            c.width = 3840;
            c.height = 2160;
          }
          break;

        default:
          c.width = photo.width;
          c.height = photo.height * 1.1;
          break;
      }

      // 根据照片大小创建纯白色背景的画布
      ctx.rect(0, 0, c.width, c.height);
      ctx.fillStyle = color.background;
      ctx.fill();

      // Photo
      let pic = new Image();
      pic.src = photo.src;
      pic.crossOrigin = "Anonymous";
      pic.onload = function () {
        ctx.save();
        ctx.beginPath();
        if (photo.width / photo.height <= c.width / c.height) {
          ctx.rect(0, 0, c.width, (10 * c.height) / 11);
          ctx.clip();
          ctx.drawImage(
            pic,
            0,
            -((c.width / photo.width) * photo.height - c.height),
            c.width,
            (c.width / photo.width) * photo.height
          );
        } else {
          ctx.rect(0, 0, c.width, (10 * c.height) / 11);
          ctx.clip();
          ctx.drawImage(
            pic,
            -(photo.width * (c.height / photo.height) - c.width) / 2,
            0,
            photo.width * (c.height / photo.height),
            c.height
          );
        }
        ctx.restore();
      };

      let unit = (c.height / 11) * 10;
      // Slogan
      ctx.fillStyle = color.title;
      ctx.font = `${unit * 0.02}px Neptune`;
      ctx.fillText(slogan, c.width * 0.05, unit * 1.043);
      // Date
      ctx.fillStyle = color.text;
      ctx.font = `${unit * 0.016}px Proxima Nova`;
      ctx.fillText(date, c.width * 0.05, unit * 1.07);
      // Exif
      let e = cameraData;
      ctx.fillStyle = color.title;
      ctx.textAlign = "end";
      ctx.font = `${unit * 0.02}px Neptune`;
      ctx.fillText(e, c.width * 0.95, unit * 1.043);
      let measureExif = ctx.measureText(e);
      // GPS
      ctx.fillStyle = color.text;
      ctx.textAlign = "start";
      ctx.font = `${unit * 0.016}px Proxima Nova`;
      ctx.fillText(gpsData, c.width * 0.95 - measureExif.width, unit * 1.07);
      // separate line
      ctx.fillStyle = color.text;
      ctx.fillRect(
        c.width * 0.95 - measureExif.width * 1.1,
        unit * 1.03,
        4,
        unit * 0.04
      );
      // logo
      let logo = new Image();
      logo.src = require(`../../../asset/logo/${getLogo(
        exif.Make,
        exif.markMode
      )}`);
      logo.crossOrigin = "Anonymous";
      logo.onload = function () {
        ctx.drawImage(
          logo,
          c.width * 0.95 -
            measureExif.width * 1.2 -
            logo.width * ((unit * 0.032) / logo.height),
          unit * 1.033,
          logo.width * ((unit * 0.032) / logo.height),
          unit * 0.032
        );
        // 图片绘制完成
        setBolb(c.toDataURL("image/jpeg", 0.9));
      };
    };
  }

  return (
    <div className="w-full relative md:w-1/2 lg:w-3/5 h-full p-6 md:rounded-2xl bg-gray-100 flex justify-center items-center">
      {/* PopUp */}
      <PopUp visibility={loading} onPopup={setLoading}>
        <div className="w-full text-center leading-6 mb-4">
          <FontAwesomeIcon
            className="text-2xl animate-spin mr-2"
            icon="fa-solid fa-circle-notch"
          />
        </div>
        <p className="text-sm text-gray-400 bg-gray-50 p-4 rounded-xl">
          这是一张Apple HEIC格式的照片，MarkLab处理他需要几秒的时间，
          <span className=" whitespace-nowrap">请稍后。</span>
        </p>
      </PopUp>
      <canvas
        ref={canvas}
        className="max-h-full max-w-full object-scale-down"
      ></canvas>
    </div>
  );
}

export default Preview;
