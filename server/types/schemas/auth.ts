import { z } from "zod";

// Base schemas
const passwordSchema = z
  .string()
  .trim()
  .min(8, "Lozinka mora sadržavati najmanje 8 karaktera")
  .max(50, "Lozinka ne smije biti duža od 50 karaktera")
  .regex(/[A-Z]/, "Lozinka mora sadržavati najmanje jedno veliko slovo")
  .regex(/[a-z]/, "Lozinka mora sadržavati najmanje jedno malo slovo")
  .regex(/[0-9]/, "Lozinka mora sadržavati najmanje jedan broj");

const phoneNumberSchema = z
  .string()
  .nonempty("Broj telefona je obavezan")
  .min(8, "Broj telefona mora imati najmanje 8 cifara")
  .max(12, "Broj telefona ne smije biti duži od 12 cifara")
  .regex(/^[0-9]+$/, "Broj telefona smije sadržavati samo brojeve");

const emailSchema = z
  .string()
  .min(1, "Email je obavezan")
  .email("Neispravan format email-a");

// Reusable schema parts
const personalInfoSchema = z.object({
  name: z.string().trim().min(1, "Ime je obavezno"),
  surname: z.string().trim().min(1, "Prezime je obavezno"),
});

const contactInfoSchema = z.object({
  address: z.string().trim().optional(),
  phoneNumber: phoneNumberSchema,
});

const companyInfoSchema = z.object({
  companyName: z.string().trim().min(1, "Naziv firme je obavezan"),
  companyIdNumber: z
    .string()
    .trim()
    .nonempty("ID broj firme je obavezan")
    .length(13, "ID broj firme mora imati 13 karaktera"),
});

// Main schemas using composition
const authenticatedUserSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
  })
  .merge(personalInfoSchema)
  .merge(contactInfoSchema);

const organizationUserSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    role: z.enum(["organization"]),
  })
  .merge(companyInfoSchema)
  .merge(contactInfoSchema);

const accountDetailsSchema = (userType: "organization" | "authenticated") =>
  z
    .object({
      password: z
        .string()
        .trim()
        .optional()
        .refine(
          (password) => {
            if (!password) return true;
            return (
              password.length >= 8 &&
              password.length <= 50 &&
              /[A-Z]/.test(password) &&
              /[a-z]/.test(password) &&
              /[0-9]/.test(password)
            );
          },
          (password) => ({
            message:
              password && password.length < 8
                ? "Password mora imati najmanje 8 karaktera"
                : password && password.length > 50
                  ? "Password ne smije biti duži od 50 karaktera"
                  : !password?.match(/[A-Z]/)
                    ? "Password mora sadržavati najmanje jedno veliko slovo"
                    : !password?.match(/[a-z]/)
                      ? "Password mora sadržavati najmanje jedno malo slovo"
                      : "Password mora sadržavati najmanje jedan broj",
          })
        ),
    })
    .merge(userType === "organization" ? companyInfoSchema : personalInfoSchema)
    .merge(contactInfoSchema);

export {
  authenticatedUserSchema,
  organizationUserSchema,
  accountDetailsSchema,
};
