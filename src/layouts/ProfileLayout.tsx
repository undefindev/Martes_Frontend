import Tabs from "@/components/profile/Tabs";
import { Outlet } from "react-router-dom";


export default function ProfileLayout() {
  return (
    <>
      <div className="mx-auto container">
        <div><Tabs /></div>
        <div><Outlet /></div>
      </div>


    </>
  )
}
