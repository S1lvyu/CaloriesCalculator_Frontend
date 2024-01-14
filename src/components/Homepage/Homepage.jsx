import React from "react";

import SidePanel from "../SidePanel/SidePanel";
import style from "./Homepage.module.css";
import { Outlet } from "react-router-dom";

export default function Homepage() {
  return (
    <div className={style.homepage}>
      <Outlet />
      <SidePanel />
    </div>
  );
}
