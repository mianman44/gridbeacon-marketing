"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createProject } from "@/services/projects";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CreateProjectDialog() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [keyword, setKeyword] = useState("");
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  async function handleCreate() {
    console.log({
      name,
      city,
      keyword,
    });

    await createProject({
      name,
      city,
      keyword,
    });

    queryClient.invalidateQueries({
      queryKey: ["projects"],
    });

    setOpen(false);

    setName("");
    setCity("");
    setKeyword("");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>
  New Project
</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Project Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <Label>City</Label>
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div>
            <Label>Main Keyword</Label>
            <Input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          <Button
            onClick={handleCreate}
            className="w-full"
          >
            Create Project
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}