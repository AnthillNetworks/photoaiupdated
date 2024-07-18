"use client";
import { useState } from "react";
import Styles from "./page.module.css";
import CreateEvent from "./event";
import Swal from "sweetalert2";
import Loader from "@/app/loader/page";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import dayjs from "dayjs";
import { Dialog, DialogContent, TextField } from "@mui/material";
import Image from "next/image";
import Link from 'next/link'
import { Style } from "@mui/icons-material";

export default function Event({UserId}) {
  const containerStyle = {
    width: "100%",
  };
  const [loadeer, loadderevalue] = useState(false);
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [digitalInvite, setDigitalInvite] = useState(false);
  const [value, setValue] = useState(dayjs(""));
  const [brideName, setBrideName] = useState("");
  const [groomName, setGroomName] = useState("");
  const [location_, setLocation_] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [mapLink , setmapLink] = useState("");
  const [date_,setDate_] = useState("");

  const handleGenerateQRCode = async () => {
    // Storing data
    loadderevalue(true);
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 6000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });

    let date = value["$D"];
    let month = value["$M"]+1;
    let year = value["$y"];
    const message = await CreateEvent(
      eventName.split(" ").join("_"),
      date,
      month,
      year,
      location,
      brideName,
      groomName,
      location_,
      youtubeLink,
      mapLink
    );
    Toast.fire({
      icon: message.icon,
      title: message.message,
    });
    loadderevalue(false);

    if (message.icon === "success") {
      const name = eventName.split(" ").join("_");
      window.location = `/qrcode/${UserId}-${name}`;
      return;
    }
    
  };
  const handleCheckboxChange = (e) => {
    setDigitalInvite(e.target.checked);
    if (e.target.checked) {
      setOpen(true);
    }
  };

  // Broom Div
  const [open, setOpen] = useState(false);

  const handleToggleDialog = () => {
    setOpen(!open);
  };

  const handleSave = () => {
    setOpen(false);
  };

  return (
    <>
        {loadeer ? <Loader /> : ""}

        { !open ? 
        <>
        <div className="min-h-screen w-full flex items-center justify-center" style={{backgroundColor:"var(--bg)"}}>
            <div className={`${Styles.CrtCon} bg-white p-6 py-16 flex flex-col gap-4 items-center justify-center`} style={{borderRadius:"20px",boxShadow:"0px 72px 80px -48px rgba(0, 0, 0, 0.5)",width:"45em"}}>
              <div style={{position:"relative"}} className={Styles.container}>
              <div style={{color:"var(--darkblue)",fontSize:"30px"}} className={`mb-6 ${Styles.tit}`}>Create a new event</div>
              <div className="flex flex-col gap-2">
                <div>
                  <div className="text-[15px]">Event Name </div>
                  <div className="w-full">
                    <input
                        className={`mt-1 outline-none px-2 py-1 ${Styles.inputDiv}`}
                        style={{border:"1px solid #A0A5FF",borderRadius:"5px",fontSize:"16px",width:"83%"}}
                        type="text"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                    <div className="text-[15px]">Event date </div>
                    <div>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                        style={{border:"1px solid #A0A5FF",borderRadius:"5px"}}
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                            console.log(newValue);
                        }}
                        />
                    </LocalizationProvider>
                    </div>
                </div>
                <div>
                  <div className="text-[15px]">Location</div>
                  <div>
                    <input
                        type="text"
                        className={`mt-1 outline-none px-2 py-1 ${Styles.inputDiv}`}
                        style={{border:"1px solid #A0A5FF",borderRadius:"5px",fontSize:"16px",width:"83%"}}
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <label htmlFor="digi">
                    Create a digital Invite
                  </label>
                  <input
                    type="checkbox"
                    name="Digi"
                    id="digi"
                    onChange={handleCheckboxChange}
                  />
                </div>
                <div className="mt-6 flex gap-6">
                  <div className={`px-4 text-center text-white text-[14px] cursor-pointer ${Styles.btns}`} style={{backgroundColor:"var(--pink)", minWidth:"15em", padding:".40em 1em",borderRadius:"5px"}} >Save</div>
                  <div className={`px-4 text-center text-white text-[14px] cursor-pointer ${Styles.btns}`} style={{backgroundColor:"var(--pink)", minWidth:"15em", padding:".40em 1em",borderRadius:"5px"}} onClick={handleGenerateQRCode}>Generate QR code</div>
                </div>
              </div>
              <div className={Styles.backButton} style={{position:"absolute",top:"-30%",left:"-30%",cursor:"pointer"}}>
                <Link href="/">
                  <div className="flex gap-4 px-2 py-1 items-center justify-center" style={{border:"1px solid #000",borderRadius:"5px"}}><Image src="/assets/back.svg" alt="back" width={100} height={100} className={Styles.backImg}/><div className="text-[13px]">Back to login</div></div>
                </Link>
              </div>
              </div>
            </div>
        </div>
        </> : 
        <>
        <div className="min-h-screen w-full flex items-center justify-center" style={{backgroundColor:"var(--bg)"}}>
          <div className={`${Styles.container1} bg-white p-6 py-16 flex flex-col gap-4 items-center justify-center`} style={{borderRadius:"20px",boxShadow:"0px 72px 80px -48px rgba(0, 0, 0, 0.5)",width:"45em"}}>
            <div style={{position:"relative"}}>
              <div>
                <div style={{color:"var(--darkblue)",fontSize:"30px"}} className={`mb-6 ${Styles.tit}`}>Create a Invite</div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[15px]">Bride Name</div>
                      <div>
                        <input
                            className="mt-1 outline-none px-2 py-1"
                            style={{border:"1px solid #A0A5FF",borderRadius:"5px",fontSize:"16px",width:"83%"}}
                            type="text"
                            value={brideName}
                            onChange={(e) => setBrideName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="text-[15px]">Groom Name</div>
                      <div>
                        <input
                            className="mt-1 outline-none px-2 py-1"
                            style={{border:"1px solid #A0A5FF",borderRadius:"5px",fontSize:"16px",width:"83%"}}
                            type="text"
                            value={groomName}
                            onChange={(e) => setGroomName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                      <div className="text-[15px]">Date </div>
                      <div>
                        <input
                            type="text"
                            className="mt-1 outline-none px-2 py-1"
                            style={{border:"1px solid #A0A5FF",borderRadius:"5px",fontSize:"16px",width:"92%"}}
                            value={date_}
                            onChange={(e) => setDate_(e.target.value)}
                        />
                      </div>
                  </div>
                  <div>
                    <div className="text-[15px]">Location</div>
                    <div>
                      <input
                          type="text"
                          className="mt-1 outline-none px-2 py-1"
                          style={{border:"1px solid #A0A5FF",borderRadius:"5px",fontSize:"16px",width:"92%"}}
                          value={location_}
                          onChange={(e) => setLocation_(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[15px]">GMap link</div>
                      <div>
                        <input
                            className="mt-1 outline-none px-2 py-1"
                            style={{border:"1px solid #A0A5FF",borderRadius:"5px",fontSize:"16px",width:"83%"}}
                            type="text"
                            value={mapLink}
                            onChange={(e) => setmapLink(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="text-[15px]">Youtube link</div>
                      <div>
                        <input
                            className="mt-1 outline-none px-2 py-1"
                            style={{border:"1px solid #A0A5FF",borderRadius:"5px",fontSize:"16px",width:"83%"}}
                            type="text"
                            value={youtubeLink}
                            onChange={(e) => setYoutubeLink(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex gap-6">
                    <div className={`px-4 text-center text-white text-[14px] cursor-pointer ${Styles.btns1}`} style={{backgroundColor:"var(--white)", minWidth:"13em", padding:".40em 1em",borderRadius:"5px",color:"var(--pink)",border:"1px solid var(--pink)"}} >Save</div>
                    <div className={`px-4 text-center text-white text-[14px] cursor-pointer ${Styles.btns1}`} style={{backgroundColor:"var(--pink)", minWidth:"13em", padding:".40em 1em",borderRadius:"5px"}} onClick={handleGenerateQRCode}>View</div>
                  </div>
                </div>
              </div>
              <div className={Styles.backButton} style={{position:"absolute",top:"-30%",left:"-30%",cursor:"pointer"}} onClick={handleToggleDialog}>
                    <div className="flex gap-4 px-2 py-1 items-center justify-center" style={{border:"1px solid #000",borderRadius:"5px"}}><Image src="/assets/back.svg" alt="back" width={100} height={100} className={Styles.backImg}/><div className="text-[13px]">Back</div></div>
                </div>
            </div>
          </div>
        </div>
        </>
        }
    </>
  );
}


