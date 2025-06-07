// ContactPage.tsx
"use client"; // Add this if it's not already there for client-side interactivity

import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, FormEvent } from "react"; // Import useState and FormEvent

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
// ... other imports
import { useToast } from "@/components/ui/use-toast"; // For notifications

// ... HERO_CONTENT

export default function ContactPage() {
  const { toast } = useToast(); // Initialize toast
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value, // Use id as key if it matches state keys
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSubmitted(false);

    try {
      const response = await fetch("/api/contact", { // We'll create this API route next
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to send message");
      }

      toast({
        title: "Poruka Poslana!",
        description: "Hvala vam na poruci. Odgovorit ćemo uskoro.",
      });
      setIsSubmitted(true);
      setFormData({ firstName: "", lastName: "", email: "", message: "", phone: "" }); // Clear form
    } catch (error: any) {
      toast({
        title: "Greška",
        description: error.message || "Došlo je do greške. Molimo pokušajte ponovo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isContactFormValid = formData.firstName.trim() && formData.lastName.trim() && formData.phone.trim() && formData.message.trim();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">
                Kontaktirajte Nas
              </h1>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Imate pitanja? Javite nam se. Naš tim je tu da Vam pomogne.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-light">
                      Pošaljite Nam Poruku
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Ime</Label> {/* Changed id to firstName */}
                          <Input
                            id="firstName"
                            placeholder="Unesite vaše ime"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Prezime</Label> {/* Changed id to lastName */}
                          <Input
                            id="lastName"
                            placeholder="Unesite vaše prezime"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          placeholder="m@primjer.com"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefon</Label>
                        <Input
                          id="phone"
                          placeholder="Unesite vaš broj telefona"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Poruka</Label>
                        <Textarea
                          id="message"
                          placeholder="Unesite vašu poruku"
                          className="min-h-[100px]"
                          value={formData.message}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full min-h-[44px]" disabled={isLoading || !isContactFormValid} aria-label="Pošalji Poruku">
                        {isLoading ? "Slanje..." : "Pošalji Poruku"}
                      </Button>
                    </form>
                    {isSubmitted && (
                      <p className="mt-4 text-green-600">
                        Poruka uspješno poslana!
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
              {/* ... other content (Contact Info, Radno Vrijeme) ... */}
               <div className="space-y-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <h2 className="text-2xl font-light">Kontakt Informacije</h2>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-5 w-5 text-muted-foreground" />
                          <span>Pilanska bb, Banja Luka 78000</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-5 w-5 text-muted-foreground" />
                          <span>+387 66 802 219</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-5 w-5 text-muted-foreground" />
                          <span>vsistemdoo@gmail.com</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <h2 className="text-2xl font-light">Radno Vrijeme</h2>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Ponedjeljak - Petak</span>
                          <span>8:00 - 20:00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Subota</span>
                          <span>8:00 - 16:00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Nedjelja</span>
                          <span>Zatvoreno</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-5xl">
              <h2 className="mb-8 text-2xl font-light text-center">Pronađite Nas</h2>
              <div className="aspect-[4/3] w-full overflow-hidden rounded-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2831.8327291829833!2d17.20410237631497!3d44.784215378550805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475e03a70aad9949%3A0x4549d7722d3ec220!2sV%20Sistem%20salon%20namje%C5%A1taja%2C%20mebl%20%C5%A1tof%20i%20eko%20ko%C5%BEa!5e0!3m2!1sen!2sba!4v1748340215158!5m2!1sen!2sba" // Replace with your actual Google Maps embed URL
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
