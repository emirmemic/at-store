import { z } from "zod";

const passwordSchema = () =>
  z
    .string()
    .trim()
    .min(8, "Lozinka mora sadržavati najmanje 8 karaktera")
    .max(50, "Lozinka ne smije biti duža od 50 karaktera")
    .regex(/[A-Z]/, "Lozinka mora sadržavati najmanje jedno veliko slovo")
    .regex(/[a-z]/, "Lozinka mora sadržavati najmanje jedno malo slovo")
    .regex(/[0-9]/, "Lozinka mora sadržavati najmanje jedan broj");

const phoneNumberSchema = () =>
  z
    .string()
    .nonempty("Broj telefona je obavezan")
    .min(8, "Broj telefona mora imati najmanje 8 cifara")
    .max(12, "Broj telefona ne smije biti duži od 12 cifara")
    .regex(/^[0-9]+$/, "Broj telefona smije sadržavati samo brojeve");

const emailSchema = () =>
  z.string().min(1, "Email je obavezan").email("Neispravan format email-a");

const authenticatedUserSchema = z.object({
  email: emailSchema(),
  password: passwordSchema(),
  name: z.string().trim().min(1, "Ime je obavezno"),
  surname: z.string().trim().min(1, "Prezime je obavezno"),
  address: z.string().trim().min(1, "Adresa je obavezna"),
  phoneNumber: phoneNumberSchema(),
  dateOfBirth: z
    .string()
    .regex(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "Datum mora biti u formatu DD/MM/YYYY"
    )
    .refine(
      (date) => {
        const [day, month, year] = date.split("/");
        const formattedDate = new Date(`${year}-${month}-${day}`);
        return formattedDate <= new Date();
      },
      {
        message: "Datum rođenja mora biti u prošlosti",
      }
    ),
});

const organizationUserSchema = z.object({
  email: emailSchema(),
  password: passwordSchema(),
  name: z.string().trim().min(1, "Ime je obavezno"),
  surname: z.string().trim().min(1, "Prezime je obavezno"),
  address: z.string().min(1, "Adresa je obavezna"),
  phoneNumber: phoneNumberSchema(),
  companyName: z.string().trim().min(1, "Naziv firme je obavezan"),
  companyIdNumber: z
    .string()
    .trim()
    .nonempty("ID broj firme je obavezan")
    .length(13, "ID broj firme mora imati 13 karaktera"),
  role: z.enum(["organization"]),
});

export { authenticatedUserSchema, organizationUserSchema };
