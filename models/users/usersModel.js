import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required!!"],
    trim: true,
    unique: [true, "Email exist!!"],
    validate: function (value) {
      return validator.isEmail(value);
    },
  },
  password: {
    type: String,
    required: [true, "Password is required!!"],
    minlength: [8, "The password must contain at least 8 characters"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Password is required!!"],
    minlength: [8, "The password must contain at least 8 characters"],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Passwords are not the same",
    },
  },
  role: {
    type: String,
    enum: ["Worker", "Admin", "Company"], //il n'accepte que l'une de ces 3 valeurs
    default: "Worker",
  },
  workerDetails: {
    fullName: {
      type: String,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
    },
    adress: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
      validate(value) {
        if (!validator.isNumeric(value)) {
          throw new Error("Invalid Phone number");
        }
      },
    },
  },
  companyDetails: {
    companyName: {
      type: String,
      trim: true,
    },
    industry: {
      type: String,
      trim: true,
    },
    adress: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
      validate(value) {
        if (!validator.isNumeric(value)) {
          throw new Error("Invalid Phone number");
        }
      },
    },
    numberOfEmployee: {
      type: String,
    },
  },
});

//Password hashing before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = undefined;
  next();
});
//compare password in DB

userSchema.methods.comparePasswordFromDB = async function (
  password,
  passwordDB
) {
  return await bcrypt.compare(password, passwordDB);
};

const userModel = mongoose.model("User", userSchema);

export { userModel };
