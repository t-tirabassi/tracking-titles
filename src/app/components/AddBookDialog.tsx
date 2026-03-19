import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Star, BookPlus } from "lucide-react";
import { Book, GENRES } from "../types/book";

interface AddBookDialogProps {
  onAddBook: (book: Omit<Book, "id" | "dateAdded">) => void;
}

export function AddBookDialog({ onAddBook }: AddBookDialogProps) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  
  const TITLE_MAX_LENGTH = 100;
  const AUTHOR_MAX_LENGTH = 60;
  const PLOT_MAX_LENGTH = 500;
  const THOUGHTS_MAX_LENGTH = 500;
  
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    plot: "",
    thoughts: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.author || !formData.genre || rating === 0) {
      return;
    }

    onAddBook({
      ...formData,
      rating,
    });

    // Reset form
    setFormData({
      title: "",
      author: "",
      genre: "",
      plot: "",
      thoughts: "",
    });
    setRating(0);
    setOpen(false);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      author: "",
      genre: "",
      plot: "",
      thoughts: "",
    });
    setRating(0);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        resetForm();
      }
      setOpen(isOpen);
    }}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-[#001E57] hover:bg-[#0a2a5c] text-white">
          <BookPlus className="w-4 h-4" />
          Add New Book
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[#faf8f3] border-2 border-[#caa906] !w-full [word-break:break-word]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif mb-2 text-[#2c1810]">
            Add New Book to Your Collection
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-[#2c1810]">Book Title * ({formData.title.length}/{TITLE_MAX_LENGTH})</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => {
                if (e.target.value.length <= TITLE_MAX_LENGTH) {
                  setFormData({ ...formData, title: e.target.value });
                }
              }}
              placeholder="Enter book title"
              required
              className="bg-white border-[#c4b5a0]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author" className="text-[#2c1810]">Author * ({formData.author.length}/{AUTHOR_MAX_LENGTH})</Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => {
                if (e.target.value.length <= AUTHOR_MAX_LENGTH) {
                  setFormData({ ...formData, author: e.target.value });
                }
              }}
              placeholder="Enter author name"
              required
              className="bg-white border-[#c4b5a0]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="genre" className="text-[#2c1810]">Genre *</Label>
            <Select
              value={formData.genre}
              onValueChange={(value) => setFormData({ ...formData, genre: value })}
            >
              <SelectTrigger className="bg-white border-[#c4b5a0]">
                <SelectValue placeholder="Select a genre" />
              </SelectTrigger>
              <SelectContent>
                {GENRES.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="plot" className="text-[#2c1810]">
              Plot Summary ({formData.plot.length}/{PLOT_MAX_LENGTH})
            </Label>
            <Textarea
              id="plot"
              value={formData.plot}
              onChange={(e) => {
                if (e.target.value.length <= PLOT_MAX_LENGTH) {
                  setFormData({ ...formData, plot: e.target.value });
                }
              }}
              placeholder="Brief plot summary... Press Enter for new paragraphs."
              rows={4}
              className="bg-white border-[#c4b5a0] font-serif resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="thoughts" className="text-[#2c1810]">
              Your Thoughts ({formData.thoughts.length}/{THOUGHTS_MAX_LENGTH})
            </Label>
            <Textarea
              id="thoughts"
              value={formData.thoughts}
              onChange={(e) => {
                if (e.target.value.length <= THOUGHTS_MAX_LENGTH) {
                  setFormData({ ...formData, thoughts: e.target.value });
                }
              }}
              placeholder="What did you think about this book? Press Enter for new paragraphs."
              rows={4}
              className="bg-white border-[#c4b5a0] font-serif resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[#2c1810]">Rating *</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoverRating || rating)
                        ? "fill-[#d4af37] text-[#d4af37]"
                        : "text-[#c4b5a0]"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => { resetForm(); setOpen(false); }}
              className="border-[#8b7355] text-[#2c1810] border-1 border-[#caa906]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#001E57] hover:bg-[#0a2a5c] text-white border-1 border-[#caa906]"
            >
              Add to Collection
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}