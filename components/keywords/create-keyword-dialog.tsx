"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  createKeyword,
  type CreateKeywordPayload,
} from "@/services/keywords";
import {
  getProjectBusinesses,
  type Business,
} from "@/services/businesses";

interface CreateKeywordDialogProps {
  projectId: number;
  onCreated: () => void;
}

export function CreateKeywordDialog({
  projectId,
  onCreated,
}: CreateKeywordDialogProps) {
  const [open, setOpen] = useState(false);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [businessId, setBusinessId] = useState("");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;

    async function loadBusinesses() {
      try {
        const data = await getProjectBusinesses(projectId);
        setBusinesses(data);
      } catch {
        setError("Failed to load businesses");
      }
    }

    loadBusinesses();
  }, [open, projectId]);

  async function handleSubmit() {
    setError("");

    if (!businessId) {
      setError("Please select a business");
      return;
    }

    if (!keyword.trim()) {
      setError("Please enter a keyword");
      return;
    }

    const payload: CreateKeywordPayload = {
      business_id: Number(businessId),
      keyword: keyword.trim(),
    };

    try {
      setLoading(true);

      await createKeyword(payload);

      setKeyword("");
      setBusinessId("");
      setOpen(false);
      onCreated();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to add keyword"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>
  <Plus className="mr-2 h-4 w-4" />
  Add Keyword
</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add keyword</DialogTitle>
          <DialogDescription>
            Select a business and add a keyword to track.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Business</Label>

            <Select
  value={businessId}
  onValueChange={(value) =>
    setBusinessId(value ?? "")
  }
>
              <SelectTrigger>
                <SelectValue placeholder="Select a business" />
              </SelectTrigger>

              <SelectContent>
                {businesses.map((business) => (
                  <SelectItem
                    key={business.id}
                    value={String(business.id)}
                  >
                    {business.business_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="keyword">Keyword</Label>

            <Input
              id="keyword"
              placeholder="garage door repair Austin"
              value={keyword}
              onChange={(event) =>
                setKeyword(event.target.value)
              }
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Keyword"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}