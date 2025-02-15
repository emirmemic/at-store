export const AUTH_VALIDATION_MESSAGES = {
  username: {
    required: "Username is required",
    minLength: "Username must be at least 3 characters",
    maxLength: "Username must be less than 30 characters",
    format: "Username can only contain letters, numbers and underscore",
  },
  email: {
    required: "Email is required",
    format: "Invalid email format",
  },
  password: {
    required: "Password is required",
    minLength: "Password must be at least 8 characters",
    maxLength: "Password must be less than 50 characters",
    uppercase: "Password must contain at least one uppercase letter",
    lowercase: "Password must contain at least one lowercase letter",
    number: "Password must contain at least one number",
  },
} as const;
