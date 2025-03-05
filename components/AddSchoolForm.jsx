"use client";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function AddSchoolForm() {
  const [form, setForm] = useState({ name: "", address: "", latitude: "", longitude: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/addSchool", form);
      setMessage(res.data.message);
      setForm({ name: "", address: "", latitude: "", longitude: "" });
    } catch (error) {
      setMessage(error.response?.data?.message || "Error adding school");
    }
  };

  return (
    <Card className="max-w-md mx-auto p-4 shadow-lg rounded-lg">
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">Add New School</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input type="text" name="name" placeholder="School Name" value={form.name} onChange={handleChange} required />
          <Input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
          <Input type="number" name="latitude" placeholder="Latitude" value={form.latitude} onChange={handleChange} required />
          <Input type="number" name="longitude" placeholder="Longitude" value={form.longitude} onChange={handleChange} required />
          <Button type="submit">Add School</Button>
        </form>
        {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
      </CardContent>
    </Card>
  );
}
