import axios from "axios"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "./ui/dialog"

import { Dispatch, JSX, SetStateAction, useState } from "react"


interface DeleteTeamDialogProps {
  email: string;
  setFlag: Dispatch<SetStateAction<boolean>>;
}

export function LeaveTeamDialog({email,setFlag}:DeleteTeamDialogProps):JSX.Element{

    const [isOpen,setIsOpen]=useState<boolean>(false);

    const leaveTeam = async() =>{
        try{
          await axios.get("/api/users/leaveteam",{
            headers:{
              email : email
            }
          }).then((res) =>{
            if(res.status === 200){
              alert("Left the team");
            }
            else{
              alert(res.data.error);
            }
            setIsOpen(false);
            setFlag((flag:boolean)=>!flag);
          }).catch((e)=>{
            alert(e);
            setFlag((flag:boolean)=>!flag)
          })
        } catch(e){
          console.log(e)
        }
      }
    
    

    return(
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
        <Button
            size="lg"
            className="bg-red-700 text-xl px-8 py-4 sm:px-12 sm:py-8 rounded-2xl shadow-lg shadow-purple-500/20"
          >
            Leave Team
          </Button>
        </DialogTrigger>
        <DialogContent>
          
          <p className="text-gray-600">Are You Sure..?</p>
          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={()=>setIsOpen(false)}>
                Cancel
            </Button>
            <Button variant="destructive" onClick={leaveTeam}>
                Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


    )

}
