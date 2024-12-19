import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from "axios";

interface JoinTeamDialogProps {
  email: string | undefined;
}

export const JoinTeamDialog  = ({email,setflag}:{email:string | undefined | null,setflag : any}) =>{
  const [name, setName] = useState<string>("");
  const [regNo, setRegNo] = useState<string>("");
  const [dept, setDept] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [phno, setPhno] = useState<string>("");
  const [teamId, setTeamId] = useState<string>("");

  const handleSubmitClick = async () => {
    try {
        
      const res = await axios.post("/api/users/jointeam", {
        teamId,
        memberdetails: {
          name,
          email,
          gender,
          regNo,
          dept,
          year,
          phoneno: phno,
        },
      });
      setflag(true);
    } catch (e) {
      alert("Error creating team");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-xl px-8 py-4 sm:px-12 sm:py-8 rounded-2xl shadow-lg shadow-purple-500/20"
        >
          Join Team
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join Team</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label htmlFor="teamId" className="text-right">
              Team Id
            </Label>
            <Input id="teamName" className="col-span-3" onChange={(e) => setTeamId(e.target.value)} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" className="col-span-3" onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label htmlFor="regno" className="text-right">
              Reg No
            </Label>
            <Input id="regno" className="col-span-3" onChange={(e) => setRegNo(e.target.value)} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label htmlFor="department" className="text-right">
              Department
            </Label>
            <Input id="department" className="col-span-3" onChange={(e) => setDept(e.target.value)} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label htmlFor="year" className="text-right">
              Year
            </Label>
            <Select onValueChange={(val:any) => setYear(val)} value={year}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1st Year</SelectItem>
                <SelectItem value="2">2nd Year</SelectItem>
                <SelectItem value="3">3rd Year</SelectItem>
                <SelectItem value="4">4th Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label htmlFor="gender" className="text-right">
              Gender
            </Label>
            <Select onValueChange={(val:any) => setGender(val)} value={gender}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone No
            </Label>
            <Input id="phone" className="col-span-3" onChange={(e) => setPhno(e.target.value)} />
          </div>
          <Button type="submit" className="mt-4" onClick={handleSubmitClick}>
            Join Team
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JoinTeamDialog;
