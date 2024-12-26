import React, { Dispatch, JSX, SetStateAction, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../components/ui/dialog';

import axios from 'axios';
import { Copy } from 'lucide-react';
import { DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface CreateTeamDialogProps {
  email: string;
  setFlag: Dispatch<SetStateAction<boolean>>;
}

export function CreateTeamDialog({
  email,
  setFlag,
}: CreateTeamDialogProps): JSX.Element {
  const [name, setName] = useState<string>('');
  const [regNo, setRegNo] = useState<string>('');
  const [dept, setDept] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [phno, setPhno] = useState<string>('');
  const [teamName, setTeamName] = useState<string>('');

  const [isCreateTeamDialogOpen, setIsCreateTeamDialogOpen] =
    useState<boolean>(false);
  const [isTeamIdDialogOpen, setIsTeamIdDialogOpen] = useState<boolean>(false);
  const [teamId, setTeamId] = useState<string>('');

  const handleSubmitClick = async () => {
    try {
      const res = await axios.post('/api/users/createteam', {
        teamName,
        teamLead: {
          name,
          email,
          gender,
          regNo,
          dept,
          year,
          phoneno: phno,
        },
      });

      setIsCreateTeamDialogOpen(false);
      setTeamId(res.data.teamId);
      setIsTeamIdDialogOpen(true);
    } catch {
      alert('error');
    }
  };

  const handleCopyTeamId = async () => {
    await navigator.clipboard.writeText(teamId);
    setIsTeamIdDialogOpen(false);
    setFlag((prevFlag: boolean) => !prevFlag);
  };

  return (
    <>
      <Dialog
        open={isCreateTeamDialogOpen}
        onOpenChange={setIsCreateTeamDialogOpen}
      >
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-xl px-8 py-4 sm:px-12 sm:py-8 rounded-2xl shadow-lg shadow-purple-500/20"
          >
            Create Team
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] text-purple-600">
          <DialogHeader>
            <DialogTitle>Create Team</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label htmlFor="teamName" className="text-right">
                Team Name
              </Label>
              <Input
                id="teamName"
                className="col-span-3"
                value={teamName}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setTeamName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                className="col-span-3"
                value={name}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label htmlFor="regno" className="text-right">
                Reg No
              </Label>
              <Input
                id="regno"
                className="col-span-3"
                value={regNo}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setRegNo(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Department
              </Label>
              <Input
                id="department"
                className="col-span-3"
                value={dept}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setDept(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label htmlFor="year" className="text-right">
                Year
              </Label>
              <Select
                onValueChange={(val: string) => setYear(val)}
                value={year}
              >
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
              <Select
                onValueChange={(val: string) => setGender(val)}
                value={gender}
              >
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
              <Input
                id="phone"
                className="col-span-3"
                value={phno}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setPhno(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="mt-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600"
              onClick={handleSubmitClick}
            >
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isTeamIdDialogOpen} onOpenChange={setIsTeamIdDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Team Created Successfully</DialogTitle>
            <DialogDescription>
              Your team has been created. Please copy and save your Team ID.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <Input value={teamId} readOnly className="flex-grow" />
            <Button variant="outline" size="icon" onClick={handleCopyTeamId}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
