import { Separator } from "../ui/separator"
import { NavigationAction } from "./navigation-action"

export const NavigationSideBar = async() =>{
    return(
        <div className="space-y-4 text-white flex flex-col items-center h-full text-primary w-full bg-[#1E1F22] py-3">
            <NavigationAction />
            <Separator className="h-[2px] bg-zinc-300 bg-zinc-700 rounded-md w-10 mx-auto " />
        </div>
    )
}