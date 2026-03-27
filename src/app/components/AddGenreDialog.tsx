import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useGenres } from "../contexts/GenreContext";
import { Plus } from "lucide-react";

export function AddGenreDialog() {
  const { addGenre } = useGenres();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [bg, setBg] = useState("#ffffff");
  const [text, setText] = useState("#000000");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    addGenre({ name, bg: `bg-[${bg}]`, text: `text-[${text}]` });
    setName(""); setBg("#ffffff"); setText("#000000");
    setOpen(false);
  };

  const resetForm = () => {
    setName(""); setBg("#ffffff"); setText("#000000");
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) resetForm(); setOpen(isOpen); }}>
      <DialogTrigger asChild>
        <button className="ml-2 p-1 hover:bg-[#0a2a5c] rounded-full text-[#caa906]">
          <Plus className="text-[#caa906]  hover:text-white w-4 h-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[#faf8f3] border-2 border-[#caa906] !w-full [word-break:break-word]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif mb-2 text-[#2c1810]">
            Add New Genre
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#2c1810]">Genre Name *</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required className="bg-white border-[#c4b5a0]" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bg" className="text-[#2c1810]">Background Color *</Label>
            <Input type="color" id="bg" value={bg} onChange={(e) => setBg(e.target.value)} className="border-[#c4b5a0] w-16 h-10 p-0"/>
          </div>

          <div className="space-y-2">
            <Label htmlFor="text" className="text-[#2c1810]">Text Color *</Label>
            <Input type="color" id="text" value={text} onChange={(e) => setText(e.target.value)} className="border-[#c4b5a0] w-16 h-10 p-0"/>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => { resetForm(); setOpen(false); }} className="border-[#8b7355] text-[#2c1810] border-1 border-[#caa906]">Cancel</Button>
            <Button type="submit" className="bg-[#001E57] hover:bg-[#0a2a5c] text-white border-1 border-[#caa906]">Add Genre</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}