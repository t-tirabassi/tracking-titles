import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Star, Pencil } from "lucide-react";
import { Book, GENRES } from "../types/book";

interface EditBookDialogProps {
  book: Book;
  onUpdateBook: (updated: Book) => void;
}

export function EditBookDialog({ book, onUpdateBook }: EditBookDialogProps) {
  const [open, setOpen] = useState(false);

  const TITLE_MAX_LENGTH = 100;
  const AUTHOR_MAX_LENGTH = 60;
  const PLOT_MAX_LENGTH = 500;
  const THOUGHTS_MAX_LENGTH = 500;

  const [formData, setFormData] = useState({
    title: book.title,
    author: book.author,
    genre: book.genre,
    plot: book.plot || "",
    thoughts: book.thoughts || "",
  });

  const [rating, setRating] = useState(book.rating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.author || !formData.genre) return;

    onUpdateBook({
      ...book,
      ...formData,
      rating,
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-[#8b4513] hover:text-yellow-600 hover:bg-yellow-50"
        >
          <Pencil className="w-4 h-4" />

        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[#faf8f3] border-2 border-[#caa906]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif mb-2 text-[#2c1810]">
            Edit Book Details
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label>Book Title * ({formData.title.length}/{TITLE_MAX_LENGTH})</Label>
            <Input
              value={formData.title}
              onChange={(e) =>
                e.target.value.length <= TITLE_MAX_LENGTH &&
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          {/* Author */}
          <div className="space-y-2">
            <Label>Author * ({formData.author.length}/{AUTHOR_MAX_LENGTH})</Label>
            <Input
              value={formData.author}
              onChange={(e) =>
                e.target.value.length <= AUTHOR_MAX_LENGTH &&
                setFormData({ ...formData, author: e.target.value })
              }
              required
            />
          </div>

          {/* Genre */}
          <div className="space-y-2">
            <Label>Genre *</Label>
            <Select
              value={formData.genre}
              onValueChange={(v) => setFormData({ ...formData, genre: v })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {GENRES.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Plot */}
          <div className="space-y-2">
            <Label>Plot ({formData.plot.length}/{PLOT_MAX_LENGTH})</Label>
            <Textarea
              value={formData.plot}
              onChange={(e) =>
                e.target.value.length <= PLOT_MAX_LENGTH &&
                setFormData({ ...formData, plot: e.target.value })
              }
              rows={4}
            />
          </div>

          {/* Thoughts */}
          <div className="space-y-2">
            <Label>Your Thoughts ({formData.thoughts.length}/{THOUGHTS_MAX_LENGTH})</Label>
            <Textarea
              value={formData.thoughts}
              onChange={(e) =>
                e.target.value.length <= THOUGHTS_MAX_LENGTH &&
                setFormData({ ...formData, thoughts: e.target.value })
              }
              rows={4}
            />
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <Label>Rating *</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setRating(s)}
                  onMouseEnter={() => setHoverRating(s)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      s <= (hoverRating || rating)
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
              onClick={() => setOpen(false)}
              className="border-[#8b7355]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#001E57] hover:bg-[#0a2a5c] text-white"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}