import axios from 'axios';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from './ui/dialog';
import { Dispatch, JSX, SetStateAction, useState } from 'react';

type deleteTeamDialogProps = {
  email: string;
  setFlag: Dispatch<SetStateAction<boolean>>;
};

export function DeleteTeamDialog({
  email,
  setFlag,
}: deleteTeamDialogProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const deleteTeam = async () => {
    try {
      await axios
        .get('/api/users/deleteteam', {
          headers: {
            email: email,
          },
        })
        .then(() => {
          setIsOpen(false);
          setFlag((flag: boolean) => !flag);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-red-700 text-xl px-8 py-4 sm:px-12 sm:py-8 rounded-2xl shadow-lg shadow-purple-500/20"
        >
          Delete Team
        </Button>
      </DialogTrigger>
      <DialogContent>
        <p className="text-gray-600">Are You Sure..?</p>
        <DialogFooter className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={deleteTeam}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
